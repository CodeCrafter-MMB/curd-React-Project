import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

// Mock orders data - in a real app, this would come from an API
const mockOrders = [
  {
    id: '1',
    date: '2025-04-20',
    status: 'Delivered',
    total: 529.97,
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 299.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
      },
    ]
  },
  {
    id: '2',
    date: '2025-04-15',
    status: 'Processing',
    total: 79.99,
    items: [
      {
        id: 3,
        name: "Designer Backpack",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      }
    ]
  }
];

const OrderStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const Orders = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
            <p className="mt-2 text-sm text-gray-600">
              Check the status of recent orders, manage returns, and download invoices.
            </p>
          </div>

          {mockOrders.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900">No orders yet</h2>
              <p className="mt-2 text-gray-500">When you place an order, it will appear here.</p>
              <Link
                to="/products"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Order placed
                          <span className="ml-2 font-medium text-gray-900">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Order #
                          <span className="ml-2 font-medium text-gray-900">{order.id}</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <OrderStatus status={order.status} />
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="py-4 flex">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-md object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            {order.status.toLowerCase() === 'delivered' && (
                              <div className="mt-4">
                                <button className="text-sm text-blue-600 hover:text-blue-800">
                                  Write a Review
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Footer */}
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-lg font-medium text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                      {order.status.toLowerCase() === 'processing' && (
                        <button className="text-sm text-red-600 hover:text-red-800">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;