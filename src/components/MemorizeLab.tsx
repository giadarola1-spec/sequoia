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

  const handleNextQuestion = useCallback(() => {
    setSelectedOptionId(null);
    setDeckIndex(prev => (prev + 1 < deckIds.length ? prev + 1 : 0));
  }, [deckIds.length]);

  const handleSelectQuizOption = useCallback(
    (optionId: string) => {
      if (selectedOptionId || !currentTerm) return;
      setQuizTotalCount(prev => prev + 1);
      if (optionId === currentTerm.id) {
        setQuizStreak(prev => prev + 1);
        setQuizCorrectCount(prev => prev + 1);
        onUpdateMastery(currentTerm.id, 'mastered');
        handleNextQuestion();
      } else {
        setSelectedOptionId(optionId);
        setQuizStreak(0);
        onUpdateMastery(currentTerm.id, 'learning');
      }
    },
    [selectedOptionId, currentTerm, onUpdateMastery, handleNextQuestion]
  );

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
    let result = text.trim();

    // 1. If the text starts with a "Term / Title: " prefix before the first sentence ends, strip it
    const colonIdx = result.indexOf(':');
    const periodIdx = result.indexOf('.');
    if (
      colonIdx > 0 &&
      colonIdx < 120 &&
      (periodIdx === -1 || colonIdx < periodIdx)
    ) {
      result = result.slice(colonIdx + 1).trim();
    }

    // 2. Build list of phrases/words to redact so the term is never given away
    const baseWithoutParens = term.term.replace(/\s*\([^)]*\)\s*/g, '').trim();
    const insideParensMatch = term.term.match(/\(([^)]+)\)/);
    const insideParens = insideParensMatch ? insideParensMatch[1].trim() : '';

    const candidates = [
      term.term,
      baseWithoutParens,
      insideParens,
      term.acronym || '',
      baseWithoutParens.replace(/-/g, ' ')
    ]
      .map(s => s.trim())
      .filter(s => s.length >= 2);

    // Sort longest first so full phrases are replaced before substrings
    const uniqueCandidates = Array.from(new Set(candidates)).sort(
      (a, b) => b.length - a.length
    );

    for (const candidate of uniqueCandidates) {
      const escaped = candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(escaped, 'gi'), '___');
    }

    if (result.length > 0) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
  };

  if (!currentTerm) return null;

  return (
    <div
      className={
        isExpandedView
          ? 'fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#191919] px-6 py-5 sm:px-10 sm:py-7 lg:px-14 lg:py-8'
          : 'mx-auto flex w-full max-w-[1100px] flex-col justify-between rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#202020] p-5 sm:p-6 lg:p-7'
      }
    >
      {/* Top Header: Memorize Lab Title, Stats, Prompt Selector & Expanded View Button */}
      <div
        className={`flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.09)] ${
          isExpandedView ? 'pb-4' : 'pb-3.5'
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-4">
          <h1
            className={`font-bold tracking-tight text-[#e6e6e4] ${
              isExpandedView
                ? 'text-2xl sm:text-3xl lg:text-4xl'
                : 'text-xl sm:text-2xl lg:text-3xl'
            }`}
          >
            Memorize Lab
          </h1>

          <div
            className={`flex flex-wrap items-center gap-2.5 ${
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

        <div className="flex flex-wrap items-center gap-2">
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
            className={`flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#191919] px-2.5 py-1.5 font-medium text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none ${
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
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-semibold transition-colors focus:outline-none ${
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

      {/* Horizontal 2-Column Stage (Fixed height so Next button never shifts vertically) */}
      <div
        key={currentTerm.id}
        className={`term-transition-select grid grid-cols-1 lg:grid-cols-12 items-stretch ${
          isExpandedView
            ? 'my-4 flex-1 gap-6 lg:gap-8 overflow-hidden'
            : 'my-4 gap-5 lg:gap-6 lg:h-[360px]'
        }`}
      >
        {/* Left Column: Question Prompt + Fixed-Space Answer Feedback */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3 min-h-0">
          <div className="flex flex-1 flex-col rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#191919] p-5 sm:p-6 min-h-0">
            <div
              className={`mb-2 shrink-0 font-semibold uppercase tracking-wider text-[#9b9a97] ${
                isExpandedView ? 'text-xs sm:text-sm' : 'text-[11px]'
              }`}
            >
              Which logistics term matches this description?
            </div>
            <div
              className={`stable-scroll flex-1 overflow-y-auto pr-1 text-[#e6e6e4] ${
                isExpandedView
                  ? 'text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium'
                  : 'text-base sm:text-lg lg:text-[19px] leading-relaxed'
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

          {/* Dedicated Fixed-Height Feedback Slot so card height never jumps */}
          <div
            className={`shrink-0 rounded-xl border px-4 py-3 transition-colors ${
              isExpandedView ? 'h-[130px]' : 'h-[104px]'
            } ${
              selectedOptionId
                ? 'border-[rgba(255,255,255,0.14)] bg-[#191919]'
                : 'border-[rgba(255,255,255,0.06)] bg-[#191919]/50 flex items-center justify-between'
            } overflow-y-auto stable-scroll`}
          >
            {selectedOptionId ? (
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`font-bold ${
                      isExpandedView ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    } ${
                      selectedOptionId === currentTerm.id
                        ? 'text-[#7fd1a8]'
                        : 'text-[#f5b482]'
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
                    className="inline-flex items-center gap-1 text-xs text-[#9b9a97] hover:text-[#e6e6e4] focus:outline-none"
                  >
                    <span>Read full entry</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p
                  className={`leading-snug text-[#a6b4c0] ${
                    isExpandedView ? 'text-xs sm:text-sm' : 'text-xs'
                  }`}
                >
                  <strong className="text-[#bfd0de]">Key summary: </strong>
                  {currentTerm.calloutEs}
                </p>
                <p
                  className={`leading-snug text-[#9b9a97] ${
                    isExpandedView ? 'text-xs sm:text-sm' : 'text-[11px]'
                  }`}
                >
                  {currentTerm.explanationEs}
                </p>
              </div>
            ) : (
              <span
                className={`text-[#9b9a97]/70 ${
                  isExpandedView ? 'text-sm' : 'text-xs'
                }`}
              >
                Select one of the 4 options on the right (or press keys 1–4) to reveal the answer breakdown.
              </span>
            )}
          </div>
        </div>

        {/* Right Column: 4 Multiple Choice Options */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 content-between">
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
                    ? 'px-6 py-4 min-h-[78px]'
                    : 'px-4 py-3 h-[81px]'
                } ${
                  showSuccess
                    ? 'border-[#7fd1a8] bg-[rgba(15,123,108,0.22)] text-white'
                    : showError
                    ? 'border-[#f5b482] bg-[rgba(217,115,13,0.2)] text-[#f5b482]'
                    : 'border-[rgba(255,255,255,0.14)] bg-[#191919] text-[#e6e6e4] hover:border-[rgba(255,255,255,0.34)] hover:bg-[#252525]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <span
                    className={`flex shrink-0 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#252525] font-mono font-bold text-[#9b9a97] ${
                      isExpandedView
                        ? 'h-10 w-10 text-base sm:text-lg'
                        : 'h-7 w-7 text-xs sm:text-sm'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span
                      className={`font-bold block truncate ${
                        isExpandedView
                          ? 'text-lg sm:text-xl lg:text-2xl'
                          : 'text-sm sm:text-base'
                      }`}
                    >
                      {opt.term}
                    </span>
                    {opt.acronym && opt.acronym !== opt.term && (
                      <span
                        className={`inline-block mt-0.5 rounded bg-[#252525] px-1.5 py-0.2 font-mono text-[#9b9a97] ${
                          isExpandedView ? 'text-xs' : 'text-[10px]'
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
                      isExpandedView ? 'h-6 w-6' : 'h-4 w-4'
                    }`}
                  />
                )}
                {showError && (
                  <X
                    className={`shrink-0 text-[#f5b482] ${
                      isExpandedView ? 'h-6 w-6' : 'h-4 w-4'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed-Position Footer Controls inside Card */}
      <div
        className={`flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.08)] ${
          isExpandedView ? 'pt-4' : 'pt-3.5'
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
              : 'px-5 py-2 text-xs sm:text-sm'
          }`}
        >
          Next Question →
        </button>
      </div>
    </div>
  );
}
