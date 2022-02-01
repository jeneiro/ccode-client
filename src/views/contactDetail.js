import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { webapibaseurl } from "../environment";
import { Modal } from "react-bootstrap";

function ContactDetail(props) {
   

    function handleCloseContact(event) {
        
        let data = { name: 'example', type: 'closed from child' };
        props.handleCloseContact(event, data);
      }
    useEffect(()=>{
     
    },[])
    const showContact =()=>{
      if(props.contactDetailObj == null || props.contactDetailObj==undefined){
        return <div>No Contact Added for this member</div>
      }
      else{
        return  <div>
          <div>
          <label><b>Phone Number</b></label>
        <div>{props.contactDetailObj.phonenumber}</div>
          </div>
          <div>
          <label><b>Email</b></label>
        <div>{props.contactDetailObj.email}</div>
          </div>
          <div>
          <label><b>Address</b></label>
        <div>{props.contactDetailObj.address}</div>
          </div>
          <div>
          <label><b>Next of Kin</b></label>
        <div>{props.contactDetailObj.nextofkin}</div>
          </div>
          <div>
          <label><b>Next of Kin Phone Number</b></label>
        <div>{props.contactDetailObj.nextofkin_phonenumber}</div>
          </div>
          <div>
          <label><b>Next of Kin Address</b></label>
        <div>{props.contactDetailObj.nextofkin_address}</div>
          </div>
       <button className="danger btn-danger" onClick={()=>{
        const  delete_uri=`${webapibaseurl}/contact/${props.contactDetailObj.member_id}/`
         axios.delete(delete_uri).then((res)=>{
           console.log(res)
         })
         handleCloseContact()
         
         }}>Delete Contact</button>
         
      </div>
      }
    }
  

    return (
      <div>

<Modal
animation={false}
show={props.showContact}
onHide={handleCloseContact}
backdrop="static"
keyboard={false}
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
  <Modal.Title>Contact Detail</Modal.Title>
</Modal.Header>
<Modal.Body>
  {showContact()}

  
    </Modal.Body></Modal>

      </div>
        
    )
       
}

export default ContactDetail
