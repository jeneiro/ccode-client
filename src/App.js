import './App.css';
import NavRoutes from './routes';
import { positions, Provider } from "react-alert";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import AlertTemplate from "react-alert-template-basic";
import React, { createContext, useReducer } from "react";
export const AuthContext = createContext();
const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT
};

//const initialState=JSON.parse(localStorage.getItem("isAuth"))
const initialState={isAuthenticated: false};
const reducer =(state, action)=>{
  switch(action.type){
    case "LOGIN":
    return {...state,
    isAuthenticated:true};
    case "LOGOUT":
      return{isAuthenticated:false};
      default: return state;
  }
};
const theme = createTheme({
  palette: {
    primary: {
      main: '#35b7db',
    },
    secondary: {
      main: '#35b7db',
    },
  },

});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
    <Provider template={AlertTemplate} {...options}>
    <MuiThemeProvider theme={theme}>
    <NavRoutes/>
    </MuiThemeProvider>
    </Provider>
    </AuthContext.Provider>
  );
}

export default App;
