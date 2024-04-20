import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import { Link,useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import { useSignupMutation } from '../Slices/userApiSlice';
import { setCredentials } from '../Slices/authslice';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        password: Yup.string().required('Enter Password').min(8),
        name: Yup.string().required('Enter Name'),
    });

 
    


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ email, password, name }, { abortEarly: false });
            try {
                const res = await signup({ email, password, name });
                dispatch(setCredentials(res));
                navigate('/login');
            } catch (error) {
                toast.error(error?.data?.message || error?.message || error);
            }
        } catch (error) {
            const newErrors = {};
            error.inner.forEach((e) => {
              newErrors[e.path] = e.message;
            });
            setErrors(newErrors);
        }
    };


 
    return (
        <div className={styles.main}>
        
            <div className={styles.innermain}>
                
                <div className={styles.form}>
                    <form>
                    <label>
                        Email
                        <input 
                        type='email'
                        name='email'
                        required={true}
                        placeholder='yourname@email.com'
                        value={email}
                        onChange={handleEmailChange}
                        />
                         {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </label>
                    <label>
                        Name
                        <input 
                        type='text'
                        name='name'
                        required={true}
                        placeholder='john Doe'
                        value={name}
                        onChange={handleNameChange}
                        />
                         {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </label>
                    <label>
                        Password
                        <input 
                        required={true}
                        type='password' 
                        name='password'
                        placeholder='Your_Password'
                        value={password}
                        onChange={handlePasswordChange} />
                          {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </label>
                    <button onClick={handleSubmit}>Login</button>
                    </form>
                    <Link to='/login'>
                    <p>Haven't signed up yet? Sign Up!</p>
                    </Link>
                        
                </div>
            </div>
        </div>
    );
};

export default Signup;
