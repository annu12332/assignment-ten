import React from 'react';
import { RiHeartFill, RiTeamFill, RiShieldCheckFill, RiUserHeartLine } from "react-icons/ri";

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-primary/5 py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left z-10">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight">
                            Committed to <span className="text-primary">Happy Paws</span> & Happy Hearts
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            At PawMart, we believe every pet deserves a loving home and the best care possible. Since 2020, we've been connecting passionate pet lovers with their new best friends.
                        </p>
                        <div className="mt-8 flex gap-4 justify-center md:justify-start">
                            <button className="btn btn-primary rounded-full px-8 text-white">Join Our Community</button>
                            <button className="btn btn-outline rounded-full px-8">Our Story</button>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" 
                            alt="Happy Dog" 
                            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden lg:block">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                    <RiHeartFill size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">5000+</p>
                                    <p className="text-xs text-slate-500">Pets Adopted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                        <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <RiShieldCheckFill size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
                        <p className="text-slate-600 leading-relaxed italic">
                            "To provide a safe and transparent marketplace where pets find forever homes and pet owners find premium supplies with ease and trust."
                        </p>
                    </div>
                    <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                        <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-secondary mb-6">
                            <RiTeamFill size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
                        <p className="text-slate-600 leading-relaxed italic">
                            "To become the world's most trusted companion animal community, fostering a culture of responsible pet ownership and love."
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-slate-900 py-24 px-6 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">Our Core Values</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Passion for Pets", desc: "We're crazy about animals and their well-being is our top priority.", icon: <RiUserHeartLine /> },
                            { title: "Community & Trust", desc: "Building a safe space for buyers and sellers with verified listings.", icon: <RiTeamFill /> },
                            { title: "Quality & Care", desc: "Only the best food and accessories for your furry family members.", icon: <RiShieldCheckFill /> }
                        ].map((value, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group">
                                <div className="text-primary text-4xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                                <h4 className="text-xl font-bold mb-3 text-white">{value.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section Placeholder */}
            <div className="py-24 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-16 italic">Meet The PawMart Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        { name: "Jane Doe", role: "Founder & CEO", img: "https://i.pravatar.cc/150?u=1" },
                        { name: "John Smith", role: "Head of Operations", img: "https://i.pravatar.cc/150?u=2" },
                        { name: "Sarah Connor", role: "Pet Specialist", img: "https://i.pravatar.cc/150?u=3" }
                    ].map((member, idx) => (
                        <div key={idx} className="group">
                            <div className="relative mb-6 inline-block">
                                <img src={member.img} alt={member.name} className="w-48 h-48 rounded-full border-8 border-slate-50 shadow-lg group-hover:border-primary/20 transition-all" />
                                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">{member.name}</h4>
                            <p className="text-primary font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;