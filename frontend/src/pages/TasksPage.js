import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import taskService from '../services/taskService';
import { Edit, Trash2, MessageCircle, Plus, Calendar, List, Grid } from 'lucide-react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
`;

const ViewOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }

  ${props => props.$active && `
    background-color: #e5e7eb;
    color: #333;
    font-weight: 500;
  `}
`;

const SortButton = styled.button`
  background: none;
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
    color: #333;
  }
`;

const TaskBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  flex: 1;
  min-height: 0;
`;

const TaskColumn = styled.div`
  background: #fafaf9;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  transition: background-color 0.2s;

  &.drag-over {
    background: #e0f2fe;
    border: 2px dashed #0284c7;
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TaskCount = styled.span`
  background: ${props => {
    switch (props.$status) {
      case 'todo': return '#fbbf24';
      case 'progress': return '#3b82f6';
      case 'complete': return '#10b981';
      default: return '#6b7280';
    }
  }};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const TaskCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 3.5px solid #000000;
  border-left: 4px solid ${props => {
    switch(props.$priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  }};
  cursor: grab;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    cursor: grabbing;
  }

  &.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
  }
`;

const TaskTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
`;

const TaskDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const TaskDate = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const NewTaskButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background: #059669;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 90vw;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #9ca3af;
  padding: 0;
  
  &:hover {
    color: #374151;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.variant === 'primary' ? `
    background: #10b981;
    color: white;
    border: none;
    
    &:hover {
      background: #059669;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background: #f9fafb;
    }
  `}
`;

const TasksPage = () => {
  const [view, setView] = useState('grid');
  const [tasks, setTasks] = useState({ todo: [], progress: [], complete: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: ''
  });
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      
      if (response.success && response.data) {
        // Group tasks by status
        const tasksArray = Array.isArray(response.data) ? response.data : [];
        const groupedTasks = {
          todo: tasksArray.filter(task => task.status === 'todo'),
          progress: tasksArray.filter(task => task.status === 'in_progress'),
          complete: tasksArray.filter(task => task.status === 'completed')
        };
        
        setTasks(groupedTasks);
        setError(null);
      } else {
        setError(response.message || 'Failed to load tasks');
        setTasks({ todo: [], progress: [], complete: [] });
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
      setTasks({ todo: [], progress: [], complete: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await taskService.deleteTask(taskId);
      if (response.success) {
        // Refresh tasks after deletion
        fetchTasks();
      } else {
        setError(response.message || 'Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };



  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, columnStatus) => {
    e.preventDefault();
    setDragOverColumn(columnStatus);
  };

  const handleDragLeave = (e) => {
    // Only remove drag-over state if leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask.status !== newStatus) {
      try {
        await taskService.updateTaskStatus(draggedTask.id, newStatus);
        fetchTasks(); // Refresh tasks
      } catch (err) {
        console.error('Error updating task status:', err);
        setError('Failed to update task status');
      }
    }
    
    setDraggedTask(null);
  };

  const renderTaskCard = (task) => (
    <TaskCard 
      key={task.id} 
      $priority={task.priority}
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
    >
      <TaskTitle>{task.title}</TaskTitle>
      {task.description && <TaskDescription>{task.description}</TaskDescription>}
      <TaskMeta>
        {task.created_at && <TaskDate>{new Date(task.created_at).toLocaleDateString()}</TaskDate>}
        <TaskActions>
          <ActionButton onClick={(e) => { e.stopPropagation(); handleEditTask(task); }} title="Edit Task"><Edit size={16} /></ActionButton>
          <ActionButton onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }} title="Delete Task"><Trash2 size={16} /></ActionButton>
          <ActionButton title="Comments"><MessageCircle size={16} /></ActionButton>
        </TaskActions>
      </TaskMeta>
    </TaskCard>
  );

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'todo',
      priority: task.priority || 'medium',
      due_date: task.due_date ? task.due_date.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      due_date: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      due_date: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      let response;
      if (editingTask) {
        // Update existing task
        response = await taskService.updateTask(editingTask.id, formData);
      } else {
        // Create new task
        response = await taskService.createTask(formData);
      }
      
      if (response.success) {
        handleCloseModal();
        fetchTasks(); // Refresh tasks
      } else {
        setError(response.message || 'Failed to save task');
      }
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save task');
    }
  };

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <PageTitle>Task Management</PageTitle>
          <ViewOptions>
            <NewTaskButton onClick={handleCreateTask}>
              <Plus size={16} /> NEW TASK
            </NewTaskButton>
            <SortButton>
              <Calendar size={16} /> Sort by
            </SortButton>
            <ViewButton $active={view === 'list'} onClick={() => setView('list')}>
              <List size={16} /> List view
            </ViewButton>
            <ViewButton $active={view === 'grid'} onClick={() => setView('grid')}>
              <Grid size={16} /> Grid view
            </ViewButton>
            <ViewButton $active={view === 'calendar'} onClick={() => setView('calendar')}>
              <Calendar size={16} /> Calendar view
            </ViewButton>
          </ViewOptions>
        </PageHeader>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <p>Loading tasks...</p>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: 'red' }}>
            <p>{error}</p>
          </div>
        ) : (
          <TaskBoard>
             <TaskColumn 
               className={dragOverColumn === 'todo' ? 'drag-over' : ''}
               onDragOver={handleDragOver}
               onDragEnter={(e) => handleDragEnter(e, 'todo')}
               onDragLeave={handleDragLeave}
               onDrop={(e) => handleDrop(e, 'todo')}
             >
               <ColumnHeader>
                 <ColumnTitle>TO DO</ColumnTitle>
                 <TaskCount $status="todo">({tasks.todo.length})</TaskCount>
               </ColumnHeader>
               <TaskList>
                 {tasks.todo.map(renderTaskCard)}
               </TaskList>
             </TaskColumn>

             <TaskColumn 
               className={dragOverColumn === 'in_progress' ? 'drag-over' : ''}
               onDragOver={handleDragOver}
               onDragEnter={(e) => handleDragEnter(e, 'in_progress')}
               onDragLeave={handleDragLeave}
               onDrop={(e) => handleDrop(e, 'in_progress')}
             >
               <ColumnHeader>
                 <ColumnTitle>IN PROGRESS</ColumnTitle>
                 <TaskCount $status="progress">({tasks.progress.length})</TaskCount>
               </ColumnHeader>
               <TaskList>
                 {tasks.progress.map(renderTaskCard)}
               </TaskList>
             </TaskColumn>

             <TaskColumn 
               className={dragOverColumn === 'completed' ? 'drag-over' : ''}
               onDragOver={handleDragOver}
               onDragEnter={(e) => handleDragEnter(e, 'completed')}
               onDragLeave={handleDragLeave}
               onDrop={(e) => handleDrop(e, 'completed')}
             >
               <ColumnHeader>
                 <ColumnTitle>COMPLETE</ColumnTitle>
                 <TaskCount $status="complete">({tasks.complete.length})</TaskCount>
               </ColumnHeader>
               <TaskList>
                 {tasks.complete.map(renderTaskCard)}
               </TaskList>
             </TaskColumn>
           </TaskBoard>
         )}
         
         {showModal && (
           <Modal onClick={handleCloseModal}>
             <ModalContent onClick={(e) => e.stopPropagation()}>
               <ModalHeader>
                 <ModalTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</ModalTitle>
                 <CloseButton onClick={handleCloseModal}>×</CloseButton>
               </ModalHeader>
               
               <form onSubmit={handleSubmit}>
                 <FormGroup>
                   <Label htmlFor="title">Title *</Label>
                   <Input
                     type="text"
                     id="title"
                     name="title"
                     value={formData.title}
                     onChange={handleInputChange}
                     placeholder="Enter task title"
                     required
                   />
                 </FormGroup>
                 
                 <FormGroup>
                   <Label htmlFor="description">Description</Label>
                   <TextArea
                     id="description"
                     name="description"
                     value={formData.description}
                     onChange={handleInputChange}
                     placeholder="Enter task description"
                   />
                 </FormGroup>
                 
                 <FormGroup>
                   <Label htmlFor="status">Status</Label>
                   <Select
                     id="status"
                     name="status"
                     value={formData.status}
                     onChange={handleInputChange}
                   >
                     <option value="todo">To Do</option>
                     <option value="in_progress">In Progress</option>
                     <option value="completed">Completed</option>
                   </Select>
                 </FormGroup>
                 
                 <FormGroup>
                   <Label htmlFor="priority">Priority</Label>
                   <Select
                     id="priority"
                     name="priority"
                     value={formData.priority}
                     onChange={handleInputChange}
                   >
                     <option value="low">Low</option>
                     <option value="medium">Medium</option>
                     <option value="high">High</option>
                   </Select>
                 </FormGroup>
                 
                 <FormGroup>
                   <Label htmlFor="due_date">Due Date</Label>
                   <Input
                     type="date"
                     id="due_date"
                     name="due_date"
                     value={formData.due_date}
                     onChange={handleInputChange}
                   />
                 </FormGroup>
                 
                 <ModalActions>
                   <Button type="button" onClick={handleCloseModal}>
                     Cancel
                   </Button>
                   <Button type="submit" variant="primary">
                     {editingTask ? 'Update Task' : 'Create Task'}
                   </Button>
                 </ModalActions>
               </form>
             </ModalContent>
           </Modal>
         )}
       </PageContainer>
      </Layout>
    );
};

export default TasksPage;