// React
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

// fortawesome
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utils
import { axiosPostCommentByArticleId } from "../utils/api";

// Context
import { LoggedInUserContext } from "../contexts/LoggedInUser";

// REGEX
const DESC_REGEX = /^[A-z0-9\s']{3,200}$/;

const CommentAdd = ({ article_id, setIsReloading }) => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  const userRef = useRef();
  const errRef = useRef();

  const [desc, setDesc] = useState("");
  const [validDesc, setValidDesc] = useState(false);
  const [descFocus, setDescFocus] = useState(false);

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
    setValidDesc(DESC_REGEX.test(desc));
  }, [desc]);

  useEffect(() => {
    setErrMsg("");
  }, [desc]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPostCommentByArticleId(article_id, {
      username: loggedInUser,
      body: desc,
    })
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setIsReloading(true);
        setDesc("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Bad request");
        } else if (err.response?.status === 404) {
          setErrMsg("Not found");
        } else {
          setErrMsg("Adding comment failed");
        }
        errRef.current.focus();
      });
  };

  if (!loggedInUser) {
    return <p ref={userRef}>Log in or sign up to leave a comment</p>;
  }

  return (
    <>
      {success ? (
        <section className="comment-add">
          <h2>Success!</h2>
        </section>
      ) : (
        <section className="comment-add">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="desc">
              <FontAwesomeIcon icon={faCheck} className={validDesc ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validDesc || !desc ? "hide" : "invalid"} />
            </label>
            <textarea
              //type="text"
              rows="1"
              id="desc"
              ref={userRef}
              autoComplete="on"
              placeholder="Write a comment..."
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              required
              aria-invalid={validDesc ? "false" : "true"}
              aria-describedby="descnote"
              onFocus={() => setDescFocus(true)}
              onBlur={() => setDescFocus(false)}
            />
            <p id="descnote" className={descFocus && desc && !validDesc ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />3 to 250 characters.
            </p>
            <br />
            <button disabled={!validDesc || !loggedInUser ? true : false}>Add comment</button>
          </form>
        </section>
      )}
    </>
  );
};

export default CommentAdd;
