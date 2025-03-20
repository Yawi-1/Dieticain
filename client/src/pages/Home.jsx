import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import HeroImage from "../../public/HomeImage.jpg";
import { Link } from "react-router-dom";
import HomeServiceCard from "../components/Home/HomeServiceCard";
import FAQAccordion from "../components/Services/FAQAccordion ";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const services = [
    {
      title: "Personalized Meal Plans",
      description:
        "Customized nutrition plans tailored to your unique dietary needs and health goals.",
      image:
        "https://images.unsplash.com/photo-1543363136-3fdb62e11be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/services/meal-plans",
    },
    {
      title: "Weight Management",
      description:
        "Sustainable strategies for healthy weight loss or gain with expert guidance.",
      image:
        "https://images.unsplash.com/photo-1543363136-3fdb62e11be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/services/weight-management",
    },
    {
      title: "Sports Nutrition",
      description:
        "Optimize your athletic performance with science-backed nutrition strategies.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      link: "/services/sports-nutrition",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "NutriCare completely transformed my eating habits! Thanks to their expert guidance, I feel healthier and more energetic than ever.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Smith",
      feedback:
        "I struggled with weight loss for years. NutriCare’s diet plan made it so easy and effective. I highly recommend them!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative z-10 text-center md:p-8 bg-black/20 rounded">
          <h1 className="text-4xl p-1 md:text-6xl lg:text-8xl text-gray-100 font-bold mb-4">
            Welcome to NutriCare
          </h1>
          <p className=" text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-bold   md:leading-normal mb-8 md:mb-12 mx-auto max-w-2xl md:max-w-3xl">
            Discover personalized nutrition plans, track your daily progress
            with our smart tools, and receive expert guidance to help you
            achieve your wellness goals - all through our intuitive health
            platform designed for every lifestyle.
          </p>
          <button className="cursor-pointer bg-orange-400 px-8 py-3 rounded-full hover:bg-white hover:text-orange-400 border-orange-400 border-2 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <HomeServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.link}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Parallox effect  */}

      <div
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
        }}
        className="relative h-96 z-10 bg-fixed"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      
      </div>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            What Our Clients Say
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-lg max-w-md text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4"
                />
                <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                <h4 className="mt-4 font-semibold text-gray-800">
                  - {testimonial.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="my-8">
        <h1 className="text-4xl text-center p-4 text-gray-800">Frequently Asked Questions</h1>
      <FAQAccordion />
      </div>
    </Layout>
  );
};

export default Homepage;
