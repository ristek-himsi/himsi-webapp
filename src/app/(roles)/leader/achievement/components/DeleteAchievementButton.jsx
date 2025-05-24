'use client'

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { DeleteAchievementByLeaderAction } from '../libs/action';

const initialState = {
  message : ""
}

const DeleteAchievementButton = ({ achievementId }) => {

  const deleteById = (_, formData) => DeleteAchievementByLeaderAction(_, formData, achievementId)

  const [state, formAction] = useActionState(deleteById, initialState)

  const router = useRouter();

  useEffect(() => {

    if(state.success && state.redirectUrl){
      router.push(state.redirectUrl)
    }

  },[state, router])


  return (
    <form className='flex-1' action={formAction}>
      <button type='submit'
        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Hapus
      </button>

      {/* Modal Konfirmasi */}

    </form>
  );
};

export default DeleteAchievementButton;