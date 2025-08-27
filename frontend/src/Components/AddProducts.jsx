import React from "react";
import { useProductStore } from "../Store/useProductStore";

const AddProducts = () => {
    const { addProduct,setFormData, formData } = useProductStore();

  return (
    <>
      {/* Modal */}
      <dialog id="product_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Product</h3>

          {/* Form inside modal */}
          <form
  className="flex flex-col gap-3"
  onSubmit={(e) => {
    e.preventDefault();
    addProduct(); // call zustand action
  }}
>
  <input
    type="text"
    placeholder="Product Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="input input-bordered w-full"
  />
  <input
    type="number"
    placeholder="Price"
    value={formData.price}
    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
    className="input input-bordered w-full"
  />
  <input
    type="text"
    placeholder="Image URL"
    value={formData.image}
    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
    className="input input-bordered w-full"
  />

  <div className="flex justify-end gap-2 mt-4">
    <button className="btn btn-primary" type="submit" onClick={addProduct}>
      Add
    </button>
    <button
      className="btn btn-outline"
      type="button"
      onClick={() => document.getElementById("product_modal").close()}
    >
      Close
    </button>
  </div>
</form>

        </div>
      </dialog>
    </>
  );
};

export default AddProducts;
