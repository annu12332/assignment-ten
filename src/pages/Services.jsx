import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { RiSearchLine, RiFilter3Line, RiSortDesc } from "react-icons/ri";

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // Sorting state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://backend-ten-one.vercel.app/services?category=${category}`
      : "https://backend-ten-one.vercel.app/services";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : [];
        setServices(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [category]);

  // Sorting & Filtering Logic
  let filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low-to-high") {
    filteredServices.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    filteredServices.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-base-200 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white shadow-sm py-10 px-4 mb-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-base-content mb-2">
            Explore Our <span className="text-primary">Paw Mart</span> Supplies
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto italic">
            Everything your pet needs, from premium food to playful toys and care products.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <RiSearchLine className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search pets or supplies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-xl focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <RiFilter3Line className="text-xl text-primary" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="select select-bordered rounded-xl font-medium"
              >
                <option value="">All Categories</option>
                <option value="Pets">Pets</option>
                <option value="Food">Food</option>
                <option value="Accessories">Accessories</option>
                <option value="Care Products">Care Products</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <RiSortDesc className="text-xl text-primary" />
              <select
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                className="select select-bordered rounded-xl font-medium"
              >
                <option value="">Sort By Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
          // Skeleton Loader (Requirement 3)
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-64 w-full rounded-2xl"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-primary/20 overflow-hidden"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-primary bg-primary border-none text-white text-[10px] uppercase font-bold tracking-widest px-3 py-3">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-base-content mb-2 line-clamp-1">{service.name}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow italic">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center border-t border-base-100 pt-4 mt-auto">
                    <span className="text-2xl font-black text-primary">
                      ${service.price || 0}
                    </span>
                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-sm btn-primary rounded-lg text-white capitalize shadow-sm hover:shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 italic">No items found for this search.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;