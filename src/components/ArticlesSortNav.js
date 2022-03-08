import { useState, useEffect } from "react";

const ArticlesSortNav = ({ sortOrder, setSortOrder, sortBy, setSortBy }) => {
  const [sortOrderList, setSortOrderList] = useState(["DESC", "ASC"]);
  const [sortByList, setSortByList] = useState(["title", "votes", "topic", "author", "created_at"]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <select onChange={handleSortOrderChange}>
        {sortOrderList.map((sortOrder) => (
          <option key={sortOrder} value={sortOrder}>
            {sortOrder}
          </option>
        ))}
      </select>

      <select onChange={handleSortByChange}>
        {sortByList.map((sortBy) => (
          <option key={sortBy} value={sortBy}>
            {sortBy}
          </option>
        ))}
      </select>
    </>
  );
};

export default ArticlesSortNav;
