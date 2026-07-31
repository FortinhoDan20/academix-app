import { DollarSign } from 'lucide-react';
import React from 'react'

const PageLoader = () => {
   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
      <div className="w-full max-w-3xl px-6">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-sky-900 flex items-center justify-center shadow-lg mb-4">
            <DollarSign className="text-white" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Chargement des paiements
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Veuillez patienter pendant la récupération des données...
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-sky-200 dark:border-sky-900"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-700 animate-spin"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-100 dark:border-gray-800">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-8 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4 items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div className="h-4 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse ml-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLoader
