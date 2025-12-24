import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../AuthProvider';
import { useParams } from 'react-router';
import axios from 'axios';

const UpdateListing = () => {

    const { user } = useContext(Authcontext);
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [category, setCategory] = useState("");

    useEffect(() => {
        axios.get(`https://backend-ten-one.vercel.app/services/${id}`)
            .then(res => {
                const data = res.data;


                if (data.date) {
                    const d = new Date(data.date);
                    if (!isNaN(d)) {
                        data.date = d.toISOString().split("T")[0];
                    }
                }

                setService(data);
                setCategory(data.category);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedData = {
            name: form.name.value,
            category: form.category.value,
            price: form.price.value,
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            date: form.date.value,
            email: form.email.value,
            createdAt: service?.createdAt

        };

        axios.put(`https://backend-ten-one.vercel.app/services/${id}`, updatedData)
            .then(res => {
                console.log('Updated successfully', res.data);
                alert('Listing updated successfully!');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Listing</h2>

            <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                    <label className="font-semibold">Product/Pet Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={service?.name || ""}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Category</label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Pets">Pets</option>
                        <option value="Food">Food</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Care Products">Care Products</option>
                    </select>
                </div>

                <div>
                    <label className="font-semibold">Price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={service?.price || ""}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={service?.location || ""}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        defaultValue={service?.description || ""}
                        required
                        className="w-full border p-2 rounded"
                    ></textarea>
                </div>

                <div>
                    <label className="font-semibold">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        defaultValue={service?.image || ""}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Date (Pick Up)</label>
                    <input
                        type="date"
                        name="date"
                        defaultValue={service?.date}
                        onChange={(e) => setService({ ...(service || {}), date: e.target.value })}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateListing;
