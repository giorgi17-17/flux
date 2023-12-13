import "./App.css";
import Router from "./Router";
import Header from "./components/layout/Header";
import { AppContextProvider } from "./context/AppContext";
// import Home from "./pages/Home";
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  return (
    <div className="body">
      <AppContextProvider>
        <Header />
        <div>
          <Router />
          <SpeedInsights />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
