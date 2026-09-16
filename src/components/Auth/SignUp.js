import React, {useState, useEffect} from 'react'
import './Login.css'
import Modal from '../UI/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { Alert, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from 'react-redux';
import { formToggleSliceActions } from '../../store/FormToggleSlice';
import { useInput } from '../../hooks/useInput';
import useHttp from '../../hooks/useHttp';
import { signUpRequest } from '../../lib/AuthFunction';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const SignUp = () => {
    const dispatch = useDispatch()
    const {sendRequest, authState} = useHttp(signUpRequest)

    const toggleForm = e => {
        dispatch(formToggleSliceActions.toggleLoginForm())
    }
    const toggleModal = e => {
      dispatch(formToggleSliceActions.toggleModal())
    }

    const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [statusError, setStatusError] = useState('')
  
  useEffect(() => {
    if(authState.status==='error'){
      setStatusError(true)
    }
    if(authState.status==='completed'){
      dispatch(formToggleSliceActions.toggleLoginForm())
    }
  }, [authState, dispatch])
  const {
    input: enteredEmail,
    inputHandler: emailHandler,
    blurHandler: emailBlurHandler,
    inputHasError: emailHasError,
  } = useInput((input) => (input.trim().includes('@') && (input.trim().length>6)))
  const {
    input: enteredPassword,
    inputHandler: passwordHandler,
    blurHandler: passwrodBlurHandler,
    inputHasError: passwordHasError
  }
  = useInput((input) => input.trim().length>6);

  const submitHandler = (e) => {
    e.preventDefault();
    if(emailHasError){
      setEmailError(true)
      return
    }
    if(passwordHasError || enteredPassword===''){
      setPasswordError(true)
      return
    }
    console.log(enteredEmail, enteredPassword)
    sendRequest({email: enteredEmail, password: enteredPassword})
  };
 

  return (
    <Modal>
    <div className='login-form'>
        <ClearIcon onClick={toggleModal}/>
        <form onSubmit={submitHandler}>
            <h4>Create new account</h4>
            <label>Have an email ?</label>
            <input type="email" placeholder="Enter your email" className={`${emailError ? 'error' : ''}`} onChange={emailHandler}
             onBlur={emailBlurHandler}/>
              {emailError && <div className="error-div"><span>please enter a valid email address</span> <ReportProblemIcon /></div>}
            <label>Password</label>
            <input type="password" placeholder="Enter your password" className={`${passwordError ? 'error' : ''}`} onChange={passwordHandler} onBlur={passwrodBlurHandler}/>
            {passwordError && <div className="error-div"><span>please enter a valid password</span> <ReportProblemIcon /></div>}
            {statusError && (<Alert severity='error'>{authState.data}</Alert>)}
            <Button variant="contained" type="submit">Continue <ArrowForwardIosIcon /></Button>
        </form>
        <Button variant="outlined" className='signup-btn'  onClick={toggleForm}>Already have an account?</Button>
    </div>
    </Modal>
  )
}

export default SignUp