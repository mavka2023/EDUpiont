import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import MainContent from '../../mainContent/MainContent';
import ReactMarkdown from 'react-markdown';
import { colors, spacing, fontSize } from '../../../styles/constants';
import { useParams } from 'react-router-dom';

const mockNoteContent = `
# Mocked Note

This is a **mocked Markdown note** for demonstration purposes.

## Section 1
- Item 1
- Item 2

## Section 2
> "This is a blockquote in the note."

### Conclusion
Markdown makes notes look structured and easy to read.
`;

const ViewNote: React.FC = () => {
    const { noteId } = useParams<{ noteId: string }>();

    return (
        <MainContent title={`View Note #${noteId}`}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Card>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                            <ReactMarkdown
                                components={{
                                h1: ({ children }) => (
                                    <h1 style={{ fontSize: fontSize.xxl, fontWeight: 400, color: colors['font-header'], lineHeight: 1.2 }}>
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 style={{ fontSize: fontSize.xl, fontWeight: 400, color: colors['font-header'], lineHeight: 1.3 }}>
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 style={{ fontSize: fontSize.lg, fontWeight: 600, color: colors['font-header'], lineHeight: 1.4 }}>
                                        {children}
                                    </h3>
                                ),
                                h4: ({ children }) => (
                                    <h4 style={{ fontSize: fontSize.md, fontWeight: 500, color: colors['font-header'], lineHeight: 1.5 }}>
                                        {children}
                                    </h4>
                                ),
                                h5: ({ children }) => (
                                    <h5 style={{ fontSize: fontSize.sm, fontWeight: 500, color: colors['font-header'], lineHeight: 1.6 }}>
                                        {children}
                                    </h5>
                                ),
                                h6: ({ children }) => (
                                    <h6 style={{ fontSize: fontSize.xs, fontWeight: 300, color: colors['font-header'], lineHeight: 1.7 }}>
                                        {children}
                                    </h6>
                                ),
                                p: ({ children }) => (
                                    <p style={{ fontSize: fontSize.md, lineHeight: 1.5, color: colors['font-header'], marginBottom: spacing.sm }}>
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul style={{ marginLeft: spacing.lg, marginBottom: spacing.sm }}>
                                        {children}
                                    </ul>
                                ),
                                li: ({ children }) => (
                                    <li style={{ fontSize: fontSize.md, color: colors['font-header'], marginBottom: spacing.xs }}>
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
                                {mockNoteContent}
                            </ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            </Box>
        </MainContent>
    );
};

export default ViewNote;
