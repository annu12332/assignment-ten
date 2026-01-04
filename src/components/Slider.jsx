import React from 'react';

const Slider = () => {
  const slides = [
    {
      id: "slide1",
      prev: "#slide3",
      next: "#slide2",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
      title: "Every Paw Deserves the Best!",
      description: "Find the perfect food & accessories for your furry friends.",
      btnText: "Shop Now",
      link: "/services"
    },
    {
      id: "slide2",
      prev: "#slide1",
      next: "#slide3",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      title: "Cozy Comforts for Pets",
      description: "Durable and fun toys to keep your pets active and happy all day.",
      btnText: "Grab Toys",
      link: "/services"
    },
    {
      id: "slide3",
      prev: "#slide2",
      next: "#slide1",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
      title: "Healthy Treats & Nutrition",
      description: "Organic and premium quality food for all breeds and ages.",
      btnText: "Explore More",
      link: "/services"
    }
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl my-6 shadow-xl">
      <div className="carousel w-full h-[450px] md:h-[550px]">
        {slides.map((slide) => (
          <div key={slide.id} id={slide.id} className="carousel-item relative w-full group">
            {/* Image with Overlay */}
            <div className="w-full h-full relative">
              <img
                src={slide.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Pet Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="ml-12 md:ml-20 text-white max-w-lg space-y-4 md:space-y-6">
                  <h2 className="text-4xl md:text-6xl font-bold leading-tight animate__animated animate__fadeInDown">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 animate__animated animate__fadeInUp">
                    {slide.description}
                  </p>
                  <div className="flex gap-4 pt-2">
                    <button className="btn btn-primary btn-md md:btn-lg rounded-full px-8 text-white border-none shadow-lg">
                      {slide.btnText}
                    </button>
                    <button className="btn btn-outline btn-md md:btn-lg rounded-full px-8 text-white border-white hover:bg-white hover:text-black">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between px-2">
              <a href={slide.prev} className="btn btn-circle btn-ghost bg-white/20 hover:bg-primary text-white border-none transition-all">❮</a>
              <a href={slide.next} className="btn btn-circle btn-ghost bg-white/20 hover:bg-primary text-white border-none transition-all">❯</a>
            </div>
            
            {/* Visual Hint for Next Section (Scroll Down) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
               <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;