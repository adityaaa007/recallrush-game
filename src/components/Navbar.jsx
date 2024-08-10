import React from "react";
import logoImg from "../assets/logo.png";

function Navbar({ logoRef }) {
  return (
    <nav className="w-full h-20 flex items-center justify-center">
      <a
        href="#"
        className="logo flex items-center justify-center gap-2"
        ref={logoRef}
      >
        <img src={logoImg} alt="RecallRush" height={24} width={24} />
        <h1 className="logo-text text-neutral-600 text-4xl">RecallRush</h1>
      </a>
    </nav>
  );
}

export default Navbar;
