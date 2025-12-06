import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "react-hot-toast";

const ServiceDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(!service);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 👉 If service data not received from state, fetch from backend by ID
  useEffect(() => {
    if (!service) {
      fetch(`https://localhost:3000/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setService(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load service details!");
          setLoading(false);
        });
    }
  }, [id, service]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!service) return <p className="p-6">No service found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill all fields!");
      return;
    }
    toast.success(`Booking successful for ${service.serviceName}!`);
    setName("");
    setEmail("");
    setShowForm(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <div className="p-4 shadow rounded bg-white mb-4">
        <h2 className="text-3xl font-bold mb-2 mt-6 text-black">
          {service.serviceName}
        </h2>
        <img src={service.image} alt="" />
        <p className="text-gray-700 mb-2">{service.description}</p>
        <h2 className="text-black font-bold">Price: {service.price}$</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel Booking" : "Book Now"}
        </button>
      </div>

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
