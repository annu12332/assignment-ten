import React from 'react';

const Extra = () => {
    return (
        <div className="p-6">
            <h3 className="text-3xl font-bold text-center mb-6">
                Why Adopt from PawMart?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        
                        <ul className="mt-6 flex flex-col gap-2 text-xl font-semibold">
                            <li>✔ At PawMart, we believe every animal deserves a second chance.</li>
                          
                            
                        </ul>
                    </div>
                </div>

                
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        
                        <ul className="mt-6 flex flex-col gap-2 text-xl font-semibold">
                            <li>✔ When you adopt, you don’t just bring home a pet — you save a life.</li>
                            
                        </ul>
                    </div>
                </div>

                
                <div className="card bg-base-100 shadow-sm">
                    <div className="card-body">
                        
                        <ul className="mt-6 flex flex-col gap-2 text-xl font-semibold">
                            <li>✔ Adopt from PawMart and give a furry friend the home, love, and future they truly deserve.</li>
                          
                        </ul>
                    </div>
                </div>

            </div>

           
            <h3 className="text-3xl font-bold text-center mt-10 mb-6">
                Meet Our Pet Heroes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              
                <div className="card bg-blue-100 shadow-lg hover:bg-blue-300 ">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Daniel Reyes</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Adopted: Milo (Tabby Cat)</li>
                            <li>Location: San Diego, California</li>
                            <li>Story: Daniel was looking for a calm indoor pet. Milo had spent months in the shelter waiting for adoption. Now he enjoys sunny window naps and cuddles while Daniel works on his laptop. A perfect rescue success story.</li>
                            
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="card bg-yellow-100 shadow-lg hover:bg-yellow-300">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Priya Sharma</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Adopted: Adopted Coco</li>
                            <li>Location: San Diego, California</li>
                            <li>story: Priya wanted her daughter to grow up with a furry friend. Coco, a playful and smart mixed-breed puppy rescued from the streets, quickly became part of their family. Priya loves how Coco brings joy and energy to their home every day.</li>
                           
                        </ul>
                    </div>
                </div>
                </div>

                <div>
                    <div className="card bg-red-100 shadow-lg hover:bg-red-300">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold">Sarah Thompson</h2>
                        <ul className="mt-6 flex flex-col gap-2 text-sm font-semibold">
                            <li>Adopted: Bella (Golden Retriever)</li>
                            <li>Location: Location: Austin, Texas</li>
                            <li>Story:Story: Sarah wanted a companion to help cope with working from home. Bella, a gentle Golden Retriever rescued from abandonment, became her perfect match. Now they go on morning jogs together, and Bella has found a loving forever home.</li>
                            
                        </ul>
                    </div>
                </div>
                </div>

            </div>

        </div>
    );
};

export default Extra;
