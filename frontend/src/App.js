import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/HomePage";
import {Request} from "./pages/RequestPage"
import {useState} from "react";
// import {Chat} from "./pages/ChatPage";

// function App() {
//   return (
//       <Routes>
//         <Route path='/' element={<Chat />}/>
//       </Routes>
//   );

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Routes>
            <Route path='/' element={<Home isSidebarOpen={isSidebarOpen}
                                           toggleSidebar={toggleSidebar}/>}/>
            <Route path='/request' element={<Request isSidebarOpen={isSidebarOpen}
                                                     toggleSidebar={toggleSidebar}/>}/>
        </Routes>
    );
}

export default App;
