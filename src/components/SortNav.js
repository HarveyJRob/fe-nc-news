import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import { useQueryParams, StringParam, BooleanParam } from "use-query-params";

// MUI
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SortNav = ({ pageCount }) => {
  const sortOrderList = ["DESC", "ASC"];
  const sortByList = ["title", "votes", "topic", "author", "created_at"];
  const limitList = [5, 10, 15, 20];

  const [search, setSearch] = useSearchParams();

  const handleChange = (e) => {
    const newSearch = Object.fromEntries([...search]);
    newSearch[e.target.id] = e.target.value;
    setSearch(newSearch);
  };

  const handlePageChange = (event, value) => {
    //console.log(event);
    const newSearch = Object.fromEntries([...search]);
    newSearch.page = value;
    setSearch(newSearch);
    //setPage(value);
  };

  return (
    <section className="sort-nav">
      <span>
        <select id="sortOrder" value={search.get("sortOrder") || "DESC"} onChange={handleChange}>
          {sortOrderList.map((sortOrder) => (
            <option key={sortOrder} value={sortOrder}>
              {sortOrder}
            </option>
          ))}
        </select>

        <select id="sortBy" value={search.get("sortBy") || "created_at"} onChange={handleChange}>
          {sortByList.map((sortBy) => (
            <option key={sortBy} value={sortBy}>
              {sortBy}
            </option>
          ))}
        </select>

        <select id="limit" value={search.get("limit") || 10} onChange={handleChange}>
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
          <Pagination
            count={pageCount}
            page={parseInt(search.get("page")) || 1}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </span>
    </section>
  );
};

export default SortNav;
