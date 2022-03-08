import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((currTheme) => {
      return currTheme === "light" ? "dark" : "light";
    });
  };

  return (
    <button onClick={toggleTheme} className={`button__${theme}`}>
      Change theme
    </button>
  );
};

export default ToggleTheme;
