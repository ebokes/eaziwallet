import AppRoutes from "./routes";
import { UiProvider } from "./context/UiContext";

function App() {
  return (
    <UiProvider>
      <AppRoutes />
    </UiProvider>
  );
}

export default App;
