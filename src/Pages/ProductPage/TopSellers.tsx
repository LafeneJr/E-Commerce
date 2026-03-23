import { useState, useEffect } from 'react';
import { FiStar, FiTrendingUp, FiUsers, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Seller {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

export const TopSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sellers from DummyJSON API using fetch
  const fetchSellers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://dummyjson.com/users?limit=20');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSellers(data.users);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sellers';
      setError(errorMessage);
      console.error('Error fetching sellers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // Generate random sales data for demonstration
  const getRandomSales = () => Math.floor(Math.random() * 1000) + 100;
  
  // Generate random rating between 3.0 and 5.0
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  // Calculate total sales for ranking
  const sellersWithSales = sellers.map(seller => ({
    ...seller,
    sales: getRandomSales(),
    rating: parseFloat(getRandomRating())
  })).sort((a, b) => b.sales - a.sales); // Sort by sales descending

  if (loading) {
    return (
      <motion.div 
        className="bg-white shadow-lg rounded-xl p-6 h-[400px] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-2 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded w-8 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-white shadow-lg rounded-xl p-6 h-[400px] overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
            <FiTrendingUp className="text-red-500 text-2xl" />
            Top Sellers
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            This Week
          </span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Sellers</h3>
          <p className="text-gray-600 text-sm mb-6 max-w-xs">{error}</p>
          <motion.button 
            onClick={fetchSellers}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw className="text-sm" />
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (sellers.length === 0) {
    return (
      <motion.div 
        className="bg-white shadow-lg rounded-xl p-6 h-[400px] overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
            <FiUsers className="text-blue-500 text-2xl" />
            Top Sellers
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            This Week
          </span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Sellers Available</h3>
          <p className="text-gray-600 text-sm mb-4">Check back later for top sellers</p>
          <motion.button 
            onClick={fetchSellers}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw className="text-sm" />
            Refresh
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-xl p-6 h-[400px] overflow-hidden flex flex-col border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FiTrendingUp className="text-green-500 text-2xl" />
          <h2 className="text-xl font-bold text-gray-800">Top Sellers</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            This Week
          </span>
          <motion.button 
            onClick={fetchSellers}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            title="Refresh sellers"
          >
            <FiRefreshCw className="text-sm" />
          </motion.button>
        </div>
      </div>
      
      {/* Sellers List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {sellersWithSales.slice(0, 8).map((seller, index) => (
          <motion.div 
            key={seller.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              x: 5,
              backgroundColor: "rgba(249, 250, 251, 1)",
              transition: { duration: 0.2 }
            }}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              {/* Rank Badge */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                index === 0 ? 'bg-yellow-500 shadow-lg' : 
                index === 1 ? 'bg-gray-400 shadow-md' : 
                index === 2 ? 'bg-orange-500 shadow-md' : 'bg-blue-500'
              } group-hover:scale-110 transition-transform`}>
                #{index + 1}
              </div>
              
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold text-white text-sm shadow-md overflow-hidden">
                {seller.image ? (
                  <img 
                    src={seller.image} 
                    alt={`${seller.firstName} ${seller.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  `${seller.firstName[0]}${seller.lastName[0]}`
                )}
              </div>
              
              {/* Seller Info */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-black transition-colors">
                  {seller.firstName} {seller.lastName}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 truncate">@{seller.username}</span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center space-x-1">
                    <FiStar className="text-yellow-500 text-xs"/>
                    <span className="text-xs text-gray-600 font-medium">{seller.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sales Info */}
            <div className="text-right">
              <p className="font-bold text-green-600 text-sm group-hover:text-green-700 transition-colors">
                ${seller.sales.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-medium">Sales</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {Math.min(sellersWithSales.length, 8)} of {sellers.length} sellers
          </span>
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            View All
          </button>
        </div>
      </div>
    </motion.div>
  );
};