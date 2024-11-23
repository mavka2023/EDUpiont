import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, CardContent, CardActions, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constans';

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
                    <Box display="flex" flexDirection={"column"} gap={spacing.sm}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5">
                            Test #{testId}
                            </Typography>
                            <Box display={"flex"} gap={spacing.sm}>
                                <IconButton color="primary" onClick={handleEdit} aria-label="Edit Test">
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={handleShare} aria-label="Share Test">
                                    <ShareIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider/>
                        <Typography variant="body1">
                            This test contains questions to evaluate user knowledge.
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="success" onClick={handleStart}>
                        Start Test
                    </Button>
                </CardActions>
            </Card>
        </MainContent>
    );
};

export default ViewTest;
