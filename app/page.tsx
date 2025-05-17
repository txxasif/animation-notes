"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  // Redirect to the examples page by default
  useEffect(() => {
    router.push("/examples");
  }, [router]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Animation Learning Notebook
        </h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading your animation examples...
        </p>
        <div className="mt-6">
          <Link
            href="/examples"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Examples
          </Link>
          <Link
            href="/notes"
            className="inline-block ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Go to Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
