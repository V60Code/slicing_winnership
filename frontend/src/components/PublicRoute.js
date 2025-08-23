import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 20px;
  color: #666;
  font-size: 1rem;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingContent>
          <LoadingSpinner />
          <LoadingText>Loading...</LoadingText>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  // Redirect to products page if already authenticated
  if (isAuthenticated) {
    // Get the intended destination from location state, or default to products
    const from = location.state?.from?.pathname || '/products';
    return <Navigate to={from} replace />;
  }

  // Render public content if not authenticated
  return children;
};

export default PublicRoute;