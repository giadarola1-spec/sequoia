import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  X,
  Shuffle,
  ArrowUpRight,
  RotateCcw
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

  // Keyboard shortcuts: 1-4 to select option, Enter or ArrowRight for next question
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

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
  }, [selectedOptionId, quizOptions, handleSelectQuizOption, handleNextQuestion]);

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
    <div className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#202020] p-6 md:p-8 space-y-6">
      {/* Header: Memorize Lab Title, Stats & Prompt Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-lg font-bold tracking-tight text-[#e6e6e4]">
            Memorize Lab
          </h1>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#9b9a97] tabular-nums">
              Question {deckIndex + 1} of {deckIds.length}
            </span>
            <span className="text-[rgba(255,255,255,0.16)]">·</span>
            <span className="font-semibold text-[#e6e6e4]">
              Streak: <strong className="text-[#7fd1a8] tabular-nums">{quizStreak}</strong>
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
          <div className="flex items-center gap-1 rounded border border-[rgba(255,255,255,0.12)] bg-[#191919] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setPromptType('summary_en')}
              className={`rounded px-2 py-0.5 transition-colors focus:outline-none ${
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
              className={`rounded px-2 py-0.5 transition-colors focus:outline-none ${
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
              className={`rounded px-2 py-0.5 transition-colors focus:outline-none ${
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
            className="flex items-center gap-1 rounded border border-[rgba(255,255,255,0.12)] bg-[#191919] px-2.5 py-1 text-xs font-medium text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Shuffle</span>
          </button>

          {quizTotalCount > 0 && (
            <button
              type="button"
              onClick={handleResetQuizStats}
              title="Reset score"
              className="rounded border border-[rgba(255,255,255,0.12)] bg-[#191919] p-1 text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9b9a97]">
          Which logistics term matches this description?
        </div>
        <div className="rounded-lg border border-[rgba(255,255,255,0.09)] bg-[#191919] p-5 text-base md:text-[17px] leading-relaxed text-[#e6e6e4]">
          {promptType === 'summary_en' &&
            redactTermFromText(currentTerm.calloutEs, currentTerm)}
          {promptType === 'def_en' &&
            redactTermFromText(currentTerm.definitionEn, currentTerm)}
          {promptType === 'explanation_es' &&
            redactTermFromText(currentTerm.explanationEs, currentTerm)}
        </div>
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              className={`flex items-center justify-between rounded-lg border p-4 text-left transition-colors focus:outline-none ${
                showSuccess
                  ? 'border-[#7fd1a8] bg-[rgba(15,123,108,0.2)] text-white'
                  : showError
                  ? 'border-[#f5b482] bg-[rgba(217,115,13,0.18)] text-[#f5b482]'
                  : 'border-[rgba(255,255,255,0.12)] bg-[#191919] text-[#e6e6e4] hover:border-[rgba(255,255,255,0.28)] hover:bg-[#252525]'
              }`}
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs font-mono text-[#9b9a97] mr-2">
                  {idx + 1}.
                </span>
                <span className="text-sm font-bold">{opt.term}</span>
                {opt.acronym && opt.acronym !== opt.term && (
                  <span className="ml-2 rounded bg-[#252525] px-1.5 py-0.5 font-mono text-[11px] text-[#9b9a97]">
                    {opt.acronym}
                  </span>
                )}
              </div>
              {showSuccess && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7fd1a8]" />}
              {showError && <X className="h-4 w-4 shrink-0 text-[#f5b482]" />}
            </button>
          );
        })}
      </div>

      {/* Instant Answer Breakdown */}
      {selectedOptionId && (
        <div className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#191919] p-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`text-xs font-bold ${
                selectedOptionId === currentTerm.id ? 'text-[#7fd1a8]' : 'text-[#f5b482]'
              }`}
            >
              {selectedOptionId === currentTerm.id
                ? `Correct — ${currentTerm.term}`
                : `Incorrect — The correct term is ${currentTerm.term}`}
            </span>
            <button
              type="button"
              onClick={() => onJumpToTermDoc(currentTerm.id)}
              className="inline-flex items-center gap-1 text-xs text-[#9b9a97] hover:text-[#e6e6e4] focus:outline-none"
            >
              <span>Read full entry</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-[#a6b4c0]">
            <strong className="text-[#bfd0de]">Key summary: </strong>
            {currentTerm.calloutEs}
          </p>
          <p className="text-xs leading-relaxed text-[#9b9a97]">
            {currentTerm.explanationEs}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-[#9b9a97]">
          Press <code className="rounded bg-[#191919] px-1.5 py-0.5 font-mono">1–4</code> to answer
          {selectedOptionId ? (
            <>
              {' '}· Press <code className="rounded bg-[#191919] px-1.5 py-0.5 font-mono">Enter</code> for next
            </>
          ) : null}
        </span>

        <button
          type="button"
          onClick={handleNextQuestion}
          className="rounded bg-[#e6e6e4] px-4 py-2 text-xs font-semibold text-[#191919] hover:opacity-90 focus:outline-none"
        >
          Next Question →
        </button>
      </div>
    </div>
  );
}
