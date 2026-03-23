import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import { FiSearch, FiDollarSign, FiTag, FiX, FiFilter } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {
  setSearchQuery,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
  setKeyword,
  resetFilters,
} from "../../Store/Slices/FilterSlice";

interface Product {
  category: string;
}

export const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  
  const keywords = [
  "groceries", "Laptop", "Smartphones", "Dior", "Cooking", "watches",
];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      transition: {
        duration: 0.2,
        ease: easeInOut
      }
    },
    tap: { scale: 0.98 }
  };

  const keywordHoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0, 0, 0, 1)",
      transition: {
        duration: 0.2,
        ease: easeInOut
      }
    },
    tap: { scale: 0.95 }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      borderColor: "rgba(0, 0, 0, 0.5)",
      boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
        ease: easeOut
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract unique categories from the products array
        const uniqueCategories = Array.from(
          new Set(data.products.map((product: Product) => product.category))
        ) as string[];
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products', error);
        // Fallback categories in case API fails
        setCategories([
          "smartphones",
          "laptops",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration"
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleResetFilters = () => {
    dispatch(resetFilters());
    
    // Add a little bounce animation on reset
    const button = document.getElementById('reset-button');
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleKeywordClick = (kw: string) => {
    dispatch(setKeyword(kw));
  };

  const hasActiveFilters = 
    filters.searchQuery || 
    filters.selectedCategory || 
    filters.minPrice !== undefined || 
    filters.maxPrice !== undefined || 
    filters.keyword;

  return (
    <motion.div 
      className="w-60 p-4 mt-10 h-screen sticky top-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with toggle */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-xl font-bold flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <FiFilter className="text-lg" />
          Filters
        </motion.h2>
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX className="text-lg" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <motion.section 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            {/* Search Input */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-2 flex items-center gap-2 text-gray-700"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiSearch className="text-base" />
                Search Products
              </motion.h3>
              <motion.div
                whileFocus="focus"
                variants={inputFocusVariants}
              >
                <input 
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="border rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  placeholder="What are you looking for?" 
                />
              </motion.div>
            </motion.div>

            {/* Price Range */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-2 flex items-center gap-2 text-gray-700"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiDollarSign className="text-base" />
                Price Range
              </motion.h3>
              <div className="flex gap-3">
                <motion.div
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  className="flex-1"
                >
                  <input
                    type="number"
                    value={filters.minPrice || ""}
                    onChange={(e) => dispatch(setMinPrice(e.target.value ? Number(e.target.value) : undefined))}
                    className="border rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    placeholder="Min $" 
                  />
                </motion.div>
                <motion.div
                  whileFocus="focus"
                  variants={inputFocusVariants}
                  className="flex-1"
                >
                  <input
                    type="number"
                    value={filters.maxPrice || ""}
                    onChange={(e) => dispatch(setMaxPrice(e.target.value ? Number(e.target.value) : undefined))}
                    className="border rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    placeholder="Max $" 
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-2 flex items-center gap-2 text-gray-700"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FiTag className="text-base" />
                Categories
                {filters.selectedCategory && (
                  <motion.span 
                    className="bg-black text-white text-xs px-2 py-1 rounded-full ml-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    1
                  </motion.span>
                )}
              </motion.h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                <AnimatePresence>
                  {isLoading ? (
                    // Loading skeleton
                    [...Array(4)].map((_, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-4 h-4 bg-gray-200 rounded mr-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                      </motion.div>
                    ))
                  ) : (
                    categories.map((category, index) => (
                      <motion.label 
                        key={category} 
                        className="flex items-center py-2 cursor-pointer group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.input 
                          type="radio"
                          name="category"
                          value={category}
                          checked={filters.selectedCategory === category}
                          onChange={() => handleCategoryChange(category)}
                          className="mr-3 w-4 h-4 text-black focus:ring-black"
                          whileFocus={{ scale: 1.1 }}
                        />
                        <span className="capitalize text-sm group-hover:text-black transition-colors">
                          {category}
                        </span>
                        {filters.selectedCategory === category && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-black rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </motion.label>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Keywords */}
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-2 flex items-center gap-2 text-gray-700"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Popular Keywords
                {filters.keyword && (
                  <motion.span 
                    className="bg-black text-white text-xs px-2 py-1 rounded-full ml-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Active
                  </motion.span>
                )}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {keywords.map((kw, index) => (
                    <motion.button 
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={`px-2 py-2 text-sm border rounded-full transition-all font-medium ${
                        filters.keyword === kw 
                          ? 'bg-black text-white border-black shadow-lg' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                      }`}
                      variants={keywordHoverVariants}
                      whileHover="hover"
                      whileTap="tap"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      {kw}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.button 
                  id="reset-button"
                  onClick={handleResetFilters}
                  className="w-full py-3 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2"
                  variants={buttonHoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiX className="text-base" />
                  Reset All Filters
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Collapsed State */}
      {!isVisible && (
        <motion.button
          onClick={() => setIsVisible(true)}
          className="w-full py-3 bg-gray-100 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiFilter className="text-base" />
          Show Filters
        </motion.button>
      )}
    </motion.div>
  );
};