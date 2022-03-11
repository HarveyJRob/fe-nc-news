// React
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

// fortawesome
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosGetTopics, axiosPostArticle } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { Title } from "@mui/icons-material";

// REGEX
const TITLE_REGEX = /^[A-z0-9\s']{3,50}$/;
const BODY_REGEX = /^[A-z0-9\s']{3,200}$/;

const ArticleAdd = ({ setIsReloading }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const userRef = useRef();
  const errRef = useRef();

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  const [body, setBody] = useState("");
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);

  const [topic, setTopic] = useState("");
  const [validTopic, setValidTopic] = useState(false);
  const [topicFocus, setTopicFocus] = useState(false);

  const [topics, setTopics] = useState([]);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidTopic(topic);
  }, [topic]);

  useEffect(() => {
    setValidBody(BODY_REGEX.test(body));
  }, [body]);

  useEffect(() => {
    setErrMsg("");
  }, [title, body, topic]);

  useEffect(() => {
    axiosGetTopics().then((topicsFromApi) => {
      setTopics([...topicsFromApi]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPostArticle({
      author: loggedInUser,
      title: title,
      body: body,
      topic: topic,
    })
      .then((res) => {
        setSuccess(true);
        setIsReloading(true);
        setTitle("");
        setBody("");
        setTopic("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Bad request");
        } else if (err.response?.status === 404) {
          setErrMsg("Not found");
        } else {
          setErrMsg("Adding article failed");
        }
        errRef.current.focus();
      });
  };

  if (!loggedInUser) {
    return <p ref={userRef}>Log in or sign up to post an article</p>;
  }

  return (
    <>
      {success ? (
        <section className="article-add">
          <h2>Success!</h2>
        </section>
      ) : (
        <section className="article-add">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              Title: <FontAwesomeIcon icon={faCheck} className={validTitle ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validTitle || !TITLE_REGEX ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="title"
              ref={userRef}
              autoComplete="on"
              placeholder="article title..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              aria-invalid={validTitle ? "false" : "true"}
              aria-describedby="titlenote"
              onFocus={() => setTitleFocus(true)}
              onBlur={() => setTitleFocus(false)}
            />
            <p id="titlenote" className={titleFocus && title && !validTitle ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />3 to 100 characters.
            </p>
            <br />
            <label htmlFor="topic">
              Topic: <FontAwesomeIcon icon={faCheck} className={validTopic ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validTopic ? "hide" : "invalid"} />
            </label>
            <select id="topic" onChange={(e) => setTopic(e.target.value)} required>
              <option value=""> -- Select a topic -- </option>
              {topics.map((topicFromApi) => (
                <option key={topicFromApi.slug} value={topicFromApi.slug}>
                  {topicFromApi.slug}
                </option>
              ))}
            </select>

            <br />
            <label htmlFor="body">
              Body: <FontAwesomeIcon icon={faCheck} className={validBody ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validBody || !BODY_REGEX ? "hide" : "invalid"} />
            </label>
            <textarea
              rows="1"
              id="body"
              autoComplete="on"
              placeholder="article body..."
              onChange={(e) => setBody(e.target.value)}
              value={body}
              required
              aria-invalid={validBody ? "false" : "true"}
              aria-describedby="bodynote"
              onFocus={() => setBodyFocus(true)}
              onBlur={() => setBodyFocus(false)}
            />
            <p id="bodynote" className={bodyFocus && body && !validBody ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />3 to 250 characters.
            </p>

            <br />
            <button disabled={!validTitle || !validBody || !loggedInUser ? true : false}>Add article</button>
          </form>
        </section>
      )}
    </>
  );
};

export default ArticleAdd;
