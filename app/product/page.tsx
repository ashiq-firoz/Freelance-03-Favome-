"use client";
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase/firebase_config';
import { collection, getDocs, query, where, addDoc, orderBy, limit, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  mrp : number;
  discount:number;
}

const SingleProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logourl, setLogoUrl] = useState(String(" "));
  const [hasBizBooster,setBizbooster] = useState(Boolean(false));
  const [hasTesting, setPac] = useState(Boolean(false))
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    companyName: 'Not Applicable',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '',
    whatsapp: '',
    googleProfileLink: 'Not Applicable',
    companyEmail: '',
    areaManager: 'Not Applicable',
    remarks: '',
    product: "",
    Panchayath_Corporation_Municipality:'Not Applicable',
    haveHappyFamilyCard: 'no',
    happyFamilyCardNumber: '',
  });

  const areaManagers = [
    "Choose one",
    "3125 ANOOJ", "3127 DRISHYA", "3128 MANJU", "3131 PRASEETHA.KT",
    "3133 RATHEESH.V", "3135 SENIYA.NP", "3137 SUDHA.KB", "3139 TIJIL.SR",
    "3141 SREELATHA", "3144 BEENA.KP", "3146 RENJEESH.R", "3147 VIJINA.P",
    "3150 BINDHU.PB", "3152 SMITHA .VP", "3154 PRINCY.PK", "3155 RENISHA.AC",
    "3156 RESHMI SIPSON", "3158 ANJANA", "3160 SAJANI.KK", "3165 LIJI",
    "3166 DEEPTHI", "3166 SEENA", "3167 REJISHA.R", "3169 BINDHU.KM",
    "3171 SMITHA .P", "F00115 THRISHNA", "F00116 SRUTHI", "F00113 SAJEESH CP",
    "3175 JUBISH K C"
  ];
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get product name from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');

        if (!productName) return;

        const productsCollection = collection(db, 'products');
        const q = query(productsCollection, where("name", "==", productName));
        const productSnapshot = await getDocs(q);
        
        if (!productSnapshot.empty) {
          const productData = {
            id: productSnapshot.docs[0].id,
            ...productSnapshot.docs[0].data()
          } as Product;
          setBizbooster((productName === "Favome NFC Biz Booster"));
          setPac((productName === "PAC Beauty Max Makeup Kit"));
          console.log(hasBizBooster)
          console.log(productName)
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  // Reuse the same helper functions from Products2.tsx
  const resizeImage = (file: File, maxWidth = 300, maxHeight = 300) => {
    return new Promise<File | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
          canvas.toBlob((blob) => {
            if (blob) resolve(new File([blob], file.name, { type: "image/jpeg" }));
          }, "image/jpeg", 0.7);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadLogo = async () => {
    if (companyLogo) {
      const resizedLogo = await resizeImage(companyLogo);
      if (resizedLogo) {
        const uniqueLogoName = `logos/${Date.now()}_${companyLogo.name}`;
        const logoRef = ref(storage, uniqueLogoName);
        await uploadBytes(logoRef, resizedLogo);
        const logoUrl = await getDownloadURL(logoRef);
        setLogoUrl(logoUrl);
        return logoUrl;
      }
    }
    return "";
  };

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const createBill = async (data: any) => {
    try {
      const billsCollection = collection(db, 'bills');
      
      // Get current bill count
      const countQuery = query(billsCollection, orderBy('billNo', 'desc'), limit(1));
      const countSnap = await getDocs(countQuery);
      const lastBill = countSnap.docs[0]?.data();
      const nextBillCount = lastBill ? parseInt(lastBill.billNo.split('-')[1]) + 1 : 1;
      
      const billNo = `BILL-${nextBillCount.toString().padStart(4, '0')}`;
      
      const shippingAddress = `${formData.addressLine1}<br>${formData.city}, ${formData.state}<br>${formData.pincode}`;
      
      const billData = {
        billNo,
        name:formData.customerName,
        areaManager: formData.areaManager,
        products: product?.name,
        shippingAddress,
        totalCost: product?.price,
        invoiceDate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: '2-digit'
        }),
        status: 'pending',
        items: [{
          name: product?.name,
          price: product?.price,
          discount:product?.discount,
          mrp: product?.mrp,
          quantity: 1
        }],
      };
  
      const billRef = await addDoc(billsCollection, billData);
      return {"id": billRef.id,"no":billNo};
    } catch (error) {
      console.error('Error creating bill:', error);
      throw error;
    }
  };

  const makePayment2 = async (billId: string,billno:String) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    const UAT_PAY_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const logoUrl = await uploadLogo();
    console.log(billno)
    const data = {
      ...formData,
      companyLogo: logoUrl,
      products: product?.name,
      amount: product?.price,
      MID: 'MID' + Date.now(),
      transactionId: 'T' + Date.now()
    };

    if (!res) {
      alert('Razorpay failed to load!!')
      return 
    }

    const response_one = await fetch(`${UAT_PAY_API_URL}/getorderid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: data.amount })
    }).then((t) => t.json());

    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      "amount": Math.round(Number(data.amount)) * 100 + "",
      "currency": "INR",
      "name": "FAVOME PVT LTD",
      "description": process.env.NEXT_PUBLIC_SEVER_STATUS,
      "image": process.env.NEXT_PUBLIC_LOGO_URL,
      "order_id": response_one.orderid.id,
      "callback_url":`${UAT_PAY_API_URL}/verifypayment?customerName=${data.customerName}&discount=${product?.discount}&mrp=${product?.mrp}&total=${data.amount}&billno=${billno}&happyFamilyCardNumber=${data.happyFamilyCardNumber}&haveHappyFamilyCard=${data.haveHappyFamilyCard}&orderId=${response_one.orderid.id}&addressLine1=${data.addressLine1}&city=${data.city}&state=${data.state}&pincode=${data.pincode}&logourl=${logourl}&product=${data.products}&mobile=${data.mobile}&companyEmail=${data.companyEmail}&whatsapp=${data.whatsapp}&googleProfileLink=${data.googleProfileLink}&areaManager=${data.areaManager}&remarks=${data.remarks}&Panchayath_Corporation_Municipality=${data.Panchayath_Corporation_Municipality}&`,
      "notes": {
        "email": data.companyEmail || "",
        "phone": data.whatsapp,
      },
      "theme": {
        "color": "#3399cc"
      },
    };
    
    const paymentObject = (window as any).Razorpay(options)
    paymentObject.open();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let bill = await createBill(formData);
      await makePayment2(bill.id,bill.no);
    } catch (error) {
      console.error('Error in submission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCompanyLogo(file);
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
        <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reuse the same modal from Products2.tsx */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-full max-w-md mx-4 my-6 h-[90vh] flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div className="space-y-2">
            <label htmlFor="customerName" className="block text-black font-medium">Customer Name</label>
            <input 
              type="text"
              id="customerName"
              name="customerName"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>
          {hasBizBooster && (
          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-black font-medium">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>
          )}
           
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="addressLine1" className="block text-black font-medium">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-black font-medium">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="block text-black font-medium">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
            </div>
          
            <div className="space-y-2">
              <label htmlFor="pincode" className="block text-black font-medium">PIN Code</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-black"
                maxLength={6}
              />
            </div>
          </div>
           

          <div className="space-y-2">
            <label htmlFor="mobile" className="block text-black font-medium">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="whatsapp" className="block text-black font-medium">WhatsApp Number</label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>
           
          {hasBizBooster && (
          <div className="space-y-2">
            <label htmlFor="googleProfileLink" className="block text-black font-medium">Google Profile Link</label>
            <input
              type="url"
              id="googleProfileLink"
              name="googleProfileLink"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>
          )}

          <div className="space-y-2">
            <label htmlFor="companyEmail" className="block text-black font-medium">{hasBizBooster?"Company Email":"Email"}</label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="space-y-2">
            <label htmlFor="sizeAndQuantity" className="block text-black font-medium">Size and Quantity per Color</label>
            <textarea
              id="sizeAndQuantity"
              name="sizeAndQuantity"
              className="w-full p-2 border rounded text-black h-24"
              onChange={handleInputChange}
            />
          </div> */}


{hasBizBooster && (
          <div className="space-y-2">
            <label htmlFor="areaManager" className="block text-black font-medium">Favome Area Manager Trainee</label>
            <select
              id="areaManager"
              name="areaManager"
              className="w-full p-2 border rounded text-black"
              onChange={handleInputChange}
              required
            >
              {areaManagers.map(manager => (
                <option key={manager} value={manager}>{manager}</option>
              ))}
            </select>
          </div>
)}

          <div className="space-y-2">
            <label htmlFor="remarks" className="block text-black font-medium">Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              className="w-full p-2 border rounded text-black h-24"
              onChange={handleInputChange}
              required
            />
          </div>

          {hasBizBooster && (
          <div className="space-y-2">
            <label htmlFor="fileUpload" className="block text-black font-medium">Upload Logo Image</label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="w-full p-2 border rounded text-black"
              onChange={handleFileChange}
              required
            />
          </div>
          )}

{hasTesting && (
          <div className="space-y-2">
            <label htmlFor="Panchayath_Corporation_Municipality" className="block text-black font-medium">Panchayath/Corporation/Municipality</label>
            <input
              type='text'
              id="Panchayath_Corporation_Municipality"
              name="Panchayath_Corporation_Municipality"
              className="w-full p-2 border rounded text-black h-24"
              onChange={handleInputChange}
            />
          </div>
)}
          {!hasBizBooster && (
  <div className="space-y-4">
    <div className="space-y-2">
      <label className="block text-black font-medium">
        Do you have a Favome Happy Family Card?
      </label>
      <div className="flex gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="haveHappyFamilyCard"
            value="yes"
            checked={formData.haveHappyFamilyCard === 'yes'}
            onChange={(e) => setFormData({
              ...formData,
              haveHappyFamilyCard: e.target.value,
              happyFamilyCardNumber: '' // Reset when changing to yes
            })}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-black">Yes</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="haveHappyFamilyCard"
            value="no"
            checked={formData.haveHappyFamilyCard === 'no'}
            onChange={(e) => setFormData({
              ...formData,
              haveHappyFamilyCard: e.target.value,
              happyFamilyCardNumber: ''
            })}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 text-black">No</span>
        </label>
      </div>
    </div>

    {formData.haveHappyFamilyCard === 'yes' && (
      <div className="space-y-2">
        <label htmlFor="happyFamilyCardNumber" className="block text-black font-medium">
          Happy Family Card Number
        </label>
        <input
          type="text"
          id="happyFamilyCardNumber"
          name="happyFamilyCardNumber"
          value={formData.happyFamilyCardNumber}
          onChange={handleInputChange}
          className="w-full p-2 border rounded text-black"
          placeholder="Enter card number"
          required
        />
      </div>
    )}
  </div>
)}
          </form>
      </div>

      {/* Fixed Footer with Buttons */}
      <div className="p-6 border-t bg-white">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={`flex-1 py-2 px-4 rounded transition-colors ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700' }`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Securing connection...' : 'Pay'}
          </button>
        </div>
      </div>
    </div>
  </div>
      )}
    </div>
  );
};

export default SingleProductPage;