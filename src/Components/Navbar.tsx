import { useEffect, useState } from "react"
import { FiHome, FiMenu, FiShoppingBag, FiShoppingCart, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../Store/hooks"
import { openCart } from "../Store/Slices/CartSlice"

export const Navbar = () => {
    const dispatch = useAppDispatch()
    const { totalQuantity } = useAppSelector((state) => state.cart)
    
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const handleCartClick = () => {
        dispatch(openCart());
    }

    return (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="mx-auto container flex justify-between items-center px-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    M~A~L H<span className="text-orange-500">U</span>B
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="flex items-center hover:text-gray-500 transition-colors">
                        <FiHome className="mr-1" /> Home
                    </Link>

                    <Link to="/productstore" className="flex items-center font-semibold text-black hover:text-gray-700 transition-colors">
                        <FiShoppingBag className="mr-1" /> Shop
                    </Link>

                    {/* Cart Button */}
                    <button 
                        className="relative flex items-center hover:text-gray-500 transition-colors"
                        onClick={handleCartClick}
                    >
                        <FiShoppingCart className="text-3xl border-2 rounded-md p-1 hover:border-gray-400 transition-colors" />
                        
                        {/* Cart Badge */}
                        {totalQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
                                {totalQuantity > 99 ? '99+' : totalQuantity}
                            </span>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-2xl z-60 relative"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu">
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Mobile Navigation */}
                <div className={`fixed top-0 left-0 w-2/3 h-1/2 bg-white rounded-br-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <Link to="/" className="flex items-center text-2xl hover:text-gray-500 transition-colors"
                        onClick={closeMobileMenu}>
                            <FiHome className="mr-4" /> Home
                        </Link>

                        <Link to="/productstore" className="flex items-center text-2xl font-semibold text-black hover:text-gray-700 transition-colors"
                        onClick={closeMobileMenu}>
                            <FiShoppingBag className="mr-4" /> Shop
                        </Link>

                        <button 
                            className="relative flex items-center hover:text-gray-500 transition-colors"
                            onClick={() => {
                                handleCartClick();
                                closeMobileMenu();
                            }}
                        >
                            <FiShoppingCart className="text-3xl border-2 rounded-md p-1 hover:border-gray-400 transition-colors" />
                            
                            {/* Cart Badge for Mobile */}
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {totalQuantity > 99 ? '99+' : totalQuantity}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Overlay for mobile menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
                    onClick={closeMobileMenu} />
                )}
            </div>
        </nav>
    )
}