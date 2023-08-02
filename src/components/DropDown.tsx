import React, { useState } from "react";

interface DropDownProps {
  onOptionChange: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("20");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    onOptionChange(value);
  };

  return (
    <div className="flex justify-end">
      <div className="relative inline-block text-left">
        <div>
          <span className="rounded-md shadow-sm">
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="border rounded p-1"
            >
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
              <option value="80">80</option>
              <option value="100">100</option>
            </select>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
