"use client";

import React, { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "../utils";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  label: string;
  placeholder?: string;
  errors?: FieldErrors<any>;
  id: string;
  style?: React.CSSProperties;
  hidden?: boolean;
  required?: boolean;
  labelColor?: string;
  maxLength?: number;
  isNumber?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  id,
  placeholder,
  label,
  errors,
  required,
  labelColor,
  style,
  hidden,
  maxLength,
  isNumber,
  ...rest
}) => {
  const hasError = errors && errors[id] && errors[id]?.message;

  return (
    <div className="relative text-xs w-full">
      <label
        style={{ backgroundColor: labelColor ? labelColor : "" }}
        className={cn(
          hidden ? "hidden " : "",
          hasError && "!text-red-500",
          "absolute bg-white leading-[0.2rem] font-bold -mt-2 mr-5 px-2 before:block text-gray-700 text-sm flex-row-reverse",
          required && "flex gap-2"
        )}
      >
        {required && <span className=" text-red-500">*</span>}
        {label}
      </label>
      <input
        autoComplete="off"
        {...register?.(id)} // Connect to react-hook-form
        placeholder={placeholder}
        type="text"
        className={cn(
          hidden ? "hidden" : "",
          hasError && "!border-red-500",
          "text-base focus:outline-none placeholder-sm w-full border border-gray-200 rounded-lg py-2 text-black bg-background-color font-light text-center"
        )}
        maxLength={maxLength}
        onInput={(e) => {
          if (isNumber) {
            const value = (e.target as HTMLInputElement).value.replace(
              /[^0-9۰-۹]/g,
              ""
            );
            (e.target as HTMLInputElement).value = value;
          }
        }}
        style={{ ...style, fontSize: "13px" }}
        {...rest}
      />
      {hasError && (
        <div className="absolute text-[11px] text-right w-full flex gap-1 items-center text-red-500">
          <p className="mt-1">*</p>
          <p>{errors[id]?.message as string}</p>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
