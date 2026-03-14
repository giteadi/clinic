import { createContext, useContext, useState, useEffect } from 'react';

// Theme constants - using object to avoid export issues
const THEME_CONSTANTS = {
  WHITE: 'white',
  DARK: 'dark', 
  BLUE: 'blue'
};

export const THEMES = THEME_CONSTANTS;

const themeConfig = {
  [THEMES.BLUE]: {
    name: 'Ocean Blue',
    colors: {
      navy: "#0A1628",
      navyLight: "#112240", 
      teal: "#0ABFBC",
      tealDark: "#089A97",
      gold: "#E8A838",
      cream: "#F8F5F0",
      white: "#FFFFFF",
      slate: "#8892B0",
      border: "rgba(10,191,188,0.15)",
      red: "#EF4444",
    }
  },
  [THEMES.WHITE]: {
    name: 'Light',
    colors: {
      navy: "#FFFFFF",
      navyLight: "#F8F9FA", 
      teal: "#0ABFBC",
      tealDark: "#089A97",
      gold: "#E8A838",
      cream: "#F8F5F0",
      white: "#FFFFFF",
      slate: "#2D3748",
      border: "rgba(0,0,0,0.1)",
      red: "#DC2626",
    }
  },
  [THEMES.DARK]: {
    name: 'Dark',
    colors: {
      navy: "#000000",
      navyLight: "#1A1A1A", 
      teal: "#0ABFBC",
      tealDark: "#089A97",
      gold: "#E8A838",
      cream: "#2A2A2A",
      white: "#FFFFFF",
      slate: "#B0B0B0",
      border: "rgba(136,146,176,0.15)",
      red: "#EF4444",
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('clinic-theme');
    return savedTheme || THEMES.BLUE; // Default to current blue theme
  });

  useEffect(() => {
    localStorage.setItem('clinic-theme', theme);
    
    // Apply smooth transition class to body during theme change
    document.body.classList.add('theme-transition');
    
    // Remove the class after transition completes
    const timer = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [theme]);

  const colors = themeConfig[theme].colors;

  const toggleTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    colors,
    toggleTheme,
    availableThemes: Object.entries(themeConfig).map(([key, config]) => ({
      key,
      name: config.name
    }))
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
