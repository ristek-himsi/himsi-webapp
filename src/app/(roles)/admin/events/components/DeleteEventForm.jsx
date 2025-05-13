"use client"

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { deleteEventAction } from '../libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const DeleteEventForm = ({id}) => {

    const router = useRouter()

    const deleteById = (_, formData) => deleteEventAction(_, formData, id)

    const [state, formAction] = useActionState(deleteById, initialState)

    useEffect(() => {
        if (state.success && state.redirectUrl){
            router.push(state.redirectUrl)
        }
    }, [state, router])

    return (
        <form action={formAction} >
             <button
            type='submit'
              className="text-red-500 hover:text-red-700"
              title="Hapus event">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
        </form>
    );
};

export default DeleteEventForm;