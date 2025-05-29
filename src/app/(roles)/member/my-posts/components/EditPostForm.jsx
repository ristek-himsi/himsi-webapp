"use client"

import { getImageUrl } from "@/lib/supabase";
import { editMemberPostAction } from "../libs/action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const intialState = {
    message : ""
}

const EditPostForm = ({ post }) => {

  const editById = (_, formData) => editMemberPostAction(_, formData, post?.id)

  const [state, formAction] = useActionState(editById, intialState)

  const router = useRouter()

  useEffect(() => {

    if(state.success && state.redirectUrl){
      router.push(state.redirectUrl)
    }

  },[state, router])

  return (
    <form action={formAction} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Judul Artikel
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post?.title || ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Konten Artikel
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={post?.content || ""}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Category - Read Only */}
      <div className="hidden" >
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Kategori
        </label>
        <input 
          type="text" 
          id="category" 
          name="category" 
          value={post?.category || ""} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed" 
          disabled 
          readOnly 
        />
      </div>

      {/* Status - Read Only */}
      <div className="hidden" >
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <input 
          type="text" 
          id="status" 
          name="status" 
          value={post?.status || ""} 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed" 
          disabled 
          readOnly 
        />
      </div>

      {/* Image File */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Gambar Artikel
        </label>
        {post?.imageUrl && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Gambar saat ini: {post.imageUrl}</p>
            <img 
              src={getImageUrl(post.imageUrl, "posts")} 
              alt="Current image" 
              className="w-32 h-32 object-cover rounded-md border" 
            />
          </div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-sm text-gray-500">Pilih gambar baru jika ingin mengubah gambar saat ini</p>
      </div>


      {/* Submit Buttons */}
      <div className="flex gap-4">
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;