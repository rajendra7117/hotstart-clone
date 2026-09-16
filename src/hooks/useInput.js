import {useState} from 'react';

export const useInput = (validateFunc) => {
    const [input, setInput] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const inputHandler = e => {
        setInput(e.target.value)
    }
    const blurHandler = e => {
        setIsTouched(true)
        
    }

    let isInputValid =  validateFunc(input)
  
    let inputHasError = false
    if(isInputValid && isTouched){
        inputHasError = false
    }
    if(!isInputValid && isTouched){
        inputHasError = true
    }
  
    return {
        input, inputHandler, blurHandler, inputHasError
    }
}