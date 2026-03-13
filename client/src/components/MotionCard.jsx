import React from 'react';
import { motion } from 'framer-motion';

const MotionCard = ({ children, className = '', delay = 0 }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: delay,
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
