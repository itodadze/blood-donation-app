import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/HomePage";
import {RequestForm} from "./pages/RequestFormPage"
import {useState} from "react";
import {Chat} from "./pages/ChatPage";
import {Login} from "./pages/LoginPage";
import {Register} from "./pages/RegisterPage";
import {RegisterMedInfo} from "./pages/RegisterMedInfo";
import {Request} from "./pages/RequestPage";
import {Help} from "./pages/HelpPage";
import {Profile} from "./pages/ProfilePage";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Routes>
            <Route path='/' element={<Home isSidebarOpen={isSidebarOpen}
                                           toggleSidebar={toggleSidebar}
                                            currentUser={currentUser}/>}/>
            <Route path='/request/broadcast' element={<RequestForm isSidebarOpen={isSidebarOpen}
                                                         toggleSidebar={toggleSidebar}
                                                        currentUser={currentUser}/>}/>
            <Route path='/chat' element={<Chat isSidebarOpen={isSidebarOpen}
                                               toggleSidebar={toggleSidebar}
                                                currentUser={currentUser}/>}/>
            <Route path="/request/:request_id" element = {
                <Request isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}
                currentUser={currentUser}/>
            }/>
            <Route path='/login' element={<Login isSidebarOpen={isSidebarOpen}
                                                 toggleSidebar={toggleSidebar}
                                                setCurrentUser={setCurrentUser}/>}/>
            <Route path='/register' element={<Register isSidebarOpen={isSidebarOpen}
                                                       toggleSidebar={toggleSidebar}
                                                       setCurrentUser={setCurrentUser}/>}/>
            <Route path='/registerMed' element={<RegisterMedInfo setCurrentUser={setCurrentUser}/>}/>
            <Route path="/help" element = {<Help isSidebarOpen={isSidebarOpen}
                                                 toggleSidebar={toggleSidebar}
                                                 setCurrentUser={setCurrentUser}/>}/>
            <Route path="/profile/:user_id"
                   element= {<Profile isSidebarOpen={isSidebarOpen}
                                   toggleSidebar={toggleSidebar}
                                   currentUser={currentUser}/>
            }/>
        </Routes>
    );
}

export default App;
