import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import jsPDF from 'jspdf';
import { Authcontext } from "../AuthProvider";
import { RiFileDownloadLine, RiInboxArchiveLine } from "react-icons/ri";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { user } = useContext(Authcontext); // Logged in user-er info nilam
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            // Sudhu user-er email onujayi data fetch korchi (Requirement 7 & 8)
            axios.get(`https://backend-ten-one.vercel.app/orders?email=${user.email}`)
                .then(res => {
                    setMyOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        
        // PDF Styling
        doc.setFillColor(79, 70, 229); // Primary color theme
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text("PAWMART - PURCHASE REPORT", 14, 20);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Customer: ${user?.displayName || 'User'}`, 14, 40);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 45);
        
        let y = 60;
        doc.line(14, 52, 196, 52); // Border line

        myOrders.forEach((order, index) => {
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${order.productName}`, 14, y);
            doc.setFont(undefined, 'normal');
            y += 6;
            doc.text(`Price: $${order.productPrice} | Qty: ${order.quantity} | Phone: ${order.phone}`, 20, y);
            y += 6;
            doc.text(`Delivery Address: ${order.address}`, 20, y);
            y += 10;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save(`Orders_Report_${user?.displayName}.pdf`);
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-4 lg:p-6 bg-white rounded-3xl shadow-sm border border-base-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className='text-3xl font-black text-base-content flex items-center gap-2'>
                        <RiInboxArchiveLine className="text-primary" /> My Orders
                    </h2>
                    <p className="text-gray-500 text-sm">Review your purchase history and download reports.</p>
                </div>

                {myOrders.length > 0 && (
                    <button
                        onClick={downloadPDF}
                        className='btn btn-primary text-white rounded-xl shadow-lg flex items-center gap-2 normal-case'>
                        <RiFileDownloadLine className="text-xl" /> Download Report (PDF)
                    </button>
                )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-base-100">
                <table className="table w-full">
                    <thead className="bg-base-100 text-base-content">
                        <tr>
                            <th className="rounded-tl-2xl">#</th>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Location</td>
                            <td className="rounded-tr-2xl">Date & Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400 italic">No orders found.</td>
                            </tr>
                        ) : (
                            myOrders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-base-50">
                                    <th>{index + 1}</th>
                                    <td className="font-bold text-primary">{order?.productName}</td>
                                    <td>${order?.productPrice}</td>
                                    <td>
                                        <div className="badge badge-ghost font-mono">{order?.quantity}</div>
                                    </td>
                                    <td className="text-xs max-w-xs truncate">{order?.address}</td>
                                    <td className="text-[11px] font-medium opacity-70">
                                        {new Date(order?.date).toLocaleString('en-GB', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit', hour12: true
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;