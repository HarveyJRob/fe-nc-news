// react
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

// contexts
import { ThemeContext } from "./contexts/Theme";
import { LoggedInUserContext } from "./contexts/LoggedInUser";

// css
import "./App.css";

// components
import About from "./components/About";
import ArticlesList from "./components/ArticlesList";
import ArticleSingle from "./components/ArticleSingle";
import { BreadcrumbsMenu } from "./components/BreadcrumbsMenu";
import Banner from "./components/Banner";
import { ErrorPage } from "./components/ErrorPage";
import Header from "./components/Header";
import Home from "./components/Home";
import MainMenu from "./components/MainMenu";
import ToggleTheme from "./components/ToggleTheme";
import UsersList from "./components/UsersList";
import UserSingle from "./components/UserSingle";

function App() {
  const [theme, setTheme] = useState("light");
  const [loggedInUser, setLoggedInUser] = useState("jessjelly");
  //const [loggedInUser, setLoggedInUser] = useState();

  return (
    <BrowserRouter>
      <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={`App__${theme}`}>
            <div className="skirting-top"></div>
            <Header />
            <Banner />
            <BreadcrumbsMenu />
            <MainMenu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="article" element={<ArticlesList />} />
              <Route path="/articles/:topic" element={<ArticlesList />} />
              {/* <Route path="/articles/add" element={<ArticleAdder />} /> */}
              <Route path="/article/:article_id" element={<ArticleSingle />} />
              <Route path="/users" element={<UsersList />} />
              {/* <Route path="/users/add" element={<UserAdder />} /> */}
              <Route path="/users/:username" element={<UserSingle />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <nav className="nav-footer">
              {/* <ul>
                <li>Sections:</li>
                <li>Home</li>
                <li>About</li>
                <li>Articles</li>
                <li>Users</li>
              </ul>
              <ul>
                <li>Account:</li>
                <li>Register</li>
                <li>Login</li>
              </ul>
              <ul>
                <li>Contexts:</li>
                <li>Theme</li>
                <li>Language</li>
                <li>Search</li>
              </ul> */}
            </nav>
            <footer className="footer">© 2022 Rob Harvey. All Rights Reserved</footer>
            <div className="skirting-bottom"></div>
          </div>
        </ThemeContext.Provider>
      </LoggedInUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
