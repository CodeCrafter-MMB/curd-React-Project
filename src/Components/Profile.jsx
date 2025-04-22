import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically update the user profile through an API
    console.log('Profile update:', profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow">
            {/* Profile Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img
                        className="h-16 w-16 object-cover rounded-full"
                        src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}`}
                        alt={user?.name}
                      />
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Change Avatar
                      </button>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md ${
                          isEditing 
                            ? 'border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' 
                            : 'border-transparent bg-gray-50'
                        } sm:text-sm`}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md ${
                          isEditing 
                            ? 'border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' 
                            : 'border-transparent bg-gray-50'
                        } sm:text-sm`}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md ${
                          isEditing 
                            ? 'border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' 
                            : 'border-transparent bg-gray-50'
                        } sm:text-sm`}
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Shipping Address
                      </label>
                      <textarea
                        name="address"
                        id="address"
                        rows={3}
                        value={profileData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`mt-1 block w-full rounded-md ${
                          isEditing 
                            ? 'border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' 
                            : 'border-transparent bg-gray-50'
                        } sm:text-sm`}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;