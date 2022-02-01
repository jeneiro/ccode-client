import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
import { AuthContext } from "./App";
import { useAlert } from "react-alert";
 

const useInterceptor=()=> {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.common['x-access-token']=  token;
        }
     
    
        return config;
    });
      
  
}

export default  useInterceptor;
