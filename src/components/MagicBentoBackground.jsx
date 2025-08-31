import React, { useRef } from "react";
import MagicBento from "./MagicBento";

const MagicBentoBackground = () => {
  const gridRef = useRef(null);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        disableAnimations={false}
        spotlightRadius={400}
        particleCount={16}
        enableTilt={false}
        glowColor="132, 0, 255"
        clickEffect={false}
        enableMagnetism={false}
        gridRef={gridRef}
      />
    </div>
  );
};

export default MagicBentoBackground;
