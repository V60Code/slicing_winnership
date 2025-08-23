import api from '../utils/api';

class TaskService {
  // Mendapatkan semua tasks
  async getAllTasks() {
    try {
      const response = await api.get('/api/tasks');
      return {
        success: true,
        data: response.data.data || response.data,
      };
    } catch (error) {
      console.error('Get tasks error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch tasks',
      };
    }
  }

  // Mendapatkan task berdasarkan ID
  async getTaskById(id) {
    try {
      const response = await api.get(`/api/tasks/${id}`);
      return {
        success: true,
        data: response.data.data || response.data,
      };
    } catch (error) {
      console.error('Get task error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch task',
      };
    }
  }

  // Membuat task baru
  async createTask(taskData) {
    try {
      const response = await api.post('/api/tasks', taskData);
      return {
        success: true,
        data: response.data.data || response.data,
        message: 'Task created successfully',
      };
    } catch (error) {
      console.error('Create task error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create task',
      };
    }
  }

  // Mengupdate task
  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/api/tasks/${id}`, taskData);
      return {
        success: true,
        data: response.data.data || response.data,
        message: 'Task updated successfully',
      };
    } catch (error) {
      console.error('Update task error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update task',
      };
    }
  }

  // Menghapus task
  async deleteTask(id) {
    try {
      await api.delete(`/api/tasks/${id}`);
      return {
        success: true,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      console.error('Delete task error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete task',
      };
    }
  }

  // Update status task
  async updateTaskStatus(id, status) {
    try {
      const response = await api.put(`/api/tasks/${id}`, { status });
      return {
        success: true,
        data: response.data.data || response.data,
        message: 'Task status updated successfully',
      };
    } catch (error) {
      console.error('Update task status error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update task status',
      };
    }
  }
}

const taskService = new TaskService();
export default taskService;