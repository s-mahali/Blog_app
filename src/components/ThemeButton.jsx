import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../store/themeSlice";
//import {Container} from './Container'

function ThemeButton() {
  const dispatch = useDispatch();
  const themeMode = useSelector(state => state.theme.themeMode)
  



  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-1 rounded-lg 0 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {themeMode === "light" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
}

export default ThemeButton;
