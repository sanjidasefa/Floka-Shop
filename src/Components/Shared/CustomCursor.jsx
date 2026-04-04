import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const followerRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // মাউস মুভমেন্ট ট্র্যাক করা
    const moveCursor = (e) => {
      // বড় গোলটি (Follower)
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });

      // ছোট ডটটি (Dot)
      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* বড় গোলটি */}
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "2px solid black",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999, 
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* ছোট ডটটি */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "black",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 100000,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CustomCursor;