import React from "react";

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-background-dark">
      <div 
        className="w-full h-full bg-cover bg-center animate-zoom-slow"
        style={{
          backgroundImage: "url('/bg-aveiro.jpg')",
        }}
      />
      {/* Overlay to darken background so the form is readable */}
      <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-[2px]" />
    </div>
  );
}
