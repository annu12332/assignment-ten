import React, { useEffect, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router"; 

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const url = category
      ? `https://backend-ten-one.vercel.app/services?category=${category}`
      : "https://backend-ten-one.vercel.app/services";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : [];
        setServices(result);
      })
      .catch((err) => console.log(err));
  }, [category]);

  
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-black text-center mt-4">
        Pets & Supplies
      </h2>

      <div className="container mx-auto my-4 flex flex-col md:flex-row gap-4 items-center ">
        {/* Category Select */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="select appearance-none border border-gray-300 p-2 rounded"
        >
          <option value="">Choose Category</option>
          <option value="Pets">Pets</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded flex-1 "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 container mx-auto">
        {filteredServices.map((service) => (
          <div data-aos="zoom-in-up">

             <div
            key={service._id}
            className="card p-4 bg-base-100 shadow-md rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <figure className="w-full">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            </figure>

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-bold">{service.name}</h2>

              <p className="text-sm text-gray-500 leading-relaxed">
                {service.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <div>
                  <div className="flex items-center bg-amber-200 rounded-full p-1">
                    <span> {service.category}</span>
                    
                  </div>
                  <h4 className="font-bold bg-green-300 rounded-full p-1 mt-1">
                    Price: {service.price || 0}$
                  </h4>
                </div>

                <Link
                  to={`/services/${service._id}`}
                  state={{ service }}
                  className="bg-blue-700 p-3 rounded-2xl text-lg font-semibold text-white hover:bg-blue-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          </div>
         
        ))}

        {filteredServices.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No services found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
