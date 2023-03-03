import { useNavigate } from "react-router-dom";
import "./SearchRecommend.scss";

export const SearchRecommend = ({ data }) => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    navigate(`/collection/${String(data.name).trim().replaceAll('/', ' ').replace(/\s/g, '-')}`, {
      state: {
        categoryId: data.id,
      },
    });
  };

  return (
    <span
      className="header__search__recom-item"
      onClick={() => handleSearch()}
    >
      {data.name}
    </span>
  );
};
