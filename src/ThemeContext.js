import React, { createContext, useState, useEffect } from "react";

// Helper to darken/lighten hex colors for hover states
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

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
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

  const getResolvedHex = () => {
    if (customHex) return customHex;
    const colorMap = {
      emerald: "#10b981",
      blue: "#3b82f6",
      indigo: "#6366f1",
      purple: "#8b5cf6",
      rose: "#f43f5e",
      amber: "#f59e0b",
    };
    return colorMap[primaryColor] || "#10b981";
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        customHex,
        setCustomHex,
        getThemeClass,
        resolvedHex: getResolvedHex(),
        adjustColor, // Added for easy access in components
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Only one export block — no duplicates
export { ThemeProvider, adjustColor };
