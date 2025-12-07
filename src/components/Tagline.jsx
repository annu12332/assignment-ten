
import React from "react";

const taglines = [
    "Find Your Furry Friend Today!",
    "Adopt, Don’t Shop — Give a Pet a Home.",
    "Because Every Pet Deserves Love and Care.",
];

const Tagline = () => {
    return (
        <div className="bg-yellow-50 py-12 px-6 text-center">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-3">
                Our Message
            </h2>
            <div className="space-y-2">
                {taglines.map((tagline, index) => (
                    <p
                        key={index}
                        className="text-lg md:text-xl text-gray-700 font-medium animate-pulse"
                    >
                        {tagline}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Tagline;
