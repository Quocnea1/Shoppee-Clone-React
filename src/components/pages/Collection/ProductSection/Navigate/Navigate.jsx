import "./Navigate.scss";
import { useState, useEffect } from "react";
import { paginateNumberOfPageShow } from "../../../../../utils/dataConfig";

export const Navigate = ({
  currentPage,
  setCurrentPage,
  totalPage,
}) => {

  const [numbers, setNumbers] = useState();

  useEffect(() => {
    const numPageToCut = paginateNumberOfPageShow;
    const pageOffSet = (numPageToCut - 1) / 2 - 1;
    const pageOffSetEgde = (numPageToCut + 1) / 2;
    const list = [];

    let start = 1;
    let end = totalPage;
    if (totalPage >= numPageToCut) {
      if (
        currentPage >= pageOffSetEgde &&
        currentPage <= totalPage - pageOffSetEgde + 1
      ) {
        start = currentPage - pageOffSet;
        end = currentPage + pageOffSet;
      } else {
        if (currentPage < pageOffSetEgde) end = pageOffSetEgde + 1;
        else start = totalPage - pageOffSetEgde;
      }
    }

    for (let i = start; i <= end; i++) {
      if (i === currentPage)
        list.push(
          <li className={"pageItem active"} key={i}>
            {i}
          </li>
        );
      else
        list.push(
          <li className={"pageItem"} key={i} onClick={() => changePage(i)}>
            {i}
          </li>
        );
    }

    if (totalPage >= numPageToCut) {
      if (currentPage >= pageOffSetEgde)
        list.splice(
          0,
          0,
          <li className="pageItem left" key={-3} onClick={() => skipPage(true)}>
            ...
          </li>
        );
      if (currentPage <= totalPage - pageOffSetEgde + 1)
        list.splice(
          list.length,
          0,
          <li
            className="pageItem right"
            key={-4}
            onClick={() => skipPage(false)}
          >
            ...
          </li>
        );
    }

    const skipPage = (toHead) => {
      if (toHead) setCurrentPage(1);
      else setCurrentPage(totalPage);
    };

    setNumbers(list);
  }, [currentPage, totalPage]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const navigatePage = (isNext) => {
    if (isNext === false && currentPage > 1) setCurrentPage(currentPage - 1);
    if (isNext === true && currentPage < totalPage)
      setCurrentPage(currentPage + 1);
  };

  return (
    <ol className="navigate">
      <li className="pageItem" key={-1} onClick={() => navigatePage(false)}>
        {"<"}
      </li>
      {numbers}
      <li className="pageItem" key={-2} onClick={() => navigatePage(true)}>
        {">"}
      </li>
    </ol>
  );
};
