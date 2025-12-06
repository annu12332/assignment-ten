import React, { useContext } from 'react';
import { Authcontext } from '../AuthProvider';
import axios from 'axios';

const Add = () => {
    const {user} = useContext(Authcontext);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value; 
        const category = parseInt(form.category.value); 
        const price = form.price.value; 
        const location = form.location.value; 
        const description = form.description.value;
        const image = form.image.value; 
        const email = form.email.value;
        
        const formData = {
            name,
            category,
            price,
            location, 
            description,
            image,
            email,
        }
        
        axios.post('http://localhost:3000/services',formData)
        .then(res=>{
            console.log(res);
        })




    }
    
          return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product / Pet</h2>

      <form onSubmit={handleSubmit}  className="space-y-4">

        {/* Name */}
        <div>
          <label className="font-semibold">Product/Pet Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
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

        {/* Price */}
        <div>
          <label className="font-semibold">Price</label>
          <input
            type="number"
            name="price"
            
            
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            rows="3"
            required
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="url"
            name="image"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Date */}
        <div>
          <label className="font-semibold">Date (Pick Up)</label>
          <input
            type="date"
            name="date"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* Submit Button */}
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



export default Add;