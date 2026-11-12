import React from 'react';
import { getSpecsForTab } from '../utils/specsConfig';

export default function ComponentSpecs({
  activeTab,
  metrics,
  selectedHost,
  uptimeFormatted
}) {
  const specs = getSpecsForTab(activeTab, metrics, selectedHost, uptimeFormatted);

  return (
    <div className="border-t border-slate-800 pt-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        {specs.map((item, index) => (
          <div key={index} className="space-y-0.5">
            <span className="text-slate-400 block text-[10px]">{item.label}</span>
            <span className={`font-bold text-xs ${item.color || 'text-slate-100'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
