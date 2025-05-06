"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ProgramCard } from "./ProgramCard";

export const ProgramsPage = ({ programs, divisions }) => {
    const [selectedDivision, setSelectedDivision] = useState("");
    
    // Filter programs based on selected division
    const filteredPrograms = selectedDivision 
      ? programs.filter(program => program.divisionId.toString() === selectedDivision)
      : programs;
  
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Program Management</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              <option value="">Semua Divisi</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
            <Link href="/admin/programs/add">
              <Button className="whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Program
              </Button>
            </Link>
          </div>
        </div>
  
        {filteredPrograms.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Tidak ada program</h3>
            <p className="text-gray-500 mb-4">
              {selectedDivision ? "Tidak ada program untuk divisi yang dipilih." : "Belum ada program yang ditambahkan."}
            </p>
            <Link href="/admin/programs/add">
              <Button>Tambah Program Baru</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    );
  };