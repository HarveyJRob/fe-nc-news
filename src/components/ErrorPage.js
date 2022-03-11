import React from "react";

const ErrorPage = ({ message, status }) => {
  return (
    <main className="main">
      <h2>Error</h2>
      {status && message ? (
        <p>
          {status}: {message}
        </p>
      ) : (
        <p>Page Not Found</p>
      )}
    </main>
  );
};

export { ErrorPage };
