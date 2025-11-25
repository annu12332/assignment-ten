import React from 'react';

const Extra = () => {
    return (
        <div className="p-6">
            <h3 className="text-3xl font-bold text-center mb-6">
                Winter Care Tips for Pets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* CARD 1 */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">❄️ Health & Safety Care</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>✔ Keep them warm</li>
                            <li>✔ Winter nutrition</li>
                            <li>✔ Protect paws</li>
                            <li>✔ Regular vet checkups</li>
                        </ul>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">🏡 Indoor Comfort & Environment</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>✔ Warm sleeping area</li>
                            <li>✔ Humidify the room</li>
                            <li>✔ Safe indoor play</li>
                            <li>✔ Grooming routine</li>
                        </ul>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">🌨️ Outdoor Precautions</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>✔ Proper winter clothing</li>
                            <li>✔ Limit outdoor time</li>
                            <li>✔ Avoid slippery surfaces</li>
                            <li>✔ Night safety</li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* VET SECTION */}
            <h3 className="text-3xl font-bold text-center mt-10 mb-6">
                Meet Our Expert Vets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* VET CARD 1 */}
                <div className="card bg-blue-100 shadow-lg hover:bg-blue-300 ">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Dr. Ayesha Rahman</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Specialty: Small Animal Medicine & Dermatology</li>
                            <li>Experience: 12+ years</li>
                            <li>Clinic: PetWell Care Hospital, Dhaka</li>
                            <li>Contact: +880-1780-445512</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="card bg-yellow-100 shadow-lg hover:bg-yellow-300">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Dr. Tanvir Chowdhury</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Specialty: Surgery & Orthopedics</li>
                            <li>Experience: 15+ years</li>
                            <li>Clinic: Animal Health & Surgery Center, Chattogram</li>
                            <li>Contact: +880-1912-887764</li>
                        </ul>
                    </div>
                </div>
                </div>

                <div>
                    <div className="card bg-red-100 shadow-lg hover:bg-red-300">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Dr. Nabila Hassan</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Specialty: Emergency & Critical Care</li>
                            <li>Experience: 10+ years</li>
                            <li>Clinic: VetPoint Emergency Clinic, Sylhet</li>
                            <li>Contact: +880-1307-667421</li>
                        </ul>
                    </div>
                </div>
                </div>

            </div>

        </div>
    );
};

export default Extra;
