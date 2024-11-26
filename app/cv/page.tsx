import React from "react";
import FormSubmitCv from "./_components/FormSubmitCv";

const page = () => {
  return (
    <div className="container justify-center flex mx-auto w-full px-2">
      <div className="w-full">
        <div className="flex gap-2 flex-col py-4">
          <h1 className="font-bold">فرم درخواست</h1>
          <p className="text-gray-500 font-thin">ارسال رزومه برای شغل: تست ۲</p>
        </div>
        <hr className="mb-10 h-[2px] bg-blue-700" />
        <FormSubmitCv />
      </div>
    </div>
  );
};

export default page;
