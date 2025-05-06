import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file, path = "divisi") => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage.from("images").upload(`public/${path}/${fileName}`, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    console.error("Upload error:", error);
    throw error;
  }
  console.log("Uploaded file:", fileName);
  return fileName;
};

export const getImageUrl = (name, path = "divisi") => {
  const { data } = supabase.storage.from("images").getPublicUrl(`public/${path}/${name}`);
  return data.publicUrl;
};

export const deleteFile = async (fileName, path = "brands") => {
  const { error } = await supabase.storage.from("images").remove([`public/${path}/${fileName}`]);
  if (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export const extractFilenameFromUrl = (url) => {
  if (!url) return null;
  return url.split("/").pop();
};
