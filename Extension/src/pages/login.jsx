import styles from './Login.module.css'
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import * as Yup from "yup";



const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is Required'),
        password: Yup.string().required('Enter Password').min(8),

    });

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
      const submitHandler =  () => {
       console.log("hi")
      }
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
                    <button onClick={submitHandler}>Login</button>
                    </form>
                    <Link to='/'>
                    <p>Haven't signed up yet? Sign Up!</p>
                    </Link>
                        
                </div>
            </div>
        </div>
     );
}
 
export default Signin ;