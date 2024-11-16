"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/firebase_config';
import { useAuth } from '../firebase/useAuth';
import { Menu, X, Edit3, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const DashboardWithProducts: React.FC = () => {
  const { user, loading, router } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'addProduct' | 'manageProducts'>('dashboard');
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

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
      console.error('Error fetching products:', error);
    }
  };

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
      if (!product.image && !editMode) {
        throw new Error('Please select an image');
      }

      let imageUrl = '';

      if (product.image) {
        const resizedImage = await resizeImage(product.image);
        const storageRef = ref(storage, `products/${Date.now()}_${product.image.name}`);
        await uploadBytes(storageRef, resizedImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (editMode && editProductId) {
        const productRef = doc(db, 'products', editProductId);
        await updateDoc(productRef, {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          ...(imageUrl && { imageUrl }), // Update imageUrl only if a new image is uploaded
        });
        setMessage('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          imageUrl,
          userId: user!.uid,
        });
        setMessage('Product added successfully!');
      }

      setProduct({ name: '', description: '', price: '', image: null });
      setEditMode(false);
      setEditProductId(null);
      fetchProducts();
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditMode(true);
    setEditProductId(product.id);
    setProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: null,
    });
    setSelectedView('addProduct');
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setMessage('Product deleted successfully!');
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      setMessage(`Error deleting product: ${(error as Error).message}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getButtonClass = (view: 'dashboard' | 'addProduct' | 'manageProducts') => {
    return selectedView === view ? 'bg-gray-700' : 'hover:bg-gray-700';
  };

  return (
    <div className="flex h-screen bg-gray-500">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <button onClick={toggleSidebar} className="md:hidden absolute right-2 top-2 text-white">
          <X size={24} />
        </button>
        <nav>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 ${getButtonClass('dashboard')}`}
            onClick={() => setSelectedView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 ${getButtonClass('addProduct')}`}
            onClick={() => setSelectedView('addProduct')}
          >
            Add Product
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 ${getButtonClass('manageProducts')}`}
            onClick={() => setSelectedView('manageProducts')}
          >
            Manage Products
          </button>
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
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          {selectedView === 'dashboard' && (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <iframe
                  src="https://docs.google.com/spreadsheets/d/1xvUgUdtpQkw28anhtKqSbqFWLzgWXa0Q9a9HwtkcNso/edit?usp=sharing"
                  className="w-full h-[70vh] border-0"
                  title="Product List"
                ></iframe>
              </div>
            </div>
          )}
          
          {selectedView === 'addProduct' && (
            <div className="max-w-2xl mx-auto bg-gray-800 py-4">
              <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
                {/* Product form fields */}
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
                    accept="image/*"
                    className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 disabled:opacity-50"
                >
                  {isLoading ? (editMode ? 'Updating Product...' : 'Adding Product...') : editMode ? 'Update Product' : 'Add Product'}
                </button>
              </form>
              {message && (
                <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </p>
              )}
            </div>
          )}

          {selectedView === 'manageProducts' && (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-800">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    {products.map((product) => (
                      <tr key={product.id} className="text-gray-700">
                        <td className="px-4 py-3">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.description}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">₹{product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-500 hover:underline"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:underline ml-4"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardWithProducts;