import { GlossaryTerm, CATEGORIES } from '../data/glossaryData';

export interface SmartSearchResult {
  term: GlossaryTerm;
  score: number;
  matchBadge: string;
  snippet: string;
}

/**
 * Strips accents/diacritics and lowercases text so "camion" matches "camión"
 */
export function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Strips punctuation/dots/hyphens so "pod" matches "P.O.D", "hos" matches "H.O.S", "w9" matches "W-9"
 */
export function compactAlphanumeric(str: string): string {
  return normalizeText(str).replace(/[^a-z0-9]/g, '');
}

/**
 * Bounded Levenshtein edit distance for typo tolerance (e.g. "dispacher" -> "dispatcher", "frieght" -> "freight")
 */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 2) return 99;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Common bilingual & operational synonyms in logistics
const SYNONYM_MAP: Record<string, string[]> = {
  stepdeck: ['dropdeck trailer', 'step deck'],
  'step deck': ['dropdeck trailer'],
  refrigerated: ['reefer', 'fahrenheit', 'temperature recorder'],
  frio: ['reefer', 'temperature recorder', 'fahrenheit', 'celsius'],
  refrigerado: ['reefer', 'temperature recorder'],
  temperatura: ['reefer', 'temperature recorder', 'fahrenheit', 'celsius'],
  tarima: ['pallet', 'palletization', 'pallet jack', 'gaylords'],
  estiba: ['pallet', 'palletization', 'floor loaded'],
  montacargas: ['fork lift', 'pallet jack'],
  aduana: ['commercial invoice', 'freight forwarder', 'consignee', 'shipper'],
  multa: ['detention', 'tonu', 'layover'],
  demora: ['detention', 'layover'],
  espera: ['detention', 'layover'],
  cancelacion: ['tonu'],
  peso: ['overweight', 'scale ticket', 'pounds', 'payload'],
  bascula: ['scale ticket', 'overweight'],
  seguro: ['insurance', 'cargo insurance', 'liability insurance', 'certificate holder'],
  poliza: ['insurance', 'cargo insurance', 'liability insurance', 'certificate holder'],
  factura: ['invoice', 'commercial invoice', 'factoring company', 'quick pay', 'billing'],
  pago: ['ach', 'wire transfer', 'comcheck', 'quick pay', 'cash on delivery', 'prepaid', 'collect'],
  cobro: ['collect', 'cash on delivery', 'factoring company', 'lumper fee'],
  cheque: ['comcheck', 'efs', 'ach'],
  impuesto: ['w9', 'ein'],
  cajas: ['dry van', 'van', 'vented van', 'packers', 'gaylords'],
  lona: ['tarp', 'conestoga', 'flatbed'],
  cadenas: ['flatbed', 'straps', 'coil racks'],
  correas: ['straps', 'load bar'],
  remolque: ['trailer', 'dry van', 'reefer', 'flatbed', 'dropdeck trailer', 'conestoga', 'lowboy', 'rgn', 'tankers', 'bobtail'],
  camion: ['carrier', 'tractor', 'straight truck', 'box truck', 'sprinter van', 'bobtail', 'hotshot'],
  chofer: ['driver', 'owner operator', 'team drivers', 'hos'],
  conductor: ['driver', 'owner operator', 'team drivers', 'hos'],
  horas: ['hos', 'layover', 'detention'],
  descarga: ['lumper', 'lumper fee', 'liftgate', 'tailgate', 'driver assist', 'consignee', 'pod'],
  entrega: ['pod', 'consignee', 'delivery', 'appointment', 'drop', 'fcfs', 'eta'],
  cita: ['appointment', 'fcfs', 'window'],
  documento: ['bol', 'pod', 'rate confirmation', 'commercial invoice', 'w9', 'scale ticket']
};

