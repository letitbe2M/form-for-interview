"use client";
import { FC } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export const ReactSelectInput: FC<any> = ({
  name,
  label,
  errors,
  options,
  isMulti,
  control,
  required,
  defaultValue,
  placeholder,
  errorMessage,
  isDisabled,
}) => {
  const hasError = errors && errors[name] && errors[name]?.message;
  const hasErrorWithDefaultValue =
    (errors && errors[name] && errors[name]?.value?.message) ||
    errors[name]?.[0]?.value?.message;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: hasError || hasErrorWithDefaultValue ? "#EF4444" : "#E5E7EB",
      backgroundColor: "F2F2F0",
      height: "2.7rem",
      borderRadius: ".5rem",
      width: "100%",
      fontSize: ".75rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      fontSize: ".8rem",
      color: state.isSelected ? "blue" : "black",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
    menu: (provided: any) => ({
      zIndex: 999999,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "0.85rem",
      color: "#BDB8D0",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }),
    menuList: (provided: any) => ({
      ...provided,
      height: "8rem",
      zIndex: 999999,
    }),
  };
  return (
    <div className="relative">
      <div>
        <label
          className={`absolute bg-white z-10 -mt-3 mr-5 px-2 text-gray-700 text-sm font-bold ${
            required && "flex items-center gap-2"
          } ${hasError || hasErrorWithDefaultValue ? "text-red-500" : ""}`}
        >
          {label}
          {required && <span className=" pt-1 text-red-500">*</span>}
        </label>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => (
            <ReactSelect
              defaultValue={defaultValue?.value ? defaultValue : null}
              isMulti={isMulti}
              onChange={onChange}
              styles={customStyles}
              placeholder={placeholder}
              options={options}
              isDisabled={isDisabled}
              noOptionsMessage={() => "موردی یافت نشد"}
            />
          )}
        />
      </div>
      {hasErrorWithDefaultValue || hasError ? (
        <div className="absolute text-[11px] text-right w-full flex gap-1 items-center text-red-500">
          <p className="mt-1">*</p>
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
};
