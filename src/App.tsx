import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { Router } from './components/Router';


function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div className="App">
     <div className="App">
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
