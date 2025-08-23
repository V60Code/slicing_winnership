import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoginPage from './pages/LoginPage';

import TasksPage from './pages/TasksPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import TagsPage from './pages/TagsPage';
import SharedPage from './pages/SharedPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes - Only accessible when not authenticated */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes - Only accessible when authenticated */}

          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            } 
          />
          <Route 
             path="/dashboard" 
             element={
               <ProtectedRoute>
                 <DashboardPage />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/calendar" 
             element={
               <ProtectedRoute>
                 <CalendarPage />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/tags" 
             element={
               <ProtectedRoute>
                 <TagsPage />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/shared" 
             element={
               <ProtectedRoute>
                 <SharedPage />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/chat" 
             element={
               <ProtectedRoute>
                 <ChatPage />
               </ProtectedRoute>
             } 
           />
           <Route 
             path="/settings" 
             element={
               <ProtectedRoute>
                 <SettingsPage />
               </ProtectedRoute>
             } 
           />
          
          {/* Default redirect */}
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
          
          {/* Catch all other routes and redirect to dashboard */}
          <Route 
            path="*" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
