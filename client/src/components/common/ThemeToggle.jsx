import { motion } from 'framer-motion';
import { Sun, Moon, Droplets } from 'lucide-react';
import { useTheme, THEMES } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  const getIcon = (themeKey) => {
    switch (themeKey) {
      case THEMES.WHITE:
        return <Sun size={16} />;
      case THEMES.DARK:
        return <Moon size={16} />;
      case THEMES.BLUE:
        return <Droplets size={16} />;
      default:
        return <Droplets size={16} />;
    }
  };

  const getButtonStyle = (themeKey) => {
    const isActive = theme === themeKey;
    
    return {
      padding: '8px 12px',
      borderRadius: '8px',
      border: `1px solid ${isActive ? colors.teal : colors.border}`,
      background: isActive ? colors.teal : 'transparent',
      color: isActive ? colors.white : colors.slate,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      fontWeight: 500
    };
  };

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      padding: '4px',
      borderRadius: '12px',
      background: colors.navyLight
    }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleTheme(THEMES.WHITE)}
        style={getButtonStyle(THEMES.WHITE)}
      >
        {getIcon(THEMES.WHITE)}
        Light
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleTheme(THEMES.DARK)}
        style={getButtonStyle(THEMES.DARK)}
      >
        {getIcon(THEMES.DARK)}
        Dark
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleTheme(THEMES.BLUE)}
        style={getButtonStyle(THEMES.BLUE)}
      >
        {getIcon(THEMES.BLUE)}
        Blue
      </motion.button>
    </div>
  );
}
