import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { Authcontext } from "../AuthProvider";
import axios from "axios";

const ServiceDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { user } = useContext(Authcontext);

  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(!service);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

 
  useEffect(() => {
    if (!service) {
      fetch(`https://backend-ten-one.vercel.app/services/${id}`) // FIXED URL
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

  const handleOrder = (e)=>{
    e.preventDefault();
    const form = e.target;
    

    const productName =form.productName.value
    const buyerEmail = form.buyerEmail.value
    const buyerName = form.buyerName.value 
    const productPrice = form.productPrice.value 
    const quantity = form.productQuantity.value 
    const address = form.address.value 
    const note = form.note.value 
    const phone = form.phoneNumber.value

    const formData = {
      productId: id,
      productName,
      buyerName,
      buyerEmail,
      productPrice,
      quantity,
      address,
      note,
      phone,
      date: new Date()


    }

    axios.post('https://backend-ten-one.vercel.app/orders', formData)
    .then(res=>{

    })
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!service) return <p className="p-6">No service found.</p>;

  // FORM SUBMIT (Modal)
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const orderData = {
      productName: form.name.value,
      buyerName: name,
      buyerEmail: email,
      price: form.price.value,
      quantity: form.quantity.value,
      address: form.address.value,
      note: form.note.value,
      phone: form.phone.value,
    };

    console.log(orderData);

    toast.success(`Order placed for ${service.name}!`);
    form.reset();
    setShowForm(false);
    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <div className="p-4 shadow rounded bg-white mb-4">
        <h2 className="text-3xl font-bold mb-2 mt-6 text-black">
          {service.name}
        </h2>

        <img src={service.image} alt="" className="rounded" />

        <p className="text-gray-700 mb-2">{service.description}</p>

        <h2 className="text-black font-bold">Price: {service.price}$</h2>

        {/* BUTTON OPEN MODAL */}
        <button
          className="btn mt-4"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Adopt / Buy
        </button>

        {/* MODAL */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Order Details
              </h2>

              <form onSubmit={handleOrder} className="space-y-4">

                {/* Product Name */}
                <div>
                  <label className="font-semibold">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={service?.name || ""}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Buyer Name */}
                <div>
                  <label className="font-semibold">Buyer Name</label>
                  <input
                    type="text"
                    name="buyerName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Buyer Email */}
                <div>
                  <label className="font-semibold">Buyer Email</label>
                  <input
                    type="email"
                    name="buyerEmail"
                    value={email}
                    readOnly
                    className="w-full border p-2 rounded bg-gray-100"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="font-semibold">Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    defaultValue={service?.price}
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="font-semibold">Quantity</label>
                  <input
                    type="number"
                    name="productQuantity"
                    required
                    value={user?.price}
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="font-semibold">Address</label>
                  <textarea
                    name="address"
                    rows="3"
                    required
                    className="w-full border p-2 rounded"
                  ></textarea>
                </div>

                {/* Note */}
                <div>
                  <label className="font-semibold">Note</label>
                  <textarea
                    name="note"
                    rows="3"
                    className="w-full border p-2 rounded"
                  ></textarea>
                </div>

                {/* Phone */}
                <div>
                  <label className="font-semibold">Phone</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Old conditional form if needed */}
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
