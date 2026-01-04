import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Authcontext } from '../AuthProvider';
import { toast } from 'react-hot-toast';
import { RiEditCircleLine, RiSave3Line, RiArrowLeftLine } from "react-icons/ri";

const UpdateService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(Authcontext);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    // Form state initial data load korar jonno
    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        // Existing data fetch kora jate form-e show kora jay
        axios.get(`https://backend-ten-one.vercel.app/services/${id}`)
            .then(res => {
                setServiceData(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Failed to load data!");
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const form = e.target;
        const updatedData = {
            name: form.name.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
        };

        try {
            const res = await axios.patch(`https://backend-ten-one.vercel.app/services/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                toast.success("Service updated successfully!");
                navigate('/dashboard/manage-services');
            } else {
                toast.error("No changes were made.");
            }
        } catch (err) {
            toast.error("Update failed. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="max-w-3xl mx-auto px-4">
            <button onClick={() => navigate(-1)} className="btn btn-ghost mb-4 flex items-center gap-2">
                <RiArrowLeftLine /> Back
            </button>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                <div className="text-center mb-8">
                    <RiEditCircleLine className="text-5xl text-primary mx-auto mb-2" />
                    <h2 className="text-2xl font-black">Update Service Info</h2>
                    <p className="text-gray-500 text-sm">Modify the details for: <span className="text-primary font-bold">{serviceData?.name}</span></p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Service Name</label>
                            <input type="text" name="name" defaultValue={serviceData?.name} required className="input input-bordered rounded-xl" />
                        </div>

                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Category</label>
                            <select name="category" defaultValue={serviceData?.category} className="select select-bordered rounded-xl">
                                <option value="Pets">Pets</option>
                                <option value="Food">Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Care Products">Care Products</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Price ($)</label>
                            <input type="number" name="price" defaultValue={serviceData?.price} step="0.01" required className="input input-bordered rounded-xl" />
                        </div>

                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Location</label>
                            <input type="text" name="location" defaultValue={serviceData?.location} required className="input input-bordered rounded-xl" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Image URL</label>
                        <input type="url" name="image" defaultValue={serviceData?.image} required className="input input-bordered rounded-xl" />
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold mb-1">Description</label>
                        <textarea name="description" defaultValue={serviceData?.description} rows="4" className="textarea textarea-bordered rounded-xl"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Listing Date</label>
                            <input type="date" name="date" defaultValue={serviceData?.date} required className="input input-bordered rounded-xl" />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-bold mb-1">Admin Email</label>
                            <input type="email" value={user?.email} readOnly className="input input-bordered bg-base-100 opacity-60 rounded-xl" />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={updating}
                        className="btn btn-primary w-full mt-6 text-white rounded-xl shadow-lg flex items-center gap-2"
                    >
                        {updating ? <span className="loading loading-spinner"></span> : <RiSave3Line className="text-xl" />}
                        {updating ? 'Updating...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;