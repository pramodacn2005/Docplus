    import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { assets } from '../assets/assets.js'

const Banner = () => {
    const navigate = useNavigate()
    const controls = useAnimation()

    const handleHoverStart = () => {
        controls.start({
            x: 5,
            transition: { duration: 0.3 }
        })
    }

    const handleHoverEnd = () => {
        controls.start({
            x: 0,
            transition: { duration: 0.3 }
        })
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', damping: 10 }}
            className="relative overflow-hidden rounded-2xl mx-4 md:mx-10 my-16"
        >
            {/* Gradient Background */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#003543] to-[#006684]"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            >
                {/* Animated Grid Pattern */}
                <motion.div 
                    className="absolute inset-0 opacity-10"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: '100% 100%' }}
                    transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </motion.div>

            <div className="relative z-10 px-6 py-12 md:py-16 lg:py-24 xl:py-32 md:px-12 lg:px-16 xl:px-24">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text Content */}
                    <motion.div 
                        className="flex-1 text-center md:text-left"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.h2 
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Book Appointments With
                        </motion.h2>
                        <motion.div
                            className="relative inline-block mt-2 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.span 
                                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                100+ Trusted Doctors
                            </motion.span>
                            <motion.div 
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-300"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.7, duration: 1 }}
                            />
                        </motion.div>

                        <motion.button
                            onHoverStart={handleHoverStart}
                            onHoverEnd={handleHoverEnd}
                            onClick={() => { 
                                navigate('/login'); 
                                window.scrollTo(0, 0) 
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 bg-white text-[#003543] rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Get Started
                            <motion.span animate={controls}>
                                <FiArrowRight />
                            </motion.span>
                        </motion.button>
                    </motion.div>

                    {/* Image */}
                    <motion.div 
                        className="hidden md:block flex-1 relative"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.div 
                            className="relative"
                            initial={{ scale: 0.9, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                delay: 0.7,
                                type: 'spring',
                                stiffness: 100,
                                damping: 10
                            }}
                        >
                            <motion.img
                                src={assets.appointment_img}
                                alt="Doctor appointment"
                                className="w-full max-w-md mx-auto"
                                whileHover={{ 
                                    scale: 1.03,
                                    transition: { duration: 0.5 }
                                }}
                            />
                            {/* Floating elements */}
                            <motion.div 
                                className="absolute -top-6 -right-6 w-16 h-16 bg-cyan-400/20 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1, type: 'spring' }}
                            />
                            <motion.div 
                                className="absolute -bottom-6 -left-6 w-12 h-12 bg-teal-300/20 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, type: 'spring' }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Animated floating circles */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-300/30"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div 
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-teal-200/30"
                animate={{
                    y: [0, -15, 0],
                    x: [0, -15, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
        </motion.div>
    )
}

export default Banner