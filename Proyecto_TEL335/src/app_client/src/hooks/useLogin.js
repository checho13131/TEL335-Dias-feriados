import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (loginData) => {
    setIsLoading(true)
    setError(null)
    try{
        const response = await axios.post('http://localhost:3001/user/login', loginData);
        const json = response.data;
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type: 'LOGIN', payload: json});
        setIsLoading(false);
    }catch(error){
        // handle error response
        setIsLoading(false);
        setError(error.response.data.error);
    }
  };

  return { login, isLoading, error }
};