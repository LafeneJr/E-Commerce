import { FiBookOpen, FiArrowUpRight } from 'react-icons/fi';
import { easeOut, motion } from 'framer-motion';
import { blogs } from '../../Types';





export const BlogPost = () => {

    // Simplified animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
        },
        hover: {
            y: -2,
            transition: {
                duration: 0.2,
                ease: easeOut
            }
        }
    };

    return (
        <motion.div 
            className="bg-white shadow rounded-lg p-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Simple Header */}
            <motion.div 
                className="flex items-center gap-2 mb-4"
                variants={itemVariants}
            >
                <FiBookOpen className="text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Popular Blogs</h2>
            </motion.div>

            {/* Blogs List */}
            <div className="space-y-3">
                {blogs  .map((blog) => (
                    <motion.div
                        key={blog.id}
                        variants={itemVariants}
                        whileHover="hover"
                        className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                                {blog.title}
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.1 }}
                            >
                                <FiArrowUpRight className="text-gray-400 text-xs" />
                            </motion.div>
                        </div>
                        
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                            {blog.excerpt}
                        </p>
                        
                        <p className="text-gray-500 text-xs">
                            By {blog.author}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
