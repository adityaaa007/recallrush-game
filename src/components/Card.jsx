import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Card({ data, defaultImage, flipCountHandler }) {
  const ref = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  const [flipped, isFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);

    gsap.to(ref.current, {
      scale: 1.1,
      ease: "sine.in",
      duration: 0.25,
      boxShadow: "#16c6ff22 0px 0px 16px 4px",
      border: "2px solid #16c6ff55",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    gsap.to(ref.current, {
      scale: 1,
      ease: "sine.out",
      duration: 0.25,
      boxShadow: "",
      border: "",
    });
  };

  const flipTheCard = () => {
    gsap.fromTo(
      ref.current,
      {
        rotationY: 0,
        transformOrigin: "center center", // Set the center as the hinge point
        z: -100, // Move the card 300px back for depth effect
      },
      {
        duration: 1,
        rotationY: 180,
        z: 0,
        ease: "power3.out",
      }
    );

    isFlipped((prev) => {
      flipCountHandler(prev, data.id);

      return !prev;
    });
  };

  useEffect(() => {
    if (data.destroy)
      gsap.fromTo(
        ref.current,
        {
          opacity: 1,
        },
        {
          duration: 1,
          opacity: 0,
          cursor: "",
          ease: "power3.out",
        }
      );
  }, [data.destroy]);

  useEffect(() => {
    !data.flipped && isFlipped(false);
  }, [data.flipped]);

  return (
    <div
      className={`card w-36 h-48 overflow-hidden rounded-xl ${
        data.destroy ? "cursor-default" : "cursor-pointer"
      }`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={data.destroy ? null : flipTheCard}
    >
      <img
        src={flipped ? data.image : defaultImage}
        alt="CardImage"
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default Card;
