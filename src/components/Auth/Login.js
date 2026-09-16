import React, {useState, useEffect, Fragment} from "react";
import "./Login.css";
import Modal from "../UI/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { formToggleSliceActions } from "../../store/FormToggleSlice";
import { useInput } from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
import { signInRequest } from "../../lib/AuthFunction";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { authSliceActions } from "../../store/AuthSlice";
import LoginSuccess from "./LoginSuccess";
import { Alert } from "@mui/material";
const Login = () => {
  
  const dispatch = useDispatch();
  const {sendRequest, authState} = useHttp(signInRequest)

  const toggleForm = (e) => {
    dispatch(formToggleSliceActions.toggleLoginForm());
  };
  const toggleModal = (e) => {
    dispatch(formToggleSliceActions.toggleModal());
  };

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [status, setStatus] = useState(false)
  const [responseError, setResponseError] = useState(false)
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

  useEffect(() => {
    setResponseError(false)
    
    if(authState.status==='error'){
      if(authState.data==='EMAIL_NOT_FOUND' || authState.data==='INVALID_PASSWORD'){
        setResponseError(true)
      }
    }
    let timer;
    if(authState.status==='completed'){
      dispatch(authSliceActions.setAuthStatus({status: true, email: authState.data.email}))
       timer = setTimeout(() => {
        setStatus(true)
      }, 2000)
  
    }

    return() => {
      clearInterval(timer)
    }
  
  }, [authState, enteredEmail, enteredPassword, dispatch])

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
    sendRequest({email: enteredEmail, password: enteredPassword})
  };

  
 
  return (
    <Modal>
      <div className="login-form">
        <ClearIcon onClick={toggleModal} />
        {!status &&  (<Fragment><form onSubmit={submitHandler}>
          <h4>Login To Continue</h4>
          <label>Have an Email account ?</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={emailHandler}
            onBlur={emailBlurHandler}
            className={`${emailError ? 'error' : ''}`}
          />
          {emailError && <div className="error-div"><span>please enter a valid email address</span> <ReportProblemIcon /></div>}
          
          <label>Password</label>
          <input type="password" placeholder="Your Password" onChange={passwordHandler} onBlur={passwrodBlurHandler} className={`${passwordError ? 'error' : ''}`}/>
          {passwordError && <div className="error-div"><span>please enter a valid Password</span> <ReportProblemIcon /></div>}
          {responseError && (<Alert severity="error">{authState.data}</Alert>)}
          <Button variant="contained" type="submit">
            Continue <ArrowForwardIosIcon />
          </Button>
        </form>
        <Button variant="outlined" className="signup-btn" onClick={toggleForm}>
          Sign up
        </Button></Fragment>)}
        
        {status && <LoginSuccess />}
        
      </div>
    </Modal>
  );
};

export default Login;
