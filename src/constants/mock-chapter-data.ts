import type { MangaDetail, ChapterDetail } from '../types/manga-types';

// Extended manga detail with chapters
export const MANGA_DETAIL_SOLO_LEVELING: MangaDetail = {
  id: '1',
  title: 'Solo Leveling: Arise',
  slug: 'solo-leveling-arise',
  coverUrl: 'https://placehold.co/300x450/1a1e2e/3b82f6?text=Solo+Leveling',
  bannerUrl: 'https://placehold.co/1920x600/0a0c14/3b82f6?text=Solo+Leveling+Banner',
  author: 'Chugong',
  artist: 'DUBU (REDICE STUDIO)',
  genres: ['Action', 'Fantasy', 'Adventure'],
  latestChapter: 200,
  totalChapters: 200,
  views: 24000000,
  updatedAt: '2026-02-10T10:00:00Z',
  status: 'completed',
  badge: 'hot',
  synopsis: `In a world where awakened humans called "Hunters" must battle deadly monsters to protect humanity, Sung Jinwoo is the weakest of all the Hunters, barely able to make a living. One day, after a brutal encounter in an extremely dangerous dungeon, Jinwoo finds himself as the only survivor. But he doesn't come out unchanged - he gains the ability to see a mysterious System that only he can see, with quests, leveling, and skill points. Now, he must unravel the secrets behind this System and rise from the weakest to become the strongest Hunter of all time.`,
  rating: 4.8,
  ratingCount: 125000,
  alternativeTitles: ['나 혼자만 레벨업', 'I Level Up Alone'],
  publishedYear: 2018,
  chapters: Array.from({ length: 200 }, (_, i) => ({
    id: `ch-${200 - i}`,
    chapterNumber: 200 - i,
    title: i === 0 ? 'The End and New Beginning' : undefined,
    slug: `chapter-${200 - i}`,
    publishedAt: new Date(2026, 1, 10 - Math.floor(i / 3)).toISOString(),
    pages: 15 + Math.floor(Math.random() * 10),
    views: 50000 + Math.floor(Math.random() * 100000),
  })),
};

// Sample chapter detail with images (using placeholder images)
export const CHAPTER_DETAIL_SAMPLE: ChapterDetail = {
  id: 'ch-200',
  chapterNumber: 200,
  title: 'The End and New Beginning',
  slug: 'chapter-200',
  publishedAt: '2026-02-10T10:00:00Z',
  pages: 18,
  views: 125000,
  mangaId: '1',
  mangaTitle: 'Solo Leveling: Arise',
  mangaSlug: 'solo-leveling-arise',
  images: Array.from({ length: 18 }, (_, i) => ({
    pageNumber: i + 1,
    imageUrl: `https://placehold.co/800x1200/1a1e2e/f1f5f9?text=Page+${i + 1}`,
  })),
  prevChapter: { chapterNumber: 199, slug: 'chapter-199' },
  nextChapter: undefined,
};

// Generate chapter detail for any chapter
export function getChapterDetail(mangaSlug: string, chapterNumber: number): ChapterDetail {
  const pageCount = 15 + Math.floor(Math.random() * 10);
  return {
    id: `ch-${chapterNumber}`,
    chapterNumber,
    title: chapterNumber === 200 ? 'The End and New Beginning' : undefined,
    slug: `chapter-${chapterNumber}`,
    publishedAt: new Date(2026, 1, 10 - Math.floor((200 - chapterNumber) / 3)).toISOString(),
    pages: pageCount,
    views: 50000 + Math.floor(Math.random() * 100000),
    mangaId: '1',
    mangaTitle: 'Solo Leveling: Arise',
    mangaSlug: mangaSlug,
    images: Array.from({ length: pageCount }, (_, i) => ({
      pageNumber: i + 1,
      imageUrl: `https://placehold.co/800x1200/1a1e2e/f1f5f9?text=Ch${chapterNumber}+Page+${i + 1}`,
    })),
    prevChapter: chapterNumber > 1 ? { chapterNumber: chapterNumber - 1, slug: `chapter-${chapterNumber - 1}` } : undefined,
    nextChapter: chapterNumber < 200 ? { chapterNumber: chapterNumber + 1, slug: `chapter-${chapterNumber + 1}` } : undefined,
  };
}

