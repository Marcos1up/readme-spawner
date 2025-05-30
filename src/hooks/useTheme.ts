import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleTheme } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";

const useTheme = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  //cargar tema de LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("readme-spawner-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    if (initialTheme !== theme) {
      dispatch(setTheme(initialTheme));
    }

    //aplicar tema
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, [dispatch]);

  //guarde el tema en LocalStorage y aplicar al documento cuando cambe
  useEffect(() => {
    localStorage.setItem("readme-spawner-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  //cambios en el tema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("readme-spawner-theme");
      if (!savedTheme) {
        dispatch(setTheme(e.matches ? "dark" : "light"));
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSetTheme = (newTheme: "light" | "dark") => {
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    toggleTheme: handleToggleTheme,
    setTheme: handleSetTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};

export default useTheme;
