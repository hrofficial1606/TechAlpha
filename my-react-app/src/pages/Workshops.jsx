import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu"
import FuturisticCard from "../components/FuturisticCard"
import RightSideMenu from "../components/RightSideMenu";
import javaPdf from "../assets/java-fullstack.pdf";
import uiuxpdf from "../assets/UIUXDESIGNWORKSHOP.pdf"
import react from "../assets/React.pdf"
import da  from "../assets/DataAnalytics.pdf"
import aiml  from "../assets/aiml.pdf"
import python  from "../assets/python.pdf"












function Workshops() {

  const aiData = [
  {
    title: "Artificial Intelligence",
    image: "/Image/CardIMG.png",
    price: 1000,
    oldPrice: 1500,
    tag: "Workshop",
    status: "sold",
     pdf :javaPdf,
  },
  {
    title: "Machine Learning",
    image: "/Image/CardIMG.png",
    price: 1200,
    oldPrice: 1600,
    tag: "Workshop",
    status: "sold"
  },
  {
    title: "Data Science",
    image: "/Image/CardIMG.png",
    price: 900,
    oldPrice: 1300,
    tag: "Workshop",
    status: "sold"
  }
];
          const codingData = [
  {
    title: "React",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 15000,
    tag: "Workshop",
    status: "active",
    pdf :react
  },
  {
    title: "Java Full Stack",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 8000,
    tag: "Workshop",
    status: "active",
    pdf :javaPdf
  },
  {
    title: "Python",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 10000,
    tag: "Workshop",
    status: "active",
    pdf :python
    
  }
  
];

const Data = [
  {
    title: "Data Analytics",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 15000,
    tag: "Workshop",
    status: "active",
    pdf :da
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 8000,
    tag: "Workshop",
    status: "active",
    pdf :aiml
  },
  {
    title: "UI/UX Crash Course",
    image: "/Image/CardIMG.png",
    price: 999,
    oldPrice: 10000,
    tag: "Workshop",
    status: "active",
    pdf :uiuxpdf
  }
];
      
           
  return (
    <>
    
      <Header />
      <SideMenu/>
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
        data={Data}
      />
      <CategorySection
        title="SOLD OUT"
        data={aiData}
      />
      

      <Footer />
    </>
  );
}

export default Workshops;
