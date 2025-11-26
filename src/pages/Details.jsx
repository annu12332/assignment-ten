import React, { useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-hot-toast";

const ServiceDetails = () => {
  const location = useLocation();
  const service = location.state?.service;

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!service) return <p className="p-6">No service selected.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill all fields!");
      return;
    }
    toast.success(`Booking successful for ${service.title}!`);
    setName("");
    setEmail("");
    setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      {/* Service Card */}
      <div className="p-4 shadow rounded bg-white mb-4">
        <h2 className="text-3xl font-bold mb-2 mt-6 text-black">{service.serviceName}</h2>
        <p className="text-gray-700 mb-2">{service.description}</p>
        <h2 className="text-black font-bold">Price: {service.price}$</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel Booking" : "Book Now"}
        </button>
      </div>

      {/* Booking Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Submit Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default ServiceDetails;
