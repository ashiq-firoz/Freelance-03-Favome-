"use client";
import React, { useState } from 'react';

const ProductPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    name : "",
  });

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., proceed to payment
    console.log('Form Data:', formData);
    // Close modal after submission
    handleCloseModal();
  };

  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Our Products</h1>
          <p className="mt-4 text-lg text-neutral-400">
            Discover our exclusive range of products. Each item is crafted with quality and care to meet your needs.
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-80">
            <center>
            <img src="/img/Card.jpeg" alt="Product 1" className="h-48 w-48 object-cover" />
            </center>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">FAVOME BIZ BOOSTER</h2>
              <p className="text-base text-gray-700 mb-4">
                NFC Card for your Business
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-4">MRP: ₹999.00</p>
              <button
                onClick={handleBuyNowClick}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-80">
            <center>
            <img src="/img/Card2.jpeg" alt="Product 2" className="h-48 w-48 object-cover" />
            </center>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">FAVOME BIZ BOOSTER PLUS</h2>
              <p className="text-base text-gray-700 mb-4">
                NFC card along with Business Tech Support for an year.
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-4">MRP: ₹1499.00</p>
              <button
                onClick={handleBuyNowClick}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h2>
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
