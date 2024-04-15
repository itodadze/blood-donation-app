import colors from "../values/colors";
import React from "react";
import {ChatMessage} from "./ChatMessage";

export const ChosenChat = ({chosenRecipient}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: '1', position: 'relative'}}>
            <div style={{
                padding: '2%',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                width: "100%",
                overflowY: 'scroll',
                overflowX: 'clip',
                maxHeight: '100%',
                position: 'relative',
            }}>
                {(() => {
                    let divs = [];

                    for (let i = 0; i < 50; i++) {
                        divs.push(<ChatMessage key={i+'received'}
                            messageContent={'ძალიან ძალიან დიდი უზარმაზარი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯი მესიჯიი ' + i}
                            isSent={false}/>);

                        divs.push(<ChatMessage key={i+'sent'}
                            messageContent={'კიდევ უფრო დიდი, ძალიან ძალიან ძალიან ძალიან დიდი უზარმაზარი ' + 'პასუხიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიიი ' + i}
                            isSent={true}/>);
                    }
                    return divs;
                })()}
            </div>
            {/*<div style={{flex: '1',*/}
            {/*    maxWidth: '80%',*/}
            {/*    width: "100%",*/}
            {/*    alignSelf: 'center',*/}
            {/*    backgroundColor: colors.tertiary,*/}
            {/*    overflowY: 'revert-layer',*/}
            {/*    border: 'solid',*/}
            {/*    borderRadius: '20px',*/}
            {/*    overflowX: 'clip',*/}
            {/*    maxHeight: '15%'}}>*/}

            {/*</div>*/}
            {/*<div style={{*/}
            {/*    position: 'absolute',*/}
            {/*    bottom: '5vh',*/}
            {/*    left: '0',*/}
            {/*    right: '0',*/}
            {/*    backgroundColor: colors.tertiary,*/}
            {/*    border: 'solid',*/}
            {/*    borderRadius: '20px',*/}
            {/*    overflowX: 'clip',*/}
            {/*    maxHeight: '5vh',*/}
            {/*    Height: '5vh',*/}
            {/*    maxWidth: '50vw',*/}
            {/*    alignSelf: 'center'*/}
            {/*}}>*/}
            {/*    this is a text*/}
            {/*</div>*/}

            <div style={{
                position: 'absolute',
                bottom: '2vh',
                width: '80%',
                height: '15%',
                backgroundColor: colors.tertiary,
                border: 'solid',
                borderColor: colors.primary_dark,
                // borderTopLeftRadius: '20px',
                // borderTopRightRadius: '20px',
                borderRadius: '20px',
                overflowX: 'clip',
                alignSelf: 'center',
                display: 'flex', // Enable flexbox layout for children
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <div style={{alignSelf: 'center', marginRight: '2vw'}}>
                    send
                </div>
            </div>
        </div>
    )
}