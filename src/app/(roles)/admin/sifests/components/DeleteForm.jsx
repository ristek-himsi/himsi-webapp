"use client"

import React, { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSifestAction } from '../libs/action';

const initialState = {
    message : ""
}

const DeleteForm = ({id}) => {

    const deleteById = (_,formData) => deleteSifestAction(_, formData, id)

    const [state, formAction] = useActionState(deleteById, initialState)

    const router = useRouter()

    useEffect(() => {
        if(state.success && state.redirectUrl){
            router.push(state.redirectUrl)
        }
    },[state, router])

    return (
        <form action={formAction} >
            <button type='submit' className="text-red-600 cursor-pointer hover:text-red-800">Delete</button>
        </form>
    );
};

export default DeleteForm;