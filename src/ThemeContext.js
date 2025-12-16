import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const adjustColor = (color, amount) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem("arova_theme_color") || "emerald";
  });

  const [customHex, setCustomHex] = useState(() => {
    const savedHex = localStorage.getItem("arova_theme_hex");
    return savedHex === "null" ? null : savedHex;
  });

  useEffect(() => {
    localStorage.setItem("arova_theme_color", primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    if (customHex) {
      localStorage.setItem("arova_theme_hex", customHex);
    } else {
      localStorage.removeItem("arova_theme_hex");
    }
  }, [customHex]);

  const getThemeClass = (type, weight = "600") => {
    if (customHex) return "";
    return `${type}-${primaryColor}-${weight}`;
  };

  const themeStyle = customHex
    ? {
        "--primary": customHex,
        "--primary-light": `${customHex}20`,
        "--primary-hover": adjustColor(customHex, -20),
      }
    : {};

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        customHex,
        setCustomHex,
        getThemeClass,
        themeStyle,
      }}
    >
      <div style={themeStyle}>{children}</div>
    </ThemeContext.Provider>
  );
};
