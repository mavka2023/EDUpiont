import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, CardContent, CardActions, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import MainContent from '../../mainContent/MainContent';

const ViewTest: React.FC = () => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/tests/edit/${testId}`);
    };

    const handleShare = () => {
        const shareLink = `${window.location.origin}/solve/${testId}`;
        navigator.clipboard.writeText(shareLink);
        alert('Test link copied to clipboard!');
    };

    const handleStart = () => {
        navigate(`/tests/solve/${testId}`);
    };

    return (
        <MainContent title={`Tests`}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" gutterBottom>
                        Test #{testId}
                        </Typography>
                        <Box>
                            <IconButton color="primary" onClick={handleEdit} aria-label="Edit Test">
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={handleShare} aria-label="Share Test">
                                <ShareIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1">
                        Description: This test contains questions to evaluate user knowledge.
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Button variant="contained" color="success" onClick={handleStart}>
                        Start Test
                    </Button>
                </CardActions>
            </Card>
        </MainContent>
    );
};

export default ViewTest;
