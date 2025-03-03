import { useState } from "react";
import PropTypes from "prop-types";

function DropdownSettings({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative mt-[50px] ">
      <div
        onClick={toggleDropdown}
        className={`${
          !isOpen ? "max-h-[100px] overflow-hidden select-none" : "max-h-[200px] overflow-auto"
        } cursor-pointer bg-custom-bg mt-[14px] p-[20px] w-full flex justify-center rounded-[14px] whitespace-pre-line duration-300`}
      >
        <div className={`${!isOpen ? "opacity-35" : ""}`}>{children}</div>
        <img
          className={`${!isOpen ? "" : "-rotate-90"} absolute right-[10px] bottom-0 rotate-90 hover:scale-105 opacity-95 duration-300 cursor-pointer select-none`}
          src="icons/pijl.svg"
          alt="arrow-icon"
        />
      </div>
    </div>
  );
}

DropdownSettings.propTypes = {
  children: PropTypes.node.isRequired,
}
export default DropdownSettings;