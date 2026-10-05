import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  IndianRupee,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Search,
  Filter,
  Flame,
  Truck,
  Sparkles,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { OrderRecord } from '../data/burgers';

interface AdminDashboardProps {
  orders: OrderRecord[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderRecord['status']) => void;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onClose,
  onLogout,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Sizzling on Grill' || o.status === 'Out for Delivery' || o.status === 'Pending'
  ).length;

  const filteredOrders = orders.filter((ord) => {
    const matchesFilter = filterStatus === 'all' || ord.status === filterStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery) ||
      ord.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Sizzling on Grill':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/40 animate-pulse';
      case 'Out for Delivery':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Delivered':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-neutral-100 overflow-y-auto flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-20 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Storefront</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-white uppercase tracking-wider">
              BURGER BLING
            </span>
            <span className="bg-orange-500 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
              Admin Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">167, Vaishali Nagar, Indore</span>
            <span className="text-[10px] text-neutral-400">Main Kitchen Terminal</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 text-xs font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-10 space-y-8">
        {/* KPI / Revenue Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-wider mb-2">
              <span>Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-3xl font-black text-white tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-1">
              Live from Indore Orders
            </div>
          </div>

          {/* Total Orders */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-wider mb-2">
              <span>Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-3xl font-black text-white tabular-nums">
              {totalOrders}
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              {activeOrdersCount} in active kitchen prep
            </div>
          </div>

          {/* Average Order Value */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-wider mb-2">
              <span>Avg Order Value</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-3xl font-black text-white tabular-nums">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              Per completed transaction
            </div>
          </div>

          {/* Active Grill Kitchen Status */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs uppercase tracking-wider mb-2">
              <span>Grill Pipeline</span>
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="font-heading text-3xl font-black text-orange-400 tabular-nums">
              {activeOrdersCount} Active
            </div>
            <div className="text-[11px] text-neutral-400 font-medium mt-1">
              Vaishali Nagar Delivery Hub
            </div>
          </div>
        </div>

        {/* Orders Table & Controls */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search orders, customer, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {[
                { key: 'all', label: 'All Orders' },
                { key: 'Sizzling on Grill', label: 'Sizzling' },
                { key: 'Out for Delivery', label: 'Out for Delivery' },
                { key: 'Delivered', label: 'Delivered' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStatus(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    filterStatus === tab.key
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-neutral-500 text-xs">
                No orders match your current filter.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  {/* Left: Order Info & Customer */}
                  <div className="space-y-2 lg:max-w-md">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm font-bold text-orange-400">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {order.createdAt}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {order.customerName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-neutral-500" />
                          {order.customerPhone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-orange-400" />
                          <strong className="text-neutral-300">{order.deliveryAddress}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Ordered Items Preview */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-1.5 pr-2.5 bg-neutral-950/80 rounded-lg border border-neutral-800 text-xs"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-7 h-7 rounded object-cover border border-neutral-800"
                          />
                          <span className="text-white font-medium text-[11px]">
                            {item.quantity}× {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Payment, Total & Status Changer */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-800/80">
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {order.paymentMethod}
                      </div>
                      <div className="font-heading text-xl font-bold text-white tabular-nums">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Items: {order.items.reduce((s, i) => s + i.quantity, 0)}
                      </div>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                        Update Status
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(order.id, e.target.value as OrderRecord['status'])
                        }
                        className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Sizzling on Grill">Sizzling on Grill</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
