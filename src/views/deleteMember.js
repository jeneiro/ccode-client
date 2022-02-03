import React, {useEffect} from 'react';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {Button} from 'reactstrap';
import { webapibaseurl } from "../environment";
import axios from 'axios';
function DeleteMember (props) {
  
    const delete_url = `${webapibaseurl}/member/${props.id}/`;
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
  function  closeModal(event){
       
    props.closeModal(event)
    }
    function AlertFunc(event){
      let alertMsg = "Record Deleted";
      props.AlertFunc(event, alertMsg)
    }
function deleteItem(event){
    axios.delete(delete_url).then(()=>{
      AlertFunc()
        closeModal()
    }

    )
}
    
    useEffect(()=>{
        
    },[])
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}> 
          <b>Are you sure you want to delete member?</b>
            <div>
            <Button
                className="btn"
                outline
                color="dark"
                onClick={
                    closeModal
                 }
                style={{ marginTop: 5 }}
               
              >
             Cancel
              </Button>
            <Button
                className="btn"
                outline
                color="danger"
                style={{ marginTop: 5 , marginLeft:5}}
                onClick={
                  deleteItem
                   
                }
              >
               Delete
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    );
};

export default DeleteMember;