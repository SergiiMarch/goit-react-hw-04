import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputSubmit = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Enter a valid value!");
      return;
    }
    onSubmit(inputValue);
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputSubmit}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
