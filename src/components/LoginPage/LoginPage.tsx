import { useState } from 'react';
import './LoginPage.css';
import { postData } from '../../config';
import { Digital } from 'react-activity';
import 'react-activity/dist/Digital.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState<boolean>(false); // false for login, true for signup
    const [email, setEmail] = useState<string>(''); // email state
    const [password, setPassword] = useState<string>(''); // password state
    const [msg, setMsg] = useState<string>(''); // error state
    const [isLoading, setIsLoading] = useState<boolean>(false); // loading state

    // Function to handle signup
    const handleSignup = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {email: email, password: password};
        const response = await postData('signup', body);
        setMsg(response.msg);
        setIsLoading(false);
    };

    // Function to handle login
    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const body = {email: email, password: password};
        const response = await postData('login', body);
        if(!response?.error){
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } else {
            setMsg(response.msg);
        }
        setIsLoading(false);
    };

  return (
    <div className='loginMainContainer'>
        <div className='loginHeader'>Task Management App</div>
        {msg && <div className='errorText'>{msg}</div>}
        <form className='loginForm' onSubmit={isSignup?handleSignup:handleLogin}>
            <input className='loginInput' type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input className='loginInput' type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button className='loginBtn' type='submit'>{!isLoading?(isSignup?'Signup':'Login'):<Digital color="#fff" size={16} speed={1} animating={true} />}</button>
        </form>
        <div className='registerText' onClick={()=>{setIsSignup(!isSignup)}}>{isSignup?'Login':'Signup'}</div>
    </div>
  )
};

export default LoginPage;