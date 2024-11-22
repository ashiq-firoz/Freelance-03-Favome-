"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "../firebase/firebase_config";
import { collection, getDocs, query, where, addDoc, orderBy, limit, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [logourl, setLogoUrl] = useState(String(" "));
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "Not Applicable",
    companyAddress: "",
    mobile: "",
    whatsapp: "",
    googleProfileLink: "Not Applicable",
    companyEmail: "",
    areaManager: "Not Applicable",
    remarks: "",
    product: "",
    Panchayath_Corporation_Municipality: "Not Applicable",
    haveHappyFamilyCard: "no",
    happyFamilyCardNumber: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [notifications, setNotifications] = useState<{
    [key: string]: string | null;
  }>({});
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const areaManagers = [
    "Choose one",
    "3125 ANOOJ",
    "3127 DRISHYA",
    "3128 MANJU",
    "3131 PRASEETHA.KT",
    "3133 RATHEESH.V",
    "3135 SENIYA.NP",
    "3137 SUDHA.KB",
    "3139 TIJIL.SR",
    "3141 SREELATHA",
    "3144 BEENA.KP",
    "3146 RENJEESH.R",
    "3147 VIJINA.P",
    "3150 BINDHU.PB",
    "3152 SMITHA .VP",
    "3154 PRINCY.PK",
    "3155 RENISHA.AC",
    "3156 RESHMI SIPSON",
    "3158 ANJANA",
    "3160 SAJANI.KK",
    "3165 LIJI",
    "3166 DEEPTHI",
    "3166 SEENA",
    "3167 REJISHA.R",
    "3169 BINDHU.KM",
    "3171 SMITHA .P",
    "F00115 THRISHNA",
    "F00116 SRUTHI",
    "F00113 SAJEESH CP",
    "3175 JUBISH K C",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Product)
        );
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const oldbill = urlParams.get("bn");
    const payid = urlParams.get("payid");
    const ordid = urlParams.get("orid");

    const updateBillStatus = async () => {
      if (oldbill) {  // Check if oldbill exists
        // const billRef = doc(db, 'bills', oldbill);

        // Alternative if you want to use where:
        const billQuery = query(collection(db, 'bills'), where('billNo', '==', oldbill));
        const billSnapshot = await getDocs(billQuery);
        const billRef = doc(db, 'bills', billSnapshot.docs[0].id);
        await updateDoc(billRef, {
          status: 'paid',
          paymentId: payid,
          orderId: ordid,
        });
      }
    };

    updateBillStatus();

    if (status === "success") {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000); // Hide after 5s
    } else if (status === "failure") {
      setShowFailure(true);
      setTimeout(() => setShowFailure(false), 5000);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, product];
      return newItems;
    });
    setNotifications({
      ...notifications,
      [product.id]: "Item added",
    });

    setTimeout(() => {
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [product.id]: null,
      }));
    }, 2000);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((_, i) => i !== index);
      return newItems;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCompanyLogo(file);
  };

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
          canvas.toBlob(
            (blob) => {
              if (blob)
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
            },
            "image/jpeg",
            0.7
          );
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

        // Upload the resized image
        await uploadBytes(logoRef, resizedLogo);

        // Generate a publicly accessible URL for the uploaded logo
        const logoUrl = await getDownloadURL(logoRef);
        setLogoUrl(logoUrl);
        console.log("Public logo URL:", logoUrl);
        return logoUrl;
      }
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await makePayment2();
    setLoading(false);
  };

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const makePayment2 = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    const UAT_PAY_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const logoUrl = await uploadLogo();

    const data = {
      ...formData,
      companyLogo: logoUrl,
      products: cartItems.map((item) => item.name).join(", "),
      amount: totalAmount,
      MID: "MID" + Date.now(),
      transactionId: "T" + Date.now(),
    };
    console.log("Form data submitted:", data);

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const response_one = await fetch(`${UAT_PAY_API_URL}/getorderid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: data.amount }),
    }).then((t) => t.json());

    console.log(response_one);
    console.log(response_one.orderid);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: Math.round(Number(data.amount)) * 100 + "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "FAVOME PVT LTD",
      description: process.env.NEXT_PUBLIC_SEVER_STATUS,
      image: process.env.NEXT_PUBLIC_LOGO_URL,
      order_id: response_one.orderid.id, // Pass the `id` obtained in the response of Step 1
      "callback_url":`${UAT_PAY_API_URL}/verifypayment?customerName=${data.customerName}&total=${data.amount}&happyFamilyCardNumber=${data.happyFamilyCardNumber}&haveHappyFamilyCard=${data.haveHappyFamilyCard}&orderId=${response_one.orderid.id}&addressLine1=${data.addressLine1}&city=${data.city}&state=${data.state}&pincode=${data.pincode}&logourl=${logourl}&product=${data.products}&mobile=${data.mobile}&companyEmail=${data.companyEmail}&whatsapp=${data.whatsapp}&googleProfileLink=${data.googleProfileLink}&areaManager=${data.areaManager}&remarks=${data.remarks}&Panchayath_Corporation_Municipality=${data.Panchayath_Corporation_Municipality}&`,
      notes: {
        email: data.companyEmail || "",
        phone: data.whatsapp,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = (window as any).Razorpay(options);
    paymentObject.open();
  };

  const makePayment = async () => {
    const UAT_PAY_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const logoUrl = await uploadLogo();
    const data = {
      ...formData,
      companyLogo: logoUrl,
      products: cartItems.map((item) => item.name).join(", "),
      amount: totalAmount,
      MID: "MID" + Date.now(),
      transactionId: "T" + Date.now(),
    };
    console.log("Form data submitted:", data);

    try {
      const response = await fetch(UAT_PAY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        referrerPolicy: "unsafe-url",
      });

      if (!response.ok) {
        throw new Error("HTTP error! status: ${response.status}");
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

  const handleProceedToCheckout = () => {
    setIsModalOpen(true);
    setIsCartModalOpen(false);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const hasBizBooster = cartItems.some(
    (item) => item.name === "Favome NFC Biz Booster"
  );
  const hasTesting = cartItems.some(
    (item) => item.name === "PAC Beauty Max Makeup Kit"
  );

  return (
    <div className="bg-gray-900 min-h-screen py-24 px-4 sm:px-6 lg:px-8 relative">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg flex items-center max-w-md">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Payment Successful! Thank you for your purchase.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto pl-3"
            >
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showFailure && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg flex items-center max-w-md">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Payment Failed. Please try again or contact support.
              </p>
            </div>
            <button
              onClick={() => setShowFailure(false)}
              className="ml-auto pl-3"
            >
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto">
        <header className="relative flex items-center mb-8 py-10">
          <div className="flex-grow text-center">
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
              Favome Products
            </h1>
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
          Discover our exclusive range of products. Each item is crafted with
          quality and care to meet your needs.
        </p>
      </div>
      {/* Product listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden w-full"
          >
            {notifications[product.id] && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-10">
                {notifications[product.id]}
              </div>
            )}

            <div className="h-48 w-full overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-base text-gray-700 mb-4">
                {product.description}
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                MRP: ₹{product.price}
              </p>
              <a href={`/product?product=${product.name}`} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Buy</a>
{/*               
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button> */}
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
                    <li
                      key={index}
                      className="flex justify-between items-center mb-4"
                    >
                      <span className="text-black">{item.name}</span>
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
                onClick={() => setIsCartModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 my-6 h-[90vh] flex flex-col">
            {/* Fixed Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                Enter Your Details
              </h2>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="customerName"
                    className="block text-black font-medium"
                  >
                    Customer Name
                  </label>
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
                    <label
                      htmlFor="companyName"
                      className="block text-black font-medium"
                    >
                      Company Name
                    </label>
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
                    <label
                      htmlFor="addressLine1"
                      className="block text-black font-medium"
                    >
                      Address Line 1
                    </label>
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
                      <label
                        htmlFor="city"
                        className="block text-black font-medium"
                      >
                        City
                      </label>
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
                      <label
                        htmlFor="state"
                        className="block text-black font-medium"
                      >
                        State
                      </label>
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
                    <label
                      htmlFor="pincode"
                      className="block text-black font-medium"
                    >
                      PIN Code
                    </label>
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
                  <label
                    htmlFor="mobile"
                    className="block text-black font-medium"
                  >
                    Mobile Number
                  </label>
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
                  <label
                    htmlFor="whatsapp"
                    className="block text-black font-medium"
                  >
                    WhatsApp Number
                  </label>
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
                    <label
                      htmlFor="googleProfileLink"
                      className="block text-black font-medium"
                    >
                      Google Profile Link
                    </label>
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
                  <label
                    htmlFor="companyEmail"
                    className="block text-black font-medium"
                  >
                    {hasBizBooster ? "Company Email" : "Email"}
                  </label>
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
                    <label
                      htmlFor="areaManager"
                      className="block text-black font-medium"
                    >
                      Favome Area Manager Trainee
                    </label>
                    <select
                      id="areaManager"
                      name="areaManager"
                      className="w-full p-2 border rounded text-black"
                      onChange={handleInputChange}
                      required
                    >
                      {areaManagers.map((manager) => (
                        <option key={manager} value={manager}>
                          {manager}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="remarks"
                    className="block text-black font-medium"
                  >
                    Remarks
                  </label>
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
                    <label
                      htmlFor="fileUpload"
                      className="block text-black font-medium"
                    >
                      Upload Logo Image
                    </label>
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
                    <label
                      htmlFor="Panchayath_Corporation_Municipality"
                      className="block text-black font-medium"
                    >
                      Panchayath/Corporation/Municipality
                    </label>
                    <input
                      type="text"
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
                            checked={formData.haveHappyFamilyCard === "yes"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                haveHappyFamilyCard: e.target.value,
                                happyFamilyCardNumber: "", // Reset card number when switching to yes
                              })
                            }
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2 text-black">Yes</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="haveHappyFamilyCard"
                            value="no"
                            checked={formData.haveHappyFamilyCard === "no"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                haveHappyFamilyCard: e.target.value,
                                happyFamilyCardNumber: "", // Clear card number when selecting no
                              })
                            }
                            className="form-radio text-blue-600"
                          />
                          <span className="ml-2 text-black">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.haveHappyFamilyCard === "yes" && (
                      <div className="space-y-2">
                        <label
                          htmlFor="happyFamilyCardNumber"
                          className="block text-black font-medium"
                        >
                          Happy Family Card Number
                        </label>
                        <input
                          type="text"
                          id="happyFamilyCardNumber"
                          name="happyFamilyCardNumber"
                          value={formData.happyFamilyCardNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded text-black"
                          required={formData.haveHappyFamilyCard === "yes"}
                          placeholder="Enter your card number"
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
                  className={`flex-1 py-2 px-4 rounded transition-colors ${
                    loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? "Securing connection..." : "Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
