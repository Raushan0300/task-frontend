import './Header.css';

const Header = (props:any) => {
    const {title} = props;

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        window.location.href = '/';
    };
  return (
    <div className='headerContainer'>
        <div></div>
        <div className='headerTitle'>{title}</div>
        <div className='headerLogout' onClick={()=>{handleLogout()}}>Logout</div>
    </div>
  )
};

export default Header;