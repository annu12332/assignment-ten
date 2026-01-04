import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontext } from '../AuthProvider';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { RiEditBoxLine, RiDeleteBin7Line, RiSettings4Line, RiExternalLinkLine } from "react-icons/ri";

const ManageServices = () => {
    const { user } = useContext(Authcontext);
    const [myServices, setMyServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Specific Admin-er email onujayi tar add kora service fetch kora
    useEffect(() => {
        if (user?.email) {
            axios.get(`https://backend-ten-one.vercel.app/services?email=${user.email}`)
                .then(res => {
                    setMyServices(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // Delete Functionality (CRUD - Delete)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be removed from the marketplace!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://backend-ten-one.vercel.app/services/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            toast.success("Service deleted successfully");
                            const remaining = myServices.filter(s => s._id !== id);
                            setMyServices(remaining);
                        }
                    });
            }
        });
    };

    if (loading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-4 lg:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-base-content flex items-center gap-2">
                        <RiSettings4Line className="text-primary" /> Manage My Services
                    </h2>
                    <p className="text-gray-500 text-sm">Update or remove your listed pets and products.</p>
                </div>
                <Link to="/dashboard/add" className="btn btn-primary text-white rounded-xl shadow-md">
                    + Add New Listing
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-50 text-gray-600">
                            <tr>
                                <th>Item Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myServices.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-400">You haven't added any services yet.</td>
                                </tr>
                            ) : (
                                myServices.map((service) => (
                                    <tr key={service._id} className="hover:bg-base-50 transition-colors">
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={service.image} alt={service.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{service.name}</div>
                                                    <div className="text-xs opacity-50 flex items-center gap-1">
                                                        <RiExternalLinkLine /> ID: {service._id.slice(-6)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-sm font-semibold">{service.category}</span>
                                        </td>
                                        <td className="font-bold text-primary">${service.price}</td>
                                        <td className="text-sm">{service.location}</td>
                                        <th>
                                            <div className="flex justify-center gap-3">
                                                {/* Update Button */}
                                                <Link 
                                                    to={`/dashboard/update/${service._id}`}
                                                    className="btn btn-square btn-sm btn-outline btn-info hover:text-white"
                                                    title="Edit Service"
                                                >
                                                    <RiEditBoxLine className="text-lg" />
                                                </Link>
                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDelete(service._id)}
                                                    className="btn btn-square btn-sm btn-outline btn-error"
                                                    title="Delete Service"
                                                >
                                                    <RiDeleteBin7Line className="text-lg" />
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;