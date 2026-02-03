import { useNavigate } from "react-router-dom";
import "../styles/Workshop.css";

function FuturisticCard({ title, image, price, oldPrice, tag, status,pdf }) {

  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/workshops/explore", {
      state: {
        title,
        image,
        price,
        oldPrice,
        tag,
        pdf
      }
    });
  };
  const openForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSerlTRMcIVSJLJcs3dZWn-pm6_0DrydaZqJTR17LbS6ZuGx1w/viewform", "_blank");
  };

  return (
    <div className={`f-card ${status === "sold" ? "sold-card" : ""}`}>

      <div className="f-tag">{tag}</div>

      <h3 className="f-title">{title}</h3>

      <div className="f-image">
        <img src={image} alt={title} />
      </div>

      <div className="f-buttons">

        {status === "sold" ? (
          <button className="sold-btn">SOLD OUT</button>
        ) : (
          <>
            <button className="register-btn"
            onClick={openForm}>
              REGISTER
            </button>

            <button
              className="explore-btn"
              onClick={handleExplore}
            >
              EXPLORE
            </button>
          </>
        )}

      </div>

      <div className="f-price">
        Price <span>₹{price}</span>
        <del>₹{oldPrice}</del>
      </div>

    </div>
  );
}

export default FuturisticCard;
