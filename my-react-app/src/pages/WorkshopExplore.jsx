import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/WorkshopExplore.css";

import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";
import qrImg from "../assets/Webinar-QR.jpeg";   

function WorkshopExplore() {

  const location = useLocation();
  const workshop = location.state;

  if (!workshop) {
    return (
      <h2 style={{ color: "white", textAlign: "center" }}>
        No Workshop Selected
      </h2>
    );
  }

const openPdf = () => {
  if (workshop.pdf) {
    window.open(workshop.pdf, "_blank");
  } else {
    alert("PDF not available");
  }
};

  const openForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSerlTRMcIVSJLJcs3dZWn-pm6_0DrydaZqJTR17LbS6ZuGx1w/viewform", "_blank");
  };

  return (
    <div className="explore-page">

      <Header />
      <SideMenu />
      <RightSideMenu />

      <div className="explore-container">

        {/* LEFT IMAGE */}
        <div className="workshop-card">

          <img src={workshop.image} alt={workshop.title} />

          <div className="workshop-btns">
            <button className="btn-primary" onClick={openForm}>Register</button>
         <button className="btn-secondary" onClick={openPdf}>Content</button> 
          </div>

        </div>

        {/* RIGHT DETAILS */}
        <div className="workshop-details">

          <div className="workshop-header">

            <h1>{workshop.title}</h1>

            <div className="price-tag">
              ₹{workshop.price}
              <span> ₹{workshop.oldPrice}</span>
            </div>

          </div>

          <div className="details-box">

            <h4>Workshop Benefits</h4>

            <p>
              Hands-on sessions, certification, real projects and
              industry mentorship.
            </p>

            <div className="info-grid">

              <div>
                <h5>Category</h5>
                <p>{workshop.tag}</p>
              </div>

              <div>
                <h5>Venue</h5>
                <p>Hybrid Mode</p>
              </div>

              <div>
                <h5>Duration</h5>
                <p>12–16 Hours</p>
              </div>
         

            </div>


          </div>

                  {/*
                      <div className="tab-buttons">
                      <button className="active-tab">Details</button>
                      <button>Discounts</button>
                      <button>Rules</button>
                      <button>Contact</button>
                     </div>
                  
                  */}

        </div>

      </div>
                {/* SCAN TO REGISTER */}
      <section className="section">

  <h2 className="section-title">SCAN TO REGISTER</h2>

  <div className="qr-container">

    <a 
      href="https://docs.google.com/forms/d/e/1FAIpQLSerlTRMcIVSJLJcs3dZWn-pm6_0DrydaZqJTR17LbS6ZuGx1w/viewform"
      target="_blank"
    
    >

      <img src={qrImg} alt="Scan QR" className="qr-img" />

    </a>

    <div className="qr-text">
      <h3>Scan & Register</h3>

      <p>
        Scan this QR code or click to instantly register for
        TechAlpha Hackathon 2026.
      </p>

      <p className="qr-note">
        Limited seats available 🚀
      </p>
    </div>

  </div>

</section>

        

    </div>
  );
}

export default WorkshopExplore;
