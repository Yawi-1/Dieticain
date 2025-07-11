import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchService } from "../Redux/serviceSlice";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout/Layout";
import HeroImage from "/HomeImage.jpg";
import FAQAccordion from "../components/Services/FAQAccordion ";
import HomeServiceCard from "../components/Home/HomeServiceCard";
import Testimonials from "../components/Home/Testimonials";
import Loader from "../components/Modal/Loader";

const Homepage = () => {
  const dispatch = useDispatch();
  const { services, status } = useSelector((state) => state.service);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Fetch services when component mounts
    dispatch(fetchService());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    if (services?.length > 0) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...services].sort(() => 0.5 - Math.random());
      setFeatured(shuffled.slice(0, 3));
    }
  }, [services]);

  // Show loading state while fetching services
  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              Our Services
            </h2>
            <Loader type="service-skeleton" />
          </div>
        </div>
      </Layout>
    );
  }

  // Show error state if data fetching failed
  if (status === 'failed') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load services</h2>
            <button 
              onClick={() => dispatch(fetchService())}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative md:min-h-screen h-[36rem] bg-cover bg-center bg-fixed flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative z-10 text-center md:p-8 bg-black/20 rounded">
          <h1 className="text-4xl main-text p-1 md:text-6xl lg:text-8xl text-gray-100 font-bold mb-4">
            Welcome to NutriCare
          </h1>
          <p className=" text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-bold   md:leading-normal mb-8 md:mb-12 mx-auto max-w-2xl md:max-w-3xl">
            Discover personalized nutrition plans, track your daily progress
            with our smart tools, and receive expert guidance to help you
            achieve your wellness goals - all through our intuitive health
            platform designed for every lifestyle.
          </p>
          <Link to='/bmi' className="cursor-pointer bg-orange-400 px-8 py-3 rounded-full hover:bg-white hover:text-orange-400 border-orange-400 border-2 transition-all duration-300">
            Learn More About Your Body
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.length > 0 ? (
              featured.map((service, index) => (
                <HomeServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  id={service._id}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No services available at the moment.</p>
              </div>
            )}
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
        <Testimonials />
      </section>
      <div className="my-8">
        <h1 className="text-4xl text-center p-4 text-gray-800">
          Frequently Asked Questions
        </h1>
        <FAQAccordion />
      </div>
    </Layout>
  );
};

export default Homepage;
