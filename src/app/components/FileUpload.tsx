"use client";

import { FileUploadProps } from "../../../types";
import { useState } from "react";
import { toast } from "sonner";

interface UploadResult {
  videoUrl: string;
  publicId: string;
  duration?: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUpload({
  onSuccess,
  fileType = "video",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 10 MB");
      return false;
    }

    return true;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = (await response.json()) as UploadResult;
      toast.success("Upload completed successfully!"); // 4. Success toast
      onSuccess(result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Video upload failed", err);
      toast.error(err.message || "Video upload failed"); // 5. Error toast
      event.target.value = "";
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
      />

      {uploading && (
        <div className="flex items-center gap-2 text-blue-600">
          <span className="animate-spin">⏳</span>
          <p className="text-sm font-medium">Uploading to server...</p>
        </div>
      )}
    </div>
  );
}
