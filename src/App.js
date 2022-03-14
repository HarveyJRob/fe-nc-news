// react
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// contexts
import { ThemeContext } from "./contexts/Theme";
import { LoggedInUserContext } from "./contexts/LoggedInUser";

// css
import "./App.css";
import "./Material.css";

// components
import About from "./components/About";
import ArticlesList from "./components/ArticlesList";
import ArticleSingle from "./components/ArticleSingle";
import { BreadcrumbsMenu } from "./components/BreadcrumbsMenu";
import Banner from "./components/Banner";
import { ErrorPage } from "./components/ErrorPage";
import Header from "./components/Header";
import Home from "./components/Home";
import NavMain from "./components/NavMain";
import ToggleTheme from "./components/ToggleTheme";
import UsersList from "./components/UsersList";
import UserSingle from "./components/UserSingle";

function App() {
  const [theme, setTheme] = useState("dark");
  const [loggedInUser, setLoggedInUser] = useState("jessjelly");

  return (
    <BrowserRouter>
      <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={`App__${theme}`}>
            <div className="skirting-top"></div>
            <Header />
            <Banner />
            <BreadcrumbsMenu />
            <NavMain />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/articles" element={<ArticlesList />} />
              <Route path="article" element={<ArticlesList />} />
              <Route path="/articles/:topic" element={<ArticlesList />} />
              <Route path="/article/:article_id" element={<ArticleSingle />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:username" element={<UserSingle />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            {/* <nav className="nav-footer"></nav> */}
            <footer className="footer">© 2022 Rob Harvey. All Rights Reserved</footer>
            <div className="skirting-bottom"></div>
          </div>
        </ThemeContext.Provider>
      </LoggedInUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
