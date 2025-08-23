import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, CheckSquare, Calendar, Tag, Users, MessageCircle, Settings, Check, Plus } from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: #1a1a1a;
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  padding: 0 20px 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  background-color: #4ade80;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const LogoText = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 2px 12px;
  border-radius: 8px;

  &:hover {
    background-color: #374151;
    color: #ffffff;
  }

  ${props => props.$active && `
    background-color: #ffffff;
    color: #1f2937;
    font-weight: 500;
  `}
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 1.1rem;
  width: 20px;
  display: flex;
  justify-content: center;
`;

const NavText = styled.span`
  font-size: 0.95rem;
`;

const NewTaskButton = styled.button`
  background-color: #4ade80;
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 20px 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #22c55e;
  }
`;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: BarChart3,
      text: 'Dashboard',
    },
    {
      path: '/tasks',
      icon: CheckSquare,
      text: 'Tasks',
    },
    {
      path: '/calendar',
      icon: Calendar,
      text: 'Calendar',
    },
    {
      path: '/tags',
      icon: Tag,
      text: 'Tags',
    },
    {
      path: '/shared',
      icon: Users,
      text: 'Shared with me',
    },
    {
      path: '/chat',
      icon: MessageCircle,
      text: 'Chat',
    },
    {
      path: '/settings',
      icon: Settings,
      text: 'Settings',
    },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <LogoIcon><Check size={18} /></LogoIcon>
        <LogoText>ToDo</LogoText>
      </Logo>
      <Nav>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavItem
              key={item.path}
              to={item.path}
              $active={location.pathname === item.path}
            >
              <NavIcon><IconComponent size={18} /></NavIcon>
              <NavText>{item.text}</NavText>
            </NavItem>
          );
        })}
      </Nav>
      <NewTaskButton>
          <Plus size={16} /> NEW TASK
        </NewTaskButton>
    </SidebarContainer>
  );
};

export default Sidebar;