"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { storage, db } from '../firebase/firebase_config';
import { useAuth } from '../firebase/useAuth';
import { Menu, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const DashboardWithProducts: React.FC = () => {
  const { user, loading, router } = useAuth();
  const [isTableView, setIsTableView] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      fetchProducts();
    }
  }, [user, loading, router]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList: Product[] = [];
      querySnapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) });
      });
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          }, file.type);
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (!product.image) {
        throw new Error('Please select an image');
      }

      const resizedImage = await resizeImage(product.image);
      const storageRef = ref(storage, `products/${Date.now()}_${product.image.name}`);
      await uploadBytes(storageRef, resizedImage);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'products'), {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        imageUrl,
        userId: user.uid,
      });

      setMessage('Product added successfully!');
      setProduct({ name: '', description: '', price: '', image: null });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsTableView(!isTableView);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-500">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <button onClick={toggleSidebar} className="md:hidden absolute right-2 top-2 text-white">
          <X size={24} />
        </button>
        <nav>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700" onClick={toggleView}>
            {isTableView ? 'Add Product' : 'View Orders'}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-gray-800 shadow-md py-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu size={24} />
            </button>
            {/* <h1 className="text-xl font-semibold">Product Dashboard</h1> */}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          {isTableView ? (
           <div className="w-full overflow-hidden rounded-lg shadow-xs">
           <div className="w-full overflow-x-auto">
             <iframe 
               src="https://docs.google.com/spreadsheets/d/1xvUgUdtpQkw28anhtKqSbqFWLzgWXa0Q9a9HwtkcNso/edit?usp=sharing"
               className="w-full h-[70vh] border-0"
               title="Product List"
             ></iframe>
           </div>
         </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-gray-800 py-4">
              <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-black">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-1 font-medium text-black">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    required
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    rows={4}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="price" className="block mb-1 font-medium text-black">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-1 font-medium text-black">Product Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    required
                    accept="image/*"
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
                >
                  {isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
              </form>
              {message && (
                <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardWithProducts;