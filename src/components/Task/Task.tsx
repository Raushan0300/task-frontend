import { useEffect, useState } from 'react';
import './Task.css';
import { getData, postData } from '../../config';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

const Task = () => {
  const location = useLocation();
  const boardId = location.state.boardId;

  const [tasks, setTasks] = useState<any>([]);
  const [isTodoAddBtnClicked, setIsTodoAddBtnClicked] = useState<boolean>(false);
  const [isDoingAddBtnClicked, setIsDoingAddBtnClicked] = useState<boolean>(false);
  const [isDoneAddBtnClicked, setIsDoneAddBtnClicked] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>('');
  const [doing, setDoing] = useState<string>('');
  const [done, setDone] = useState<string>('');

  const token = localStorage.getItem('token');

  const fetchTasks = async()=>{
    const response = await getData('alltasks', {token: token, boardid: boardId});
    if(!response?.error){
      setTasks(response.tasks);
    };
    console.log(response);
  };

  useEffect(()=>{
    fetchTasks();
  },[]);

  const handleTodoAdd = async()=>{
    const response = await postData('addtask', {token: token, todo: todo, boardId: boardId});
    if(!response?.error){
      fetchTasks();
      setTodo('');
      setIsTodoAddBtnClicked(false);
    };
  };

  const handleDoingAdd = async()=>{
    const response = await postData('addtask', {token: token, doing: doing, boardId: boardId});
    if(!response?.error){
      fetchTasks();
      setDoing('');
      setIsDoingAddBtnClicked(false);
    };
  };

  const handleDoneAdd = async()=>{
    const response = await postData('addtask', {token: token, done: done, boardId: boardId});
    if(!response?.error){
      fetchTasks();
      setDone('');
      setIsDoneAddBtnClicked(false);
    };
  };


  return (
    <div className='taskMainContainer'>
        <Header title={'Your Tasks'} />
        <div className='taskCardContainer'>
            <div className='taskCard'>
                <div className='taskCardHeader'>To Do</div>
                {tasks?.todo?.map((task:any, index:any)=>{
                    return(
                        <div className='taskCardBody' key={index}>{task?.todo.length>14 ? task?.todo.substring(0,14)+'...':task?.todo}</div>
                    );
                })}
                {tasks?.todo?.length === 0 && !isTodoAddBtnClicked && <div className='taskCardBodyNoTask'>No tasks</div>}
                {isTodoAddBtnClicked && <input type='text' className='taskCardInput' placeholder='Enter task' value={todo} onChange={(e)=>{setTodo(e.target.value)}}/>}
                {!isTodoAddBtnClicked ? <div className='taskCardBodyAddBtn' onClick={()=>{setIsTodoAddBtnClicked(true)}}>Add Task</div>:<div className='taskCardAddContainer'>
                  <div className='taskCardAddBtn' onClick={()=>{handleTodoAdd()}}>Save</div>
                  <div onClick={()=>{setIsTodoAddBtnClicked(false)}} className='taskCardCancelBtn'>Cancel</div>
                  </div>}
            </div>
            <div className='taskCard'>
                <div className='taskCardHeader'>Doing</div>
                {tasks?.doing?.map((task:any, index:any)=>{
                    return(
                        <div className='taskCardBody' key={index}>{task?.doing.length>14 ? task?.doing.substring(0,14)+'...':task?.doing}</div>
                    );
                })}
                {tasks?.doing?.length === 0 && !isDoingAddBtnClicked &&<div className='taskCardBodyNoTask'>No tasks</div>}
                {isDoingAddBtnClicked && <input type='text' className='taskCardInput' placeholder='Enter task' value={doing} onChange={(e)=>{setDoing(e.target.value)}}/>}
                {!isDoingAddBtnClicked ? <div className='taskCardBodyAddBtn' onClick={()=>{setIsDoingAddBtnClicked(true)}}>Add Task</div>:<div className='taskCardAddContainer'>
                  <div className='taskCardAddBtn' onClick={()=>{handleDoingAdd()}}>Save</div>
                  <div onClick={()=>{setIsDoingAddBtnClicked(false)}} className='taskCardCancelBtn'>Cancel</div>
                  </div>}
            </div>
            <div className='taskCard'>
                <div className='taskCardHeader'>Done</div>
                {tasks?.done?.map((task:any, index:any)=>{
                    return(
                        <div className='taskCardBody' key={index}>{task?.done.length>14 ? task?.done.substring(0,14)+'...':task?.done}</div>
                    );
                })}
                {tasks?.done?.length === 0 && !isDoneAddBtnClicked && <div className='taskCardBodyNoTask'>No tasks</div>}
                {isDoneAddBtnClicked && <input type='text' className='taskCardInput' placeholder='Enter task' value={done} onChange={(e)=>{setDone(e.target.value)}}/>}
                {!isDoneAddBtnClicked ? <div className='taskCardBodyAddBtn' onClick={()=>{setIsDoneAddBtnClicked(true)}}>Add Task</div>:<div className='taskCardAddContainer'>
                  <div className='taskCardAddBtn' onClick={()=>{handleDoneAdd()}}>Save</div>
                  <div onClick={()=>{setIsDoneAddBtnClicked(false)}} className='taskCardCancelBtn'>Cancel</div>
                  </div>}
            </div>
        </div>
    </div>
  )
};

export default Task;