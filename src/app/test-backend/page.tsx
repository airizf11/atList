// atlist1f/src/app/test-backend/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";

interface BackendMessage {
  message: string;
}

export default function TestBackendPage() {
  const [dataFromBackend, setDataFromBackend] = useState<BackendMessage | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "http://localhost:3001/api/test";

        console.log(`Fetching data from: ${backendUrl}`);

        const response = await fetch(backendUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: BackendMessage = await response.json();
        setDataFromBackend(data);
      } catch (e: unknown) {
        console.error("Error fetching data from backend:", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Gagal mengambil data dari backend.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data from backend...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Koneksi ke Backend</h1>
      {dataFromBackend ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Sukses!</strong>
          <span className="block sm:inline">
            {" "}
            Pesan dari backend: "{dataFromBackend.message}"
          </span>
        </div>
      ) : (
        <p>Tidak ada data yang diterima.</p>
      )}
    </div>
  );
}
