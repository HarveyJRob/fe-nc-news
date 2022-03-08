import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Utils
import { axiosGetArticleByArticleId } from "../utils/api";
import { formatPSQLDateTimeStamp } from "../utils/utils";

// fortawesome
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArticleSingle = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    axiosGetArticleByArticleId(article_id).then((ArticleFromApi) => {
      //   console.log(ArticleFromApi);
      setArticle(ArticleFromApi);
    });
  }, [article_id]);

  //   const formattedDate = formatPSQLDateTimeStamp(article.created_at);
  return (
    <main className="main">
      <section className="userProfile">
        <h2>
          {article.title} ({article.author})
        </h2>
        <ul>
          {/* <li>Date: {formattedDate}</li> */}
          <li>Votes: {article.votes}</li>
          <li>Topic: {article.topic}</li>
        </ul>
        <p>{article.body}</p>
      </section>
    </main>
  );
};

export default ArticleSingle;
