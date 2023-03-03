import "./AdminCategory.scss";
import AddCategory from "./AddCategory/AddCategory";
import AllCategory from "./AllCategory/AllCategory";
import { useState } from "react";

export default function AdminCategory() {
  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    sub_category: [""],
    shopId: "",
    image: null,
    id: null,
  });
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="adminCategory">
      <AddCategory
        initialFormValues={initialFormValues}
        setInitialFormValues={setInitialFormValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <AllCategory setIsEdit={setIsEdit} setInitialFormValues={setInitialFormValues} />
    </div>
  );
}
