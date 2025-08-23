import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import taskService from '../services/taskService';
import { CheckSquare, Clock, CheckCircle, Calendar, BarChart3, TrendingUp } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  padding: 12px;
  border-radius: 12px;
  background: ${props => props.$bgColor || '#f3f4f6'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
`;

const RecentTasksContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TaskItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TaskStatus = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  background: ${props => {
    switch (props.$status) {
      case 'todo': return '#fbbf24';
      case 'progress': return '#3b82f6';
      case 'complete': return '#10b981';
      default: return '#6b7280';
    }
  }};
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
`;

const TaskDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const PlaceholderChart = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);
  
  // Auto-refresh when component becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTasks();
      }
    };
    
    const handleFocus = () => {
      fetchTasks();
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      
      if (response.success && Array.isArray(response.data)) {
        setTasks(response.data);
        setError(null);
      } else {
        setError('Failed to fetch tasks');
        setTasks([]);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from real data
  const calculateStats = () => {
    const totalTasks = tasks.length;
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    
    // Calculate due today tasks
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    
    const dueTodayTasks = tasks.filter(task => {
      if (!task.due_date) return false;
      // Handle both date string formats
      let taskDueDateStr;
      if (task.due_date.includes('T')) {
        taskDueDateStr = task.due_date.split('T')[0];
      } else {
        taskDueDateStr = task.due_date;
      }
      return taskDueDateStr === todayStr;
    }).length;
    
    console.log('Debug Due Today:', {
      todayStr,
      tasks: tasks.map(t => ({ title: t.title, due_date: t.due_date })),
      dueTodayTasks
    });

    return [
      {
        icon: CheckSquare,
        value: totalTasks.toString(),
        label: 'Total Tasks',
        bgColor: '#dbeafe'
      },
      {
        icon: Clock,
        value: inProgressTasks.toString(),
        label: 'In Progress',
        bgColor: '#fef3c7'
      },
      {
        icon: CheckCircle,
        value: completedTasks.toString(),
        label: 'Completed',
        bgColor: '#d1fae5'
      },
      {
        icon: Calendar,
        value: dueTodayTasks.toString(),
        label: 'Due Today',
        bgColor: '#fce7f3'
      }
    ];
  };

  // Get recent tasks (last 5 tasks)
  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
      .slice(0, 5)
      .map(task => ({
        id: task.id,
        title: task.title,
        date: formatDate(task.updated_at || task.created_at),
        status: task.status === 'todo' ? 'todo' : task.status === 'in_progress' ? 'progress' : 'complete'
      }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const stats = calculateStats();
  const recentTasks = getRecentTasks();

  if (loading) {
    return (
      <Layout>
        <PageContainer>
          <PageHeader>
            <PageTitle>Dashboard</PageTitle>
          </PageHeader>
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading dashboard data...
          </div>
        </PageContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageContainer>
          <PageHeader>
            <PageTitle>Dashboard</PageTitle>
          </PageHeader>
          <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
            {error}
          </div>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Dashboard</PageTitle>
        </PageHeader>

        <StatsContainer>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <StatCard key={index}>
                <StatIcon $bgColor={stat.bgColor}>
                  <IconComponent size={32} color="#374151" />
                </StatIcon>
                <StatContent>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatContent>
              </StatCard>
            );
          })}
        </StatsContainer>

        <ChartsContainer>
          <ChartCard>
            <ChartTitle>Task Progress Overview</ChartTitle>
            <PlaceholderChart>
              <BarChart3 size={20} style={{display: 'inline', marginRight: '8px'}} /> Task Analytics Chart
            </PlaceholderChart>
          </ChartCard>
          
          <ChartCard>
            <ChartTitle>Productivity Trends</ChartTitle>
            <PlaceholderChart>
              <TrendingUp size={20} style={{display: 'inline', marginRight: '8px'}} /> Weekly Progress
            </PlaceholderChart>
          </ChartCard>
        </ChartsContainer>

        <RecentTasksContainer>
          <ChartTitle>Recent Tasks</ChartTitle>
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <TaskItem key={task.id}>
                <TaskStatus $status={task.status} />
                <TaskInfo>
                  <TaskTitle>{task.title}</TaskTitle>
                  <TaskDate>{task.date}</TaskDate>
                </TaskInfo>
              </TaskItem>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No recent tasks found
            </div>
          )}
        </RecentTasksContainer>
      </PageContainer>
    </Layout>
  );
};

export default DashboardPage;