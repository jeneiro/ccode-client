import React from 'react'
import './layout.scss'
import $ from 'jquery'
import { useEffect } from 'react';
import useInterceptor from './interceptor';
import { useNavigate } from "react-router";
export default function Layout(props) {
   const navigate =  useNavigate();
  useInterceptor()
   useEffect(() => {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  })

  return (
    <div>
      <div className="wrapper-nav">
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar">
            <div className="sidebar-header" style={{textAlign:"center"}} >
                <h6>CCODE PORTAL</h6>
            </div>

            {/* <ul className="list-unstyled components">
              
               
             
               
            </ul> */}

            <ul className="list-unstyled CTAs">
                <li>
                    <button className="btn btn-sm btn-primary"   onClick={()=>{
                        localStorage.clear();
                     
                        navigate('/')
                    }}>Logout</button>
                </li>
               
            </ul>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content-nav">

            <nav>
                <div className="container-fluid">

                    <button type="button" id="sidebarCollapse" className="btn btn-info btn-sm ">
                       
                       +
                    </button>
                   

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     
                    </div>
                </div>
            </nav>
            {props.children}
         </div>
    </div>
    </div>
  )
 
 
}
