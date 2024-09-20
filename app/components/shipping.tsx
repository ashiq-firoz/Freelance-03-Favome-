import React from 'react';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Shipping Policy</h1>
          <p className="mt-4 text-lg text-neutral-400">
            Welcome to Favome Private Limited&apos;s shipping policy page. We aim to provide efficient and reliable delivery of your orders.
          </p>
        </header>
        
        <section className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Methods</h2>
          <p className="text-base text-gray-700 mb-4">
            We offer standard shipping with delivery slots typically available within 24 hours of processing your order. We are committed to delivering your items as quickly as possible.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Processing Time</h2>
          <p className="text-base text-gray-700 mb-4">
            Once your order is placed, it will be processed within 1-2 business days. Processing times may vary during peak periods or holidays.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Time</h2>
          <p className="text-base text-gray-700 mb-4">
            After processing, your order will be delivered within the expected timeframe based on your chosen delivery method. You will receive a tracking number once your order has shipped so you can monitor its status.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Costs</h2>
          <p className="text-base text-gray-700 mb-4">
            Shipping costs are calculated based on the weight of the items and the delivery location. The total shipping cost will be displayed at checkout before you finalize your purchase.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">International Shipping</h2>
          <p className="text-base text-gray-700 mb-4">
            Currently, we only offer shipping within the domestic region. We are working on expanding our shipping options and will update our policy accordingly.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-base text-gray-700 mb-4">
            If you have any questions regarding our shipping policy or need assistance with your order, please contact us at:
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

export default ShippingPolicyPage;
