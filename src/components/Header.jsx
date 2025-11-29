"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Header({ title, showBack = true }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center h-14 px-4">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="mr-3 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}
