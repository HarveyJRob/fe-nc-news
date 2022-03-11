import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { useQueryParams, StringParam, BooleanParam } from "use-query-params";

// MUI
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SortNav = ({ pageCount, setPageCount, page, setPage, totalCount, setTotalCount }) => {
  const sortOrderList = ["DESC", "ASC"];
  const sortByList = ["title", "votes", "topic", "author", "created_at"];
  const limitList = [5, 10, 15, 20];

  const [search, setSearch] = useSearchParams();
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setSearch({ limit: e.target.value, sortBy, sortOrder });
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setSearch({ sortOrder: e.target.value, sortBy, limit });
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setSearch({ sortBy: e.target.value, sortOrder, limit });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <section className="sort-nav">
      <span>
        <select value={search.get("sortOrder") || "DESC"} onChange={handleSortOrderChange}>
          {sortOrderList.map((sortOrder) => (
            <option key={sortOrder} value={sortOrder}>
              {sortOrder}
            </option>
          ))}
        </select>

        <select value={search.get("sortBy") || "created_at"} onChange={handleSortByChange}>
          {sortByList.map((sortBy) => (
            <option key={sortBy} value={sortBy}>
              {sortBy}
            </option>
          ))}
        </select>

        <select value={search.get("limit") || 10} onChange={handleLimitChange}>
          {limitList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </span>
      <span className="pagination">
        <Stack spacing={2}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </Stack>
      </span>
    </section>
  );
};

export default SortNav;
