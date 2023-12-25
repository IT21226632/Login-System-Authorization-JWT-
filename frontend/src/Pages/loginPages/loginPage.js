import React from 'react'
import { useState , useEffect } from 'react'
import {toast} from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import {useNavigate} from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import './loginPage.css'


function LoginPage() {
    
    const [isSignUpActive, setSignUpActive] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [lock, setLock] = useState(true);

    const [passwordError, setPasswordError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [checkPasswordError, setCheckPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')

    const navigate = useNavigate();


    const handleSignUpClick = () => {
        setSignUpActive(true);
    };

    const handleSignInClick = () => {
        setSignUpActive(false);
    };

    //registration form handler
    const registrationFormHandler = async (e) => {
        try {
            e.preventDefault();

            console.log({ firstName, lastName, email, age, password, rePassword });
            console.log(`lock is ${lock}`);
            const response = await axiosInstance.post('/registerAdmin', {
                firstName,
                lastName,
                email,
                age,
                password,
                rePassword,
            });
            console.log(response.data);
            if (response.data) {
                toast.success('user created');
            } else {
                toast.error('something went wrong');
            }

            setFirstName('');
            setLastName('');
            setEmail('');
            setAge('');
            setPassword('');
            setRePassword('');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
    };

    //input field handlers
      const firstNameFieldHandler = (e) => {
        setFirstName(e.target.value)
      }

    const lastNameFieldHandler = (e) => {
        setLastName(e.target.value)
      }

    const emailFieldHandler = (e) => {
        setEmail(e.target.value)
      } 

    const ageFieldHandler = (e) => {
        setAge(e.target.value)
      } 

    const passwordFieldHandler = (e) => {
        setPassword(e.target.value)
      }

    const rePasswordFieldHandler = (e) => {
        setRePassword(e.target.value)
      }

            // validate functions        
  const firstNameValidate = () => {
    firstName.includes('@' || '#' || '&' || '*') ? setFirstNameError('Name can not contain special characters!') : setFirstNameError('')
  }

  const lastNameValidate = () => {
    lastName.includes('@' || '#' || '&' || '*') ? setLastNameError('Name can not contain special characters!') : setLastNameError('')
  }

  const emailValidate = () => {
    email.includes('@' && ('.com' || '.lk')) ? setEmailError('') : setEmailError('Email address must be valid!')
  }

  const passowrdValidate = () => {
    password.length >= 8 ? setPasswordError('') : setPasswordError('More than 8 characters required!')
  }

  const checkValidate = () => {
    password === rePassword ? setCheckPasswordError('') : setCheckPasswordError('Entered password is not matching!')
  }


    useEffect(() => {
        if (email !== '') {
            emailValidate();
        }

        if (firstName !== '') {
            firstNameValidate();
        }

        if (lastName !== '') {
            lastNameValidate();
        }

        if (password !== '') {
            passowrdValidate();
        }

        if (rePassword !== '') {
            checkValidate();
        }

        if (email && firstName && lastName && password && rePassword) {
            setLock(false);
        } else {
            setLock(true);
        }
    }, [email, firstName, lastName, password, rePassword]);




  //login form handler
    const loginFormHandler = async (e) => {
        e.preventDefault();

        try {
            console.log({ email , password });
            const response = await axiosInstance.post('/login', { 
                email,
                password
             });
            console.log(response.data);
            console.log(response.data.role);
            toast.success(`Welcome ${response.data.firstName}`);
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('loggedUser', response.data.firstName);
            localStorage.setItem('loggedUserId', response.data.id);
            localStorage.setItem('loggedUserRole', response.data.role);
            //use this to redirect to the user page or admin page
            response.data.role === 'admin' ? navigate('/admin') : navigate('/user'); 
            console.log(`${response.data.role} signed in`);
        } catch (err) {
            toast.error('User not found');
        }

        setEmail('');
        setPassword('');
    };


    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);

        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);
  
   

  return (
    <div className='login-page'>
    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}` } id='container'>
        <div className='form-container sign-up-container'>
            <form className='form' onSubmit={registrationFormHandler}>
                <h1 className='heading-1'>Create Account</h1>

                <input className='input' type='text' placeholder='First Name' value={firstName} onChange={(e)=>firstNameFieldHandler(e)}/>
                <span className={`reg-error-displayer ${firstNameError === '' ? 'hide' : 'show'}`}>{firstNameError}</span>

                <input className='input' type='text' placeholder='Second Name' value={lastName} onChange={(e)=>lastNameFieldHandler(e)}/>
                <span className={`reg-error-displayer ${lastNameError === '' ? 'hide' : 'show'}`}>{lastNameError}</span>

                <input className='input' type='email' placeholder='Email' value={email} onChange={(e)=>emailFieldHandler(e)}/>
                <span className={`reg-error-displayer ${emailError === '' ? 'hide' : 'show'}`}>{emailError}</span>

                <input className='input' type='number' placeholder='Age' value={age} onChange={(e)=>ageFieldHandler(e)}/>

                <input className='input' type='password' placeholder='Password' name='pswd1' value={password} onChange={(e)=>passwordFieldHandler(e)}/>
                <span className={`reg-error-displayer ${passwordError === '' ? 'hide' : 'show'}`}>{passwordError}</span>

                <input className='input' type='password' placeholder='Confirm password' name='pswd2' value={rePassword} onChange={(e)=>rePasswordFieldHandler(e)}/>
                <span className={`reg-error-displayer ${checkPasswordError === '' ? 'hide' : 'show'}`}>{checkPasswordError}</span>
                <button className='button-signup'>Sign Up</button>
            </form>
        </div>

        <div className='form-container sign-in-container'>
            <form  className='form' onSubmit={loginFormHandler}>
                <h1 className='heading-2'>Sign in</h1>
                <div className='social-container'>
                    <FaGoogle style={{fontSize: '1.7rem', marginRight: '10px'}}/>
                    <FaFacebook style={{fontSize : '1.7rem'}}/>
                </div>
                <span className='span'>or use your account</span>
                <input className='input' type='email' placeholder='email' value={email} onChange={(e)=>emailFieldHandler(e)}/>
                <input className='input' type='password' placeholder='password' value={password} onChange={(e)=>passwordFieldHandler(e)}/>
                <p className='forget'>Forgot your password?</p>
                <button className='button'>Sign In</button>
            </form>
        </div>
        <div className='overlay-container'>
            <div className='overlay'>
                <div className='overlay-panel overlay-left'>
                    <h1 className='heading'>Welcome Back!</h1>
                    <p className='phara'>To keep connected with us please login with your personal info</p>
                    <button className='ghost' id='signIn' >Sign In</button>
                </div>
                <div className='overlay-panel overlay-right'>
                    <h1 className='heading'>Hello, Friend!</h1>
                    <p className='phara'>Enter your personal details and start journey with us</p>
                    <button className='ghost' id='signUp' >Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default LoginPage