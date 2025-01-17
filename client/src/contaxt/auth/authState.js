import React,{useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const AuthState=(props)=>{

    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        loading:true,
        user:null,
        error:null
    };

 const [state,dispatch]=useReducer(authReducer,initialState);

    //Load User
    const loadUser = async ()=>{
        // load token into global headers
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }


        try {
            const res=await axios.get('/api/auth');

            dispatch({type:'USER_LOADED',payload:res.data});

        } catch (error) {
            
            dispatch({type:'AUTH_ERROR'});

        }

    }

    //Register User
    const register=async (formData)=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users',formData,config);
            
            dispatch({type:'REGISTER_SUCCESS',payload:res.data});

            loadUser();

        } catch (err) {
            
            dispatch({type:'REGISTER_FAIL',payload:err.response.data.msg});
            console.log(err.response.data.msg);
            
        }

    }

    //Login User
    const login=async (formData)=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth',formData,config);
            
            dispatch({type:'LOGIN_SUCCESS',payload:res.data});

            loadUser();

        } catch (err) {
            
            dispatch({type:'LOGIN_FAIL',payload:err.response.data.msg});
            console.log(err.response.data.msg);
            
        }

    }

    //Logout
    const logout=()=>{
        dispatch({type:'LOGOUT'});
    }

    //Clear Errors
    const clearError=()=>{
        dispatch({type:'CLEAR_ERRORS'});
    }
    

    return  (
        <authContext.Provider
        value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            register,
            loadUser,
            login,
            logout,
            clearError
            }}  
        >
            {props.children}
        </authContext.Provider>
    )

};

export default AuthState;

