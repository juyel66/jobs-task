import React from "react";

export interface ImagePreviewerProps {
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagePreviewer: React.FC<ImagePreviewerProps> = ({
  imageFiles,
  setImageFiles,
  imagePreview,
  setImagePreview,
}) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {imagePreview.map((src, index) => (
        <div
          key={index}
          className="relative w-24 h-24 border rounded-lg overflow-hidden"
        >
          <img
            src={src}
            alt={`preview-${index}`}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
