"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/firebase_config';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductPage: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    name: "",
  });
  const [notifications, setNotifications] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product));
        console.log(productList)
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setNotifications({
      ...notifications,
      [product.id]: "Item added"
    });

    setTimeout(() => {
      setNotifications(prevNotifications => ({
        ...prevNotifications,
        [product.id]: null
      }));
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCartModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await makePayment();
  };

  const makePayment = async () => {
    const UAT_PAY_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

    let data = {
        name: formData.name,
        amount: totalAmount,
        phone: formData.phone,
        MID: 'MID' + Date.now(),
        transactionId: 'T' + Date.now()
      }
  
      try {
        const response = await fetch(UAT_PAY_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          referrerPolicy: "unsafe-url"
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log(result);
  
        if (result.success === true) {
          window.location.href = result.data.instrumentResponse.redirectInfo.url;
        }
      } catch (error) {
        console.error("Payment error:", error);
      }
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = () => {
    handleCloseModal();
    setIsModalOpen(true);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <header className="relative flex items-center mb-8 py-10">
          <div className="flex-grow text-center">
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white">Favome Products</h1>
          </div>
          <button
            onClick={() => setIsCartModalOpen(true)}
            className="absolute right-0 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            <span className="hidden sm:inline">View Cart</span>
            <span className="inline sm:hidden">Cart</span>
          </button>
        </header>

        <p className="mb-4 text-lg text-neutral-400 text-center">
          Discover our exclusive range of products. Each item is crafted with quality and care to meet your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative bg-white shadow-md rounded-lg overflow-hidden w-full">
              {notifications[product.id] && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-10">
                  {notifications[product.id]}
                </div>
              )}
              
              <div className="h-48 w-full overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-base text-gray-700 mb-4">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-4">MRP: ₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Modal */}
        {isCartModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Cart</h2>
              <div className="mb-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-700">Your cart is empty.</p>
                ) : (
                  <ul>
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center mb-4">
                        <span className='text-black'>{item.name}</span>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold text-black">Total:</span>
                <span className="font-bold text-black">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Details</h2>
              <h3 className="text-xl font-bold text-gray-800 mb-6">After successful payment you will receive resources in the provided email</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded text-black"
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
                    className="w-full border border-gray-300 p-2 rounded text-black"
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
                    className="w-full border border-gray-300 p-2 rounded text-black"
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
                    className="w-full border border-gray-300 p-2 rounded text-black"
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