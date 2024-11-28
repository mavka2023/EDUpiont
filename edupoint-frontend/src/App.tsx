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
import ViewTest from './components/pages/tests/ViewTest';
import CreateTest from './components/pages/tests/CreateTest';
import EditTest from './components/pages/tests/EditTest';
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
                        <Route path="tests" element={<Tests />} />
                        <Route path="flashcards" element={<Flashcards />} />
                        <Route path="tests/create" element={<CreateTest onSave={() => console.log('Saved test!')} />} />
                        <Route path="tests/edit/:testId" element={<EditTest />} />
                        <Route path="tests/:testId" element={<ViewTest />} />
                        <Route path="tests/solve/:testId" element={<SolveTest />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
            )}
        </Routes>
    );
};

export default App;
