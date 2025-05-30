// Services.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ServiceCard from "../components/Services/ServiceCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchService } from "../Redux/serviceSlice";
import { Link } from "react-router-dom";
import { Filter, X } from "lucide-react";

const Services = () => {
  const { services } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredServices, setFilteredServices] = useState(services);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);

  // Apply filters whenever criteria change
  useEffect(() => {
    let result = [...services];
    
    // Filter by price ranges if any are selected
    if (selectedRanges.length > 0) {
      result = result.filter(service => {
        return selectedRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return service.price >= min && service.price <= max;
        });
      });
    }
    
    // Apply max price filter
    result = result.filter(service => service.price <= maxPrice);
    
    setFilteredServices(result);
  }, [services, selectedRanges, maxPrice]);

  const handleRangeChange = (range) => {
    setSelectedRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
  };

  const resetFilters = () => {
    setSelectedRanges([]);
    setMaxPrice(5000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchService());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 lg:px-8">
        <div className="mx-auto">
          {/* Service Overview */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Professional Nutrition Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Achieve your health goals with our comprehensive nutrition
              services. From personalized meal planning to educational
              workshops, we offer science-backed solutions tailored to your
              unique needs.
            </p> 
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden flex justify-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              {showFilters ? "Close Filters" : "Show Filters"}
            </button>
          </div>

          <div className="flex gap-6 flex-col md:flex-row">
            {/* Filter Sidebar */}
            <div 
              className={`bg-white rounded-xl p-6 shadow-md border border-gray-200 md:w-1/4 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Filter by Price</h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Price Range Checkboxes */}
              <div className="space-y-2 mb-6">
                {[
                  { label: "₹0 - ₹500", value: "0-500" },
                  { label: "₹501 - ₹1000", value: "501-1000" },
                  { label: "₹1001 - ₹2000", value: "1001-2000" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRanges.includes(option.value)}
                      onChange={() => handleRangeChange(option.value)}
                      className="accent-blue-500"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Price Slider */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-medium">
                  Max Price: ₹<span>{maxPrice}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700">
                    No services match your filters
                  </h3>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Schedule a free 15-minute consultation to discuss your needs.
              </p>
              <Link
                to='/contact'
                className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-8 rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;