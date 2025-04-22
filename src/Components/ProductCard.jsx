import { useState } from 'react';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product, onDelete, onEdit, onAdd }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <PencilIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {isEditing ? (
          // Edit Form
          <div className="space-y-3">
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({...editedProduct, price: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Display Mode
          <>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="mt-1 text-gray-600">${product.price}</p>
            <button
              onClick={() => onAdd(product)}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;