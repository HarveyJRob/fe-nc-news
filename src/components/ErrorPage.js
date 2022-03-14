import React from "react";

const ErrorPage = ({ message, status }) => {
  return (
    <main className="main">
      <article className="error-message">
        <h2>Error</h2>
        {status && message ? (
          <p>
            {status}: {message}
          </p>
        ) : (
          <p>Page Not Found</p>
        )}
      </article>
    </main>
  );
};

export { ErrorPage };
