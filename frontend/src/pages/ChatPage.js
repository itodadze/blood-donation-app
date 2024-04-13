import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import colors from "../values/colors";
import {HomePageMenu} from "../components/HomePageMenu";
import menu from "../assets/icons/menu.svg";

export const Chat = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap"
                    rel="stylesheet"/>
            </Helmet>
            {isSidebarOpen && <HomePageMenu/>}
            <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <div style={{backgroundColor: colors.tertiary, display: 'flex', flexDirection: 'row', height: '10vh'}}>
                    <div style={{alignItems: "center", display: "flex"}}>
                        <img src={menu} alt="menu icon" width="60vh" height="52vh"
                             onClick={toggleSidebar}/>
                    </div>
                </div>
                <div style={{margin: '2vh', border: colors.tertiary, borderStyle:'dotted', flex: '1', display: 'flex', flexDirection: 'row', backgroundColor: colors.pearl, maxHeight: '86vh'}}>
                    <div style={{padding: '2%',flex: '1', display: 'flex', flexDirection: 'column', maxWidth: '100%', width: "100%",
                        overflowY: 'scroll',
                        overflowX: 'clip',
                        maxHeight: '100%'}}>
                        {(() => {
                            // Initialize an empty array to hold JSX strings
                            let divs = [];

                            // Loop to generate 20 div elements
                            for (let i = 0; i < 50; i++) {
                                // Push each div element into the array
                                divs.push(
                                    <div style={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: "100%",
                                        marginLeft: '2vh',
                                        marginBottom: '4vh',
                                        justifyContent: 'flex-start'
                                    }}>
                                        <div style={{
                                            border: colors.secondary,
                                            borderStyle: 'solid',
                                            borderRadius: '25px',
                                            borderBottomLeftRadius: '0px',
                                            padding: '2%',
                                            backgroundColor: colors.secondary,
                                            maxWidth: '40%',
                                            overflowWrap: 'break-word',
                                            whiteSpace: 'pre-wrap',
                                            fontFamily: 'noto-sans-georgian-elegant'
                                        }}>
                                            ძალიან ძალიან დიდი უზარმაზარი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯიი {i}
                                        </div>
                                    </div>
                                );

                                divs.push(
                                    <div style={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: "100%",
                                        marginRight: '2vh',
                                        marginBottom: '4vh',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <div style={{
                                            border: colors.primary,
                                            borderStyle: 'solid',
                                            borderRadius: '25px',
                                            borderBottomRightRadius: '0px',
                                            padding: '2%',
                                            backgroundColor: colors.primary,
                                            maxWidth: '40%',
                                            overflowWrap: 'break-word',
                                            whiteSpace: 'pre-wrap',
                                            fontFamily: 'noto-sans-georgian-elegant'
                                        }}>
                                            კიდევ უფრო დიდი, ძალიან ძალიან ძალიან ძალიან დიდი უზარმაზარი პასუხიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიი {i}
                                        </div>
                                    </div>
                                );
                            }

                            // Return the array of JSX elements
                            return divs;
                        })()}

                        <div style={{flex: '1', position: 'relative', width: "100%"}}>
                            <text> ქართული</text>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: '0.3',
                            backgroundColor: colors.pearl,
                            border: colors.tertiary,
                            borderLeftStyle: 'dotted',
                            alignItems: "center",
                            flexDirection: "column",
                            display: "flex",
                            overflowY: 'scroll',
                            maxHeight: '100%'
                        }}>
                        {(() => {
                            // Initialize an empty array to hold JSX strings
                            let divs = [];

                            // Loop to generate 20 div elements
                            for (let i = 0; i < 30; i++) {
                                // Push each div element into the array
                                divs.push(
                                    <div key={i} style={{padding: '5%', height: '70px', border: colors.primary, borderStyle: 'solid', borderRadius: '50px', margin: '2vh', position: 'relative', width: "100%"}}>
                                        <text style={{}}>{i + 1} person</text>
                                    </div>
                                );
                            }

                            // Return the array of JSX elements
                            return divs;
                        })()}

                    </div>
                </div>

            </div>

        </div>
    );
}