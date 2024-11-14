import React from "react";
import { motion } from "framer-motion";

import "./FloatingShapes.css";

const FloatingShapes = ({ color, width, height, top, left, delay }) => {
  return (
    <motion.div
      className="floatingShape"
      style={{
        background: color,
        width: width,
        height: height,
        top: top,
        left: left,
      }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    ></motion.div>
  );
};

export default FloatingShapes;
