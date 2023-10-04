import "./App.css";
import Router from "./Router";
import Header from "./components/layout/Header";
import { AppContextProvider } from "./context/AppContext";
// import Home from "./pages/Home";

function App() {
  return (
    <div className="body">
      <AppContextProvider>
        <Header />
        <div>
          <Router />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
