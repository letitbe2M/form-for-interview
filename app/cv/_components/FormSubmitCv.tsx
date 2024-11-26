"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import CustomForm from "@/app/_components/CustomForm";
import CustomInput from "@/app/_components/CustomInput";
import CustomButton from "@/app/_components/CustomButton";
import { ReactSelectInput } from "@/app/_components/ReactSelectInput";
import PersianDatePicker from "@/app/_components/PersianDatePicker";
import { CreateCvFormSchema } from "@/app/lib/schemas";
import { MILITARY_STATUS, SEX } from "@/app/config";
import CustomImageUploaderWhenThereIsNoLink from "@/app/_components/CustomImageUploaderWhenThereIsNoLink";

type Inputs = z.infer<typeof CreateCvFormSchema>;

const FormSubmitCv: React.FC = () => {
  const [birthday, setBirthday] = useState<any>();
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(CreateCvFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      birthday: "",
      email: "",
      militaryStatus: {},
      sex: {},
      image: "",
    },
  });
  setValue("birthday", birthday);
  setValue("image", image);

  const handleUpload = (file: File) => {
    setImage(file);
  };

  const handleDelete = () => {
    setImage(null);
  };

  const handleSelectImage = (file: File) => {
    console.log("Selected Image:", file);
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    await console.log({ data });
    toast("داده شما با موفقیت ثبت شد و می‌توانید در کنسول مشاهده کنید", {
      style: {
        color: "green",
        alignItems: "center",
        fontSize: "1rem",
        display: "flex",
        justifyContent: "center",
      },
    });
  };

  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)}>
      <div className="animation-container w-full h-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 overflow-x-hidden pt-2 pb-20 ">
        <CustomInput
          label="نام و نام خانوادگی"
          id="fullName"
          placeholder="نام و نام خانوادگی خود را وارد کنید"
          register={register}
          errors={errors}
          required
          maxLength={30}
        />
        <CustomInput
          label="شماره تلفن"
          id="phoneNumber"
          isNumber
          placeholder="شماره تلفن خود را وارد کنید"
          register={register}
          errors={errors}
          required
          maxLength={11}
        />

        <PersianDatePicker
          label="تاریخ تولد"
          selectedDate={birthday}
          setSelectedDate={setBirthday}
          name="birthday"
          errors={errors}
          required
        />
        <CustomInput
          label="ایمیل"
          id="email"
          placeholder="ایمیل خود را وارد کنید"
          register={register}
          errors={errors}
          required
          maxLength={40}
        />
        <ReactSelectInput
          isMulti={false}
          control={control}
          register={register}
          name="militaryStatus"
          placeholder="وضعیت نظام وظیفه خود را انتخاب کنید"
          label="وضعیت نظام وظیفه"
          options={MILITARY_STATUS.map((p: any) => ({
            value: String(p.id),
            label: p.name,
          }))}
          errors={errors}
          errorMessage={"لطفا یک مورد را انتخاب کنید"}
          required
        />

        <ReactSelectInput
          isMulti={false}
          control={control}
          label="جنسیت"
          name="sex"
          register={register}
          placeholder=" جنسیت خود را انتخاب کنید"
          options={SEX.map((p: any) => ({
            value: String(p.id),
            label: p.name,
          }))}
          errors={errors}
          errorMessage={"لطفا یک مورد را انتخاب کنید"}
          required
        />
      </div>
      <div className="image-animation pb-5">
        <CustomImageUploaderWhenThereIsNoLink
          onUpload={handleUpload}
          onDelete={handleDelete}
          register={register}
          id="image"
          label="اضافه کردن تصویر رزومه"
          uploadedImage={image ? URL.createObjectURL(image) : null}
          onSelectImage={handleSelectImage}
          imageForDeleteId={null}
          isRequired={true}
          loading={false}
        />
      </div>
      <div className="button-animation pb-14 lg:pb-2 w-full">
        <div className="w-full justify-end flex">
          <div className="">
            <CustomButton
              title="ثبت رزومه"
              type="submit"
              largerButton={true}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </CustomForm>
  );
};

export default FormSubmitCv;
