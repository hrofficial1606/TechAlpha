import { useNavigate } from "react-router-dom";
import "../styles/Workshop.css";

function FuturisticCard({ title, image, price, oldPrice, tag, status, pdf }) {

  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleExplore = () => {

    if (!checkLogin()) return;

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

  const handleRegister = () => {

    if (!checkLogin()) return;

    // later this will call backend registration
    alert("Proceeding to registration...");
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
          <button className="sold-btn">
            SOLD OUT
          </button>
        ) : (
          <>
            <button
              className="register-btn"
              onClick={handleRegister}
            >
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