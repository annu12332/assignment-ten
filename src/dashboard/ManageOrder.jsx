import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { RiListCheck2, RiTruckLine, RiCheckboxCircleLine, RiInformationLine } from "react-icons/ri";

const ManageOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Shob user-er order fetch kora
    useEffect(() => {
        axios.get('https://backend-ten-one.vercel.app/orders')
            .then(res => {
                setAllOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Status Update Handler (Requirement 8)
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axios.patch(`https://backend-ten-one.vercel.app/orders/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`Order status updated to ${newStatus}`);
                // Local state update jate page reload na lage
                setAllOrders(prev => prev.map(order =>
                    order._id === id ? { ...order, status: newStatus } : order
                ));
            }
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-4 lg:p-6 bg-white rounded-3xl shadow-sm border border-base-200">
            <div className="mb-8">
                <h2 className='text-3xl font-black text-base-content flex items-center gap-2'>
                    <RiListCheck2 className="text-secondary" /> Manage All Orders
                </h2>
                <p className="text-gray-500 text-sm italic">Admin control panel for tracking and shipping pet supplies.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl">
                <table className="table w-full">
                    <thead className="bg-base-100 text-base-content uppercase text-[11px] font-bold">
                        <tr>
                            <th>Customer</th>
                            <th>Product & Price</th>
                            <th>Current Status</th>
                            <th className="text-center">Quick Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-base-50 transition-all border-b border-base-100 last:border-none">
                                {/* Customer Info */}
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base-content">{order.buyerName}</span>
                                        <span className="text-[11px] text-gray-400">{order.buyerEmail}</span>
                                        <span className="text-[10px] text-primary mt-1 font-mono">{order._id}</span>
                                    </div>
                                </td>

                                {/* Product Info */}
                                <td>
                                    <div className="font-semibold text-sm">{order.productName}</div>
                                    <div className="text-xs text-secondary font-bold">${order.productPrice} (x{order.quantity})</div>
                                </td>

                                {/* Status Badge */}
                                <td>
                                    <span className={`badge badge-sm py-3 px-4 rounded-full font-bold uppercase text-[9px] ${order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                'bg-amber-100 text-amber-700'
                                        }`}>
                                        {order.status || 'pending'}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="flex justify-center gap-2">
                                    <button
                                        onClick={() => handleStatusUpdate(order._id, 'shipped')}
                                        disabled={order.status === 'shipped' || order.status === 'delivered'}
                                        className="btn btn-sm btn-circle btn-outline btn-info hover:text-white"
                                        title="Mark as Shipped"
                                    >
                                        <RiTruckLine className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(order._id, 'delivered')}
                                        disabled={order.status === 'delivered'}
                                        className="btn btn-sm btn-circle btn-outline btn-success hover:text-white"
                                        title="Mark as Delivered"
                                    >
                                        <RiCheckboxCircleLine className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {allOrders.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <RiInformationLine className="mx-auto text-5xl mb-2 opacity-20" />
                    <p>No orders recorded in the system.</p>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;