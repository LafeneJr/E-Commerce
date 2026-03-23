import { easeInOut, easeOut, motion } from "framer-motion"
import { FiArrowDownRight, FiPlusCircle } from "react-icons/fi"
import { Link } from "react-router-dom"



// image import
import wear1 from "../../assets/wear1.jfif"
import wear2 from "../../assets/wear2.jpg"
import wear3 from "../../assets/wear3.jfif"


export const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  }

  const imageHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: easeInOut
      }
    }
  }

  const textGlowVariants = {
    hover: {
      textShadow: "0 0 20px rgba(255,255,255,0.8)",
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeOut
      }
    }
  }

  const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0,0,0,0.5)",
      borderColor: "rgba(255,255,255,0.8)",
      transition: {
        duration: 0.2,
        ease: easeInOut
      }
    },
    tap: { scale: 0.95 }
  }

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  }

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  }

  return (
    <motion.main 
      className="mx-auto pt-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Border */}
      <motion.div 
        className="border-b-2 py-3 mt-10"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: easeOut }}
      />

      {/* Top Of Hero */}
      <motion.div 
        className="py-3"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-center text-6xl md:text-8xl font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: easeOut,
            delay: 0.2 
          }}
          whileHover="hover"
          variants={{
            hover: {
              scale: 1.02,
              textShadow: "0 0 30px rgba(0,0,0,0.3)",
              transition: { duration: 0.3 }
            }
          }}
        >
          M~A~L STREETWEAR HUB
        </motion.h1>
      </motion.div>

      <motion.section 
        className="gap-3 flex flex-col md:flex-row"
        variants={containerVariants}
      >
        {/* Left Side */}
        <motion.div 
          className="w-full md:w-1/3 h-screen relative"
          variants={itemVariants}
        >
          <motion.div 
            className="absolute inset-0 overflow-hidden rounded-md"
            whileHover="hover"
            variants={imageHoverVariants}
          >
            <motion.img 
              className="w-full h-full object-cover"
              src={wear1} 
              alt="streetwear"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: easeOut }}
            />
          </motion.div>

          <div className="absolute flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/" className="items-center py-3 transition-colors block">
                <motion.h2 
                  className="bg-white/90 text-center mx-2 rounded-lg text-black font-bold text-lg font-serif inline-flex items-center px-4 py-2"
                  whileHover="hover"
                  variants={textGlowVariants}
                >
                  #NEW ARRIVALS
                  <motion.span 
                    className="ml-3"
                    variants={floatingAnimation}
                    animate="animate"
                  >
                    <FiArrowDownRight className="text-3xl text-white bg-orange-500 rounded-md p-1" />
                  </motion.span>
                </motion.h2>
                <motion.p 
                  className="text-xs text-black/70 backdrop-blur-md rounded-lg mt-2 px-2 py-1 max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Discover the latest trends in urban fashion
                </motion.p>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side container */}
        <motion.div 
          className="w-full md:w-2/3 flex flex-col"
          variants={itemVariants}
        >
          {/* Top image section */}
          <motion.div 
            className="p-8 md:p-16 relative h-[400px]"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute inset-0 overflow-hidden rounded-md"
              whileHover="hover"
              variants={imageHoverVariants}
            >
              <motion.img 
                className="w-full h-full object-cover"
                src={wear2} 
                alt="streetwear"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: easeOut, delay: 0.3 }}
              />
            </motion.div>

            {/* Contact Us - Top Right */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-4 right-4 md:top-8 md:right-8"
            >
              <motion.div
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/" className="text-lg text-white backdrop-blur-sm bg-black/30 px-4 py-2 rounded-lg border border-white/20 block">
                  CONTACT US
                </Link>
              </motion.div>
            </motion.div>

            {/* Collections - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8"
            >
              <motion.div 
                variants={buttonHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/" className="inline-block backdrop-blur-sm text-black/80 px-6 py-3 text-xl font-semibold font-serif rounded-2xl border border-white/30 bg-white/20">
                  #COLLECTIONS_23
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3-column grid section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"
            variants={containerVariants}
          >
            {/* Grid Item 1 */}
            <motion.div 
              variants={itemVariants}
              className="relative h-64 rounded-3xl overflow-hidden group bg-gradient-to-br from-gray-900 to-black"
              whileHover="hover"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, delay: 0.8 }
                },
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10"
                variants={pulseAnimation}
                animate="animate"
              />
              
              <div className="absolute inset-0 py-5 px-6 flex flex-col justify-between">
                <motion.h2 
                  className="text-lg text-white font-serif leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Have a Question? Contact our manager
                </motion.h2>
                
                <div className="flex justify-between items-end">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/faq" className="text-white text-2xl font-bold font-serif hover:text-orange-400 transition-colors">
                      #FAQ
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="border border-orange-500 px-3 py-1 bg-stone-800/50 rounded-2xl text-sm text-orange-500 backdrop-blur-sm">
                      popular
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Grid Item 2 */}
            <motion.div 
              variants={itemVariants}
              className="relative h-64 rounded-3xl overflow-hidden group"
              whileHover="hover"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: 0.9 }
                },
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }
              }}
            >
              <motion.div 
                className="absolute inset-0"
                whileHover="hover"
                variants={imageHoverVariants}
              >
                <img 
                  src={wear3}
                  alt="Streetwear collection 54" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.2 }}
              />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <motion.div 
                  className="flex justify-between items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <h2 className="text-2xl font-bold font-serif text-white/80">#QUALITY</h2>
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiPlusCircle className="text-2xl text-white" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/collection54" className="bg-white/90 px-4 py-2 font-serif rounded-lg font-semibold hover:bg-white transition-colors inline-block">
                    #COLLECTION_54
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Grid Item 3 */}
            <motion.div 
              variants={itemVariants}
              className="relative h-64 rounded-3xl overflow-hidden group bg-gradient-to-br from-stone-800 to-stone-900"
              whileHover="hover"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, delay: 1.0 }
                },
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"
                variants={pulseAnimation}
                animate="animate"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="bg-stone-800/80 backdrop-blur-xl rounded-2xl p-6 text-center mx-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.h2 
                    className="text-3xl font-semibold font-serif text-white/80 mb-2"
                    variants={floatingAnimation}
                    animate="animate"
                  >
                    3,650+
                  </motion.h2>
                  <motion.p 
                    className="text-sm font-serif text-gray-400/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    Happy customers worldwide trust our quality
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
  )
}

