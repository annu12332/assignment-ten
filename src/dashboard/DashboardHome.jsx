import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const DashboardHome = () => {
  // Demo Data (Requirement onujayi backend theke data ashbe)
  const data = [
    { name: 'Jan', orders: 400, sales: 2400 },
    { name: 'Feb', orders: 300, sales: 1398 },
    { name: 'Mar', orders: 200, sales: 9800 },
    { name: 'Apr', orders: 278, sales: 3908 },
    { name: 'May', orders: 189, sales: 4800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      {/* 1. Overview Cards (Requirement 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title text-white/70">Total Orders</div>
            <div className="stat-value text-3xl">1,200</div>
            <div className="stat-desc text-white/50">↘︎ 90 (14%)</div>
          </div>
        </div>
        
        <div className="stats shadow bg-secondary text-secondary-content">
          <div className="stat">
            <div className="stat-title text-white/70">New Listings</div>
            <div className="stat-value text-3xl">45</div>
            <div className="stat-desc text-white/50">↗︎ 12% increase</div>
          </div>
        </div>

        <div className="stats shadow border border-base-200">
          <div className="stat">
            <div className="stat-title text-gray-500">Revenue</div>
            <div className="stat-value text-3xl">$4,500</div>
            <div className="stat-desc">Monthly Earnings</div>
          </div>
        </div>

        <div className="stats shadow border border-base-200">
          <div className="stat">
            <div className="stat-title text-gray-500">Reviews</div>
            <div className="stat-value text-3xl">4.8</div>
            <div className="stat-desc">Average Rating</div>
          </div>
        </div>
      </div>

      {/* 2. Charts Section (Requirement 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-base-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Order Statistics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="orders" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-base-200 shadow-sm text-center">
          <h3 className="text-xl font-bold mb-4">Service Distribution</h3>
          <div className="h-[300px] w-full flex justify-center items-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="orders"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Dynamic Data Table (Requirement 7) */}
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-base-100 flex justify-between items-center">
          <h3 className="text-xl font-bold">Recent Activities</h3>
          <button className="btn btn-sm btn-ghost text-primary">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-50">
              <tr>
                <th className="font-semibold text-gray-600">Pet Name</th>
                <th className="font-semibold text-gray-600">Category</th>
                <th className="font-semibold text-gray-600">Status</th>
                <th className="font-semibold text-gray-600">Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic row logic starts here */}
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100&auto=format&fit=crop" alt="Pet" />
                      </div>
                    </div>
                    <div className="font-bold text-sm">Golden Retriever</div>
                  </div>
                </td>
                <td>Dog Supplies</td>
                <td><span className="badge badge-success badge-sm text-white">Shipped</span></td>
                <td>$120.00</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=100&auto=format&fit=crop" alt="Pet" />
                      </div>
                    </div>
                    <div className="font-bold text-sm">Siamese Cat</div>
                  </div>
                </td>
                <td>Cat Food</td>
                <td><span className="badge badge-warning badge-sm text-white">Pending</span></td>
                <td>$45.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;