export function performSmartSearch(
  terms: GlossaryTerm[],
  rawQuery: string,
  selectedCategory: string,
  selectedLetter: string
): SmartSearchResult[] {
  // First apply category and letter filters
  const basePool = terms.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedLetter !== 'all' && item.letter !== selectedLetter) {
      return false;
    }
    return true;
  });

  const trimmedQuery = rawQuery.trim();
  if (!trimmedQuery) {
    return basePool.map(term => ({
      term,
      score: 1,
      matchBadge: CATEGORIES[term.category]?.shortName || term.category,
      snippet: term.calloutEs
    }));
  }

  const normQuery = normalizeText(trimmedQuery);
  const compactQuery = compactAlphanumeric(trimmedQuery);
  const queryTokens = normQuery
    .split(/[\s,./\-_]+/)
    .map(t => t.trim())
    .filter(Boolean);

  // Check if user is searching for a specific PDF page, e.g. "page 12", "p.12", "p 12"
  const pageMatch = normQuery.match(/^(?:page|pag|p\.?)\s*(\d{1,2})$/);
  const targetPage = pageMatch ? parseInt(pageMatch[1], 10) : null;

  const results: SmartSearchResult[] = [];

  for (const item of basePool) {
    let score = 0;
    let matchBadge = '';
    let snippet = item.calloutEs;

    if (targetPage !== null) {
      if (item.page === targetPage) {
        results.push({
          term: item,
          score: 1000,
          matchBadge: `Page ${item.page}`,
          snippet: item.calloutEs
        });
      }
      continue;
    }

    const normTerm = normalizeText(item.term);
    const compactTerm = compactAlphanumeric(item.term);
    const normAcronym = item.acronym ? normalizeText(item.acronym) : '';
    const compactAcronym = item.acronym ? compactAlphanumeric(item.acronym) : '';
    const normCallout = normalizeText(item.calloutEs);
    const normDef = normalizeText(item.definitionEn);
    const normExpEs = normalizeText(item.explanationEs);
    const normDetails = item.details.map(d => normalizeText(d));
    const normRelated = item.relatedTerms.map(r => normalizeText(r));
    const normCategory = normalizeText(CATEGORIES[item.category]?.name || '');

    const termWords = normTerm.split(/[\s(),./\-_]+/).filter(Boolean);

    // 1. Exact Acronym or Compact Acronym Match (e.g. "pod" -> "P.O.D", "hos" -> "H.O.S", "bol" -> "BOL")
    if (
      (compactAcronym && compactAcronym === compactQuery) ||
      (normAcronym && normAcronym === normQuery)
    ) {
      score += 1200;
      matchBadge = 'Exact acronym';
    }

    // 2. Exact Term Match
    if (normTerm === normQuery || compactTerm === compactQuery) {
      score += 1100;
      if (!matchBadge) matchBadge = 'Exact term';
    }

    // 3. Term or Acronym starts with query
    if (normTerm.startsWith(normQuery) || compactTerm.startsWith(compactQuery)) {
      score += 700;
      if (!matchBadge) matchBadge = 'Term match';
    } else if (compactAcronym && compactAcronym.startsWith(compactQuery) && compactQuery.length >= 2) {
      score += 650;
      if (!matchBadge) matchBadge = 'Acronym match';
    }

    // 4. Word-boundary match inside Term Name (e.g. "bill" or "bol" in "Freight bill-of-lading (BOL)")
    if (termWords.some(w => w === normQuery || w.startsWith(normQuery))) {
      score += 500;
      if (!matchBadge) matchBadge = 'Term match';
    } else if (normTerm.includes(normQuery)) {
      score += 350;
      if (!matchBadge) matchBadge = 'Term match';
    }

    // 5. Synonym / Domain Alias Match
    for (const [synKey, targets] of Object.entries(SYNONYM_MAP)) {
      if (normQuery.includes(synKey) && targets.some(t => normTerm.includes(t))) {
        score += 320;
        if (!matchBadge) matchBadge = 'Related concept';
      }
    }

    // 6. Multi-token evaluation across all fields
    let matchedTokensCount = 0;

    for (const token of queryTokens) {
      if (token.length === 0) continue;
      const compactToken = compactAlphanumeric(token);
      let tokenMatched = false;

      // Exact word or substring in Term / Acronym
      if (
        termWords.some(w => w === token || w.startsWith(token)) ||
        (compactAcronym && compactAcronym === compactToken)
      ) {
        score += 180;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Term match';
      } else if (normTerm.includes(token)) {
        score += 130;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Term match';
      }

      // Word boundary or substring in Key Summary (EN)
      const calloutWordRegex = new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
      if (calloutWordRegex.test(normCallout)) {
        score += 90;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Key summary';
      } else if (token.length >= 3 && normCallout.includes(token)) {
        score += 55;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Key summary';
      }

      // Word boundary or substring in Spanish Explanation (ES)
      if (calloutWordRegex.test(normExpEs)) {
        score += 85;
        tokenMatched = true;
        if (!matchBadge) {
          matchBadge = 'Spanish explanation';
          snippet = item.explanationEs;
        }
      } else if (token.length >= 3 && normExpEs.includes(token)) {
        score += 50;
        tokenMatched = true;
        if (!matchBadge) {
          matchBadge = 'Spanish explanation';
          snippet = item.explanationEs;
        }
      }

      // Word boundary in Official Definition (EN)
      if (calloutWordRegex.test(normDef)) {
        score += 75;
        tokenMatched = true;
        if (!matchBadge) {
          matchBadge = 'Official definition';
          snippet = item.definitionEn;
        }
      }

      // Match in Technical Details / Specs
      const matchingDetailIdx = normDetails.findIndex(d => d.includes(token));
      if (matchingDetailIdx !== -1 && token.length >= 2) {
        score += 60;
        tokenMatched = true;
        if (!matchBadge) {
          matchBadge = 'Technical specs';
          snippet = item.details[matchingDetailIdx];
        }
      }

      // Match in Related Terms
      if (normRelated.some(r => r.includes(token)) && token.length >= 3) {
        score += 40;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Related term';
      }

      // Match in Category Name
      if (normCategory.includes(token) && token.length >= 3) {
        score += 35;
        tokenMatched = true;
        if (!matchBadge) matchBadge = 'Module';
      }

      // 7. Typo-Tolerant Fuzzy Match on Term Words (for tokens >= 4 chars)
      if (!tokenMatched && token.length >= 4) {
        for (const tw of termWords) {
          if (tw.length >= 4) {
            const dist = editDistance(token, tw);
            const maxAllowed = token.length >= 6 ? 2 : 1;
            if (dist <= maxAllowed) {
              score += 140 - dist * 35;
              tokenMatched = true;
              if (!matchBadge) matchBadge = 'Fuzzy match';
              break;
            }
          }
        }
      }

      if (tokenMatched) {
        matchedTokensCount++;
      }
    }

    // Require that for multi-word queries, either all tokens matched OR the primary term scored strongly
    if (queryTokens.length > 1 && matchedTokensCount < queryTokens.length && score < 250) {
      score = 0;
    } else if (queryTokens.length > 1 && matchedTokensCount === queryTokens.length) {
      // Bonus when every word in a multi-word search matches
      score += 160;
    }

    if (score > 0) {
      results.push({
        term: item,
        score,
        matchBadge: matchBadge || CATEGORIES[item.category]?.shortName || 'Match',
        snippet
      });
    }
  }

  // Sort by highest score first, then alphabetically by term
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.term.term.localeCompare(b.term.term);
  });

  return results;
}
