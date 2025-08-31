import React, { useRef, useEffect } from 'react';

const VantaBirdsBackground = ({ children, className = '' }) => {
	const vantaRef = useRef(null);
	useEffect(() => {
		let vantaEffect;
		let threeScript, vantaScript;
		const loadScripts = async () => {
			if (!window.THREE) {
				threeScript = document.createElement('script');
				threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
				threeScript.async = true;
				document.body.appendChild(threeScript);
				await new Promise(res => { threeScript.onload = res; });
			}
			if (!window.VANTA || !window.VANTA.BIRDS) {
				vantaScript = document.createElement('script');
				vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
				vantaScript.async = true;
				document.body.appendChild(vantaScript);
				await new Promise(res => { vantaScript.onload = res; });
			}
			if (window.VANTA && window.VANTA.BIRDS && vantaRef.current) {
				vantaEffect = window.VANTA.BIRDS({
					el: vantaRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.00,
					minWidth: 200.00,
					scale: 1.00,
					scaleMobile: 1.00,
					backgroundColor: 0x000000,
				});
			}
		};
		loadScripts();
		return () => {
			if (vantaEffect && typeof vantaEffect.destroy === 'function') vantaEffect.destroy();
			if (threeScript) document.body.removeChild(threeScript);
			if (vantaScript) document.body.removeChild(vantaScript);
		};
	}, []);
	return (
		<div ref={vantaRef} className={`relative min-h-screen w-full ${className}`} style={{ zIndex: 0 }}>
			<div className="absolute inset-0 z-10 pointer-events-none" />
			<div className="relative z-20">{children}</div>
		</div>
	);
};

export default VantaBirdsBackground;
