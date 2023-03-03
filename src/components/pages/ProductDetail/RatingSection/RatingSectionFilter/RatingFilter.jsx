import "./RatingFilter.scss";
function RatingFilter({ data, index, rateState, onChangeFilter }) {
  const ProcessRateLable = () => {
    switch (data) {
      case -1:
        return "Tất Cả";
      case -2:
        return "Có Bình Luận";
      case -3:
        return "Có Hình Ảnh/Video";
      default:
        return `${data} Sao`;
    }
  };
  return (
    <div
      className={`btn-filter ${rateState === index ? "active" : "not-active"}`}
      onClick={() => onChangeFilter(index, data)}
    >
      <div className={"data"}>{ProcessRateLable()}</div>
    </div>
  );
}

export default RatingFilter;
