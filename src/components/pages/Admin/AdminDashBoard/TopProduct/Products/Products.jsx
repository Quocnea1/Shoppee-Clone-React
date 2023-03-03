import "./Products.scss";
import {
  ProcessLongText,
  TextToCurrency,
} from "../../../../../global/ProcessText/ProcessText";

export default function Product({ data }) {
  return (
    <div className="productLine">
      <img
        src={data.imageProduct}
        alt="San pham cua ban"
        className="productItemImg"
      />
      <h3 className="productItemTitle">
        {<ProcessLongText string={data.name} limit={50} />}
        <br />
      </h3>
      <div className="productItemOthers">
        <h3>Đã Bán</h3>
        <p>{data.sold}</p>
      </div>
      <div className="productItemOthers">
        <h3>Giá Bán</h3>
        <p>
          <TextToCurrency number={data.price} />
        </p>
      </div>
      <div className="productItemOthers">
        <h3>Tổng Doanh Thu</h3>
        <p>
          <TextToCurrency number={data.sold * data.price} />
        </p>
      </div>
    </div>
  );
}
