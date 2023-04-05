import React from "react";

function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-900 text-xs text-white">
      <p>Copyright &copy; {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
