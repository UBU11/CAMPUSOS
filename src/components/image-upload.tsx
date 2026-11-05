"use client";

import { Button } from "@/components/ui/button";
import { getPresignedUploadUrlAction } from "@/server/actions/r2";
import imageCompression from "browser-image-compression";
import { Loader2, Upload } from "lucide-react";
import * as React from "react";

interface ImageUploadProps {
  onUploadSuccess: (payload: { publicUrl: string; key: string }) => void;
  className?: string;
}

export function ImageUpload({ onUploadSuccess, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const presignResult = await getPresignedUploadUrlAction({
        fileName: file.name.replace(/\.[^/.]+$/, ".webp"),
        contentType: "image/webp",
      });

      if (!presignResult?.data) {
        throw new Error(presignResult?.serverError ?? "Failed to acquire presigned upload URL");
      }

      const { uploadUrl, publicUrl, key } = presignResult.data;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: compressedFile,
        headers: {
          "Content-Type": "image/webp",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to storage");
      }

      onUploadSuccess({ publicUrl, key });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Compressing & Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </>
        )}
      </Button>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
