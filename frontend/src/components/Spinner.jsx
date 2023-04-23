import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-300"></div>
    </div>
  );
}

export default Spinner;
