import React from 'react';

const RefundReturnPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Refund Policy</h1>
          <p className="mt-4 text-lg text-neutral-400">
            Thank you for shopping at <strong>Favome Private Limited</strong>! We hope you are delighted with your purchase. However, if you are not entirely satisfied, we’re here to help.
          </p>
        </header>
        
        <section className="bg-white shadow-md rounded-lg p-8">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Returns</h2>
          <p className="text-base text-gray-700 mb-4">
            We have a 2-day return policy, which means you can return a received product within 2 days from the date of receipt. The item must be in its original condition and packaging to be eligible for return.
          </p> */}

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Refunds</h2>
          
          <p className="text-base text-gray-700 mb-4">
          If we accept your refunds , then we will process the refunds within 7 days to the original mode of payment
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-base text-gray-700 mb-4">
            If you have any questions on how to return your item to us, please contact us at:
          </p>
          <p className="text-base text-gray-700 mb-4">
            Email: <a href="mailto:info@favome.com" className="text-blue-600 hover:underline">info@favome.com</a>
          </p>
          <p className="text-base text-gray-700">
            Visit our website: <a href="https://www.favome.com" className="text-blue-600 hover:underline">https://www.favome.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundReturnPolicyPage;
