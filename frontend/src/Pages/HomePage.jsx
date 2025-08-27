import React , {useEffect} from 'react'
import { useProductStore } from '../Store/useProductStore'
import Cards from '../Components/Cards'
import {toast} from 'react-hot-toast'
import AddProducts from '../Components/AddProducts'

const HomePage = () => {
  const { products, fetchProducts, loading, error } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

return (
  <div className="pt-20"> {/* add padding-top to push content below navbar */}
          <div className='flex justify-start mb-4 gap-4'>
            <button className="btn btn-outline btn-error" onClick={fetchProducts}>Refresh</button>
          <button className="btn btn-outline btn-primary" onClick={() => document.getElementById("product_modal").showModal()}>Add Products</button>
          </div>
          <AddProducts />

    {loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <span className="loading loading-infinity loading-xl"></span>
</div>

    )}
    {error && toast.error(error)}
    {products.length === 0 && !loading && (
      <div className="flex items-center justify-center">
        <p>No products found.</p>
      </div>
    )}
    <div className="flex flex-wrap gap-4 mx-auto justify-center">
      {products.map(product => (
        <Cards key={product.id} product={product} />
      ))}
    </div>
    
  </div>
);
}

export default HomePage