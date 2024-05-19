import { useState } from 'react';
import './AddBoard.css';
import { postData } from '../../config';
import { Digital } from 'react-activity';
import 'react-activity/dist/Digital.css';

const AddBoard = (props:any) => {
    const {afterAdd, onCancel} = props;

    const [boardName, setBoardName] = useState<string>('');
    const [boardDescription, setBoardDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const handleAddBoard = async() => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const body = {token:token, name: boardName, description: boardDescription};
      const response = await postData('addboard', body);
      if(!response?.error){
          afterAdd();
      } else {
          setMsg(response.msg);
      };
      setIsLoading(false);
    };
  return (
    <div>
        <div className='addBoardHeader'>Add New Board</div>
        <div className='addBoardContent'>
            <div className='addBoardContentLabel'>Board Name</div>
            <input className='addBoardContentInput' value={boardName} onChange={(e)=>{setBoardName(e.target.value)}} />
        </div>
        <div className='addBoardContent'>
            <div className='addBoardContentLabel'>Board Description</div>
            <input className='addBoardContentInput' value={boardDescription} onChange={(e)=>{setBoardDescription(e.target.value)}} />
        </div>
        <div className='addBoardContent'>
            <button className='addBoardContentButton' onClick={()=>{handleAddBoard()}}>{isLoading?(<Digital color="#fff" size={16} speed={1} animating={true} />):"Add Board"}</button>
            {msg && <div className='errorText'>{msg}</div>}
            <button className='addBoardCancelButton' onClick={onCancel}>Cancel</button>
        </div>
    </div>
  )
};

export default AddBoard;