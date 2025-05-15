"use client"

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { deleteProgramAction } from '../libs/action';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const initialState = {
    message : ""
}

const ProgramDeleteForm = ({id}) => {

    const router = useRouter()

    const deleteById = (_, formData) => deleteProgramAction(_, formData, id)

    const [state, formAction] = useActionState(deleteById, initialState)

    useEffect(() => {
            if(state.success && state.redirectUrl){
                router.push(redirectUrl)
            }
    }, [state, router])

    return (
        <form action={formAction}>
            <Button type="submit" variant="outline" size="sm" className="text-xs">
              Hapus
            </Button>
        </form>
    );
};

export default ProgramDeleteForm;