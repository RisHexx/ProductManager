import React,{useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../Store/useProductStore";
import { toast } from "react-hot-toast";

const ProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const {
    currentProduct,
    formData,
    setFormData,
    error,
    loading,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  useEffect( () => {
    fetchProduct(id);
  }, [id, fetchProduct]);


  useEffect(() => {
  if (currentProduct) {
    setFormData(currentProduct);
  }
}, [currentProduct]);

  return (
    <div className="pt-20 flex justify-center">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}

      {error && toast.error(error)}

        {formData && (
          <div className="flex gap-12 bg-gray-800 shadow-lg rounded-2xl p-8 w-[900px]">
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-[400px] h-[400px] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Form Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              Edit Product
            </h2>
            <form className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    updateProduct(id)
                    navigate('/')
                    
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() =>{
                    deleteProduct(id),
                    navigate('/')
                    }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
    </div>
  );
};

export default ProductPage;
