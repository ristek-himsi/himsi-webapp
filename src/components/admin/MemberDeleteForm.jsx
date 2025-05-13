"use client";

import React, { useActionState } from 'react';
import { Trash } from 'lucide-react';
import { deleteMemberAction } from '@/app/(roles)/leader/members/libs/action';

const initialState = {
    message: ""
};

const MemberDeleteForm = ({ userId }) => {
    const deleteMemberbyId = (_, formData) => deleteMemberAction(_, formData, userId);
    const [state, formAction] = useActionState(deleteMemberbyId, initialState);
    
    return (
        <form action={formAction} className="inline-block">
            <button
                className="p-1.5 md:p-2 text-red-600 hover:bg-red-50 rounded-full"
                aria-label="Delete member"
                type='submit'
            >
                <Trash className="w-4 h-4 md:w-5 md:h-5" />
            </button>
        </form>
    );
};

export default MemberDeleteForm;