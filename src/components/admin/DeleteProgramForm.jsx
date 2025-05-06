"use client";

import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { deleteProgramAction } from '@/app/(roles)/admin/programs/libs/action';

const initialState = {
  message: "",
  success: false,
  error: false,
  redirectUrl: null
};

// Submit button component with loading state
const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center disabled:bg-red-400 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menghapus...
        </>
      ) : (
        'Hapus Program'
      )}
    </button>
  );
};

const DeleteProgramForm = ({ programId, programName }) => {
  const deleteProgramById = () => deleteProgramAction(programId);

  const [state, formAction] = useActionState(deleteProgramById, initialState);

  // Redirect user if needed after successful deletion
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
        <p>Apakah Anda yakin ingin menghapus program <strong>{programName}</strong>?</p>
        <p className="text-sm mt-2">Tindakan ini tidak dapat dibatalkan.</p>
      </div>
      
      <form action={formAction}>
        {/* Menampilkan pesan hasil dari action */}
        {state?.message && (
          <div className={`flex items-center p-4 mt-4 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {state.success ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <span>{state.message}</span>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default DeleteProgramForm;