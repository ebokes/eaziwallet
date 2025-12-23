import { useTheme } from "./context/ThemeContext";
import { Button } from "./components/ui/Button";

function App() {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-primary min-h-screen p-10 transition-colors">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-B1 text-primary shadow-elevation-high">
            EaziWallet Design System
          </h1>
          <Button onClick={toggleTheme} variant="secondary">
            Toggle Theme
          </Button>
        </header>

        <section className="bg-bg-secondary p-8 rounded-xl shadow-elevation-card">
          <h2 className="text-B2 text-primary mb-8 text-center">Buttons</h2>

          <div className="border border-dashed border-majorelle-blue/40 rounded-lg p-8 max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="primary">Button</Button>
              <span className="text-text-secondary text-R6">Primary</span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="accent">Button</Button>
              <span className="text-text-secondary text-R6">Accent</span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="secondary">Button</Button>
              <span className="text-text-secondary text-R6">Secondary</span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="tertiary">Button</Button>
              <span className="text-text-secondary text-R6">Tertiary</span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="tertiary-warning">Button</Button>
              <span className="text-text-secondary text-R6">
                Tertiary - Warning
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="tertiary-action">Button</Button>
              <span className="text-text-secondary text-R6">
                Tertiary - Action
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="filter"
                startIcon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" x2="20" y1="21" y2="21" />
                    <line x1="4" x2="20" y1="3" y2="3" />
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <circle cx="14" cy="3" r="2" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="21" r="2" />
                  </svg>
                }
              >
                Button
              </Button>
              <span className="text-text-secondary text-R6">Filters</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
