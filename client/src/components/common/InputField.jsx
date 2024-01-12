import React from 'react';
import { twMerge } from 'tailwind-merge';

const InputField = ({ label, id, name, value, onChange, type = 'text' }) => {
    return (
        <div className={twMerge("mb-4 flex flex-col items-start", type == "checkbox" && "flex-row items-center gap-4 ")}>
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label}:
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={twMerge("flex w-full border rounded-md p-2", type == "checkbox" && "w-auto")}
            />
        </div>
    );
};

export default InputField;
