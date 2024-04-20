import styles from './Login.module.css'
import { useEffect,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { useLoginMutation } from '../Slices/userApiSlice';
import { setCredentials } from '../Slices/authslice';
import * as Yup from "yup";



const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const userInfo = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }},[]);

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
    
      const submitHandler =  async(e) => {
        e.preventDefault();
        try {
            await validationSchema.validate({ email, password }, { abortEarly: false });
            try {
                const res = await login({ email, password });
                dispatch(setCredentials(res));
                navigate('/dashboard');
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