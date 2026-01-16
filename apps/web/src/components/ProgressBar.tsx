import React from "react";

const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="w-full bg-slate-800 rounded-full h-2">
      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
