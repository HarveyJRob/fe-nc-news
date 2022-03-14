// React
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

// fortawesome
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosPostTopic } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// REGEX
const SLUG_REGEX = /^[a-z-]{3,100}$/;
const BODY_REGEX = /^[a-zA-Z0-9\s!@#€£$%^&*()_+={}[\]:;'"|\\<>?/,.`~-]{3,5000}$/;

const TopicAdd = ({ setIsReloading }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const userRef = useRef();
  const errRef = useRef();

  const [slug, setSlug] = useState("");
  const [validSlug, setValidSlug] = useState(false);
  const [slugFocus, setSlugFocus] = useState(false);

  const [body, setBody] = useState("");
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      let timer = setTimeout(() => {
        setSuccess(false);
        timer = null;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    setValidSlug(SLUG_REGEX.test(slug));
  }, [slug]);

  useEffect(() => {
    setValidBody(BODY_REGEX.test(body));
  }, [body]);

  useEffect(() => {
    setErrMsg("");
  }, [slug, body]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPostTopic({
      slug: slug,
      description: body,
    })
      .then((res) => {
        setSuccess(true);
        setIsReloading(true);
        setSlug("");
        setBody("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Bad request");
        } else if (err.response?.status === 404) {
          setErrMsg("Not found");
        } else {
          setErrMsg("Adding topic failed");
        }
        errRef.current.focus();
      });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  if (!loggedInUser) {
    return <p ref={userRef}>Log in or sign up to add a topic</p>;
  }

  return (
    <>
      {success ? (
        <article className="topic-add">
          <h2>Success!</h2>
        </article>
      ) : (
        <article className="topic-add">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="slug">
              Slug: <FontAwesomeIcon icon={faCheck} className={validSlug ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validSlug ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="slug"
              ref={userRef}
              autoComplete="on"
              placeholder="topic slug..."
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
              required
              aria-invalid={validSlug ? "false" : "true"}
              aria-describedby="slugnote"
              onFocus={() => setSlugFocus(true)}
              onBlur={() => setSlugFocus(false)}
              onKeyDown={onKeyDown}
            />
            <p id="slugnote" className={slugFocus && slug && !validSlug ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />3 to 100 characters, lowercase letters or - only.
            </p>
            <br />
            <label htmlFor="body">
              Desc: <FontAwesomeIcon icon={faCheck} className={validBody ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validBody || !BODY_REGEX ? "hide" : "invalid"} />
            </label>
            <textarea
              rows="1"
              id="body"
              autoComplete="on"
              placeholder="topic description..."
              onChange={(e) => setBody(e.target.value)}
              value={body}
              required
              aria-invalid={validBody ? "false" : "true"}
              aria-describedby="bodynote"
              onFocus={() => setBodyFocus(true)}
              onBlur={() => setBodyFocus(false)}
              onKeyDown={onKeyDown}
            />
            <p id="bodynote" className={bodyFocus && body && !validBody ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />3 to 5000 characters.
            </p>

            <br />
            <button disabled={!validSlug || !validBody || !loggedInUser ? true : false}>Add topic</button>
          </form>
        </article>
      )}
    </>
  );
};

export default TopicAdd;
