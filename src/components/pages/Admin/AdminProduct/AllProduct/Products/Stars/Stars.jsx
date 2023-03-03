import ReactStars from "react-rating-stars-component";
import "./Stars.scss";

export default function Stars({ n }) {
  return (
    <div className="productStar">
      <ReactStars
        value={n}
        edit={false}
        isHalf={true}
        size={20}
        color="#999999"
        activeColor="#ee4d2d"
        className="star"
      />
      <p>({n})</p>
    </div>
  );
}
