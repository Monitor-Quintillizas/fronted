import React from 'react';

export default function WallpaperBackground({ bgImage }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <img
        key={bgImage}
        src={bgImage}
        alt="Wallpaper"
        className="w-full h-full object-cover opacity-25 filter blur-[2px] transition-opacity duration-700 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/90 to-slate-950/95" />
    </div>
  );
}
