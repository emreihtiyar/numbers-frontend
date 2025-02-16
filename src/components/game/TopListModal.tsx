'use client';

import { useState, useEffect, useCallback } from 'react';
import { COLORS } from '@/styles/colors';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface TopListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Result {
  username: string;
  lastNumber: number;
  time: string;
}

interface PaginatedResponse {
  results: Result[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

const PAGE_SIZE = 10;

export default function TopListModal({ isOpen, onClose }: TopListModalProps) {
  const { messages } = useLanguage();
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchResults = useCallback(async (page: number) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/v1/results?size=${PAGE_SIZE}&page=${page}`);
      if (!response.ok) {
        throw new Error(messages.modal.topList.error);
      }

      const data: PaginatedResponse = await response.json();
      setResults(data.results);
      setTotalPages(data.totalPages);
    } catch {
      setError(messages.modal.topList.error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [messages.modal.topList.error]);

  useEffect(() => {
    if (isOpen) {
      fetchResults(currentPage);
    } else {
      // Modal kapandığında state'leri sıfırla
      setCurrentPage(0);
      setIsInitialLoad(true);
    }
  }, [isOpen, currentPage, fetchResults]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 backdrop-blur-sm ${COLORS.MODAL.BACKDROP} flex items-center justify-center z-50`}
      onClick={handleBackdropClick}
    >
      <div className={`p-6 rounded-lg border shadow-xl ${COLORS.MODAL.BG} ${COLORS.MODAL.BORDER} min-w-[400px]`}>
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-6 text-center ${COLORS.MODAL.HIGHLIGHT}`}>
            {messages.modal.topList.title}
          </h2>

          {isInitialLoad && isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400 mb-2" />
              <p className={`text-center ${COLORS.MODAL.TEXT}`}>{messages.modal.topList.loading}</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="relative overflow-hidden rounded-lg border border-gray-700 mb-4">
                {isLoading && !isInitialLoad && (
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  </div>
                )}
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">{messages.modal.topList.username}</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">{messages.modal.topList.lastNumber}</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">{messages.modal.topList.time}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {results.map((result, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                        <td className="px-4 py-3 text-sm text-gray-300">{result.username}</td>
                        <td className="px-4 py-3 text-sm text-gray-300 text-right">{result.lastNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-300 text-right">{result.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0 || isLoading}
                  className={`p-1 rounded transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className={`text-sm ${COLORS.MODAL.TEXT}`}>
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1 || isLoading}
                  className={`p-1 rounded transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded transition-colors ${COLORS.BUTTON.SECONDARY.BG} ${COLORS.BUTTON.SECONDARY.TEXT} ${COLORS.BUTTON.SECONDARY.HOVER}`}
          >
            {messages.buttons.close}
          </button>
        </div>
      </div>
    </div>
  );
} 