"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAlumniCrud = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/alumni");
      const data = await res.json();

      if (data.success) {
        setAlumni(data.data);
      } else {
        setError(data.message || "Gagal memuat data alumni");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlumni = async (id) => {
    try {
      const res = await fetch(`/api/alumni/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setAlumni(alumni.filter((a) => a.id !== id));
        return true;
      } else {
        setError(data.message || "Gagal menghapus alumni");
        return false;
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus alumni: " + err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  return {
    alumni,
    loading,
    error,
    fetchAlumni,
    deleteAlumni,
    setError,
  };
};
