import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Chatbot from "./components/Chatbot";

function App() {
  const [active, setActive] = useState(false);
  return (
    <div className="App">
      Chatbot for Ecommerce
      {active ? (
        <Chatbot/>
      ) : (
        <div className="chatbot-activate" onClick={() => setActive(true)}>
         <button>image</button>
        </div>
      )}
    </div>
  );
}

export default App;
