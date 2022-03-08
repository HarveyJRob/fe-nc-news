import { useState } from "react";

const ArticlesPaginationLimit = ({ limit, setLimit }) => {
  const [limitList, setLimitList] = useState([5, 10, 15, 20]);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <select onChange={handleLimitChange}>
      {limitList.map((limit) => (
        <option key={limit} value={limit}>
          {limit}
        </option>
      ))}
    </select>
  );
};

export default ArticlesPaginationLimit;
