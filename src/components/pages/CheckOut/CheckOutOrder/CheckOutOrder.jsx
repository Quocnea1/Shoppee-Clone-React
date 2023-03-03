import "../CheckOut.scss";
import "./CheckOutOrder.scss";
import { TextToCurrency } from "../../../global/ProcessText/ProcessText";


function CheckOutOrder({ data }) {


  return (
    <tr>
      <td>
        <img className="img-thumbnail" src={data?.image} alt="" />
        <span className="font-weight-bold ml-md-3 d-md-inline-block d-block">
          {data?.name}
        </span>
      </td>
      <td>
        <span className="text-secondary align-middle text-center typeData">
          Loại: {data?.type}.
        </span>
      </td>
      <td className="font-weight-bold align-middle text-center">
        <TextToCurrency number={data?.price} />
      </td>
      <td className="font-weight-bold align-middle text-center">
        {data?.quantity}
      </td>
      <td className="font-weight-bold align-middle text-center">
        <TextToCurrency number={data?.totalPrice} />
      </td>
    </tr>
  );
}

export default CheckOutOrder;
