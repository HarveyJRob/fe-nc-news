// Hooks
import { useArticlesList } from "../hooks/useArticlesList";

// Components
import ArticleCardHome from "./ArticleCardHome";
import { ErrorPage } from "./ErrorPage";

const Home = () => {
  const topThree = useArticlesList(undefined, "DESC", "votes", 1, 3);
  const bottomThree = useArticlesList(undefined, "ASC", "votes", 1, 3);
  const mostRecent = useArticlesList(undefined, "DESC", "created_at", 1, 3);

  if (topThree.isLoading) {
    return (
      <main className="main">
        <p>...article list is loading</p>
      </main>
    );
  }

  if (topThree.error) {
    return <ErrorPage message={topThree.error.err.response.data.msg} status={topThree.error.err.response.status} />;
  }

  return (
    <main className="main">
      <h2>Most popular...</h2>
      <ul className="flex-container">
        {topThree.articlesList.map((article) => {
          return <ArticleCardHome key={article.title} article={article} />;
        })}
      </ul>
      <h2>Least popular...</h2>
      <ul className="flex-container">
        {bottomThree.articlesList.map((article) => {
          return <ArticleCardHome key={article.title} article={article} />;
        })}
      </ul>
      <h2>Most recent ...</h2>
      <ul className="flex-container">
        {mostRecent.articlesList.map((article) => {
          return <ArticleCardHome key={article.title} article={article} />;
        })}
      </ul>
    </main>
  );
};

export default Home;
