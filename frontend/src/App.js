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
import {SignProvider} from "./contexts/SignSystemContext";
import {Profile} from "./pages/ProfilePage";
import {ConfirmEmail} from "./pages/ConfirmEmail";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (<SignProvider>

        <Routes>
            <Route path="/confirm-email/:uid/:token" element={<ConfirmEmail />} />
            <Route path='/' element={<Home isSidebarOpen={isSidebarOpen}
                                           toggleSidebar={toggleSidebar}/>}/>
            <Route path='/request/broadcast' element={<RequestForm isSidebarOpen={isSidebarOpen}
                                                                   toggleSidebar={toggleSidebar}/>}/>
            <Route path='/chat' element={<Chat isSidebarOpen={isSidebarOpen}
                                               toggleSidebar={toggleSidebar}/>}/>
            <Route path="/request/:request_id"
                   element={<Request isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}/>
            <Route path='/login' element={<Login isSidebarOpen={isSidebarOpen}
                                                 toggleSidebar={toggleSidebar}/>}/>
            <Route path='/register' element={<Register isSidebarOpen={isSidebarOpen}
                                                       toggleSidebar={toggleSidebar}/>}/>
            <Route path='/registerMed' element={<RegisterMedInfo/>}/>
            <Route path="/help" element = {<Help isSidebarOpen={isSidebarOpen}
                                                 toggleSidebar={toggleSidebar}/>}/>
            <Route path="/profile/:user_id"
                   element= {<Profile isSidebarOpen={isSidebarOpen}
                                   toggleSidebar={toggleSidebar}/>
            }/>
        </Routes>
    </SignProvider>);
}

export default App;
