import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/pre-session':
        return 'Pre-Session Protocol';
      case '/post-session':
        return 'Post-Session Reflection';
      case '/progress':
        return 'Progress Tracker';
      case '/analysis':
        return 'Image Analysis';
      case '/knowledge':
        return 'Knowledge Base';
      case '/settings':
        return 'Settings';
      default:
        return 'AI Poker Mentor';
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        
        <div className="relative mx-4 flex-1 max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:border-blue-500 transition duration-150 ease-in-out text-sm"
            placeholder="Search for concepts, hands, or notes..."
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <Bell size={20} className="text-gray-600" />
          </button>
          
          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.email?.split('@')[0] || 'User'}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                {user?.email}
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;