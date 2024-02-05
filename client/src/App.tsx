import "./App.css";
import Router from "./Router";
import Header from "./components/layout/Header";
import { AppContextProvider } from "./context/AppContext";
// import Home from "./pages/Home";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';
import ReactGA from "react-ga4";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    ReactGA.initialize(`${import.meta.env.VITE_REACTGA_INITIALIZE}`);
    // ReactGA.pageview(window.location.pathname + window.location.search)
    ReactGA.send({ hitType: "pageview", page: window.location.pathname});

   
    
  }, []);

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
