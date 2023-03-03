import "./RecommendToday.scss";
import { ProductFrame } from "../../../global/ProductFrame/ProductFrame";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
export const RecommendToday = () => {
  const list = useSelector((state) => state.collection.list);

  const loading = {
    margin: "30px 22px 50px 0",
  };

  return (
    <div className="recommendToday">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <div>Gợi ý hôm nay</div>
          </div>
          {list.length <= 0 ? (
            <PropagateLoader color="#ee4d2d" cssOverride={loading} />
          ) : (
            <div className="items">
              {list.map((_data, index) => (
                <ProductFrame data={_data} key={index} />
              ))}
            </div>
          )}
          <Link className="showMore" to="/collection">
            Xem Thêm
          </Link>
        </div>
      </div>
    </div>
  );
};
