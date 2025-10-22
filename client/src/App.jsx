import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-500">
      <h1 className="text-3xl font-bold mb-4">Tailwind v4 Theme Toggle</h1>

      <button
        onClick={toggleTheme}
        className="px-6 py-2 rounded bg-primary text-white hover:opacity-80 transition-opacity duration-300"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <p className="mt-6 max-w-md text-center">
        Click the button above to toggle themes smoothly. It uses your system
        preference by default and remembers your choice.
      </p>
    </div>
  );
}
