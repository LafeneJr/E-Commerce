import { useState, useEffect, useMemo } from "react"
import { FiMenu, FiChevronDown, FiShoppingCart, FiStar } from "react-icons/fi"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../Store/hooks"
import { fetchProducts } from "../../Store/Slices/ProductSlice"
import type { Product } from "../../Store/Slices/ProductSlice"
import { addToCart } from "../../Store/Slices/CartSlice";
import { resetFilters } from "../../Store/Slices/FilterSlice"

export const Products = () => {
    const dispatch = useAppDispatch()
    const { products, loading, error } = useAppSelector((state) => state.products)
    const filters = useAppSelector((state) => state.filters)
    
    const [localFilter, setLocalFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [dropDownOpen, setDropDownOpen] = useState(false)    
    const itemsPerPage = 8

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    // Filter products based on Redux filter state and local filter
    const filteredProducts = useMemo(() => {
        if (!products.length) return []

        let filtered = [...products]

        // Apply Redux filters first
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase()
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            )
        }

        if (filters.selectedCategory) {
            filtered = filtered.filter(product => 
                product.category.toLowerCase() === filters.selectedCategory.toLowerCase()
            )
        }

        if (filters.minPrice !== undefined) {
            filtered = filtered.filter(product => product.price >= filters.minPrice!)
        }

        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter(product => product.price <= filters.maxPrice!)
        }

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase()
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword) ||
                product.description.toLowerCase().includes(keyword)
            )
        }

        // Apply local filter dropdown
        switch (localFilter) {
            case "cheap":
                filtered = filtered.filter(product => product.price < 50)
                break
            case "expensive":
                filtered = filtered.filter(product => product.price >= 50)
                break
            case "popular":
                filtered = filtered.filter(product => product.rating.rate >= 4)
                break
            case "all":
            default:
                break
        }
        
        return filtered
    }, [products, filters, localFilter])

    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart(product))

        //Add a small animation feedback
        const button = e.currentTarget as HTMLButtonElement;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    }

    const handleResetFilters = () => {
        dispatch(resetFilters());
        setLocalFilter("all");
        setCurrentPage(1);
    }

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [filters, localFilter])

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const productCardVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        hover: {
            y: -2,
            transition: {
                duration: 0.2
            }
        }
    }

    // Show active filter count
    const activeFilterCount = Object.values(filters).filter(value => 
        value !== "" && value !== undefined && value !== null
    ).length

    if (loading) {
        return (
            <section className="flex-1 p-4 mt-5">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="flex-1 p-4 mt-5">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center text-red-600">
                        <p>Error loading products: {error}</p>
                        <button 
                            onClick={() => dispatch(fetchProducts())}
                            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="flex-1 p-4 mt-5">
            <div className="mb-5">
                
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Discover Products
                        </h1>
                        {activeFilterCount > 0 && (
                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                            </span>
                        )}
                    </div>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setDropDownOpen(!dropDownOpen)}
                            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center hover:bg-gray-50 text-sm font-medium bg-white shadow-sm transition-colors"
                        >
                            <FiMenu className="mr-2" />                            
                            <span className="capitalize">{localFilter}</span>
                            <FiChevronDown className={`ml-2 transition-transform ${dropDownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {dropDownOpen && (
                            <div className="absolute bg-white border border-gray-200 rounded-lg mt-2 w-40 z-20 shadow-xl">
                                {["all", "cheap", "expensive", "popular"].map((filterOption) => (
                                    <button
                                        key={filterOption}
                                        onClick={() => {
                                            setLocalFilter(filterOption)
                                            setDropDownOpen(false)
                                            setCurrentPage(1)
                                        }}
                                        className={`block px-4 py-3 w-full text-left text-sm font-medium border-b border-gray-100 last:border-b-0 transition-colors ${
                                            localFilter === filterOption 
                                                ? 'bg-black text-white' 
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Summary */}
                {(filters.searchQuery || filters.selectedCategory || filters.keyword) && (
                    <motion.div 
                        className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
                        <div className="flex flex-wrap gap-2">
                            {filters.searchQuery && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                    Search: "{filters.searchQuery}"
                                </span>
                            )}
                            {filters.selectedCategory && (
                                <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full capitalize">
                                    Category: {filters.selectedCategory}
                                </span>
                            )}
                            {filters.keyword && (
                                <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                                    Keyword: {filters.keyword}
                                </span>
                            )}
                            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                                    Price: 
                                    {filters.minPrice !== undefined && ` $${filters.minPrice}`}
                                    {filters.maxPrice !== undefined && ` - $${filters.maxPrice}`}
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Results Count */}
                <div className="mb-6 text-sm text-gray-600">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    {filteredProducts.length !== products.length && ` of ${products.length}`}
                </div>

                {/* Products Grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                variants={productCardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/productstore/product/${product.id}`}>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                        {/* Product Image */}
                                        <div className="h-48 overflow-hidden relative bg-gray-50">
                                            <img 
                                                src={product.image} 
                                                alt={product.title}
                                                className="w-full h-full object-contain p-4 transition-transform hover:scale-105"
                                            />
                                            <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                                                ${product.price}
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight text-gray-900">
                                                {product.title}
                                            </h3>
                                            
                                            <p className="text-gray-500 text-xs mb-3 capitalize">
                                                {product.category}
                                            </p>

                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-bold text-lg text-gray-900">
                                                    ${product.price}
                                                </span>
                                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                                                    <FiStar className="text-yellow-500 text-xs" />
                                                    <span className="text-xs ml-1 text-gray-700">{product.rating.rate}</span>
                                                </div>
                                            </div>

                                            <motion.button 
                                                className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-1 hover:bg-gray-800 transition-colors"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={(e) => handleAddToCart(product, e)}
                                            >
                                                <FiShoppingCart className="text-base" />
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div> 
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <div className="text-6xl mb-4">🕵️</div>
                            <p className="text-gray-500 text-lg mb-2">No products found</p>
                            <p className="text-gray-400 text-sm">
                                Try adjusting your filters or search terms. 
                                {filters.searchQuery && ` No results for "${filters.searchQuery}"`}
                            </p>
                            <button 
                                onClick={handleResetFilters}
                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNumber = i + 1;
                            if (totalPages > 5) {
                                const startPage = Math.max(1, currentPage - 2);
                                pageNumber = startPage + i;
                            }
                            if (pageNumber > totalPages) return null;
                            
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                    className={`px-4 py-2 border rounded-lg text-sm font-medium min-w-[44px] transition-colors ${
                                        currentPage === pageNumber 
                                            ? 'bg-black text-white border-black' 
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}