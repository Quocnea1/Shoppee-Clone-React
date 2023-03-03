import "./NewsBanner.scss";
import { useNavigate } from "react-router-dom";

export const NewsBanner = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/collection");
  };
  return (
    <div className="newsBannerFrame" onClick={() => handleClick()}>
      <figure className="newsBannerImg">
        <img src={data.img} alt={data.title}></img>
      </figure>
    </div>
  );
};
