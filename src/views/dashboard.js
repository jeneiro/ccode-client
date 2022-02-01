import React, { createContext } from "react";
import Layout from "../layout";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Contact from "./contact";
import { webapibaseurl } from "../environment";
import Members from "./members";
import moment from "moment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteMember from "./deleteMember";
import ContactDetail from "./contactDetail";

function Dashboard() {
  const [memberList, setMemberList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deleteID, setDeleteID] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [open, setOpen] = useState(false);
  const [show2, setShow2] = useState(false);
  const [id, setId] = useState();
  const [contactDetailObj,setContactDetail] =useState({})
  const [member_id, setMemberID] = useState();
  const member_url = `${webapibaseurl}/member`;
  const closeModal = (event) => {
    setOpen(false);
    setShowDelete(false);
    axios.get(member_url).then((response) => {
      setMemberList(response.data);
      setLoadingList(false);
    });
  };
  const openModal = () => setOpen(true);
  const handleClose = (event, data) => {
    setShow(false);

    axios.get(member_url).then((response) => {
      setMemberList(response.data);
      setLoadingList(false);
    });
  };
  const handleClose2 = () => setShow2(false);
  const handleCloseContact = (event, data) => setShowContact(false);

  useEffect(() => {
    axios.get(member_url).then((response) => {
      setMemberList(response.data);
      setLoadingList(false);
    });
    
  }, []);

  const list = memberList.map((p, index) => {
    if (p.wedding_annivasery === null) {
      let row = {
        id: p.id,
        sn: index + 1,
        firstname: p.firstname,
        middlename: p.middlename,
        lastname: p.lastname,
        gender: p.gender,
        dob: moment(p.dob).format("ll"),
        wedding_annivasery: "Not Applicable",
      };
      return row;
    } else {
      let row = {
        id: p.id,
        sn: index + 1,
        firstname: p.firstname,
        middlename: p.middlename,
        lastname: p.lastname,
        gender: p.gender,
        dob: moment(p.dob).format("ll"),
        wedding_annivasery: moment(p.wedding_annivasery).format("ll"),
      };
      return row;
    }
  });

  return (
    <Layout>
      <div className="row ">
        <div style={{backgroundColor:"#ffffff", width:"98%", marginLeft:10, marginBottom:6}}>
       
          <button
            style={{ margin: 10 }}
            className="btn btn-primary btn-sm"
            onClick={() => {
              setShow(true);
            }}
          >
            Add New Member
          </button>
        </div>
        <div style={{ float: "right", marginLeft: "auto" }}></div>
      </div>
      <DeleteMember open={open} closeModal={closeModal} id={deleteID} />
      <Members show={show} handleClose={handleClose} />
      <Contact show={show2} handleClose2={handleClose2} member_id={member_id} />
      <ContactDetail
        showContact={showContact}
        handleCloseContact={handleCloseContact}
        contactDetailObj={contactDetailObj} />

      <MaterialTable
        title="Members List"
        columns={[
          { title: "S/N", field: "sn" },
          { title: "First Name", field: "firstname" },
          { title: "Last Name", field: "lastname" },
          { title: "Other Name", field: "middlename" },
          { title: "Gender", field: "gender" },
          { title: "DOB", field: "dob" },
          { title: "Wedding Anniversary", field: "wedding_annivasery" },

          {
            field: "url",
            title: "Contact Detail",
            tooltip: "View Contact Detail",
            render: (rowData) => (
              <button
                color="danger"
                className="btn-outline-primary btn btn-sm "
                onClick={() => {
                  const contact_uri=`${webapibaseurl}/contact/${rowData.id}/`
                  axios.get(contact_uri).then((res)=>{
                   
                    setContactDetail(res.data[0])})
                  setShowContact(true)
                  }}
              >
                Detail
              </button>
            ),
          },
          // { title: "Exempted", field: "excempted" },

          {
            field: "url",
            title: "Add Contact",
            tooltip: "Add contact detail",
            render: (rowData) => (
              <div className=" row">
                <button
                  color="dark"
                  className="btn-outline-secondary btn btn-sm"
                  onClick={() => {
                    setShow2(true);
                    setMemberID(rowData.id);
                  }}
                >
                  <ContactMailIcon /> <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ),
          },
          {
            field: "url",
            title: "Delete",
            tooltip: "Add detail",
            render: (rowData) => (
              <div className=" row">
                <button
                  color="dark"
                  className="btn-outline-danger btn btn-sm"
                  onClick={() => {
                    openModal();
                    setShowDelete(true);
                    setDeleteID(rowData.id);
                   
                  }}
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            ),
          },
        ]}
        data={list}
        localization={{
          body: {
            emptyDataSourceMessage: loadingList ? (
              <ScaleLoader color={"#47748b"} loading={true} size={15} />
            ) : (
              <div>No records found</div>
            ),
          },
        }}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            fontWeight: 700,
          },
        }}
      />
    </Layout>
  );
}
export default Dashboard;
