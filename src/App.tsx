import { useTheme } from "./context/ThemeContext";

function App() {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-primary min-h-screen">
      <h1 className="text-B1 text-primary shadow-elevation-high transition-colors">
        EaziWallet
      </h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-bleu-de-france text-white transition-colors text-B6"
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
