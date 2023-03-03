import "./Description.scss";
import { useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

function Description() {
  const location = useLocation();

  const data = useSelector(
    (state) =>
      state.collection.list.find((m) => {
        return m.id === Number(location.state.productId);
      }),
    shallowEqual
  );
  return (
    <div className="description">
      <div className="container">
        <div className="wrapper">
          <h2 className="descriptionTitle">CHI TIẾT SẢN PHẨM</h2>
          <div className="detailOutter">{data?.detail}</div>
          <h2 className="descriptionTitle">MÔ TẢ SẢN PHẨM</h2>
          <div className="describeOutter">{data?.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Description;
