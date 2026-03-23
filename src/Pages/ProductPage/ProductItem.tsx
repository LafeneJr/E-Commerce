import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../Store/hooks"
import { addToCart, openCart } from "../../Store/Slices/CartSlice"
import { fetchProducts } from "../../Store/Slices/ProductSlice"
import { FiStar, FiShoppingCart, FiHeart, FiArrowLeft, FiCheck, FiShare2 } from "react-icons/fi"
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion"
//import type { Product } from "../../Store/Slices/ProductSlice"

export const ProductItem = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { products, loading: productsLoading } = useAppSelector((state) => state.products)
    const { items: cartItems } = useAppSelector((state) => state.cart)

    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [showShareTooltip, setShowShareTooltip] = useState(false)

    // Find the current product
    const product = products.find(p => p.id === Number(id))

    useEffect(() => {
        // Fetch products if not already loaded
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products.length])

    useEffect(() => {
        // Scroll to top when product changes
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [id])

    const handleAddToCart = async () => {
        if (!product) return
        
        setIsAddingToCart(true)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Add the product to cart with selected quantity
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product))
        }
        
        setIsAddingToCart(false)
        setShowSuccess(true)
        
        // Hide success message after 2 seconds
        setTimeout(() => {
            setShowSuccess(false)
        }, 2000)
    }

    const handleBuyNow = async () => {
        if (!product) return
        
        setIsAddingToCart(true)
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Add to cart
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product))
        }
        
        setIsAddingToCart(false)
        
        // Open cart sidebar
        dispatch(openCart())
    }

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1)
    }

    const handleAddToWishlist = () => {
        if (!product) return
        
        setIsInWishlist(!isInWishlist)
        
        // Simulate API call
        console.log(`${isInWishlist ? 'Removed from' : 'Added to'} wishlist:`, product.title)
        
        // Show feedback
        const message = isInWishlist ? "Removed from wishlist" : "Added to wishlist"
        // You could show a toast notification here
    }

    const handleShareProduct = async () => {
        if (!product) return
        
        const shareData = {
            title: product.title,
            text: product.description,
            url: window.location.href,
        }
        
        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                // Fallback for browsers that don't support Web Share API
                await navigator.clipboard.writeText(window.location.href)
                setShowShareTooltip(true)
                setTimeout(() => setShowShareTooltip(false), 2000)
            }
        } catch (err) {
            console.log('Error sharing:', err)
        }
    }

    const handleViewCart = () => {
        dispatch(openCart())
    }

    const handleContinueShopping = () => {
        navigate('/productstore')
    }

    const handleWriteReview = () => {
        // Scroll to review section or open review modal
        const reviewSection = document.getElementById('reviews-section')
        if (reviewSection) {
            reviewSection.scrollIntoView({ behavior: 'smooth' })
        }
        // You could also open a review form modal here
    }

    const handleViewSimilarProducts = () => {
        if (product) {
            navigate(`/productstore?category=${encodeURIComponent(product.category)}`)
        }
    }

    // Check if product is in cart
    const isInCart = product ? cartItems.some(item => item.id === product.id) : false

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: easeOut
            }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: easeOut
            }
        }
    }

    const buttonHoverVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: easeInOut
            }
        },
        tap: {
            scale: 0.95
        }
    }

    if (productsLoading) {
        return (
            <motion.div 
                className="min-h-screen flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <motion.div 
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.p 
                        className="mt-4 text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Loading product details...
                    </motion.p>
                </div>
            </motion.div>
        )
    }

    if (!product) {
        return (
            <motion.div 
                className="min-h-screen flex justify-center items-center flex-col p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="text-6xl mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    😕
                </motion.div>
                <motion.h1 
                    className="text-2xl font-bold mb-4 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Product Not Found
                </motion.h1>
                <motion.p 
                    className="text-gray-600 mb-6 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    The product you're looking for doesn't exist or has been removed.
                </motion.p>
                <motion.div 
                    className="flex gap-4 flex-col sm:flex-row"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.button 
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Go Back
                    </motion.button>
                    <motion.button 
                        onClick={() => navigate('/productstore')}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Browse Products
                    </motion.button>
                </motion.div>
            </motion.div>
        )
    }

    const productImages = [product.image, product.image, product.image]

    // Generate star rating display
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <FiStar 
                            className={`${
                                index < Math.floor(rating) 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                            } ${index === Math.floor(rating) && rating % 1 !== 0 ? 'text-yellow-500' : ''}`}
                        />
                    </motion.div>
                ))}
            </div>
        )
    }

    return (
        <motion.div 
            className="p-5 mt-10 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Back Button */}
            <motion.button 
                onClick={() => navigate('/productstore')}
                className="mb-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium group"
                variants={itemVariants}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Products
            </motion.button>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Images */}
                <motion.div 
                    className="space-y-6"
                    variants={containerVariants}
                >
                    {/* Main Image */}
                    <motion.div 
                        className="bg-white rounded-xl border border-gray-200 p-4 sm:p-8 shadow-sm relative"
                        variants={imageVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Share Button */}
                        <motion.button
                            onClick={handleShareProduct}
                            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiShare2 className="text-gray-600" />
                        </motion.button>
                        
                        {showShareTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-16 right-4 bg-black text-white px-3 py-2 rounded-lg text-sm"
                            >
                                Link copied!
                            </motion.div>
                        )}

                        <motion.img 
                            src={productImages[selectedImage]} 
                            alt={product.title}
                            className="w-full h-64 sm:h-80 md:h-96 object-contain"
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                    
                    {/* Thumbnail Images */}
                    <motion.div 
                        className="flex gap-3 sm:gap-4 justify-center flex-wrap"
                        variants={itemVariants}
                    >
                        {productImages.map((image, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border-2 rounded-lg sm:rounded-xl p-2 transition-all duration-200 ${
                                    selectedImage === index 
                                        ? 'border-black shadow-md' 
                                        : 'border-gray-200 hover:border-gray-400'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img 
                                    src={image} 
                                    alt={`${product.title} ${index + 1}`}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                />
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Product Information */}
                <motion.div 
                    className="space-y-6 lg:space-y-8"
                    variants={containerVariants}
                >
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <motion.span 
                            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium uppercase tracking-wide"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {product.category}
                        </motion.span>
                        
                        <motion.h1 
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                            variants={itemVariants}
                        >
                            {product.title}
                        </motion.h1>
                        
                        <motion.div 
                            className="flex items-center gap-4 sm:gap-6 flex-wrap"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-2">
                                {renderStars(product.rating.rate)}
                                <span className="font-semibold text-gray-700">{product.rating.rate}</span>
                                <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
                            </div>
                            <AnimatePresence>
                                {isInCart && (
                                    <motion.span 
                                        className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        In Cart
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div 
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
                            variants={itemVariants}
                        >
                            ${product.price}
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.div className="space-y-3" variants={itemVariants}>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Description</h2>
                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{product.description}</p>
                    </motion.div>

                    {/* Quantity Selector */}
                    <motion.div className="space-y-3" variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <motion.button
                                    onClick={handleDecrement}
                                    className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    -
                                </motion.button>
                                <span className="px-4 sm:px-6 py-3 text-lg font-semibold min-w-[60px] text-center">
                                    {quantity}
                                </span>
                                <motion.button
                                    onClick={handleIncrement}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    +
                                </motion.button>
                            </div>
                            <span className="text-gray-600 text-sm sm:text-base">
                                {quantity} × ${product.price} = <strong>${(quantity * product.price).toFixed(2)}</strong>
                            </span>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2"
                                >
                                    <FiCheck className="text-lg" />
                                    Added to cart successfully!
                                    <button 
                                        onClick={handleViewCart}
                                        className="ml-auto text-green-800 font-semibold hover:underline"
                                    >
                                        View Cart
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
                            <motion.button 
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`flex-1 py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
                                    isAddingToCart 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : showSuccess
                                        ? 'bg-green-600 text-white'
                                        : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
                                }`}
                                variants={buttonHoverVariants}
                                whileHover={isAddingToCart ? {} : "hover"}
                                whileTap={isAddingToCart ? {} : "tap"}
                            >
                                {isAddingToCart ? (
                                    <>
                                        <motion.div 
                                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Adding...
                                    </>
                                ) : showSuccess ? (
                                    <>
                                        <FiCheck className="text-xl" />
                                        Added!
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="text-xl" />
                                        Add to Cart
                                    </>
                                )}
                            </motion.button>
                            <motion.button 
                                onClick={handleBuyNow}
                                className="flex-1 border-2 border-black text-black py-3 sm:py-4 px-6 rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-200"
                                variants={buttonHoverVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Buy Now
                            </motion.button>
                        </div>
                        
                        <div className="flex gap-3 sm:gap-4">
                            <motion.button 
                                onClick={handleAddToWishlist}
                                className={`flex-1 border py-3 sm:py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3 ${
                                    isInWishlist 
                                        ? 'border-red-500 text-red-500 bg-red-50' 
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                                variants={buttonHoverVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <FiHeart className={`text-xl ${isInWishlist ? 'fill-current' : ''}`} />
                                {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Additional Action Buttons */}
                    <motion.div className="flex gap-3" variants={itemVariants}>
                        <motion.button 
                            onClick={handleViewSimilarProducts}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                            variants={buttonHoverVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Similar Products
                        </motion.button>
                        <motion.button 
                            onClick={handleContinueShopping}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                            variants={buttonHoverVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Continue Shopping
                        </motion.button>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div 
                        className="border-t border-gray-200 pt-6 space-y-4"
                        variants={itemVariants}
                    >
                        <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                            {[
                                { label: "Category:", value: product.category, capitalize: true },
                                { label: "SKU:", value: `#${product.id}` },
                                { label: "Availability:", value: "In Stock", color: "text-green-600" },
                                { label: "Shipping:", value: "Free shipping worldwide" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex justify-between py-2 border-b border-gray-100"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                >
                                    <span className="font-semibold text-gray-600">{item.label}</span>
                                    <span className={`${item.color || 'text-gray-900'} ${item.capitalize ? 'capitalize' : ''}`}>
                                        {item.value}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Reviews Section */}
            <motion.div 
                id="reviews-section"
                className="mt-12 lg:mt-16 border-t border-gray-200 pt-8 lg:pt-12"
                variants={itemVariants}
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-8 text-gray-900">Customer Reviews</h2>
                <motion.div 
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.div 
                        className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-yellow-500"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ★
                    </motion.div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">{product.rating.rate}/5</div>
                    <div className="text-gray-600 mb-2 text-base sm:text-lg">Average Rating</div>
                    <div className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Based on {product.rating.count} customer reviews</div>
                    <motion.button 
                        onClick={handleWriteReview}
                        className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Write a Review
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Related Products Section */}
            <motion.div 
                className="mt-12 lg:mt-16 border-t border-gray-200 pt-8 lg:pt-12"
                variants={itemVariants}
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-8 text-gray-900">You Might Also Like</h2>
                <motion.div 
                    className="text-center py-8 text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p>Related products section coming soon...</p>
                    <motion.button 
                        onClick={handleViewSimilarProducts}
                        className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        variants={buttonHoverVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Browse Similar Products
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}