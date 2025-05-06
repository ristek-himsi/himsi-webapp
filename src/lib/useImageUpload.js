import { useState } from "react";
import { uploadImage, updateImage, deleteImage } from "../lib/supabase";

/**
 * Custom hook for managing image uploads with Supabase
 * @param {string} folder - The folder path within the 'images' bucket (e.g., 'divisions', 'events')
 * @returns {Object} - Methods and state for image upload operations
 */
export function useImageUpload(folder) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Handle image upload with preview capability
   * @param {File} file - The file to upload
   * @param {string} [customFileName] - Optional custom filename
   * @returns {Promise<{path: string, previewUrl: string}>} - Upload results
   */
  const handleUpload = async (file, customFileName) => {
    if (!file) {
      setError("No file selected");
      return { path: null, previewUrl: null };
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return { path: null, previewUrl: null };
    }

    // Create a local preview URL
    const previewUrl = URL.createObjectURL(file);

    try {
      setIsUploading(true);
      setError(null);

      // Simulate progress (since Supabase doesn't provide upload progress yet)
      const progressInterval = simulateProgress();

      // Upload to Supabase
      const { path, error } = await uploadImage(file, folder, customFileName);

      // Clear progress simulation
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        setError(error.message || "Upload failed");
        return { path: null, previewUrl };
      }

      return { path, previewUrl };
    } catch (err) {
      setError(err.message || "Upload failed");
      return { path: null, previewUrl };
    } finally {
      setIsUploading(false);
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  /**
   * Update an existing image
   * @param {string} oldPath - Path of the existing image
   * @param {File} newFile - New image file
   * @param {string} [customFileName] - Optional custom filename
   * @returns {Promise<{path: string, previewUrl: string}>} - Update results
   */
  const handleUpdate = async (oldPath, newFile, customFileName) => {
    if (!oldPath || !newFile) {
      setError("Missing required parameters");
      return { path: null, previewUrl: null };
    }

    // Create a local preview URL
    const previewUrl = URL.createObjectURL(newFile);

    try {
      setIsUploading(true);
      setError(null);

      // Simulate progress
      const progressInterval = simulateProgress();

      // Update in Supabase
      const { path, error } = await updateImage(oldPath, newFile, folder, customFileName);

      // Clear progress simulation
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (error) {
        setError(error.message || "Update failed");
        return { path: null, previewUrl };
      }

      return { path, previewUrl };
    } catch (err) {
      setError(err.message || "Update failed");
      return { path: null, previewUrl };
    } finally {
      setIsUploading(false);
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  /**
   * Delete an image
   * @param {string} path - Path of the image to delete
   * @returns {Promise<boolean>} - Delete success status
   */
  const handleDelete = async (path) => {
    if (!path) {
      setError("No image path provided");
      return false;
    }

    try {
      setError(null);
      const { success, error } = await deleteImage(path);

      if (!success) {
        setError(error.message || "Delete failed");
        return false;
      }

      return true;
    } catch (err) {
      setError(err.message || "Delete failed");
      return false;
    }
  };

  /**
   * Simulates upload progress for better UX
   * @returns {number} - Interval ID for clearing
   */
  const simulateProgress = () => {
    return setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.random() * 15;
        return next > 95 ? 95 : next; // Cap at 95% until actual completion
      });
    }, 300);
  };

  /**
   * Reset the state of the hook
   */
  const reset = () => {
    setError(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return {
    handleUpload,
    handleUpdate,
    handleDelete,
    isUploading,
    uploadProgress,
    error,
    reset,
  };
}

export default useImageUpload;