// Additional manga details for variety
export const MANGA_DETAILS: Record<string, MangaDetail> = {
  'solo-leveling-arise': MANGA_DETAIL_SOLO_LEVELING,
  'one-piece': {
    id: '2',
    title: 'One Piece',
    slug: 'one-piece',
    coverUrl: 'https://placehold.co/300x450/1a1e2e/a855f7?text=One+Piece',
    bannerUrl: 'https://placehold.co/1920x600/0a0c14/a855f7?text=One+Piece+Banner',
    author: 'Eiichiro Oda',
    genres: ['Adventure', 'Action', 'Comedy', 'Fantasy'],
    latestChapter: 1120,
    totalChapters: 1120,
    views: 58000000,
    updatedAt: '2026-02-09T08:00:00Z',
    status: 'ongoing',
    badge: 'top',
    synopsis: `Gol D. Roger, a man referred to as the "Pirate King," is set to be executed by the World Government. But before his death, he confirms the existence of a great treasure, One Piece, located somewhere within the vast ocean known as the Grand Line. Monkey D. Luffy, a young boy who dreams of becoming the Pirate King, sets out on a journey to find One Piece with his crew of Straw Hat Pirates.`,
    rating: 4.9,
    ratingCount: 350000,
    alternativeTitles: ['ワンピース'],
    publishedYear: 1997,
    chapters: Array.from({ length: 50 }, (_, i) => ({
      id: `op-ch-${1120 - i}`,
      chapterNumber: 1120 - i,
      slug: `chapter-${1120 - i}`,
      publishedAt: new Date(2026, 1, 9 - Math.floor(i / 2)).toISOString(),
      pages: 17 + Math.floor(Math.random() * 5),
      views: 50000 + Math.floor(Math.random() * 100000),
    })),
  },
  'omniscient-reader': {
    id: '3',
    title: "Omniscient Reader's Viewpoint",
    slug: 'omniscient-reader',
    coverUrl: 'https://placehold.co/300x450/1a1e2e/22c55e?text=ORV',
    bannerUrl: 'https://placehold.co/1920x600/0a0c14/22c55e?text=ORV+Banner',
    author: 'Sing Shong',
    artist: 'Sleepy-C',
    genres: ['Action', 'Fantasy', 'Drama'],
    latestChapter: 195,
    totalChapters: 195,
    views: 18000000,
    updatedAt: '2026-02-10T12:00:00Z',
    status: 'ongoing',
    badge: 'new',
    synopsis: `Kim Dokja was an ordinary office worker who spent years reading "Three Ways to Survive the Apocalypse," a web novel with a single dedicated reader - himself. When the novel suddenly becomes reality, Kim Dokja becomes the only person who knows how the world will end. Using his knowledge of the story, he must navigate through a world of disasters, monsters, and scenarios to survive.`,
    rating: 4.7,
    ratingCount: 89000,
    alternativeTitles: ['전지적 독자 시점', 'ORV'],
    publishedYear: 2020,
    chapters: Array.from({ length: 50 }, (_, i) => ({
      id: `orv-ch-${195 - i}`,
      chapterNumber: 195 - i,
      slug: `chapter-${195 - i}`,
      publishedAt: new Date(2026, 1, 10 - Math.floor(i / 2)).toISOString(),
      pages: 20 + Math.floor(Math.random() * 8),
      views: 50000 + Math.floor(Math.random() * 100000),
    })),
  },
};

// Helper to get manga detail by slug
export function getMangaDetail(slug: string): MangaDetail | undefined {
  return MANGA_DETAILS[slug];
}
