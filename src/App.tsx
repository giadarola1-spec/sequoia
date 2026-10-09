import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  RotateCcw,
  Menu,
  ArrowUpRight,
  Eye,
  EyeOff,
  Layers,
  BookOpen
} from 'lucide-react';
import {
  CATEGORIES,
  GLOSSARY_TERMS,
  PDF_INDEX_PAGES,
  GlossaryTerm,
  NotionColor
} from './data/glossaryData';
import MemorizeLab, { MasteryStatus } from './components/MemorizeLab';

const TAG_CLASS_MAP: Record<NotionColor, string> = {
  yellow: 'notion-tag-yellow',
  blue: 'notion-tag-blue',
  green: 'notion-tag-green',
  orange: 'notion-tag-orange',
  purple: 'notion-tag-purple',
  gray: 'notion-tag-gray',
  pink: 'notion-tag-pink'
};

const MASTERY_STORAGE_KEY = 'sequoia_mastery_v1';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [activeTermId, setActiveTermId] = useState<string>(GLOSSARY_TERMS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'docs' | 'memorize'>('docs');

  // Inline Recall Mode on the Documentation page (blurs definition until clicked/toggled)
  const [inlineRecallActive, setInlineRecallActive] = useState(false);
  const [revealedSections, setRevealedSections] = useState<Record<string, boolean>>({});

  // Persistent Mastery Progress
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryStatus>>(() => {
    try {
      const saved = localStorage.getItem(MASTERY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateMastery = (termId: string, status: MasteryStatus) => {
    setMasteryMap(prev => {
      const next = { ...prev, [termId]: status };
      try {
        localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleResetMastery = () => {
    setMasteryMap({});
    try {
      localStorage.removeItem(MASTERY_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const masteredCount = useMemo(
    () => Object.values(masteryMap).filter(s => s === 'mastered').length,
    [masteryMap]
  );

  // Sidebar accordions: Filter by letter & Terms index start closed
  const [sidebarAzOpen, setSidebarAzOpen] = useState<boolean>(false);
  const [sidebarCatOpen, setSidebarCatOpen] = useState<boolean>(true);
  const [openCategoryMenus, setOpenCategoryMenus] = useState<Record<string, boolean>>({
    finance: true
  });
  const [sidebarTermsOpen, setSidebarTermsOpen] = useState<boolean>(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const modalSearchRef = useRef<HTMLInputElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Count terms per letter
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of GLOSSARY_TERMS) {
      counts[item.letter] = (counts[item.letter] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered list of terms based on active search, category, and letter filters
  const filteredTerms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GLOSSARY_TERMS.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedLetter !== 'all' && item.letter !== selectedLetter) {
        return false;
      }
      if (!q) return true;
      const inTerm = item.term.toLowerCase().includes(q);
      const inAcronym = item.acronym?.toLowerCase().includes(q) ?? false;
      const inCallout = item.calloutEs.toLowerCase().includes(q);
      const inDefEn = item.definitionEn.toLowerCase().includes(q);
      const inExpEs = item.explanationEs.toLowerCase().includes(q);
      const inDetails = item.details.some(d => d.toLowerCase().includes(q));
      const inCat = CATEGORIES[item.category]?.name.toLowerCase().includes(q) ?? false;
      return inTerm || inAcronym || inCallout || inDefEn || inExpEs || inDetails || inCat;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  // Keep activeTermId synchronized when filters change
  useEffect(() => {
    if (filteredTerms.length > 0) {
      const stillVisible = filteredTerms.some(t => t.id === activeTermId);
      if (!stillVisible) {
        setActiveTermId(filteredTerms[0].id);
      }
    }
  }, [filteredTerms, activeTermId]);

  // Reset scroll position and inline recall reveals when changing terms
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    setRevealedSections({});
  }, [activeTermId, activeView]);

  // Current active term object and its index in filteredTerms
  const currentIndex = useMemo(() => {
    const idx = filteredTerms.findIndex(t => t.id === activeTermId);
    return idx >= 0 ? idx : 0;
  }, [filteredTerms, activeTermId]);

  const activeTerm: GlossaryTerm | undefined =
    filteredTerms[currentIndex] || GLOSSARY_TERMS.find(t => t.id === activeTermId);

  const prevTerm: GlossaryTerm | null =
    filteredTerms.length > 1 && currentIndex > 0 ? filteredTerms[currentIndex - 1] : null;

  const nextTerm: GlossaryTerm | null =
    filteredTerms.length > 1 && currentIndex < filteredTerms.length - 1
      ? filteredTerms[currentIndex + 1]
      : null;

  // Keyboard shortcuts: Ctrl+K for search, Left/Right arrows for Previous/Next in Docs view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
        return;
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        return;
      }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || isSearchModalOpen || activeView !== 'docs') return;

      if (e.key === 'ArrowLeft' && prevTerm) {
        setActiveTermId(prevTerm.id);
      } else if (e.key === 'ArrowRight' && nextTerm) {
        setActiveTermId(nextTerm.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevTerm, nextTerm, isSearchModalOpen, activeView]);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => modalSearchRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  const handleSelectTerm = (termId: string, fromRelatedOrModal = false) => {
    const target = GLOSSARY_TERMS.find(
      t =>
        t.id === termId ||
        t.term.toLowerCase() === termId.toLowerCase() ||
        t.acronym?.toLowerCase() === termId.toLowerCase()
    );
    if (!target) return;

    if (selectedCategory !== 'all' && selectedCategory !== target.category) {
      setSelectedCategory('all');
    }
    if (selectedLetter !== 'all' && selectedLetter !== target.letter) {
      setSelectedLetter('all');
    }
    if (searchQuery.trim() !== '') {
      const inFiltered = filteredTerms.some(t => t.id === target.id);
      if (!inFiltered) setSearchQuery('');
    }

    setActiveTermId(target.id);
    setActiveView('docs');
    // Only auto-open sidebar category if jumping from related link or search modal
    // so clicking inside the sidebar never shifts other sidebar accordions
    if (fromRelatedOrModal) {
      setOpenCategoryMenus(prev => ({ ...prev, [target.category]: true }));
    }
    setIsSearchModalOpen(false);
    setMobileSidebarOpen(false);
  };

  const toggleCategoryMenu = (catId: string) => {
    setOpenCategoryMenus(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const formatDefinitionText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const categoryName = CATEGORIES[term.category]?.name || term.category;
    const textToCopy = `${term.term}${term.acronym && term.acronym !== term.term ? ` (${term.acronym})` : ''} — [${categoryName} · Page ${term.page}]\n\nOfficial Definition (PDF): ${formatDefinitionText(term.definitionEn)}\n\nKey Summary: ${term.calloutEs}\n\nExplanation (ES): ${term.explanationEs}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    setTimeout(() => {
      setCopiedId(prev => (prev === term.id ? null : prev));
    }, 1800);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter('all');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedLetter !== 'all';

  const activeCategory = activeTerm ? CATEGORIES[activeTerm.category] : undefined;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#191919] text-[#e6e6e4]">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ================= DOCUMENTATION SIDEBAR (LEFT) ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] shrink-0 flex-col border-r border-[rgba(255,255,255,0.09)] bg-[#202020] transition-transform duration-150 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Compact Sidebar Header */}
        <div className="flex h-11 items-center justify-between border-b border-[rgba(255,255,255,0.09)] px-4">
          <button
            onClick={() => {
              resetFilters();
              setActiveTermId(GLOSSARY_TERMS[0].id);
              setActiveView('docs');
            }}
            className="text-xs font-bold tracking-wider text-[#e6e6e4] focus:outline-none"
          >
            SEQUOIA
          </button>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="rounded p-1 text-[#9b9a97] hover:bg-[rgba(255,255,255,0.06)] md:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Real-time Search Input */}
        <div className="border-b border-[rgba(255,255,255,0.09)] p-2.5 space-y-2">
          <div className="flex items-center rounded border border-[rgba(255,255,255,0.14)] bg-[#191919] px-2.5 py-1.5 focus-within:border-[rgba(255,255,255,0.32)] transition-colors">
            <Search className="mr-2 h-3.5 w-3.5 shrink-0 text-[#9b9a97]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter documentation..."
              className="w-full bg-transparent text-xs text-[#e6e6e4] placeholder-[#9b9a97] focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 rounded p-0.5 text-[#9b9a97] hover:text-[#e6e6e4]"
                title="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="ml-1 shrink-0 rounded border border-[rgba(255,255,255,0.12)] bg-[#252525] px-1.5 py-0.5 text-[10px] text-[#9b9a97] hover:text-[#e6e6e4]"
                title="Quick search (Ctrl+K)"
              >
                Ctrl+K
              </button>
            )}
          </div>

          {/* Mode Switcher: Documentation vs Memorize Lab */}
          <div className="grid grid-cols-2 gap-1 rounded border border-[rgba(255,255,255,0.09)] bg-[#191919] p-1">
            <button
              type="button"
              onClick={() => setActiveView('docs')}
              className={`flex items-center justify-center gap-1.5 rounded py-1 text-[11px] font-medium transition-colors focus:outline-none ${
                activeView === 'docs'
                  ? 'bg-[#252525] text-[#e6e6e4] font-semibold'
                  : 'text-[#9b9a97] hover:text-[#e6e6e4]'
              }`}
            >
              <BookOpen className="h-3 w-3" />
              <span>Documentation</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('memorize')}
              className={`flex items-center justify-center gap-1.5 rounded py-1 text-[11px] font-medium transition-colors focus:outline-none ${
                activeView === 'memorize'
                  ? 'bg-[#e6e6e4] text-[#191919] font-semibold'
                  : 'text-[#9b9a97] hover:text-[#e6e6e4]'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>Memorize ({masteredCount})</span>
            </button>
          </div>
        </div>

        {/* Accordion Navigation with Stable Scroll (Zero Layout Shift) */}
        <div className="stable-scroll flex-1 overflow-y-auto px-2 py-2.5 space-y-2">
          {/* 1. Filter by Letter (Initially closed) */}
          <div className="rounded border border-[rgba(255,255,255,0.07)] bg-[#1c1c1c]">
            <div className="flex h-8 w-full items-center justify-between px-2.5">
              <button
                type="button"
                onClick={() => setSidebarAzOpen(prev => !prev)}
                aria-expanded={sidebarAzOpen}
                className="flex flex-1 items-center gap-1.5 text-left text-[11px] font-semibold text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
              >
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 chevron-icon ${sidebarAzOpen ? 'is-open' : ''}`}
                />
                <span>FILTER BY LETTER (A–Z)</span>
              </button>
              {selectedLetter !== 'all' ? (
                <button
                  type="button"
                  onClick={() => setSelectedLetter('all')}
                  className="text-[10px] font-medium text-[#e6e6e4] underline focus:outline-none"
                >
                  All
                </button>
              ) : (
                <span className="text-[10px] text-[#9b9a97] tabular-nums">A–Z</span>
              )}
            </div>

            <div className={`accordion-grid ${sidebarAzOpen ? 'is-open' : ''}`}>
              <div className="accordion-inner">
                <div className="accordion-content-border grid grid-cols-7 gap-1 px-2 pb-2.5 pt-2">
                  {PDF_INDEX_PAGES.map(({ letter, pdfPage }) => {
                    const count = letterCounts[letter] || 0;
                    const isSelected = selectedLetter === letter;
                    return (
                      <button
                        type="button"
                        key={letter}
                        disabled={count === 0}
                        onClick={() =>
                          setSelectedLetter(prev => (prev === letter ? 'all' : letter))
                        }
                        title={
                          count > 0
                            ? `Letter ${letter}: ${count} terms (Page ${pdfPage} PDF)`
                            : `Letter ${letter}: No terms`
                        }
                        className={`flex flex-col items-center justify-center rounded border py-1 text-[11px] font-medium transition-colors focus:outline-none ${
                          isSelected
                            ? 'border-[#e6e6e4] bg-[#e6e6e4] text-[#191919] font-bold'
                            : count > 0
                            ? 'border-[rgba(255,255,255,0.08)] bg-[#252525] text-[#e6e6e4] hover:bg-[rgba(255,255,255,0.1)]'
                            : 'cursor-not-allowed border-transparent bg-transparent text-[#9b9a97]/25'
                        }`}
                      >
                        <span>{letter}</span>
                        <span
                          className={`text-[9px] tabular-nums leading-none ${
                            isSelected ? 'text-[#191919]/80' : 'text-[#9b9a97]'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Documentation Modules (Tree with nested accordions) */}
          <div className="rounded border border-[rgba(255,255,255,0.07)] bg-[#1c1c1c]">
            <div className="flex h-8 w-full items-center justify-between px-2.5">
              <button
                type="button"
                onClick={() => setSidebarCatOpen(prev => !prev)}
                aria-expanded={sidebarCatOpen}
                className="flex flex-1 items-center gap-1.5 text-left text-[11px] font-semibold text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
              >
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 chevron-icon ${sidebarCatOpen ? 'is-open' : ''}`}
                />
                <span>DOCUMENTATION MODULES</span>
              </button>
              {selectedCategory !== 'all' ? (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="text-[10px] font-medium text-[#e6e6e4] underline focus:outline-none"
                >
                  All
                </button>
              ) : (
                <span className="text-[10px] text-[#9b9a97] tabular-nums">7</span>
              )}
            </div>

            <div className={`accordion-grid ${sidebarCatOpen ? 'is-open' : ''}`}>
              <div className="accordion-inner">
                <div className="accordion-content-border space-y-0.5 px-1.5 pb-2 pt-1.5">
                  {Object.values(CATEGORIES).map(cat => {
                    const catTerms = filteredTerms.filter(t => t.category === cat.id);
                    const isCatMenuOpen = !!openCategoryMenus[cat.id];
                    const hasActiveChild = activeTerm?.category === cat.id;

                    return (
                      <div key={cat.id} className="rounded">
                        <div className="flex h-7 items-center justify-between rounded px-1.5 hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleCategoryMenu(cat.id)}
                            aria-expanded={isCatMenuOpen}
                            className={`flex flex-1 items-center gap-1.5 min-w-0 text-left text-xs transition-colors focus:outline-none ${
                              hasActiveChild
                                ? 'font-semibold text-[#e6e6e4]'
                                : 'text-[#9b9a97] hover:text-[#e6e6e4]'
                            }`}
                          >
                            <ChevronRight
                              className={`h-3 w-3 shrink-0 text-[#9b9a97] chevron-icon ${
                                isCatMenuOpen ? 'is-open' : ''
                              }`}
                            />
                            <span className="truncate">{cat.shortName}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCategory(prev => (prev === cat.id ? 'all' : cat.id))
                            }
                            title={`Filter by ${cat.shortName}`}
                            className={`ml-1.5 rounded px-1.5 py-0.2 text-[10px] font-medium tabular-nums transition-colors focus:outline-none ${
                              TAG_CLASS_MAP[cat.color]
                            } ${
                              selectedCategory === cat.id
                                ? 'outline outline-1 outline-[#e6e6e4]'
                                : ''
                            }`}
                          >
                            {catTerms.length}
                          </button>
                        </div>

                        <div
                          className={`accordion-grid ${
                            isCatMenuOpen && catTerms.length > 0 ? 'is-open' : ''
                          }`}
                        >
                          <div className="accordion-inner">
                            <div className="ml-3.5 space-y-0.5 border-l border-[rgba(255,255,255,0.08)] pl-2 py-1">
                              {catTerms.map(term => {
                                const isCurrent = activeTerm?.id === term.id && activeView === 'docs';
                                const isMastered = masteryMap[term.id] === 'mastered';
                                return (
                                  <button
                                    type="button"
                                    key={term.id}
                                    onClick={() => handleSelectTerm(term.id, false)}
                                    className={`flex h-6 w-full items-center justify-between rounded px-2 text-left text-xs transition-colors focus:outline-none ${
                                      isCurrent
                                        ? 'bg-[rgba(255,255,255,0.1)] font-semibold text-[#e6e6e4]'
                                        : 'text-[#9b9a97] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#e6e6e4]'
                                    }`}
                                  >
                                    <span className="truncate">{term.term}</span>
                                    {isMastered && (
                                      <Check className="ml-1.5 h-3 w-3 shrink-0 text-[#7fd1a8]" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Terms Index A-Z (Initially closed) */}
          <div className="rounded border border-[rgba(255,255,255,0.07)] bg-[#1c1c1c]">
            <button
              type="button"
              onClick={() => setSidebarTermsOpen(prev => !prev)}
              aria-expanded={sidebarTermsOpen}
              className="flex h-8 w-full items-center justify-between px-2.5 text-left text-[11px] font-semibold text-[#9b9a97] hover:text-[#e6e6e4] transition-colors focus:outline-none"
            >
              <span className="flex items-center gap-1.5">
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 chevron-icon ${
                    sidebarTermsOpen ? 'is-open' : ''
                  }`}
                />
                <span>TERMS INDEX</span>
              </span>
              <span className="text-[10px] tabular-nums">{filteredTerms.length}</span>
            </button>

            <div className={`accordion-grid ${sidebarTermsOpen ? 'is-open' : ''}`}>
              <div className="accordion-inner">
                <div className="accordion-content-border max-h-64 space-y-0.5 overflow-y-auto px-1.5 pb-2 pt-1.5">
                  {filteredTerms.map(term => {
                    const isCurrent = activeTerm?.id === term.id && activeView === 'docs';
                    return (
                      <button
                        type="button"
                        key={term.id}
                        onClick={() => handleSelectTerm(term.id, false)}
                        className={`flex h-6 w-full items-center justify-between rounded px-2 text-left text-xs transition-colors focus:outline-none ${
                          isCurrent
                            ? 'bg-[rgba(255,255,255,0.1)] font-semibold text-[#e6e6e4]'
                            : 'text-[#9b9a97] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e6e6e4]'
                        }`}
                      >
                        <span className="truncate">{term.term}</span>
                        <span className="ml-2 shrink-0 text-[10px] tabular-nums text-[#9b9a97]/70">
                          p.{term.page}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= RIGHT VIEW: OBJECT / TERM DOCUMENTATION OR MEMORIZE LAB ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Compact Top Header */}
        <header className="flex h-11 shrink-0 items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.09)] bg-[#191919] px-5">
          {/* Left: Mobile menu button & Documentation position indicator */}
          <div className="flex items-center gap-4 text-xs text-[#9b9a97]">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded p-1 text-[#e6e6e4] hover:bg-[rgba(255,255,255,0.06)] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="whitespace-nowrap shrink-0 tabular-nums">
              {activeView === 'docs'
                ? `Term ${filteredTerms.length > 0 ? currentIndex + 1 : 0} of ${filteredTerms.length}`
                : `Memorize Lab · ${ masteredCount } / ${GLOSSARY_TERMS.length} Mastered`}
            </span>
            {activeCategory && activeView === 'docs' && (
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(prev =>
                    prev === activeCategory.id ? 'all' : activeCategory.id
                  )
                }
                className="hidden sm:inline-block hover:text-[#e6e6e4] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
              >
                Module: {activeCategory.shortName}
              </button>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-[#f2c97d] hover:underline whitespace-nowrap shrink-0 focus:outline-none"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Right: Mode Toggle & Search Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveView(prev => (prev === 'docs' ? 'memorize' : 'docs'))}
              className={`flex items-center gap-1.5 rounded border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
                activeView === 'memorize'
                  ? 'border-[#e6e6e4] bg-[#e6e6e4] text-[#191919] font-semibold'
                  : 'border-[rgba(255,255,255,0.14)] bg-[#202020] text-[#e6e6e4] hover:bg-[#252525]'
              }`}
            >
              {activeView === 'memorize' ? (
                <>
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Back to Docs</span>
                </>
              ) : (
                <>
                  <Layers className="h-3.5 w-3.5 text-[#7fd1a8]" />
                  <span>Memorize Lab</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-1.5 rounded border border-[rgba(255,255,255,0.14)] bg-[#252525] px-3 py-1 text-xs font-medium text-[#e6e6e4] hover:bg-[rgba(255,255,255,0.1)] transition-colors whitespace-nowrap shrink-0 focus:outline-none"
            >
              <Search className="h-3.5 w-3.5 text-[#9b9a97]" />
              <span>Search (Ctrl+K)</span>
            </button>
          </div>
        </header>

        {/* Main Documentation Canvas with Stable Scroll */}
        <main
          ref={mainContentRef}
          id="top"
          className="stable-scroll flex-1 overflow-y-auto px-5 py-8 md:px-12 lg:px-16"
        >
          <div className="mx-auto max-w-[780px] pb-24">
            {activeView === 'memorize' ? (
              <MemorizeLab
                filteredTerms={filteredTerms}
                masteryMap={masteryMap}
                onUpdateMastery={handleUpdateMastery}
                onJumpToTermDoc={termId => handleSelectTerm(termId, true)}
              />
            ) : filteredTerms.length === 0 || !activeTerm ? (
              <div className="rounded-lg border border-[rgba(255,255,255,0.09)] bg-[#202020] p-10 text-center">
                <h3 className="text-sm font-semibold text-[#e6e6e4]">
                  No terms found for the current filters
                </h3>
                <p className="mt-1 text-xs text-[#9b9a97]">
                  Reset the filters to explore all 121 definitions.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded bg-[#e6e6e4] px-3.5 py-1.5 text-xs font-semibold text-[#191919] hover:opacity-90"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>
            ) : (
              /* ================= ACTIVE OBJECT / TERM DOCUMENTATION ================= */
              <article className="space-y-6">
                {/* Breadcrumbs & Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.09)] pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#9b9a97]">
                    {activeCategory && (
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${TAG_CLASS_MAP[activeCategory.color]}`}
                      >
                        {activeCategory.name}
                      </span>
                    )}
                    <span>/</span>
                    <span>Section {activeTerm.letter}</span>
                    <span>/</span>
                    <span className="tabular-nums">Page {activeTerm.page} (PDF)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyDefinition(activeTerm)}
                    className="flex h-7 items-center gap-1.5 rounded border border-[rgba(255,255,255,0.14)] bg-[#202020] px-3 text-xs font-medium text-[#9b9a97] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#e6e6e4] transition-colors focus:outline-none"
                  >
                    {copiedId === activeTerm.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#7fd1a8]" />
                        <span className="text-[#7fd1a8]">Definition copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy definition</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Object / Term Name (Documentation H1) */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#e6e6e4]">
                      {activeTerm.term}
                    </h1>
                    {activeTerm.acronym && activeTerm.acronym !== activeTerm.term && (
                      <code className="rounded border border-[rgba(255,255,255,0.14)] bg-[#252525] px-2 py-0.5 font-mono text-sm font-semibold text-[#e6e6e4]">
                        {activeTerm.acronym}
                      </code>
                    )}
                  </div>
                </div>

                {/* 1. Official Definition directly below the heading (No box) */}
                <div className="space-y-4 pt-1">
                  <p className="text-base md:text-[17px] leading-relaxed text-[#e6e6e4]">
                    {formatDefinitionText(activeTerm.definitionEn)}
                  </p>

                  {/* 2. Key Summary (EN) & Explanation (ES) below (No box, distinct text color) */}
                  <div className="space-y-2 pt-2">
                    <p className="text-sm md:text-[15px] leading-relaxed text-[#a6b4c0]">
                      <span className="font-semibold text-[#bfd0de]">Key summary: </span>
                      {activeTerm.calloutEs}
                    </p>
                    <p className="text-sm leading-relaxed text-[#9b9a97]">
                      {activeTerm.explanationEs}
                    </p>
                  </div>
                </div>

                {/* Specifications, Technical Details & Examples (No accordion) */}
                {activeTerm.details && activeTerm.details.length > 0 && (
                  <div className="pt-2 space-y-2.5">
                    <h2 className="text-xs font-semibold text-[#9b9a97]">
                      Specifications, technical details &amp; examples
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-[#e6e6e4]/90">
                      {activeTerm.details.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* References & Related Terms (No accordion) */}
                {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                  <div className="pt-2 space-y-2.5">
                    <h2 className="text-xs font-semibold text-[#9b9a97]">
                      References &amp; related terms
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {activeTerm.relatedTerms.map(rel => (
                        <button
                          type="button"
                          key={rel}
                          onClick={() => handleSelectTerm(rel, true)}
                          className="inline-flex items-center gap-1.5 rounded border border-[rgba(255,255,255,0.14)] bg-[#202020] px-3 py-1.5 text-xs font-medium text-[#e6e6e4] hover:bg-[rgba(255,255,255,0.08)] transition-colors focus:outline-none"
                        >
                          <span>{rel}</span>
                          <ArrowUpRight className="h-3 w-3 text-[#9b9a97]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================= PREVIOUS / NEXT NAVIGATION BUTTONS ================= */}
                <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.09)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevTerm ? (
                    <button
                      type="button"
                      onClick={() => setActiveTermId(prevTerm.id)}
                      className="group flex flex-col items-start justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#202020] p-4 text-left hover:border-[rgba(255,255,255,0.28)] hover:bg-[#252525] transition-colors focus:outline-none"
                    >
                      <span className="flex items-center gap-1 text-xs font-medium text-[#9b9a97] group-hover:text-[#e6e6e4] transition-colors">
                        <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
                        <span>Previous</span>
                      </span>
                      <span className="mt-1.5 text-base font-bold text-[#e6e6e4]">
                        {prevTerm.term}
                      </span>
                      <span className="mt-0.5 text-[11px] text-[#9b9a97]">
                        {CATEGORIES[prevTerm.category]?.shortName} · Page {prevTerm.page}
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[#1c1c1c]/50 p-4 opacity-40 select-none">
                      <span className="flex items-center gap-1 text-xs text-[#9b9a97]">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span>Previous</span>
                      </span>
                      <span className="mt-1.5 block text-sm text-[#9b9a97]">
                        Start of documentation
                      </span>
                    </div>
                  )}

                  {nextTerm ? (
                    <button
                      type="button"
                      onClick={() => setActiveTermId(nextTerm.id)}
                      className="group flex flex-col items-end justify-between rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#202020] p-4 text-right hover:border-[rgba(255,255,255,0.28)] hover:bg-[#252525] transition-colors focus:outline-none"
                    >
                      <span className="flex items-center gap-1 text-xs font-medium text-[#9b9a97] group-hover:text-[#e6e6e4] transition-colors">
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1.5 text-base font-bold text-[#e6e6e4]">
                        {nextTerm.term}
                      </span>
                      <span className="mt-0.5 text-[11px] text-[#9b9a97]">
                        {CATEGORIES[nextTerm.category]?.shortName} · Page {nextTerm.page}
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[#1c1c1c]/50 p-4 text-right opacity-40 select-none">
                      <span className="flex items-center justify-end gap-1 text-xs text-[#9b9a97]">
                        <span>Next</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="mt-1.5 block text-sm text-[#9b9a97]">
                        End of documentation
                      </span>
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        </main>
      </div>

      {/* ================= QUICK SEARCH MODAL (CTRL+K) ================= */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/65 pt-16 px-4 backdrop-blur-[1px]"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-lg border border-[rgba(255,255,255,0.16)] bg-[#202020] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-[rgba(255,255,255,0.09)] px-4 py-3">
              <Search className="mr-3 h-4 w-4 text-[#9b9a97]" />
              <input
                ref={modalSearchRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by term, acronym, or definition..."
                className="w-full bg-transparent text-sm text-[#e6e6e4] placeholder-[#9b9a97] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="ml-2 rounded border border-[rgba(255,255,255,0.12)] px-1.5 py-0.5 text-[11px] text-[#9b9a97] hover:text-[#e6e6e4]"
              >
                ESC
              </button>
            </div>

            <div className="stable-scroll max-h-96 overflow-y-auto p-2">
              <div className="px-2.5 py-1 text-[11px] font-semibold text-[#9b9a97]">
                RESULTS ({filteredTerms.length} of {GLOSSARY_TERMS.length})
              </div>
              {filteredTerms.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#9b9a97]">
                  No matches found for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredTerms.slice(0, 40).map(term => {
                  const cat = CATEGORIES[term.category];
                  return (
                    <button
                      type="button"
                      key={term.id}
                      onClick={() => handleSelectTerm(term.id, true)}
                      className="flex w-full items-start justify-between gap-3 rounded px-3 py-2 text-left hover:bg-[rgba(255,255,255,0.06)] transition-colors focus:outline-none"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#e6e6e4]">
                            {term.term}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.2 text-[10px] font-medium ${TAG_CLASS_MAP[cat.color]}`}
                          >
                            {cat.shortName}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-[#9b9a97]">
                          {term.calloutEs}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] tabular-nums text-[#9b9a97]">
                        Page {term.page}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
