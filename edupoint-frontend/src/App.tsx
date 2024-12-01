import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Sidebar from './components/sidebar/Sidebar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/pages/dashboard/Dashboard';
import styled from 'styled-components';
import Tests from './components/pages/tests/Tests';
import Flashcards from './components/pages/flashcards/Flashcards';
import Notes from './components/pages/notes/Notes';
import SolveTest from './components/pages/tests/SolveTest';
import CreateTest from './components/pages/tests/CreateTest';
import EditTest from './components/pages/tests/EditTest';
import ViewNote from './components/pages/notes/ViewNote';
import EditNote from './components/pages/notes/EditNote';
import CreateNote from './components/pages/notes/CreateNote';
import MainPage from './components/MainPage';
import HomePage from './components/HomePage';

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
`;


const DashboardLayout: React.FC = () => (
    <AppContainer>
        <Sidebar />
        <Outlet />
    </AppContainer>
);

const App: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <Routes>
            {!isLoggedIn ? (
                <>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<MainPage />} />
                </>
            ) : (
                <>

                    <Route path="/" element={<HomePage />} />
                    <Route path="/" element={<DashboardLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="notes" element={<Notes />} />
                        <Route path="notes/create" element={<CreateNote/>} />
                        <Route path="notes/edit/:testId" element={<EditNote />} />
                        <Route path="notes/:testId" element={<ViewNote />} />
                        <Route path="tests" element={<Tests />} />
                        <Route path="flashcards" element={<Flashcards />} />
                        <Route path="tests/create" element={<CreateTest/>} />
                        <Route path="tests/edit/:testId" element={<EditTest />} />
                        <Route path="tests/:testId" element={<SolveTest />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
            )}
        </Routes>
    );
};

export default App;
