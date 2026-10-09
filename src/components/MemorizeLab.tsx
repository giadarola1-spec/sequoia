import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  X,
  Shuffle,
  ArrowUpRight,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  GLOSSARY_TERMS,
  GlossaryTerm
} from '../data/glossaryData';

export type MasteryStatus = 'unseen' | 'learning' | 'mastered';

interface MemorizeLabProps {
  filteredTerms: GlossaryTerm[];
  masteryMap: Record<string, MasteryStatus>;
  onUpdateMastery: (termId: string, status: MasteryStatus) => void;
  onJumpToTermDoc: (termId: string) => void;
}

type PromptType = 'summary_en' | 'def_en' | 'explanation_es';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MemorizeLab({
  filteredTerms,
  onUpdateMastery,
  onJumpToTermDoc
}: MemorizeLabProps) {
  const [promptType, setPromptType] = useState<PromptType>('summary_en');
  const [isExpandedView, setIsExpandedView] = useState(false);

  const studyPool = useMemo(() => {
    return filteredTerms.length > 0 ? filteredTerms : GLOSSARY_TERMS;
  }, [filteredTerms]);

  const [deckIds, setDeckIds] = useState<string[]>(() =>
    shuffleArray(studyPool.map(t => t.id))
  );
  const [deckIndex, setDeckIndex] = useState(0);

  useEffect(() => {
    setDeckIds(shuffleArray(studyPool.map(t => t.id)));
    setDeckIndex(0);
  }, [studyPool]);

  const currentTerm = useMemo(() => {
    const targetId = deckIds[deckIndex];
    return (
      studyPool.find(t => t.id === targetId) ||
      studyPool[0] ||
      GLOSSARY_TERMS[0]
    );
  }, [deckIds, deckIndex, studyPool]);

  const [quizStreak, setQuizStreak] = useState(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizTotalCount, setQuizTotalCount] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const quizOptions = useMemo(() => {
    if (!currentTerm) return [];
    const sameCat = GLOSSARY_TERMS.filter(
      t => t.id !== currentTerm.id && t.category === currentTerm.category
    );
    const others = GLOSSARY_TERMS.filter(
      t => t.id !== currentTerm.id && t.category !== currentTerm.category
    );
    const distractorPool = [...shuffleArray(sameCat), ...shuffleArray(others)].slice(0, 3);
    return shuffleArray([currentTerm, ...distractorPool]);
  }, [currentTerm]);

  useEffect(() => {
    setSelectedOptionId(null);
  }, [currentTerm?.id, deckIndex]);

  const handleSelectQuizOption = useCallback(
    (optionId: string) => {
      if (selectedOptionId || !currentTerm) return;
      setSelectedOptionId(optionId);
      setQuizTotalCount(prev => prev + 1);
      if (optionId === currentTerm.id) {
        setQuizStreak(prev => prev + 1);
        setQuizCorrectCount(prev => prev + 1);
        onUpdateMastery(currentTerm.id, 'mastered');
      } else {
        setQuizStreak(0);
        onUpdateMastery(currentTerm.id, 'learning');
      }
    },
    [selectedOptionId, currentTerm, onUpdateMastery]
  );

  const handleNextQuestion = useCallback(() => {
    setSelectedOptionId(null);
    setDeckIndex(prev => (prev + 1 < deckIds.length ? prev + 1 : 0));
  }, [deckIds.length]);

  const handleShuffleDeck = () => {
    setDeckIds(shuffleArray(studyPool.map(t => t.id)));
    setDeckIndex(0);
    setSelectedOptionId(null);
  };

  const handleResetQuizStats = () => {
    setQuizStreak(0);
    setQuizCorrectCount(0);
    setQuizTotalCount(0);
    handleShuffleDeck();
  };

  // Keyboard shortcuts: 1-4 to select option, Enter or ArrowRight for next question, Escape to exit expanded view
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'Escape' && isExpandedView) {
        e.preventDefault();
        setIsExpandedView(false);
        return;
      }

      if (!selectedOptionId && ['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (quizOptions[idx]) {
          handleSelectQuizOption(quizOptions[idx].id);
        }
      } else if (selectedOptionId && (e.key === 'Enter' || e.key === 'ArrowRight')) {
        e.preventDefault();
        handleNextQuestion();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedOptionId, quizOptions, handleSelectQuizOption, handleNextQuestion, isExpandedView]);

  const redactTermFromText = (text: string, term: GlossaryTerm) => {
    const escapedTerm = term.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let result = text.replace(new RegExp(escapedTerm, 'gi'), '[TERM]');
    if (term.acronym) {
      const escapedAcronym = term.acronym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(`\\b${escapedAcronym}\\b`, 'gi'), '[ACRONYM]');
    }
    return result;
  };

  if (!currentTerm) return null;

  return (
    <div
      className={
        isExpandedView
          ? 'fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#191919] p-6 sm:p-10 lg:p-14'
          : 'mx-auto w-full max-w-[920px] rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#202020] p-6 sm:p-7 lg:p-8 space-y-5'
      }
    >
      {/* Top Header: Memorize Lab Title, Stats, Prompt Selector & Expanded View Button */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.09)] ${
          isExpandedView ? 'pb-6' : 'pb-5'
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
          <h1
            className={`font-bold tracking-tight text-[#e6e6e4] ${
              isExpandedView
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-2xl sm:text-3xl lg:text-4xl'
            }`}
          >
            Memorize Lab
          </h1>

          <div
            className={`flex flex-wrap items-center gap-3 ${
              isExpandedView ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
            }`}
          >
            <span className="text-[#9b9a97] tabular-nums">
              Question {deckIndex + 1} of {deckIds.length}
            </span>
            <span className="text-[rgba(255,255,255,0.16)]">·</span>
            <span className="font-semibold text-[#e6e6e4]">
              Streak:{' '}
              <strong className="text-[#7fd1a8] tabular-nums">{quizStreak}</strong>
            </span>
            <span className="text-[rgba(255,255,255,0.16)]">·</span>
            <span className="text-[#9b9a97] tabular-nums">
              Accuracy:{' '}
              <strong className="text-[#e6e6e4]">
                {quizTotalCount > 0
                  ? `${Math.round((quizCorrectCount / quizTotalCount) * 100)}% (${quizCorrectCount}/${quizTotalCount})`
                  : '—'}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Prompt Source Selector */}
          <div
            className={`flex items-center gap-1 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#191919] p-1 ${
              isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => setPromptType('summary_en')}
              className={`rounded px-2.5 py-1 transition-colors focus:outline-none ${
                promptType === 'summary_en'
                  ? 'bg-[#252525] text-[#e6e6e4] font-semibold'
                  : 'text-[#9b9a97] hover:text-[#e6e6e4]'
              }`}
            >
              Key Summary (EN)
            </button>
            <button
              type="button"
              onClick={() => setPromptType('def_en')}
              className={`rounded px-2.5 py-1 transition-colors focus:outline-none ${
                promptType === 'def_en'
                  ? 'bg-[#252525] text-[#e6e6e4] font-semibold'
                  : 'text-[#9b9a97] hover:text-[#e6e6e4]'
              }`}
            >
              Official Definition (EN)
            </button>
            <button
              type="button"
              onClick={() => setPromptType('explanation_es')}
              className={`rounded px-2.5 py-1 transition-colors focus:outline-none ${
                promptType === 'explanation_es'
                  ? 'bg-[#252525] text-[#e6e6e4] font-semibold'
                  : 'text-[#9b9a97] hover:text-[#e6e6e4]'
              }`}
            >
              Spanish Explanation
            </button>
          </div>

          <button
            type="button"
            onClick={handleShuffleDeck}
            title="Shuffle questions"
            className={`flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#191919] px-3 py-1.5 font-medium text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none ${
              isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
            }`}
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Shuffle</span>
          </button>

          {quizTotalCount > 0 && (
            <button
              type="button"
              onClick={handleResetQuizStats}
              title="Reset score"
              className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#191919] p-1.5 text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Expanded View Toggle Button (Kahoot / Presentation Mode) */}
          <button
            type="button"
            onClick={() => setIsExpandedView(prev => !prev)}
            className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 font-semibold transition-colors focus:outline-none ${
              isExpandedView
                ? 'border-[#e6e6e4] bg-[#e6e6e4] text-[#191919] text-xs sm:text-sm'
                : 'border-[rgba(255,255,255,0.2)] bg-[#252525] text-[#e6e6e4] hover:border-[rgba(255,255,255,0.4)] text-xs'
            }`}
          >
            {isExpandedView ? (
              <>
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Exit expanded view</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Expanded view</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Quiz Stage: Prompt + Options + Instant Breakdown */}
      <div
        key={currentTerm.id}
        className={`term-transition-select my-auto flex flex-col justify-center ${
          isExpandedView ? 'space-y-8 py-6' : 'space-y-6 py-2'
        }`}
      >
        {/* Question Prompt */}
        <div className="space-y-3">
          <div
            className={`font-semibold uppercase tracking-wider text-[#9b9a97] ${
              isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
            }`}
          >
            Which logistics term matches this description?
          </div>
          <div
            className={`rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#191919] text-[#e6e6e4] ${
              isExpandedView
                ? 'p-8 sm:p-10 lg:p-12 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium'
                : 'p-6 sm:p-8 text-lg sm:text-xl lg:text-2xl leading-relaxed'
            }`}
          >
            {promptType === 'summary_en' &&
              redactTermFromText(currentTerm.calloutEs, currentTerm)}
            {promptType === 'def_en' &&
              redactTermFromText(currentTerm.definitionEn, currentTerm)}
            {promptType === 'explanation_es' &&
              redactTermFromText(currentTerm.explanationEs, currentTerm)}
          </div>
        </div>

        {/* 4 Multiple Choice Options (Kahoot-style responsive grid) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            isExpandedView ? 'gap-4 lg:gap-6' : 'gap-3.5 lg:gap-4'
          }`}
        >
          {quizOptions.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrectOption = opt.id === currentTerm.id;
            const showSuccess = Boolean(selectedOptionId) && isCorrectOption;
            const showError = isSelected && !isCorrectOption;

            return (
              <button
                type="button"
                key={opt.id}
                disabled={Boolean(selectedOptionId)}
                onClick={() => handleSelectQuizOption(opt.id)}
                className={`flex items-center justify-between rounded-xl border text-left transition-colors focus:outline-none ${
                  isExpandedView
                    ? 'min-h-[90px] sm:min-h-[112px] p-6 sm:p-8'
                    : 'min-h-[68px] sm:min-h-[78px] p-4 sm:p-5'
                } ${
                  showSuccess
                    ? 'border-[#7fd1a8] bg-[rgba(15,123,108,0.22)] text-white'
                    : showError
                    ? 'border-[#f5b482] bg-[rgba(217,115,13,0.2)] text-[#f5b482]'
                    : 'border-[rgba(255,255,255,0.14)] bg-[#191919] text-[#e6e6e4] hover:border-[rgba(255,255,255,0.34)] hover:bg-[#252525]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#252525] font-mono font-bold text-[#9b9a97] ${
                      isExpandedView
                        ? 'h-10 w-10 text-base sm:h-11 sm:w-11 sm:text-lg'
                        : 'h-7 w-7 text-xs sm:h-8 sm:w-8 sm:text-sm'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span
                      className={`font-bold ${
                        isExpandedView
                          ? 'text-lg sm:text-xl lg:text-2xl'
                          : 'text-base sm:text-lg'
                      }`}
                    >
                      {opt.term}
                    </span>
                    {opt.acronym && opt.acronym !== opt.term && (
                      <span
                        className={`ml-2.5 rounded bg-[#252525] px-2 py-0.5 font-mono text-[#9b9a97] ${
                          isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
                        }`}
                      >
                        {opt.acronym}
                      </span>
                    )}
                  </div>
                </div>
                {showSuccess && (
                  <CheckCircle2
                    className={`shrink-0 text-[#7fd1a8] ${
                      isExpandedView ? 'h-7 w-7' : 'h-5 w-5'
                    }`}
                  />
                )}
                {showError && (
                  <X
                    className={`shrink-0 text-[#f5b482] ${
                      isExpandedView ? 'h-7 w-7' : 'h-5 w-5'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Answer Breakdown */}
        {selectedOptionId && (
          <div
            className={`rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#191919] space-y-2 ${
              isExpandedView ? 'p-6 sm:p-7' : 'p-4 sm:p-5'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`font-bold ${
                  isExpandedView ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                } ${
                  selectedOptionId === currentTerm.id ? 'text-[#7fd1a8]' : 'text-[#f5b482]'
                }`}
              >
                {selectedOptionId === currentTerm.id
                  ? `Correct — ${currentTerm.term}`
                  : `Incorrect — The correct term is ${currentTerm.term}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsExpandedView(false);
                  onJumpToTermDoc(currentTerm.id);
                }}
                className={`inline-flex items-center gap-1 text-[#9b9a97] hover:text-[#e6e6e4] focus:outline-none ${
                  isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
                }`}
              >
                <span>Read full entry</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p
              className={`leading-relaxed text-[#a6b4c0] ${
                isExpandedView ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              }`}
            >
              <strong className="text-[#bfd0de]">Key summary: </strong>
              {currentTerm.calloutEs}
            </p>
            <p
              className={`leading-relaxed text-[#9b9a97] ${
                isExpandedView ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
              }`}
            >
              {currentTerm.explanationEs}
            </p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.08)] ${
          isExpandedView ? 'pt-5' : 'pt-4'
        }`}
      >
        <span
          className={`text-[#9b9a97] ${
            isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
          }`}
        >
          Press <code className="rounded bg-[#191919] px-1.5 py-0.5 font-mono">1–4</code> to answer
          {selectedOptionId ? (
            <>
              {' '}· Press <code className="rounded bg-[#191919] px-1.5 py-0.5 font-mono">Enter</code> for next
            </>
          ) : null}
          {isExpandedView ? (
            <>
              {' '}· Press <code className="rounded bg-[#252525] px-1.5 py-0.5 font-mono">ESC</code> to exit expanded view
            </>
          ) : null}
        </span>

        <button
          type="button"
          onClick={handleNextQuestion}
          className={`rounded-lg bg-[#e6e6e4] font-semibold text-[#191919] hover:opacity-90 focus:outline-none ${
            isExpandedView
              ? 'px-6 py-3 text-sm sm:text-base'
              : 'px-5 py-2.5 text-xs sm:text-sm'
          }`}
        >
          Next Question →
        </button>
      </div>
    </div>
  );
}
