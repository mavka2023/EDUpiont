import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import ReactMarkdown from 'react-markdown';
import { colors, spacing, fontSize } from '../../../styles/constants';
import { useParams } from 'react-router-dom';

const ViewNote: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();

  const storedNotes = localStorage.getItem('notes');
  const notes = storedNotes ? JSON.parse(storedNotes) : [];
  const note = notes.find((note: { id: number }) => note.id.toString() === noteId);

  if (!note) {
    return (
      <MainContent title="Note Not Found">
        <p style={{ color: colors['font-header'], fontSize: fontSize.md }}>
          The note you are looking for does not exist.
        </p>
      </MainContent>
    );
  }

  return (
    <MainContent title={`View Note: ${note.title}`}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Card>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1
                      style={{
                        fontSize: fontSize.xxl,
                        fontWeight: 400,
                        color: colors['font-header'],
                        lineHeight: 1.2,
                      }}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      style={{
                        fontSize: fontSize.xl,
                        fontWeight: 400,
                        color: colors['font-header'],
                        lineHeight: 1.3,
                      }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      style={{
                        fontSize: fontSize.lg,
                        fontWeight: 600,
                        color: colors['font-header'],
                        lineHeight: 1.4,
                      }}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p
                      style={{
                        fontSize: fontSize.md,
                        lineHeight: 1.5,
                        color: colors['font-header'],
                        marginBottom: spacing.sm,
                      }}
                    >
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul style={{ marginLeft: spacing.lg, marginBottom: spacing.sm }}>
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li
                      style={{
                        fontSize: fontSize.md,
                        color: colors['font-header'],
                        marginBottom: spacing.xs,
                      }}
                    >
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote
                      style={{
                        padding: `${spacing.sm} ${spacing.md}`,
                        backgroundColor: colors['gray-lt'],
                        borderLeft: `5px solid ${colors.primary}`,
                        fontStyle: 'italic',
                        color: colors['font-header'],
                      }}
                    >
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </Box>
    </MainContent>
  );
};

export default ViewNote;
