import React, { useEffect, useState } from "react";
import { HardHat } from "lucide-react";
import { projectDetails } from "../data";

export default function AnimatedWorkers() {
  const [clouds, setClouds] = useState<{ id: number; left: number; top: number; scale: number; speed: number }[]>([]);

  // Generate cartoon clouds drifting across the sky
  useEffect(() => {
    const initialClouds = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      left: i * 28 + Math.random() * 10,
      top: 15 + Math.random() * 15,
      scale: 0.7 + Math.random() * 0.4,
      speed: 25 + Math.random() * 10,
    }));
    setClouds(initialClouds);
  }, []);

  return (
    <div className="relative w-full bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 shadow-2xl backdrop-blur-md overflow-hidden group flex flex-col justify-between h-full min-h-[360px]">
      {/* Custom Styles for Modern Children-Cartoonish Single-Block Animations */}
      <style>{`
        @keyframes cloud-drift {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(650px); }
        }
        
        /* Smooth cartoon style: Entire steamroller slides back and forth */
        @keyframes steamroller-cartoon-slide {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-50px, -2px); }
        }
        
        /* Smooth rotating of the wheels around exact central anchors */
        @keyframes wheel-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* 
         * Worker 1 (Painter): Rocks back and forth like an interactive playground toy 
         * Pivot point at bottom of feet ensures perfect body-ground alignment!
         */
        @keyframes toy-rock-painter {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(4deg); }
        }

        /* 
         * Worker 2 (Shoveler): Bounces/scoops forward and back as a single solid block
         */
        @keyframes toy-scoop-shoveler {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-8px, 12px) rotate(-10deg); }
        }

        /* Cute children cartoon style vertical squashing/stretching bounce */
        @keyframes cartoon-bounce-cone {
          0%, 100% { transform: translateY(0) scaleY(1) scaleX(1); }
          50% { transform: translateY(-12px) scaleY(1.15) scaleX(0.85); }
        }

        @keyframes sun-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(251,191,36,0.35)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 24px rgba(251,191,36,0.75)); }
        }

        @keyframes cartoon-steam {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0.9; }
          100% { transform: translate(-15px, -40px) scale(1.8); opacity: 0; }
        }

        .anim-cloud {
          animation: cloud-drift var(--speed) linear infinite;
        }
        .anim-steamroller-entire {
          animation: steamroller-cartoon-slide 6s ease-in-out infinite;
        }
        .anim-wheel-r {
          transform-origin: 285px 193px;
          animation: wheel-spin 6s linear infinite;
        }
        .anim-wheel-f {
          transform-origin: 355px 194px;
          animation: wheel-spin 6s linear infinite;
        }
        .anim-painter-toy {
          transform-origin: 121px 214px; /* Anchor bottom feet */
          animation: toy-rock-painter 3s ease-in-out infinite;
        }
        .anim-shoveler-toy {
          transform-origin: 451px 214px; /* Anchor bottom feet */
          animation: toy-scoop-shoveler 2.4s ease-in-out infinite;
        }
        .anim-cone-bounce-1 {
          transform-origin: 80px 225px;
          animation: cartoon-bounce-cone 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        }
        .anim-cone-bounce-2 {
          transform-origin: 520px 225px;
          animation: cartoon-bounce-cone 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
          animation-delay: 0.3s;
        }
        .anim-sun-glow {
          transform-origin: 520px 50px;
          animation: sun-glow 4s ease-in-out infinite;
        }
        .anim-cartoon-steam-1 {
          animation: cartoon-steam 1.8s ease-out infinite;
        }
        .anim-cartoon-steam-2 {
          animation: cartoon-steam 1.8s ease-out infinite;
          animation-delay: 0.6s;
        }
        .bg-warning-stripes {
          background-image: linear-gradient(
            45deg,
            #f59e0b 25%,
            #0f172a 25%,
            #0f172a 50%,
            #f59e0b 50%,
            #f59e0b 75%,
            #0f172a 75%,
            #0f172a 100%
          );
          background-size: 24px 24px;
        }
      `}</style>

      {/* Warning Stripe Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-warning-stripes opacity-90" />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <HardHat className="h-4.5 w-4.5 animate-bounce" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold tracking-wider text-slate-200">
              {projectDetails.appName.toUpperCase()}
            </h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Upgrading System Features
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px] px-2.5 py-0.5 rounded">
          <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
          <span>BUILDING</span>
        </div>
      </div>

      <div className="relative flex-grow flex items-center justify-center bg-slate-950/40 rounded-2xl border border-slate-850 p-4 min-h-[250px] select-none overflow-hidden">
        
        {/* Sky Background & Sun */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/10 via-slate-950/5 to-transparent pointer-events-none" />

        {/* Animated Clouds in the background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {clouds.map((cloud) => (
            <g
              key={cloud.id}
              className="anim-cloud"
              style={{
                "--speed": `${cloud.speed}s`,
                transform: `scale(${cloud.scale})`,
              } as React.CSSProperties}
            >
              <path
                d="M 50 40 a 20 20 0 0 1 30 -5 a 25 25 0 0 1 40 5 a 20 20 0 0 1 15 20 a 15 15 0 0 1 -15 15 L 45 75 a 15 15 0 0 1 -15 -15 a 20 20 0 0 1 20 -20 z"
                fill="#334155"
                opacity="0.12"
              />
            </g>
          ))}
        </svg>

        {/* Core Vector Scene */}
        <svg
          viewBox="0 0 600 300"
          className="w-full h-auto max-h-[260px] z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {/* Glowing sun */}
          <circle cx="520" cy="50" r="18" fill="#fbbf24" className="anim-sun-glow" />
          <circle cx="520" cy="50" r="26" fill="#fef08a" opacity="0.1" className="anim-sun-glow" style={{ animationDelay: "0.2s" }} />

          {/* Smooth Background Hills */}
          <path d="M -50 200 Q 150 160 350 200 T 650 210 L 650 310 L -50 310 Z" fill="#1e293b" opacity="0.4" />
          <path d="M -50 215 Q 100 190 250 215 T 650 220 L 650 310 L -50 310 Z" fill="#0f172a" />

          {/* Road construction base and fresh paving */}
          <rect x="50" y="222" width="500" height="40" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          
          {/* Dashed Road Divider lines */}
          <line x1="70" y1="242" x2="110" y2="242" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <line x1="140" y1="242" x2="180" y2="242" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <line x1="210" y1="242" x2="250" y2="242" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
          <line x1="280" y1="242" x2="320" y2="242" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
          <line x1="350" y1="242" x2="390" y2="242" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
          <line x1="420" y1="242" x2="460" y2="242" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
          <line x1="490" y1="242" x2="530" y2="242" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />

          {/* BOUNCING CARTOON CONES (Intact & solid) */}
          <g className="anim-cone-bounce-1">
            <polygon points="70,225 90,225 83,195 77,195" fill="#ea580c" />
            <ellipse cx="80" cy="225" rx="14" ry="3.5" fill="#ea580c" />
            <polygon points="72.5,212 87.5,212 85.5,204 74.5,204" fill="#ffffff" />
            <circle cx="78" cy="217" r="1.5" fill="#ffffff" />
            <circle cx="82" cy="217" r="1.5" fill="#ffffff" />
            <circle cx="78" cy="217" r="0.7" fill="#000000" />
            <circle cx="82" cy="217" r="0.7" fill="#000000" />
          </g>

          <g className="anim-cone-bounce-2">
            <polygon points="510,225 530,225 523,195 517,195" fill="#ea580c" />
            <ellipse cx="520" cy="225" rx="14" ry="3.5" fill="#ea580c" />
            <polygon points="512.5,212 527.5,212 525.5,204 514.5,204" fill="#ffffff" />
            <circle cx="518" cy="217" r="1.5" fill="#ffffff" />
            <circle cx="522" cy="217" r="1.5" fill="#ffffff" />
            <circle cx="518" cy="217" r="0.7" fill="#000000" />
            <circle cx="522" cy="217" r="0.7" fill="#000000" />
          </g>


          {/* 
            WORKER 1: ROAD LINE PAINTER (Left)
            Fully static single-block group. Bounces & rocks back and forth as ONE piece.
            Zero individual limb movement prevents dismemberment!
          */}
          <g className="anim-painter-toy">
            <g transform="translate(110, 140)">
              {/* Hard hat */}
              <path d="M 10 20 A 12 12 0 0 1 34 20 Z" fill="#fbbf24" />
              <ellipse cx="22" cy="20" rx="15" ry="3.5" fill="#d97706" />
              
              {/* Head & Face */}
              <circle cx="22" cy="26" r="8" fill="#fed7aa" />
              <circle cx="20" cy="25" r="1.2" fill="#000000" />
              <circle cx="24" cy="25" r="1.2" fill="#000000" />
              <path d="M 21 29 Q 22 30 23 29" fill="none" stroke="#000000" strokeWidth="1" />

              {/* Orange jacket body */}
              <rect x="11" y="34" width="22" height="28" rx="8" fill="#f97316" />
              <rect x="14" y="38" width="16" height="4" fill="#fbbf24" />
              <rect x="14" y="48" width="16" height="4" fill="#fbbf24" />

              {/* Left Arm holding flag (Static relative to body) */}
              <g>
                <path d="M 14 42 C 6 42, 0 38, -2 30" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
                <circle cx="-2" cy="30" r="4.5" fill="#fed7aa" />
                <line x1="-2" y1="30" x2="-2" y2="8" stroke="#78350f" strokeWidth="2.5" />
                <polygon points="-2,8 -20,16 -2,22" fill="#ef4444" />
              </g>

              {/* Right Arm & Roller (Static relative to body) */}
              <g>
                <path d="M 28 42 C 34 42, 38 48, 42 56" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
                <circle cx="42" cy="56" r="4.5" fill="#fed7aa" />
                <line x1="42" y1="56" x2="52" y2="70" stroke="#78350f" strokeWidth="2.5" />
                <rect x="42" y="68" width="20" height="8" rx="2" fill="#fbbf24" />
              </g>

              {/* Legs */}
              <rect x="14" y="62" width="6" height="12" fill="#1e293b" rx="2" />
              <rect x="22" y="62" width="6" height="12" fill="#1e293b" rx="2" />
            </g>
          </g>


          {/* 
            VEHICLE: THE CUTE STEAMROLLER (Center)
            We wrap the entire vehicle, wheels, driver, exhaust pipe, and headlights 
            into a single sliding group (.anim-steamroller-entire).
            Only the wheels spin, and they rotate perfectly at their exact relative centers.
            The body chassis never splits!
          */}
          <g className="anim-steamroller-entire">
            
            {/* Steam Puffs aligned with exhaust pipe */}
            <g transform="translate(322, 110)">
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" opacity="0.15" className="anim-cartoon-steam-1" />
              <circle cx="0" cy="0" r="3.5" fill="#ffffff" opacity="0.15" className="anim-cartoon-steam-2" />
            </g>

            {/* Exhaust pipe */}
            <line x1="322" y1="138" x2="322" y2="120" stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 322 120 L 315 115" stroke="#475569" strokeWidth="3" />

            {/* Yellow cabin body */}
            <rect x="270" y="138" width="85" height="55" rx="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
            
            {/* Glass window */}
            <rect x="280" y="144" width="45" height="25" rx="6" fill="#1e293b" />
            <polygon points="305,144 320,144 300,169 285,169" fill="#38bdf8" opacity="0.25" />

            {/* Inside cabin driver */}
            <g transform="translate(285, 146)">
              <circle cx="15" cy="12" r="6" fill="#fed7aa" />
              <path d="M 8 10 A 8 8 0 0 1 22 10 Z" fill="#fbbf24" />
              <circle cx="13" cy="11" r="0.9" fill="#000000" />
              <circle cx="17" cy="11" r="0.9" fill="#000000" />
              <path d="M 14 15 Q 15 16 16 15" fill="none" stroke="#000000" strokeWidth="0.8" />
              <rect x="20" y="14" width="8" height="6" rx="2" fill="#f97316" />
            </g>

            {/* Headlights glowing */}
            <circle cx="352" cy="165" r="5" fill="#fef08a" />
            <circle cx="352" cy="165" r="8" fill="#fde047" opacity="0.2" className="animate-pulse" />

            {/* Rear Reflector bumper */}
            <rect x="265" y="175" width="15" height="6" fill="#f97316" rx="2" />
            
            {/* Connecting front roller heavy arm */}
            <path d="M 325,180 L 355,194" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <circle cx="325" cy="180" r="5" fill="#334155" />

            {/* Rear wheel (Spinning around exact relative center) */}
            <g className="anim-wheel-r">
              <circle cx="285" cy="193" r="21" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
              <circle cx="285" cy="193" r="10" fill="#cbd5e1" />
              <circle cx="285" cy="193" r="4" fill="#64748b" />
              <line x1="267" y1="193" x2="303" y2="193" stroke="#1e293b" strokeWidth="2" />
              <line x1="285" y1="175" x2="285" y2="211" stroke="#1e293b" strokeWidth="2" />
            </g>

            {/* Front solid drum roller (Spinning around exact relative center) */}
            <g className="anim-wheel-f">
              <rect x="340" y="173" width="30" height="42" rx="10" fill="#64748b" stroke="#475569" strokeWidth="2" />
              <ellipse cx="355" cy="194" r="14" fill="#94a3b8" />
              <line x1="343" y1="189" x2="367" y2="199" stroke="#475569" strokeWidth="2" />
              <line x1="350" y1="206" x2="360" y2="182" stroke="#475569" strokeWidth="2" />
            </g>

          </g>


          {/* 
            WORKER 2: THE SHOVELER / ROAD BUILDER (Right)
            Limb and shovel are 100% fixed relative to body.
            The entire block slides/tilts in unison as ONE pieces via CSS translation.
          */}
          <g className="anim-shoveler-toy">
            <g transform="translate(440, 140)">
              {/* Hard hat */}
              <path d="M 10 20 A 12 12 0 0 1 34 20 Z" fill="#38bdf8" />
              <ellipse cx="22" cy="20" rx="15" ry="3.5" fill="#0284c7" />
              
              {/* Head & Face */}
              <circle cx="22" cy="26" r="8" fill="#fed7aa" />
              <circle cx="20" cy="25" r="1.2" fill="#000000" />
              <circle cx="24" cy="25" r="1.2" fill="#000000" />
              <path d="M 21 29 Q 22 30 23 29" fill="none" stroke="#000000" strokeWidth="1" />

              {/* Blue work shirt */}
              <rect x="11" y="34" width="22" height="28" rx="8" fill="#0ea5e9" />
              <rect x="15" y="34" width="14" height="28" fill="#fbbf24" opacity="0.8" /> {/* Yellow warning vest stripe */}

              {/* Arm, Hand, and Shovel are static relative to body */}
              <g>
                <path d="M 14 42 C 6 42, -2 48, -6 56" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
                <circle cx="-6" cy="56" r="4" fill="#fed7aa" />
                <line x1="-15" y1="46" x2="-2" y2="72" stroke="#78350f" strokeWidth="2.5" />
                <path d="M -15 46 L -22 38 C -24 35, -20 32, -18 35 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
              </g>

              {/* Second supporting arm resting steady on back hip */}
              <path d="M 28 42 C 32 46, 30 52, 28 56" fill="none" stroke="#0ea5e9" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="28" cy="56" r="4" fill="#fed7aa" />

              {/* Legs */}
              <rect x="14" y="62" width="6" height="12" fill="#1e293b" rx="2" />
              <rect x="22" y="62" width="6" height="12" fill="#1e293b" rx="2" />
            </g>
          </g>

          {/* Construction Floor solid outline */}
          <line x1="20" y1="225" x2="580" y2="225" stroke="#334155" strokeWidth="4" />
          <line x1="20" y1="227" x2="580" y2="227" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="10 15" />
          
          {/* Main "CAUTION" board hanging on left */}
          <g transform="translate(20, 20)">
            <line x1="15" y1="0" x2="15" y2="20" stroke="#475569" strokeWidth="1.5" />
            <line x1="55" y1="0" x2="55" y2="20" stroke="#475569" strokeWidth="1.5" />
            <rect x="0" y="20" width="70" height="35" rx="3" fill="#e11d48" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="35" y="41" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              CAUTION
            </text>
          </g>
        </svg>

        {/* Floating text badge */}
        <div className="absolute bottom-5 left-5 flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-[10px] font-mono text-amber-500 font-bold">
          <span>SCHEDULED BACK ONLINE : 10TH JULY 2026</span>
        </div>
      </div>
    </div>
  );
}
