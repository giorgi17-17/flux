import "./App.css";
import Router from "./Router";
import Header from "./components/layout/Header";
import { AppContextProvider } from "./context/AppContext";
// import Home from "./pages/Home";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';
function App() {
  return (
    <div className="body">
      <AppContextProvider>
        <Header />
        <div>
          <Router />
          <SpeedInsights />
          <Analytics />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
