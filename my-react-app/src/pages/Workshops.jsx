import { useEffect, useState } from "react";

import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import RightSideMenu from "../components/RightSideMenu";

import "../styles/Workshop.css";

import API from "../services/api";

function Workshops() {

  const [codingData,setCodingData] = useState([]);
  const [dataAI,setDataAI] = useState([]);
  const [soldData,setSoldData] = useState([]);

  useEffect(()=>{

    API.get("/events")
      .then(res=>{

        const events = res.data;

        const coding = events.filter(
          e => e.category === "CODING"
        );

        const ai = events.filter(
          e => e.category === "AI"
        );

        const sold = events.filter(
          e => e.status === "SOLD_OUT"
        );

        setCodingData(coding);
        setDataAI(ai);
        setSoldData(sold);

      });

  },[]);


  return (
    <>
      <Header />

      <SideMenu />

      <RightSideMenu />

      <h1 className="main-title">WORKSHOPS</h1>

      <div className="highlights">
        <div>Professional Certificate</div>
        <div>Free Techfest Access</div>
        <div>Internship Growth</div>
      </div>

      <CategorySection
        title="Coding Lang"
        data={codingData}
      />

      <CategorySection
        title="AI & DATA"
        data={dataAI}
      />

      <CategorySection
        title="SOLD OUT"
        data={soldData}
      />

      <Footer />
    </>
  );
}

export default Workshops;