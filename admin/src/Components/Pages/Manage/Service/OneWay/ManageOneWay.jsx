import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { message, Popconfirm } from "antd";
import { Button, styled } from "@mui/material";
import toast from "react-hot-toast";

const ManageOneWay = () => {
    const [oneWayTrip,setOneWayTrip]=useState([])
  return (
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
          <li className="breadcrumb-item active">Manage/One Way Trip</li>
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
      <h3>Manage One Way Trip</h3>
      <div className="table-responsive">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{ borderBottom: "2px solid #ddd", textAlign: "center" }}
            >
              <th style={{ padding: "8px" }}>Image</th>
              <th style={{ padding: "8px" }}>Car Name</th>
              <th style={{ padding: "8px" }}>Rate/KM</th>
              <th style={{ padding: "8px" }}>Driver Fare</th>
              <th style={{ padding: "8px" }}>Additional charge </th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {oneWayTrip.length > 0 ? (
             <div>
                hii
             </div>
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  No One Way Trip,add details
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </main>
  )
}

export default ManageOneWay