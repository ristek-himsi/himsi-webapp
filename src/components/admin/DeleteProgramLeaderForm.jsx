"use client"

import { Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { deleteProgramByLeaderAction } from '@/app/(roles)/leader/programs/libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const DeleteProgramLeaderForm = ({id}) => {

    const router = useRouter()

    const deleteProgramById = (_, formData) => deleteProgramByLeaderAction(_, formData, id)

    const [state, formAction] = useActionState(deleteProgramById, initialState)

    useEffect(() => {

        if (state.success && state.redirectUrl){
            return router.push(state.redirectUrl)
        }

    },[state, router])

    return (
        <form action={formAction}>

            <button
            type='submit'
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Hapus
            </button> 
        </form>
    );
};

export default DeleteProgramLeaderForm;