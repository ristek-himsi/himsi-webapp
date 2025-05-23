'use client';

import { getImageUrl } from '@/lib/supabase';
import { Suspense, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Loading from '@/app/loading';

// Error boundary component
const ErrorDisplay = ({ error }) => (
  <div className="p-8 max-w-3xl mx-auto">
    <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-sm">
      <div className="flex items-center">
        <svg className="w-10 h-10 text-red-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-red-800">Unable to load organization structure</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  </div>
);

// Main content component that fetches and displays data
const OrganizationContent = () => {
  const [organizationData, setOrganizationData] = useState(null);
  const [divisionsData, setDivisionsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization structure
        const orgResponse = await fetch('/api/organization');
        if (!orgResponse.ok) {
          throw new Error('Failed to fetch organization data');
        }
        const orgData = await orgResponse.json();
        
        // Fetch divisions
        const divisionsResponse = await fetch('/api/divisions');
        if (!divisionsResponse.ok) {
          throw new Error('Failed to fetch divisions data');
        }
        const divisionsResult = await divisionsResponse.json();
        const divisionsData = divisionsResult.success ? divisionsResult.data : [];
        
        setOrganizationData(orgData);
        setDivisionsData(divisionsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!organizationData) { 
    return (
      <div className="p-8 max-w-3xl mx-auto flex justify-center items-center min-h-[300px]"> {/* min-h untuk memastikan loading terlihat */}
        <div className="flex flex-col items-center text-center">
          {/* Ikon Spinner (contoh) */}
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h3 className="text-lg font-semibold text-gray-700">
            Sedang memuat data...
          </h3>
          <p className="text-gray-500">
            Mohon tunggu sebentar.
          </p>
        </div>
      </div>
    );
  }

  // Define the organizational roles with their Indonesian titles and icons
  const organizationRoles = [
    {
      key: "leader",
      title: "Ketua Umum",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      key: "viceLeader",
      title: "Wakil Ketua",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: "secretary",
      title: "Sekretaris",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: "treasurer",
      title: "Bendahara",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
          Struktur Organisasi
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Tahun Akademik {organizationData.academicYear}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {organizationRoles.map((role, index) => {
          const member = organizationData[role.key];
          if (!member) return null;

          return (
            <motion.div
              key={role.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUp}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 group-hover:border-blue-200">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4 flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3">
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{role.title}</h3>
                </div>
                <div className="p-6 flex items-center">
                  <div className="relative flex-shrink-0">
                    {member.photo_url ? (
                      <img 
                        src={getImageUrl(member.photo_url, "users")} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold border-4 border-white shadow-lg">
                        {member.name ? member.name.charAt(0) : '?'}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                    <p className="text-blue-600">{member.email}</p>
                    {member.division && (
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                        {member.division.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Organizational Chart with Division Leaders */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={fadeInUp}
        className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-12"
      >
        <h3 className="text-2xl font-bold text-center mb-12 text-gray-900">Hierarki Organisasi</h3>
        
        <div className="flex flex-col items-center">
          {/* Leader */}
          <div className="relative">
            <div className="bg-blue-600 text-white rounded-lg px-6 py-3 shadow-lg">
              <p className="font-bold">{organizationData.leader.name}</p>
              <p className="text-sm text-blue-100">Ketua Umum</p>
            </div>
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-1 h-8 bg-blue-400"></div>
          </div>
          
          {/* Vice Leader */}
          <div className="mt-8 relative">
            <div className="bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md">
              <p className="font-bold">{organizationData.viceLeader.name}</p>
              <p className="text-sm text-blue-100">Wakil Ketua</p>
            </div>
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-1 h-8 bg-blue-400"></div>
          </div>
          
          {/* Secretary & Treasurer */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-blue-400 text-white rounded-lg px-6 py-3 shadow">
              <p className="font-bold">{organizationData.secretary.name}</p>
              <p className="text-sm text-blue-50">Sekretaris</p>
            </div>
            <div className="bg-blue-400 text-white rounded-lg px-6 py-3 shadow">
              <p className="font-bold">{organizationData.treasurer.name}</p>
              <p className="text-sm text-blue-50">Bendahara</p>
            </div>
          </div>

          {/* Line connecting to Division Leaders */}
          <div className="w-1 h-12 bg-blue-300 mt-8"></div>
          
          {/* Division Leaders Section */}
          <div className="mt-4 mb-4">
            <div className="bg-blue-200 text-blue-800 rounded-lg px-6 py-2 shadow">
              <p className="font-medium text-center">Ketua Divisi</p>
            </div>
          </div>
          
          {/* Division Leaders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 w-full max-w-4xl">
            {divisionsData && divisionsData.length > 0 ? (
              divisionsData.map((division) => (
                division.leader ? (
                  <motion.div 
                    key={division.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-4 shadow flex items-center"
                  >
                    <div className="flex-shrink-0 mr-3">
                      {division.leader.photo_url ? (
                        <img 
                          src={getImageUrl(division.leader.photo_url, "users")} 
                          alt={division.leader.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold border-2 border-white">
                          {division.leader.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">{division.leader.name}</p>
                      <p className="text-xs text-blue-700">{division.name}</p>
                    </div>
                  </motion.div>
                ) : null
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-blue-600">
                Tidak ada data ketua divisi tersedia
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Data fetcher for use with suspense
const fetchOrganizationData = () => {
  let organizationPromise = null;

  return () => {
    if (!organizationPromise) {
      organizationPromise = new Promise(async (resolve) => {
        try {
          // Simulate network delay to show loading state
          await new Promise(r => setTimeout(r, 500)); 
          resolve();
        } catch (error) {
          console.error("Failed to fetch organization data:", error);
          resolve(); // Resolve anyway to avoid hanging
        }
      });
    }
    return organizationPromise;
  };
};

// Create instance of the data fetcher
const organizationDataFetcher = fetchOrganizationData();

// Main component with Suspense
const StrukturOrganisasi = () => {
  // Trigger the data fetcher
  organizationDataFetcher();

  return (
    <Suspense fallback={<Loading />}>
      <OrganizationContent />
    </Suspense>
  );
};

export default StrukturOrganisasi;