import MiniSearch from 'minisearch';
import { reportManifest, flattenManifest } from '../config/structure';
import { getAllDocuments } from './contentLoader';
import { Language } from '../i18n/translations';

export interface SearchResultItem {
  id: string;
  title: string;
  pre: string;
  route: string;
  snippet: string;
  score: number;
}

interface SearchDocument {
  id: string;
  title: string;
  pre: string;
  route: string;
  description: string;
  body: string;
  lang: Language;
}

// MiniSearch instances per language
const searchIndices: Record<Language, MiniSearch<SearchDocument>> = {
  en: new MiniSearch<SearchDocument>({
    fields: ['title', 'pre', 'description', 'body'],
    storeFields: ['id', 'title', 'pre', 'route', 'description'],
    searchOptions: {
      boost: { title: 3, pre: 2, description: 1.5, body: 1 },
      prefix: true,
      fuzzy: 0.2,
    },
  }),
  vi: new MiniSearch<SearchDocument>({
    fields: ['title', 'pre', 'description', 'body'],
    storeFields: ['id', 'title', 'pre', 'route', 'description'],
    searchOptions: {
      boost: { title: 3, pre: 2, description: 1.5, body: 1 },
      prefix: true,
      fuzzy: 0.2,
    },
  }),
};

let isInitialized = false;

export function initializeSearchIndex() {
  if (isInitialized) return;

  const flatItems = flattenManifest(reportManifest);

  for (const lang of ['en', 'vi'] as Language[]) {
    const docsToIndex: SearchDocument[] = [];
    const parsedDocs = getAllDocuments(lang);
    const parsedDocMap = new Map(parsedDocs.map((d) => [d.routePath, d]));

    for (const item of flatItems) {
      const parsed = parsedDocMap.get(item.path);
      const title = parsed?.frontMatter.title || item.title[lang];
      const pre = parsed?.frontMatter.pre || item.pre;
      const description = parsed?.frontMatter.description || item.description?.[lang] || '';
      const body = parsed?.content || '';

      docsToIndex.push({
        id: `${lang}:${item.path}`,
        title,
        pre,
        route: `/${lang}/${item.path}`,
        description,
        body: body.slice(0, 5000), // index first 5k chars of body
        lang,
      });
    }

    searchIndices[lang].addAll(docsToIndex);
  }

  isInitialized = true;
}

export function searchDocs(query: string, lang: Language): SearchResultItem[] {
  if (!query.trim()) return [];
  initializeSearchIndex();

  const results = searchIndices[lang].search(query);

  return results.slice(0, 8).map((result) => ({
    id: result.id,
    title: result.title,
    pre: result.pre,
    route: result.route,
    snippet: result.description || '',
    score: result.score,
  }));
}
