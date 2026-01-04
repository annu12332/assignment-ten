import React, { useContext, useState } from 'react';
import { Authcontext } from '../AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { RiAddCircleLine, RiImageAddLine, RiMapPinUserLine } from "react-icons/ri";

const Add = () => {
    const { user } = useContext(Authcontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseFloat(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = user?.email;
        const userName = user?.displayName;

        const formData = {
            name,
            category,
            price,
            location,
            description,
            image,
            date,
            adminEmail: email,
            adminName: userName,
            createdAt: new Date()
        };

        try {
            const res = await axios.post('https://backend-ten-one.vercel.app/services', formData);
            if (res.data.insertedId) {
                toast.success('Service/Product added successfully!');
                form.reset();
                navigate('/dashboard/manage-services'); // Redirect to management page
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-3xl font-black text-base-content flex items-center gap-2 justify-center md:justify-start">
                    <RiAddCircleLine className="text-primary" /> Add New Service
                </h2>
                <p className="text-gray-500">List a new pet or product in the PawMart marketplace.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-base-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2">Product/Pet Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Golden Retriever"
                                required
                                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2">Category</label>
                            <select
                                name="category"
                                required
                                defaultValue=""
                                className="select select-bordered w-full rounded-xl"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="Pets">Pets</option>
                                <option value="Food">Food</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Care Products">Care Products</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                step="0.01"
                                required
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>

                        {/* Location */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2 flex items-center gap-1">
                                <RiMapPinUserLine /> Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="City, Country"
                                required
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-2 flex items-center gap-1">
                            <RiImageAddLine /> Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://images.unsplash.com/..."
                            required
                            className="input input-bordered w-full rounded-xl"
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-2">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Write details about the pet/product..."
                            required
                            className="textarea textarea-bordered w-full rounded-xl"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2">Listing Date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="input input-bordered w-full rounded-xl"
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-2">Admin Email</label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="input input-bordered w-full rounded-xl bg-base-200 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-full rounded-xl text-white shadow-lg hover:shadow-xl transition-all ${loading ? 'loading' : ''}`}
                        >
                            {loading ? 'Submitting...' : 'Add Service to PawMart'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;