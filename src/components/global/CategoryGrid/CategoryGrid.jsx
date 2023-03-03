import { ProcessLongText } from "../ProcessText/ProcessText";
import "./CategoryGrid.scss";
import { useNavigate } from "react-router-dom";

export const CategoryGrid = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/collection/${String(data.name).trim().replaceAll('/', ' ').replace(/\s/g, '-')}`, {
      state: {
        categoryId: data.id,
      },
    });
  };
  return (
    <div className="categoryFrame" onClick={() => handleClick()}>
      <figure className="categoryImg">
        <img src={data.image} alt={data.name}></img>
      </figure>
      <div className="categoryInfo">
        <div className="categoryTitle">
          <ProcessLongText string={data.name} />
        </div>
      </div>
    </div>
  );
};
