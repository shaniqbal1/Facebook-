import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./login";
import Register from "./register";

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let dots = [], animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2.2 + 0.8, a: Math.random() * 0.5 + 0.2,
      });
    }
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24,119,242,${d.a})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(24,119,242,${(1 - dist / 90) * 0.18})`; ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const FloatCard = ({ className, floatY = 0, floatX = 0, rotate = 0, duration = 3, delay = 0, children }) => (
  <motion.div
    className={`absolute bg-white rounded-[18px] shadow-2xl overflow-hidden border-[2.5px] border-white ${className}`}
    animate={{ y: [0, floatY, 0], x: [0, floatX, 0], rotate: [0, rotate, 0] }}
    transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => (
  <div className="flex-1 min-w-0">
    <h1 className="text-[40px] font-black text-[#1877f2] tracking-tight leading-none mb-3">facebook</h1>
    <p className="text-[24px] text-[#1c1e21] leading-snug mb-6 font-normal">
      Explore the things<br /><span className="text-[#1877f2] font-bold">you love.</span>
    </p>

    <div className="relative w-full h-[340px] overflow-hidden rounded-2xl">
      <ParticleCanvas />

      {/* Main tall card */}
      <FloatCard className="w-[155px] h-[255px] right-4 top-4 z-20" floatY={-12} duration={3.2} delay={0}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#87ceeb] to-[#d0f0ff]">
          <span className="text-[46px]">🏄</span>
          <span className="text-[13px] text-gray-500">Skateboarding</span>
        </div>
        <span className="absolute top-2 right-2 bg-[#1877f2] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">16:45</span>
      </FloatCard>

      {/* Knit card */}
      <FloatCard className="w-[128px] h-[148px] left-0 top-12 z-10" floatX={-8} duration={3.7} delay={0.4}>
        <div className="w-full h-full bg-[#b8d4e3] flex items-center justify-center text-[48px]">🧶</div>
      </FloatCard>

      {/* Event card */}
      <FloatCard className="w-[120px] h-[126px] left-4 bottom-5 z-30" floatY={9} duration={4.1} delay={0.8}>
        <div className="w-full h-full bg-[#f9e8e8] flex items-center justify-center text-[40px] relative">
          🎟️
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide">LIVE</span>
        </div>
      </FloatCard>

      {/* Music card */}
      <FloatCard className="w-[108px] h-[108px] z-20" style={{ right: "180px", top: 0 }} floatY={-10} rotate={3} duration={3.5} delay={0.2}>
        <div className="w-full h-full flex items-center justify-center text-[40px]" style={{ background: "linear-gradient(135deg,#ffd6e7,#ffb3cc)" }}>🎵</div>
      </FloatCard>

      {/* Heart orb */}
      <motion.div
        className="absolute right-3 bottom-24 w-11 h-11 bg-[#ff6b9d] rounded-full flex items-center justify-center z-40 shadow-lg"
        animate={{ scale: [1, 1.22, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </motion.div>

      {/* Like orb */}
      <motion.div
        className="absolute z-40 w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center shadow-lg"
        style={{ left: "138px", bottom: "52px" }}
        animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
      >
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
      </motion.div>

      {/* Avatar */}
      <motion.div
        className="absolute left-[108px] bottom-2 w-[62px] h-[62px] rounded-full border-[3px] border-[#1877f2] flex items-center justify-center text-[26px] z-50 shadow-xl"
        style={{ background: "linear-gradient(135deg,#ff9a9e,#fecfef)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 280 }}
      >👩</motion.div>

      {/* Reaction bubbles */}
      <motion.div
        className="absolute left-11 top-2 bg-white rounded-3xl px-3 py-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-[#1c1e21] shadow-md z-40"
        animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.8 }}
      >😂 <span>2.4k</span></motion.div>

      <motion.div
        className="absolute bg-white rounded-3xl px-3 py-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-[#1c1e21] shadow-md z-40"
        style={{ right: "40px", bottom: "144px" }}
        animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.3, delay: 0.5 }}
      >❤️ <span>8.1k</span></motion.div>
    </div>
  </div>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[940px] flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <HeroSection />
        <div className="flex-shrink-0 w-full lg:w-[396px] flex flex-col items-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="login" className="w-full"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.32 }}>
                <Login switchToRegister={() => setIsLogin(false)} />
              </motion.div>
            ) : (
              <motion.div key="register" className="w-full"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.32 }}>
                <Register switchToLogin={() => setIsLogin(true)} />
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-4 text-[11px] font-extrabold tracking-[3px] text-[#bec3c9]">META</p>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;