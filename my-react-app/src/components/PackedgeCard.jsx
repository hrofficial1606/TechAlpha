import { useNavigate } from "react-router-dom";
import "../styles/Workshop.css";

function PackedgeCard({ image }) {

  const navigate = useNavigate();

  return (
    <div className="pack-card">

      <div className="pack-title">PACKEDGE</div>

      <div className="pack-image">
        <img src={image} alt="package" />
      </div>

      <div className="pack-footer">

        <div className="pack-tech-corner">

          <button className="register-btn">
            REGISTER
          </button>

          <button
            className="explore-btn"
            onClick={() => navigate("/workshops/explore")}
          >
            EXPLORE
          </button>

        </div>

      </div>

    </div>
  );
}

export default PackedgeCard;
