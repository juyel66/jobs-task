import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import Image from "next/image";

export type TImageUploaderProps = {
  label: string;
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  setImagePreview: Dispatch<SetStateAction<string[]>>;
  imagePreview: string[];
};

const ImageUpload = ({
  setImageFiles,
  setImagePreview,
  imagePreview,
  label,
}: TImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = ""; // clear selection
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <input
        onChange={handleImageChange}
        className="hidden"
        id="image-uploader"
        type="file"
        multiple
        accept="image/*"
      />
      <label
        htmlFor="image-uploader"
        className="cursor-pointer inline-block rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        {label}
      </label>

      <div className="flex gap-3 mt-2">
        {imagePreview.map((preview, idx) => (
          <Image
            key={idx}
            src={preview}
            alt="preview"
            width={40}
            height={40}
            className="rounded border"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
