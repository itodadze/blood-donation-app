import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/HomePage";
import {RequestForm} from "./pages/RequestFormPage"
import {useState} from "react";
import {Chat} from "./pages/ChatPage";
import {Request} from "./pages/RequestPage";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Routes>
            <Route path='/' element={<Home isSidebarOpen={isSidebarOpen}
                                           toggleSidebar={toggleSidebar}/>}/>
            <Route path='/request/broadcast' element={<RequestForm isSidebarOpen={isSidebarOpen}
                                                         toggleSidebar={toggleSidebar}/>}/>
            <Route path='/chat' element={<Chat isSidebarOpen={isSidebarOpen}
                                               toggleSidebar={toggleSidebar}/>}/>
            <Route path="/request/:request_id" element = {
                <Request isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            }/>
        </Routes>
    );
}

export default App;
