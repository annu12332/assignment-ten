import React, { useEffect, useState } from 'react';
import { RiStarSFill } from "react-icons/ri";
import { Link } from 'react-router';
const Popular = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://backend-ten-one.vercel.app/services?homePageLimit=6')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err));
    }, []);

    console.log(services);

    return (
        <div>
            <h2 className='text-3xl font-bold text-black text-center mt-4'>
                Recent Listings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 container mx-auto">
                {services.map(service => (
                    <div
                        key={service.serviceId}
                        className="card p-4 bg-base-100 shadow-md rounded-xl hover:shadow-xl transition-all duration-300"
                    >
                        <figure className="w-full">
                            <img
                                src={service.image}
                                alt={service.name}
                                className=" w-full h-64 object-cover rounded-t-xl"
                            />
                        </figure>

                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-lg font-bold">{service.name}</h2>

                            <p className="text-sm text-gray-500 leading-relaxed">
                               Location: {service.location}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <div >
                                    <div className='flex items-center bg-amber-200 rounded-md px-3'><span className="">{service.category} </span></div>
                                    <h4 className='font-bold bg-green-300 rounded-md px-3 mt-1'> {service.price}$</h4>
                                </div>
                                <Link
                                    to={`/services/${service.Id}`}
                                    state={{ service }}
                                    className="bg-blue-700 px-3 py-3 rounded-2xl text-lg font-semibold text-white hover:bg-blue-800 transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default Popular;
