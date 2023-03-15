const useFetchData = () => {

  const fetchNewTask = async (newTask) => {
    try {
      const data = new FormData();
      data.append('name', newTask);
      const result = await fetch('http://localhost:8000/api/task', {
        method: 'POST',
        body: data,
      });

      return await result.json();
    } catch (err) {
      return null;
    }
  }

  const fetchGetTasks = async (onlyCompleted) => {
    try {
      const list = await fetch(`http://localhost:8000/api/task${onlyCompleted ? '?type=completed' : ''}`);
      const listJson = await list.json();

      if (listJson.success) {
        return listJson.data;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  const fetchUpdateTaskStatus = async (taskId, currStatus) => {
    try {
      let formBody = [];
      const encodedKey = encodeURIComponent('completed');
      const encodedValue = encodeURIComponent(currStatus ? 0 : 1);
      formBody.push(`${encodedKey}=${encodedValue}`);

      const result = await fetch(`http://localhost:8000/api/task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });
      return await result.json();
    } catch (err) {
      return null;
    }
  }

  const fetchDeleteTask = async (taskId) => {
    try {
      const result = await fetch(`http://localhost:8000/api/task/${taskId}`, {
        method: 'DELETE',
      });
      return await result.json();
    } catch (err) {
      return null;
    }
  };

  return {fetchNewTask, fetchGetTasks, fetchUpdateTaskStatus, fetchDeleteTask};
};

export default useFetchData;
