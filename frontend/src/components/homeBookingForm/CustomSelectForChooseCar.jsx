import React, { useState, useEffect, useRef } from "react";
import "./customSelect.css";
import { FaCaretDown } from "react-icons/fa";

const CustomSelectForChooseCar = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`} ref={selectRef}>
      {label && <label className="select-label">{label}</label>}
      <div
        className="select-selected d-flex justify-content-between"
        onClick={toggleDropdown}
      >
        {value.label || "Select a car"}
        <FaCaretDown />
      </div>
      {isOpen && (
        <div className="select-items">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="select-item"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectForChooseCar;
