import { useNavigate } from "react-router-dom";
import "../styles/Workshop.css";

function WorkshopCard({ title, prize, image }) {

  const navigate = useNavigate();

  return (
    <div className="card">

      <img src={image} alt="workshop" />

      <h4>{title}</h4>
      <p>Prize Pool: {prize}</p>

      <div className="btn-group">

        <button >Register</button>

        <button onClick={() => navigate("/workshops/explore")}>
          Explore
        </button>

      </div>

    </div>
  );
}

export default WorkshopCard;
