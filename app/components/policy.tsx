import React from 'react';

const PolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="mt-4 text-lg text-neutral-400">
            <strong>Favome Private Limited</strong> respects your privacy and is committed to protecting the personally identifiable information you share with us. This includes information by which you can be identified, such as your name, address, and telephone number. We adhere to strict standards to ensure the protection of your privacy on our websites and applications.
          </p>
        </header>
        
        <section className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Information Collection and Use</h2>
          <p className="text-base text-gray-700 mb-4">
            Generally, you can visit our website, <a href="https://www.favome.com" className="text-blue-600 hover:underline">www.favome.com</a>, without revealing any personal information. We may track the Internet address of the domains from which users visit us and analyze this data for trends and statistics, but individual users remain anonymous.
          </p>
          <p className="text-base text-gray-700 mb-4">
            There are occasions when we need to collect personal information from you, such as your name, physical address, or telephone number. We will inform you before we collect this information and explain how it will be used. You can choose not to provide the requested information, but this may limit your access to certain options, offers, and services.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Protection</h2>
          <p className="text-base text-gray-700 mb-4">
            Favome Private Limited takes appropriate steps to protect the information you share with us. We have implemented technology and security features, along with strict policy guidelines, to safeguard your personally identifiable information from unauthorized access and misuse. We will continue to enhance our security procedures as new technology becomes available.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Policy Updates</h2>
          <p className="text-base text-gray-700 mb-4">
            If our privacy policy changes in the future, the updated policy will be posted on our website with a new effective date. We encourage you to review our privacy policy regularly to stay informed about our current practices.
          </p>
          <p className="text-base text-gray-700 mb-4">
            For any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:info@favome.com" className="text-blue-600 hover:underline">info@favome.com</a>. We will aim to respond to all reasonable inquiries within five business days.
          </p>
          <p className="text-base text-gray-700">
            Thank you for using <a href="https://www.favome.com" className="text-blue-600 hover:underline">www.favome.com</a>!
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolicyPage;
