import React, { useState, useEffect, useRef } from "react";
import "./customSelect.css";
import { FaCaretDown } from "react-icons/fa";

const CustomSelectForChooseCar = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleOptionClick(options[highlightedIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === " " && !isOpen) {
      toggleDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(-1); 
    }
  }, [isOpen]);

  return (
    <div
      className={`custom-select ${isOpen ? "open" : ""}`}
      ref={selectRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {label && <label className="select-label">{label}</label>}
      <div
        className="select-selected d-flex justify-content-between"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        {value.label || "Select a car"}
        <FaCaretDown />
      </div>
      {isOpen && (
        <div className="select-items">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`select-item ${
                  index === highlightedIndex ? "highlighted" : ""
                }`}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="no-options">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelectForChooseCar;
