"use client"

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { deletePostAction } from '../libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const DeletePostForm = ({id}) => {

    const deleteById = (_, formData) => deletePostAction(_, formData, id)

    const [state, formAction] = useActionState(deleteById, initialState)

    const router = useRouter()

    useEffect(() => {

        if (state.success && state. redirectUrl){
            router.push(state.redirectUrl)
        }

    }, [state, router])

    return (
        <form className='w-1/2' action={formAction}>
             <button 
             className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base w-full">
                  Hapus
                </button>
        </form>
    );
};

export default DeletePostForm;