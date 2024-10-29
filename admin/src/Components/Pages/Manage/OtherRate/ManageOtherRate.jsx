import React, { Fragment, useEffect, useState } from "react";
import client from "../../../Common/Client/Client";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { Button, styled, TextField, Box } from "@mui/material";
import { Modal, Form, FormLabel } from "react-bootstrap";

const ManageOtherRate = () => {
  const navigate = useNavigate();
  const [otherRate, setOtherRate] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [type,setType]=useState("");
  const [rate, setRate] = useState("");
  const [comment,setComment]=useState("")
  const [error, setError] = useState({
      type:"",
      rate:"",
      comment:""
  });

  useEffect(() => {
    getOtherRate();
  }, []);

  const getOtherRate = async () => {
    toast.dismiss();
    try {
      const response = await client.get("/otherrate/get-other-rate");
      if (response.status === 200) {
        setOtherRate(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to Fetch other rate details");
      }
    }
  };



    //delete
    const cancel = (e) => {
        toast.error("You Cancle delete");
      };
    
      const handleDelete = async (id) => {
        toast.dismiss();
        try {
          const response = await client.post(
            "/otherrate/delete-other-rate",
            {
              id: id,
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            getOtherRate()
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            toast.error("Login again");
          } else {
            toast.error("Failed to delete the Other Rate details");
          }
        }
      };


      //update

      const handleUpdate=(id,value)=>{
        toast.dismiss();
          setOpen(true);
          setId(id);
          setType(value.type)
          setRate(value.rate);
          setComment(value.comment)

      }

      //CHANGE

  

    const errorMessage = (fieldName, fieldValue) => {
        let message;
        if (fieldName) {
          if (fieldValue === "") {
            message = "";
          }
        }
    
        if (fieldName === "type") {
          if (fieldValue.length > 0 && fieldValue.length < 3) {
            message = "Type must be at least 3 characters long";
          } else {
            message = "";
          }
        }
    
        if (fieldName === "rate") {
          if (fieldValue.length > 0 && fieldValue.length < 3) {
            message = "Rate must be at least 3 characters long";
          } else {
            message = "";
          }
        }

        if (fieldName === "comment") {
            if (fieldValue.length > 0 && fieldValue.length < 3) {
              message = "Comments must be at least 3 characters long";
            } else {
              message = "";
            }
          }


    
        return { message: message };
      };


      const handleChange = (e) => {
        const { name, value } = e.target;
        const err = errorMessage(name, value).message;
    
        setError((prevError) => ({
          ...prevError,
          [name]: err,
        }));
    
        if (name === "type") {
          setType(value);
        } else if(name==="rate"){
          setRate(value);
        }else{
            setComment(value);
        }
      };
    
      const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value === "") {
          setError((prevError) => ({
            ...prevError,
            [name]: `${name} is required`,
          }));
        }
      };


      const handleSubmit=()=>{
        toast.dismiss()
        if(type==="" || rate===""){
            toast.error("Please fill in all fields");
            
        }else if(error.type !==""){
            toast.error(error.type)

        }else if(error.rate !==""){
            toast.error(error.rate)
        }else if(error.comment !==""){
            toast.error(error.comment)
        }else {
            sendData()
        }
      }

    const sendData=async()=>{
        try{
            const response = await client.post('/otherrate/update-other-rate', {
                id:id,
                type:type,
                rate:rate,
                comment:comment
            },{
                withCredentials:true
            });
            if(response.status===200){
                toast.success("Rate update successfully");
                setType("");
                setRate("");
                setComment("")
                setOpen(false);
                setId("")
                setError((pree)=>{
                    return{
                        type:"",
                        rate:"",
                        comment:""
                    }
                })
                getOtherRate()
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to Update other rate details");
              }
        }
    }

    const handleCancleUpdate=()=>{
        setType("");
                setRate("");
                setComment("")
                setOpen(false);
                setId("")
                setError((pree)=>{
                    return{
                        type:"",
                        rate:"",
                        comment:""
                    }
                })
    }
    
  return (
    <Fragment>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav
            style={{
              marginTop: "10px",
            }}
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Manage/Other Rate</li>
            </ol>
          </nav>
        </div>

        <div
          style={{
            padding: "20px",
            background: "white",
            boxShadow: "0 0 10px lightgray",
          }}
        >
          <h3>Manage Other Rate</h3>
          <div className="table-responsive">
            {otherRate.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <th style={{ padding: "8px" }}>Type</th>
                    <th style={{ padding: "8px" }}>Rate</th>
                    <th style={{ padding: "8px", width: "33%" }}>Comments</th>

                    <th style={{ padding: "8px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {otherRate.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        {item.type}
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        {item.rate}
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                      {item.comment === "" ? "-" : item.comment}
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdate(item._id, item)}
                          className="table-button button-table"
                          style={{
                            marginRight: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          Update
                        </Button>
                        <Popconfirm
                          title="Delete the State Permit Details"
                          description="Are you sure to delete thisState Permit Details?"
                          onConfirm={() => handleDelete(item._id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          className="table-button"
                        >
                          <Button
                            variant="contained"
                            color="error"
                            className="table-button"
                            style={{
                              marginBottom: "5px",
                            }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "300px",
                  margin: "20px auto",
                  textAlign: "center",
                }}
              >
                <span
                  className="mb-2"
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#555",
                  }}
                >
                  No Other Rate Available
                </span>

                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    padding: "8px 16px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    boxShadow: "0 3px 6px rgba(0, 123, 255, 0.2)",
                  }}
                  onClick={() => {
                    navigate("/otherrate");
                  }}
                >
                  Add Other Rate
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
            <Modal  show={open} onHide={handleCancleUpdate}>
                <Modal.Header closeButton >
                    <Modal.Title>Update Other Rate </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group>
                <div className="mt-2">
                <div>
                        <FormLabel>
                          <span>Type</span>
                        </FormLabel>
                      </div>
                      <div className="mt-1 p-3">
                      <TextField
                  label="Type"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="type"
                  value={type}
                  onChange={handleChange}
                  error={!!error.type}
                  helperText={error.type}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                   
                    if (type.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
                        </div>
                        </div>
                </Form.Group>
                <Form.Group>
                <div className="mt-2">
                <div>
                        <FormLabel>
                          <span>Rate</span>
                        </FormLabel>
                      </div>
                      <div className="mt-1 p-3">
                      <TextField
                  label="Rate"
                  slotProps={{
                    htmlInput: {
                      maxLength: 30,
                    },
                  }}
                  fullWidth
                  variant="outlined"
                  required
                  name="rate"
                  value={rate}
                  onChange={handleChange}
                  error={!!error.rate}
                  helperText={error.rate}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                 
                    if (rate.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
                        </div>
                        </div>
                </Form.Group>
                <Form.Group>
                <div className="mt-2">
                <div>
                        <FormLabel>
                          <span>Rate</span>
                        </FormLabel>
                      </div>
                      <div className="mt-1 p-3">
                      <TextField
                  label="Comments"
                  slotProps={{
                    htmlInput: {
                      maxLength: 100,
                    },
                  }}
                  fullWidth
                  multiline
                  rows={4}
                
                  variant="outlined"
                  name="comment"
                  value={comment}
                  onChange={handleChange}
                  error={!!error.comment}
                  helperText={error.comment}
                  onKeyDown={(e) => {
                  
                    if (rate.length === 0 && e.key === " ") {
                      e.preventDefault();
                      return;
                    }

                  
                  }}
                />
                        </div>
                        </div>
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button  variant="contained" color="error" style={{
                  marginRight: "10px",
                }}
              onClick={handleCancleUpdate}
                >
                  Cancel
                </Button>
              <Button
                variant="contained"
               onClick={handleSubmit}
                color="success"
              >
                Save changes
              </Button>
            </Modal.Footer>
            </Modal>
        </div>
      </main>
    </Fragment>
  );
};

export default ManageOtherRate;
