import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-neutral-400">
            These terms and conditions outline the rules and regulations for the use of our website, located at <a href="https://www.favome.com" className="text-blue-600 hover:underline">https://www.favome.com</a> (the “Site”).
          </p>
        </header>
        
        <section className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">License to Use the Site</h2>
          <p className="text-base text-gray-700 mb-4">
            Unless otherwise stated, Favome Private Limited and/or its licensors own the intellectual property rights for all material on the Site. All intellectual property rights are reserved. You may view and/or print pages from <a href="https://www.favome.com" className="text-blue-600 hover:underline">https://www.favome.com</a> for your own personal use subject to restrictions set in these terms and conditions.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Restrictions</h2>
          <ul className="list-disc list-inside ml-4 text-base text-gray-700 mb-4">
            <li className="mb-2">Publishing any website material in any other media.</li>
            <li className="mb-2">Selling, sublicensing, and/or otherwise commercializing any website material.</li>
            <li className="mb-2">Using this website in any way that is or may be damaging to this website.</li>
            <li className="mb-2">Using this website in any way that impacts user access to this website.</li>
            <li className="mb-2">Using this website contrary to applicable laws and regulations, or in any way that may cause harm to the website, or to any person or business entity.</li>
            <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this website.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Content</h2>
          <p className="text-base text-gray-700 mb-4">
            In these terms and conditions, “Your Content” shall mean any audio, video, text, images, or other material you choose to display on this website. By displaying Your Content, you grant Favome Private Limited a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Limitation of Liability</h2>
          <p className="text-base text-gray-700 mb-4">
            In no event shall Favome Private Limited, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Indemnification</h2>
          <p className="text-base text-gray-700 mb-4">
            You hereby indemnify to the fullest extent Favome Private Limited from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Severability</h2>
          <p className="text-base text-gray-700 mb-4">
            If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Variation of Terms</h2>
          <p className="text-base text-gray-700 mb-4">
            Favome Private Limited is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms regularly.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Assignment</h2>
          <p className="text-base text-gray-700 mb-4">
            Favome Private Limited is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Entire Agreement</h2>
          <p className="text-base text-gray-700 mb-4">
            These terms constitute the entire agreement between Favome Private Limited and you in relation to your use of this website and supersede all prior agreements and understandings.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Governing Law & Jurisdiction</h2>
          <p className="text-base text-gray-700 mb-4">
            These terms will be governed by and interpreted in accordance with the laws of Kerala, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Kerala for the resolution of any disputes.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-base text-gray-700">
            If you have any questions about these terms and conditions, please contact us at:
          </p>
          <p className="text-base text-gray-700 mb-4">
            Email: <a href="mailto:info@favome.com" className="text-blue-600 hover:underline">info@favome.com</a>
          </p>
          <p className="text-base text-gray-700">
            Website: <a href="https://www.favome.com" className="text-blue-600 hover:underline">https://www.favome.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
