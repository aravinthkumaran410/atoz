import React, { Fragment, useEffect, useState } from 'react'
import client from '../../../Common/Client/Client'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Popconfirm } from "antd";
import { Button } from "@mui/material";

const UserContact = () => {
    const [userContact,setUserContact]=useState([])

    useEffect(()=>{
        getUserContact()
    },[])


    const getUserContact=async()=>{
        try{
            const response = await client.get('/usercontact/get-user-contact',{
                withCredentials:true
            })
            if(response.status===200){
                setUserContact(response.data)
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to fetch user contact details");
              }
        }
    }


     //delete
     const cancel = (e) => {
        toast.error("You Cancle delete");
      };
    
      const handleDelete = async (id) => {
        toast.dismiss();
        try {
          const response = await client.post(
            "/usercontact/delete-user-contact",
            {
              id: id,
            },
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
       getUserContact()
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            toast.error("Login again");
          } else {
            toast.error("Failed to delete the Other Rate details");
          }
        }
      };
  return (
    <Fragment>
         <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage/User Contact </li>
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
          <h3>Manage User Contact</h3>
          <div className="table-responsive">
             {userContact.length> 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "2px solid #ddd",
                        textAlign: "center",
                      }}
                    >
                      <th style={{ padding: "8px" }}>Name</th>
                      <th style={{ padding: "8px" }}>Email</th>
                      <th style={{ padding: "8px" }}>Phone Number</th>
                      <th style={{ padding: "8px", width: "33%" }}>Message</th>
  
                      <th style={{ padding: "8px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userContact.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td style={{ padding: "8px" }}>{item.name}</td>
                                <td style={{ padding: "8px" }}>{item.email}</td>
                                <td style={{ padding: "8px" }}>{item.phoneNumber}</td>
                                <td style={{ padding: "8px" }}>{item.message}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}>
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
                            </tr>)
                    })}
                    </tbody>
                    </table>
             ):(
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
                      No User Contact Available
                    </span>
    
                   
                  </div>
             )}
            </div>
            </div>
      </main>
    </Fragment>
  )
}

export default UserContact