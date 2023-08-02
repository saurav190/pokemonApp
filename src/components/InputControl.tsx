import React from 'react';

interface InputControlProps {
  inputname: string;
  inputclass?: string;
  type: string;
  labelname: string;
  value : string,
  placeholder: string
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputControl: React.FC<InputControlProps> = ({ inputname, inputclass, type, labelname ,placeholder, onchange , value}) => {
  return (
    <div className="py-4">
      <label htmlFor={inputname} className="block font-semibold text-gray-700">
        {labelname}
      </label>
      <input
        type={type}
        name={inputname}
        className={`mt-1 px-4 py-2 border rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 ${inputclass}`}
        onChange={onchange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default InputControl;
