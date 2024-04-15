import {Helmet} from "react-helmet";
import {RequestPageMenu} from "../components/RequestPageMenu";
import {RequestPageTopBar} from "../components/RequestPageTopBar";
import background from "../assets/background/background.png"

export const Request = ({isSidebarOpen, toggleSidebar}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
            </Helmet>
            {isSidebarOpen && <RequestPageMenu/>}
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', width: "100%"}}>
                <RequestPageTopBar toggleSidebar={toggleSidebar}/>
                <div style={{flex: '1', position: 'relative', width: "100%", backgroundImage: `url(${background})`,
                    backgroundSize: 'cover'}}>
                </div>
            </div>
        </div>
    );
}