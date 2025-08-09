import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursor = useRef(null);
  const cursorSize = isHovered ? 60 : 15;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1)
  }

  // Smooth out the mouse values
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }

  const manageMouseOver = () => {
    setIsHovered(true)
  }

  const manageMouseLeave = () => {
    setIsHovered(false)
    if (cursor.current) {
      animate(cursor.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1, type: "spring" })
    }
  }

  useEffect(() => {
    // Check if device supports touch (mobile/tablet)
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    
    // Don't add cursor events on touch devices
    if (isTouchDevice) return;

    // Add event listeners to clickable elements
    const clickableElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    
    clickableElements.forEach(element => {
      element.addEventListener("mouseenter", manageMouseOver);
      element.addEventListener("mouseleave", manageMouseLeave);
    });

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      clickableElements.forEach(element => {
        element.removeEventListener("mouseenter", manageMouseOver);
        element.removeEventListener("mouseleave", manageMouseLeave);
      });
      window.removeEventListener("mousemove", manageMouseMove);
    }
  }, [isTouchDevice])

  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
  }

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="cursor-container">
      <motion.div
        transformTemplate={template}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize
        }}
        className="fixed w-[15px] h-[15px] bg-white/30 rounded-full pointer-events-none z-[9999] backdrop-blur-sm"
        ref={cursor}>
      </motion.div>
    </div>
  )
}
