import React, { Fragment } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
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
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        </main>
   </Fragment>
  )
}

export default Home