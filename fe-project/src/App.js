import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from './components/Form';
import Navbar from "./components/Navbar";
import {useEffect, useState} from "react";
import TaskItem from "./components/TaskItem";
import Swal from 'sweetalert2';
import useFetchData from "./hooks/useFetchingData";
import Alert from "./components/Alert";
import CheckInput from "./components/CheckInput";

function App() {
  const [newTask, setNewTask] = useState('');
  const [onlyCompleted, setOnlyCompleted] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {fetchGetTasks, fetchNewTask, fetchUpdateTaskStatus, fetchDeleteTask} = useFetchData();

  const submitNewTask = async (evt) => {
    evt.preventDefault();
    const result = await fetchNewTask(newTask);
    if (result) {
      Swal.fire({
        icon: 'success',
        title: 'New task added.',
        showConfirmButton: false,
        timer: 1500
      });
      getAllTask();
      setNewTask('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Can\'t add new task.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  const getAllTask = async () => {
    const list = await fetchGetTasks(onlyCompleted);
    if (list) {
      setTaskList(list);
      setLoading(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'We can\'t get tasks.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };


  const toggleTaskStatus = async (taskId, currStatus) => {
    const updatedTask = await fetchUpdateTaskStatus(taskId, currStatus);
    if (updatedTask) {
      Swal.fire({
        icon: 'success',
        title: 'Task status updated',
        showConfirmButton: false,
        timer: 1500
      });
      getAllTask();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Can\'t update status.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const deleteTask = (taskId) => {
    try {
      Swal.fire({
        title: 'Do you want to delete this task?',
        showDenyButton: true,
        confirmButtonText: 'Delete it!',
        denyButtonText: `Noo!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await fetchDeleteTask(taskId);

          Swal.fire({
            icon: 'success',
            title: 'Task deleted.',
            showConfirmButton: false,
            timer: 2000
          });
          getAllTask();
        }
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Can\'t delete task.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  useEffect(() => {
    getAllTask();
  }, [onlyCompleted]);

  return (
    <div className="container-fluid">
      <Navbar/>
      <div className='row justify-content-center'>
        <Form inputText={newTask} onChangeInput={setNewTask} onSubmit={submitNewTask}/>
      </div>

      <div className='row justify-content-center'>
        <div className='col-sm-11 col-md-8 col-lg-5 m-3'>
          <CheckInput status={onlyCompleted} onChange={() => setOnlyCompleted(prev => !prev)}/>
        </div>
      </div>

      {
        loading && (
          <Alert text='Getting tasks'/>
        )
      }

      <div className='row justify-content-center'>
        <div className='col-sm-11 col-md-8 col-lg-5 m-3'>
          {
            taskList.map(({id, name, completed}) => {
              return <TaskItem key={`task-${id}`} id={id} name={name} completed={completed}
                               toggleTaskStatus={() => toggleTaskStatus(id, completed)}
                               onDelete={() => deleteTask(id)}/>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
