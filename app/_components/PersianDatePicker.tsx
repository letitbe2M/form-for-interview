import { useEffect, useState } from "react";
import { DatePicker } from "zaman";

type Props = {
  label: string;
  selectedDate: any;
  setSelectedDate: (date: any) => void;
  name: string;
  errors?: any;
  required?: boolean;
};

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function PersianDatePicker({
  label,
  selectedDate,
  setSelectedDate,
  name,
  errors,
  required,
}: Props) {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(errors && errors[name] && errors[name]?.message ? true : false);
  }, [errors, name]);

  const handleDateChange = (date: any) => {
    const formatedDate = formatDate(date.value);
    setSelectedDate(formatedDate);
    setError(false);
  };
  return (
    <div className="flex flex-col justify-center w-full">
      <label
        className={`absolute mr-5 mb-12 text-sm items-center justify-center font-bold px-2 bg-white flex flex-row-reverse gap-2 pt-2 ${
          error ? "text-red-500" : "text-gray-700"
        }`}
        htmlFor="datepicker"
      >
        {required && <span className=" pt-1 text-red-500">*</span>}

        {label}
      </label>
      <DatePicker
        round="x4"
        position="center"
        className={`w-80 outline-none rounded-lg border border-gray-300 z-[999] relative mb-2`}
        inputClass={`outline-none text-sm focus:outline-none bg-background-color ${
          error ? "border-red-500" : "border-gray-200"
        }  placeholder-sm w-full border border-gray-200 rounded-lg py-[.62rem] text-black font-light text-center`}
        aria-label="Select a Date"
        onChange={(date) => {
          handleDateChange(date);
        }}
      />
      {error && (
        <div className="flex text-red-500 text-[.7rem] items-center gap-1 absolute pt-16">
          <p className="pt-1">*</p>
          <p className="">لطفا تاریخ را انتخاب کنید</p>
        </div>
      )}
    </div>
  );
}
