import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggle: () => { },
});


export const ThemeProvider = ({ children }) => {

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") ?? "light";
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.body.classList.add("dark");
    }
  }
    , [])


  const [theme, setTheme] = useState("light");
  const toggle = () => {
    const newValue = theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newValue);

    if (newValue === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    setTheme((prev) => (prev == "light" ? "dark" : "light"));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  )
}

export default ThemeContext