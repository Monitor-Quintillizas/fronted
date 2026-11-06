import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LoginFooter() {
  return (
    <div className="mt-5 pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
      <div className="flex items-center justify-center gap-1.5 text-slate-400 font-mono text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Credenciales por defecto: <strong>admin</strong> / <strong>1234</strong></span>
      </div>
    </div>
  );
}
