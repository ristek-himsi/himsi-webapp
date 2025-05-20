"use client";

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { DeleteAchievementAction } from '../libs/action';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

const initialState = {
    message: ""
}

const DeleteAchievementForm = ({id}) => {
    const router = useRouter()
    const deleteById = (_, formData) => DeleteAchievementAction(_, formData, id)

    const [state, formAction] = useActionState(deleteById, initialState)

    useEffect(() => {
        if (state.success && state.redirectUrl){
            router.push(state.redirectUrl)
        }
    },[state, router])

    return (
        <form className='w-full' action={formAction}>
            {/* {state.message && <div>{state.message}</div>} */}
            <button 
                type='submit'
                className="px-3 text-xs sm:text-sm py-1.5 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center w-full justify-center">
                <Trash2 className="w-4 h-4 mr-1" /> Hapus
            </button>
        </form>
    );
};

export default DeleteAchievementForm;