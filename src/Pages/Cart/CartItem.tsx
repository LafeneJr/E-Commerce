import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { removeFromCart, updateQuantity, closeCart } from "../../Store/Slices/CartSlice";
import { FiX, FiPlus, FiMinus, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const { items, totalQuantity, totalAmount, isCartOpen } = useAppSelector((state) => state.cart);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        console.log('Proceeding to checkout with items:', items);
        alert('Checkout functionality would go here!');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-opacity-50"
                        onClick={() => dispatch(closeCart())}
                    />
                    
                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-96 lg:w-2xl bg-white shadow-xl z-50"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
                                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 sm:gap-3">
                                    <FiShoppingCart className="text-xl sm:text-2xl" />
                                    Shopping Cart 
                                    {totalQuantity > 0 && (
                                        <span className="bg-orange-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                                            {totalQuantity}
                                        </span>
                                    )}
                                </h2>
                                <button 
                                    onClick={() => dispatch(closeCart())}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiX className="text-lg sm:text-xl" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-8 sm:py-12 text-gray-500">
                                        <FiShoppingCart className="text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4 opacity-30" />
                                        <p className="text-base sm:text-lg font-medium mb-2">Your cart is empty</p>
                                        <p className="text-xs sm:text-sm">Add some products to get started!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 sm:space-y-4">
                                        {items.map((item) => (
                                            <motion.div 
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl bg-white hover:shadow-md transition-shadow"
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-gray-100 rounded-lg p-2 flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 mb-1 sm:mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600 font-bold text-sm sm:text-base">${item.price}</p>
                                                    
                                                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                className="p-1 sm:p-2 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <FiMinus className="w-3 h-3" />
                                                            </button>
                                                            <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium min-w-[32px] sm:min-w-[40px] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                className="p-1 sm:p-2 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <FiPlus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="text-red-500 hover:text-red-700 p-1 sm:p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="text-right mt-1 sm:mt-2">
                                                        <p className="text-xs sm:text-sm font-semibold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4 bg-gray-50">
                                    <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                                        <span>Total:</span>
                                        <span className="text-xl sm:text-2xl text-green-600">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <button 
                                        onClick={handleCheckout}
                                        className="w-full bg-black text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                        <FiShoppingCart className="text-base sm:text-lg" />
                                        Proceed to Checkout
                                    </button>
                                    <button 
                                        onClick={() => dispatch(closeCart())}
                                        className="w-full border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};