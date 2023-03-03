import "./SubCategoryList.scss";

export const SubCategoryList = ({
  data,
  index,
  setCurrentChooseIndex,
  className,
}) => {
  return (
    <li className={className} onClick={() => setCurrentChooseIndex(index)}>
      <a href="/" className="category-item__link">
        {data.name}
      </a>
    </li>
  );
};
