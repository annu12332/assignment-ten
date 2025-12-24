import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        axios.get('https://backend-ten-one.vercel.app/orders')
            .then(res => {
                setMyOrders(res.data);
            })
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("My Orders Report", 14, 20);
        doc.setFontSize(12);

        let y = 35;

        myOrders.forEach((order, index) => {
            doc.text(`Order No: ${index + 1}`, 14, y);
            y += 6;
            doc.text(`Product: ${order.productName}`, 14, y);
            y += 6;
            doc.text(`Price: $${order.productPrice}`, 14, y);
            y += 6;
            doc.text(`Phone: ${order.phone}`, 14, y);
            y += 6;
            doc.text(`Location: ${order.address}`, 14, y);
            y += 6;
            doc.text(`Quantity: ${order.quantity}`, 14, y);
            y += 6;

            const dateFormatted = new Date(order.date).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            doc.text(`Date: ${dateFormatted}`, 14, y);
            y += 10;

            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });

        doc.save("MyOrdersReport.pdf");
    };

    return (
        <div>
            <h2 className='text-2xl font-bold'>My Orders</h2>

            <div className="overflow-x-auto h-96 w-full">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th></th>
                            <td>Product name</td>
                            <td>Price</td>
                            <td>Phone</td>
                            <td>Location</td>
                            <td>Quantity</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{order?.productName}</td>
                                    <td>{order?.productPrice}</td>
                                    <td>{order?.phone}</td>
                                    <td>{order?.address}</td>
                                    <td>{order?.quantity}</td>
                                    <td>
                                        {new Date(order?.date).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            hour12: true
                                        })}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>

            {/* Download Button */}
            <div className='text-center mt-1'>
                <button
                    onClick={downloadPDF}
                    className='bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800'>
                    Download Report
                </button>
            </div>
        </div>
    );
};

export default MyOrders;
