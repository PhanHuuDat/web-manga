import { useState, useMemo, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { customColors } from '../../theme/theme';
import type { ChapterDto } from '../../types/manga-api-types';

interface ChapterListProps {
  chapters: ChapterDto[];
  onChapterClick: (chapterId: string) => void;
}

// Static sx objects hoisted to module level to prevent recreation on each render
const headerBoxSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
} as const;

const listBoxSx = { display: 'flex', flexDirection: 'column', gap: 1 } as const;

const chapterRowSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 2,
  borderRadius: 2,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    bgcolor: customColors.cardBgHover,
    borderColor: 'primary.main',
  },
} as const;

const chapterInfoSx = { flex: 1 } as const;

const chapterTitleSx = { fontWeight: 600, fontSize: 14 } as const;

const chapterDateSx = { fontSize: 12, color: 'text.secondary', mt: 0.5 } as const;

const chapterViewsSx = { fontSize: 12, color: 'text.disabled' } as const;

function ChapterList({ chapters, onChapterClick }: ChapterListProps) {
  const { t } = useTranslation('manga');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Memoize sorted chapters to avoid re-sorting on every render
  const sortedChapters = useMemo(
    () =>
      [...chapters].sort((a, b) =>
        sortOrder === 'desc'
          ? b.chapterNumber - a.chapterNumber
          : a.chapterNumber - b.chapterNumber,
      ),
    [chapters, sortOrder],
  );

  // Memoize formatted dates keyed by chapter id to avoid repeated Date construction
  const formattedDates = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((c) => [c.id, new Date(c.publishedAt).toLocaleDateString()]),
      ),
    [chapters],
  );

  // Memoize click handlers keyed by chapter id to avoid inline arrow functions in JSX
  const clickHandlers = useMemo(
    () =>
      Object.fromEntries(
        sortedChapters.map((c) => [c.id, () => onChapterClick(c.id)]),
      ),
    [sortedChapters, onChapterClick],
  );

  const handleSortDesc = useCallback(() => setSortOrder('desc'), []);
  const handleSortAsc = useCallback(() => setSortOrder('asc'), []);

  return (
    <Box>
      {/* Header with sort controls */}
      <Box sx={headerBoxSx}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t('detail.chapters')}
        </Typography>

        <ButtonGroup size="small">
          <Button
            onClick={handleSortDesc}
            variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
          >
            {t('detail.sortNewest')}
          </Button>
          <Button
            onClick={handleSortAsc}
            variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
          >
            {t('detail.sortOldest')}
          </Button>
        </ButtonGroup>
      </Box>

      {/* Chapter list */}
      <Box sx={listBoxSx}>
        {sortedChapters.map((chapter) => (
          <Box key={chapter.id} onClick={clickHandlers[chapter.id]} sx={chapterRowSx}>
            <Box sx={chapterInfoSx}>
              <Typography sx={chapterTitleSx}>
                Chapter {chapter.chapterNumber}
                {chapter.title && `: ${chapter.title}`}
              </Typography>
              <Typography sx={chapterDateSx}>{formattedDates[chapter.id]}</Typography>
            </Box>

            <Typography sx={chapterViewsSx}>
              {chapter.views.toLocaleString()} {t('info.views')}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ChapterList;
