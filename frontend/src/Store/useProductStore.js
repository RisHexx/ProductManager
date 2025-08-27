import {create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';

export const useProductStore = create((set,get) => ({
  products: [], 
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: '',
    price: '',
    image: ''
  },
  setFormData: (formData) => set({ formData }),
  resetFormData: () => set({ formData: { name: '', price: '', image: '' } }),
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(BASE_URL+'/api/products');
      set({ products: response.data.data, loading: false , error: null });
    } catch (err) {
      if(err.status === 429){
        set({ error: "Too many requests. Please try again later.", loading: false, products: [] });
      }
      set({ error: err.message, loading: false });
    }finally{
        set({loading:false});
    }
  },
  deleteProduct : async (id)=>{
    set({loading:true});
try {
    await axios.delete(`${BASE_URL}/api/products/${id}`);
    set(state => ({
      products: state.products.filter(p => p.id !== id),
      loading: false
    }));
    toast.success("Product Deleted Successfully");

} catch (error) {
    set({ error: error.message, loading: false });
    toast.error(error.message);
}    
  },
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/api/products`, get().formData);
      await get().fetchProducts();
      get().resetFormData();
      document.getElementById("product_modal").close();
      toast.success("Product Added Successfully");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }finally{
      set({loading:false});
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ currentProduct: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false,currentProduct: null });
    }finally{
      set({loading:false});
    }
  },
  updateProduct : async (id) => {
    set({ loading: true });
    try {
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, get().formData);
      set({ currentProduct: response.data.data, loading: false });
      await get().fetchProducts();
      get().resetFormData();
      toast.success("Product Updated Successfully");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }finally{
      set({loading:false});
    }
  } 
}));