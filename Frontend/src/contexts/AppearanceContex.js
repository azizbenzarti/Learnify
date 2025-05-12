// // src/contexts/AppearanceContext.js
import React, { createContext, useContext, useState } from 'react';

const AppearanceContext = createContext();

// export const AppearanceProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');
//   const [fontSize, setFontSize] = useState('medium');
//   const [compactView, setCompactView] = useState(false);
//   const [showGradients, setShowGradients] = useState(true);

//   return (
//     <AppearanceContext.Provider
//       value={{
//         theme,
//         setTheme,
//         fontSize, 
//         setFontSize,
//         compactView,
//         setCompactView,
//         showGradients,
//         setShowGradients
//       }}
//     >
//       {children}
//     </AppearanceContext.Provider>
//   );
// };


// In AppearanceContext.js
export const AppearanceProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AppearanceContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </AppearanceContext.Provider>
  );
};
export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }
  return context;
};
