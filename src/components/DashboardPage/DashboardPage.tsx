import { Dialog } from '@mui/material';
import './DashboardPage.css';
import { useEffect, useState } from 'react';
import AddBoard from '../AddBoard/AddBoard';
import { getData } from '../../config';
import { Digital } from 'react-activity';
import 'react-activity/dist/Digital.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const DashboardPage = () => {
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [boards, setBoards] = useState<any>([]);
    const [msg, setMsg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(window.innerWidth < 768){
            setIsMobile(true);
        }
    },[]);

    const token = localStorage.getItem('token');
        const fetchBoards = async()=>{
            setIsLoading(true);
            const header = {token: token};
            const response = await getData('allboards', header);
            if(!response?.error){
                setBoards(response.boards);
            } else{
                setMsg(response.msg);
            }
            setIsLoading(false);
        };

        const handleCloseDialog = ()=>{
            setOpenDialog(false);
            fetchBoards();
        };

    useEffect(()=>{
        fetchBoards();
    },[]);

    const handleBoardClick = (boardId:any)=>{
        navigate(`/task`, {state: {boardId}});
    };
  return (
    <div className='dashboardContainer'>
        <Header title={'Your Boards'} />
        {!isLoading?(<div className='dashboardMainContainer'>
            {boards.map((board:any, index:any)=>{
                return(
                    <div className='dashboardCard' onClick={()=>{handleBoardClick(board?.id)}} id={index}>
                <div className='cardHeader'>{board?.name}</div>
                <div className='cardContent'>{board?.description.length > 8 ? board?.description.substring(0,10)+'...':board?.description}</div>
            </div>
                );
            })}
            <div className='dashboardCardAdd' onClick={()=>{setOpenDialog(true)}}>
                <div className='cardHeaderAdd'>+</div>
                <div className='cardContentAdd'>Add New Board</div>
            </div>
        </div>):(<Digital color="#000" size={16} speed={1} animating={true} />)}
        {msg && <div className='errorText'>{msg}</div>}
        {isMobile ? (<Dialog 
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                padding: "16px",
                width: "100%",
                maxWidth: window.innerWidth,
              },
            },
          }}
          open={openDialog}>
            <AddBoard onClose={()=>{setOpenDialog(false)}} />
          </Dialog>):(<Dialog 
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                padding: "16px",
                width: "100%",
                maxWidth: window.innerWidth/2,
              },
            },
          }}
          open={openDialog}>
            <AddBoard afterAdd={()=>{handleCloseDialog()}} onCancel={()=>{setOpenDialog(false)}} />
          </Dialog>)}
    </div>
  )
};

export default DashboardPage;