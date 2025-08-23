import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { Tag } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.6;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 400px;
`;

const TagsPage = () => {
  return (
    <Layout>
      <PageContainer>
        <Icon><Tag size={64} /></Icon>
        <Title>Tags</Title>
        <Description>
          Organize your tasks with tags. Create, manage, and filter tasks by custom tags to stay organized.
        </Description>
      </PageContainer>
    </Layout>
  );
};

export default TagsPage;