import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/HomePage";
import {Chat} from "./pages/ChatPage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Chat />}/>
      </Routes>
  );
}

export default App;
