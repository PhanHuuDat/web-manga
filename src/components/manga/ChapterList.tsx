import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { customColors } from '../../theme/theme';
import type { Chapter } from '../../types/manga-types';

interface ChapterListProps {
  chapters: Chapter[];
  onChapterClick: (chapterId: string) => void;
}

function ChapterList({ chapters, onChapterClick }: ChapterListProps) {
  const { t } = useTranslation('manga');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedChapters = [...chapters].sort((a, b) => {
    return sortOrder === 'desc'
      ? b.chapterNumber - a.chapterNumber
      : a.chapterNumber - b.chapterNumber;
  });

  return (
    <Box>
      {/* Header with sort controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t('detail.chapters')}
        </Typography>

        <ButtonGroup size="small">
          <Button
            onClick={() => setSortOrder('desc')}
            variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
          >
            {t('detail.sortNewest')}
          </Button>
          <Button
            onClick={() => setSortOrder('asc')}
            variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
          >
            {t('detail.sortOldest')}
          </Button>
        </ButtonGroup>
      </Box>

      {/* Chapter list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {sortedChapters.map((chapter) => (
          <Box
            key={chapter.id}
            onClick={() => onChapterClick(chapter.id)}
            sx={{
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
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                Chapter {chapter.chapterNumber}
                {chapter.title && `: ${chapter.title}`}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}
              >
                {new Date(chapter.publishedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
              {chapter.views.toLocaleString()} {t('info.views')}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ChapterList;
