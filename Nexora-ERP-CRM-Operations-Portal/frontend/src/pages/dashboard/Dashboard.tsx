import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { customerService } from '../../services/customer.service';
import { productService } from '../../services/product.service';
import { challanService } from '../../services/challan.service';
import type { Product } from '../../types/product.types';
import type { Challan } from '../../types/challan.types';
import { Users, Package, FileText, AlertTriangle } from 'lucide-react';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  totalChallans: number;
  draftChallans: number;
  confirmedChallans: number;
}

export function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch if not authenticated
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        // Only fetch data the current user has access to
        const userRole = user?.role;
        const canAccessCustomers = ['ADMIN', 'SALES', 'ACCOUNTS'].includes(userRole || '');
        const canAccessProducts = ['ADMIN', 'WAREHOUSE', 'SALES', 'ACCOUNTS'].includes(userRole || '');
        const canAccessChallans = ['ADMIN', 'SALES', 'ACCOUNTS'].includes(userRole || '');
        
        const customersPromise = canAccessCustomers ? customerService.getAll({ limit: 1 }) : null;
        const productsPromise = canAccessProducts ? productService.getAll({ limit: 100 }) : null;
        const challansPromise = canAccessChallans ? challanService.getAll({ limit: 100 }) : null;

        const [customers, products, challans] = await Promise.all([
          customersPromise,
          productsPromise,
          challansPromise,
        ]);

        const lowStock = (products?.data as Product[] | undefined)?.filter(p => p.currentStock <= p.minimumStock).length || 0;

        setStats({
          totalCustomers: customers?.total || 0,
          totalProducts: products?.total || 0,
          lowStockProducts: lowStock,
          totalChallans: challans?.total || 0,
          draftChallans: (challans?.data as Challan[] | undefined)?.filter(c => c.status === 'DRAFT').length || 0,
          confirmedChallans: (challans?.data as Challan[] | undefined)?.filter(c => c.status === 'CONFIRMED').length || 0,
        });
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, isAuthenticated]);

  // Show login message if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view the dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  const cards = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: <Users className="h-5 w-5 text-[#742cdc]" />,
      bgColor: 'bg-[#ebdcff]',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <Package className="h-5 w-5 text-[#091426]" />,
      bgColor: 'bg-[#d5e3fd]',
    },
    {
      title: 'Low Stock Items',
      value: stats?.lowStockProducts || 0,
      icon: <AlertTriangle className="h-5 w-5 text-[#ba1a1a]" />,
      bgColor: 'bg-[#ffdad6]',
      alert: stats?.lowStockProducts && stats.lowStockProducts > 0,
    },
    {
      title: 'Total Challans',
      value: stats?.totalChallans || 0,
      icon: <FileText className="h-5 w-5 text-[#091426]" />,
      bgColor: 'bg-[#eff4ff]',
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0d1c2f] md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-[#45474c]">Welcome back, {user.name}. Here's what's happening today.</p>
        </div>
        <button className="hidden rounded border border-[#091426] bg-[#091426] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1e293b] sm:block">
          + New Report
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-lg border border-[#c5c6cd] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#45474c]">{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-[#0d1c2f]">{card.value.toLocaleString()}</p>
              </div>
              <div className={`rounded-lg p-3 ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
            {card.alert && (
              <div className="mt-3 flex items-center text-sm text-[#ba1a1a]">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Requires attention
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-lg border border-[#c5c6cd] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#c5c6cd] bg-[#eff4ff] px-4 py-3 md:px-5">
            <h2 className="text-base font-semibold text-[#0d1c2f]">Operations Overview</h2>
            <span className="text-xs text-[#742cdc]">Last 30 days</span>
          </div>
          <div className="flex h-56 items-end gap-3 px-5 pb-7 pt-8">
            {[35, 54, 42, 72, 60, 88, 48].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-end justify-end gap-2 h-full">
                <div
                  className={`w-full rounded-t-sm ${index === 5 ? 'bg-[#8e4cf6]' : 'bg-[#b8c6df]'}`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-[#75777d]">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[#c5c6cd] bg-white shadow-sm">
          <div className="border-b border-[#c5c6cd] bg-[#eff4ff] px-4 py-3 md:px-5">
            <h2 className="text-base font-semibold text-[#0d1c2f]">Challans by Status</h2>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between border-b border-[#e6eeff] pb-3">
              <span className="text-sm text-[#45474c]">Confirmed</span>
              <span className="font-mono text-sm font-semibold text-[#10b981]">{stats?.confirmedChallans || 0}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#e6eeff] pb-3">
              <span className="text-sm text-[#45474c]">Draft</span>
              <span className="font-mono text-sm font-semibold text-[#f59e0b]">{stats?.draftChallans || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#45474c]">Low stock alerts</span>
              <span className="font-mono text-sm font-semibold text-[#ef4444]">{stats?.lowStockProducts || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}