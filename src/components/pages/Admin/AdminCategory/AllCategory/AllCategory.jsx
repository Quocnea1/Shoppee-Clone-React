import { useSelector } from "react-redux";
import "./AllCategory.scss";
import CategoryItem from "./CategoryItem/CategoryItem";

export default function AllCategory({ setIsEdit, setInitialFormValues }) {
  const categories = useSelector((state) => state.admin.categories);
  return (
    <div className="allCategory">
      <div className="adminContainer">
        <div className="wrapper">
          <div className="title">Tất cả danh mục</div>
          <div className="categoryItems">
            {categories.map((_data, index) => (
              <CategoryItem setIsEdit={setIsEdit} setInitialFormValues={setInitialFormValues} data={_data} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
