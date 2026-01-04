import React, { useEffect, useState } from 'react';
import { RiMapPin2Line, RiPriceTag3Line, RiArrowRightUpLine } from "react-icons/ri";
import { Link } from 'react-router';

const Popular = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://backend-ten-one.vercel.app/services?homePageLimit=6')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className='text-4xl font-black text-slate-800 mb-3'>
                        Recent Listings
                    </h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <div
                            key={service._id}
                            className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {service.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                                        {service.name}
                                    </h3>
                                    <div className="flex items-center text-green-600 font-black text-xl">
                                        ${service.price}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                    <RiMapPin2Line className="text-blue-500" />
                                    <span>{service.location}</span>
                                </div>

                                <Link
                                    to={`/services/${service._id}`}
                                    className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white py-4 rounded-2xl font-bold hover:bg-blue-900 transition-all duration-300 group/btn"
                                >
                                    View Details
                                    <RiArrowRightUpLine className="text-xl group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <Link to="/services" className="btn btn-outline btn-primary rounded-full px-10">
                        View All Listing
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Popular;