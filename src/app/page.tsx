'use client';

import { ChessBoard } from '@/components/chess/ChessBoard';
import { GameControls } from '@/components/chess/GameControls';
import { MoveHistory } from '@/components/chess/MoveHistory';
import { GameStatus } from '@/components/chess/GameStatus';
import { CapturedPieces } from '@/components/chess/CapturedPieces';
import { GameResultModal } from '@/components/chess/GameResultModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">♔</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Chess Master
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience the timeless game of strategy with a modern, elegant interface. 
            Play against a friend with beautiful visuals and smooth animations.
          </p>
        </div>
        
        {/* Main Game Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Game Info */}
          <div className="xl:col-span-1 space-y-4">
            <GameStatus />
            <GameControls />
          </div>
          
          {/* Center - Chess Board */}
          <div className="xl:col-span-2 flex justify-center items-start">
            <div className="w-full max-w-2xl">
              <ChessBoard />
            </div>
          </div>
          
          {/* Right Sidebar - Game Details */}
          <div className="xl:col-span-1 space-y-4">
            <MoveHistory />
            <CapturedPieces />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-black/20 rounded-full border border-slate-200 dark:border-slate-700">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Built with ♡ using Next.js, TypeScript, and Tailwind CSS
            </span>
          </div>
        </div>

        {/* Game Result Modal */}
        <GameResultModal />
      </div>
    </div>
  );
}