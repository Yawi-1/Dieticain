import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "John Doe",
    feedback: "NutriCare completely transformed my eating habits!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Lovish Garg",
    feedback: "I struggled with weight loss for years.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    name: "Mudasir Javid",
    feedback: "Diet plan made it so easy and effective!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center mt-3">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 sm:w-6 sm:h-6 fill-current ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto text-center max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
        What Our Clients Say
      </h2>
      
      <div className="relative min-h-[400px] md:min-h-[300px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute w-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg max-w-md mx-auto w-[90%]">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full mb-3 sm:mb-4"
              />
              <p className="text-sm sm:text-base text-gray-600 italic mb-3">
                "{testimonial.feedback}"
              </p>
              <StarRating rating={testimonial.rating} />
              <h4 className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold text-gray-800">
                - {testimonial.name}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center  space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;