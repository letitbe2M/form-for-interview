"use client";
import React, { DragEvent, useRef, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "../utils";

type Props = {
  onUpload: (file: File) => void;
  onDelete?: any;
  register: UseFormRegister<any>;
  id: string;
  errors?: FieldErrors<any>;
  label: string;
  uploadedImage: string | null;
  isRequired?: boolean;
  loading?: boolean;
  onSelectImage: (file: File) => void;
  imageForDeleteId: any;
};

const CustomImageUploaderWhenThereIsNoLink = ({
  onUpload,
  label,
  id,
  errors,
  onSelectImage,
  onDelete,
  imageForDeleteId,
  loading,
}: Props) => {
  const hasError = errors && errors[id] && errors[id]?.message;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border", "border-blue-500");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border", "border-blue-500");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = "2px dashed gray";

    if (e.dataTransfer.items) {
      const file = Array.from(e.dataTransfer.items)
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile())
        .filter((file) => file !== null)[0] as File | null;

      if (file) {
        setSelectedImage(file);
        onSelectImage(file);
        onUpload(file);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      onSelectImage(file);
      onUpload(file);
    }
  };

  const handleDeleteImage = () => {
    onDelete(imageForDeleteId);
    setSelectedImage(null);
  };

  return (
    <div
      className="dropzone min-h-[10rem] relative w-full border-dashed border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      tabIndex={0}
      aria-label="Drop image here or click to upload"
      onClick={() => fileInputRef.current?.click()}
    >
      <label
        htmlFor="image-picker"
        className={cn(
          hasError && "!text-red-500",
          "absolute bg-white flex gap-2 justify-center items-center font-bold before:block text-gray-700 text-[12px] text-left -top-5 px-3 cursor-pointer"
        )}
      >
        {label}
        <MdOutlineCreateNewFolder
          className="cursor-pointer text-4xl text-primary hover:text-primary-700"
          // onClick={handleFolderIconClick}
          role="button"
          aria-label="Open file dialog"
        />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-picker"
        aria-describedby={hasError ? `error-${id}` : undefined}
      />

      <div className="flex w-full flex-wrap justify-center">
        {selectedImage && (
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt={`Selected image: ${selectedImage.name}`}
              className="max-w-32 max-h-32"
              style={{ width: "100%", height: "auto" }}
            />
            <button
              className="absolute top-0 right-0 bg-gray-300 text-white rounded-2xl text-xs p-[1px]"
              onClick={handleDeleteImage}
              aria-label="Delete image"
            >
              X
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-500 absolute items-center flex justify-center">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            Loading...
          </div>
        ) : (
          !selectedImage && (
            <div className="flex flex-col justify-center items-center">
              <FcAddImage size={60} />
              <p className="text-gray-400 justify-center items-center flex">
                عکس خود را بکشید و در این قسمت رها کنید
              </p>
            </div>
          )
        )}
      </p>
    </div>
  );
};

export default CustomImageUploaderWhenThereIsNoLink;
