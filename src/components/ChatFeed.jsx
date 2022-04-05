import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage"; 
import TheirMessage from "./TheirMessage";


/*import React from "react";
need not to install if user 17+version*/


const ChatFeed = (props) => {
    /*console.log(props);      to check what props we are getting from form field*/
    const { chats, activeChat, userName, messages }= props; //here we are structuring chat feeds from props       /*things(chats etc) that we are going to structure from props

    /*finding current chat, if chats exists then find chats and then the active chats*/
    const chat=chats &&  chats[activeChat];
    /*console.log(chat, userName,messages);*/


    //taking 2 paramenters
    const renderReadReceipts =(message, isMyMessage) => {
          //maping over the people who read that message and rendering the person who last read it that tripple equal to means that particular id person has read that message
          //after message.id we use () and write code if that person has read that message
           return chat.people.map((person, index) => person.last_read === message.id && (        //this code means that person has read this message 
              <div
                    key={ `read_${index}`}
                    className="read-receipts"
                    //inline styling
                    style= {{
                        float: isMyMessage ? 'right' : 'left' ,//if it is my message then it will be right side otherwise left side
                        backgroundImage: `url(${person?.person?.avatar})`// background image will be the url of the sender, copied from theimessage file
                    }}
              
              />
          ))
    }
    /*creating new functional component for generating messages, inside which we have to fetch all our messages */
    const renderMessages = () =>{
        const keys=Object.keys(messages);   //fetching all our messages

        /*checking keys values
        console.log(keys); keys are the just IDs of specific messages */

        /*let's render our messages*/ 
        return keys.map(( key, index) => {
            const message = messages[key];   /*dynamically taking that message with this key */
            const lastMessageKey = index === 0? null : keys[index-1];          /*checking whether particular message is last message or not */
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={  { width: '100% '}}> {/*msg_${index} is used for particular index*/}
                    <div className="message-block">
                        {
                            isMyMessage 
                            ? <MyMessage message={message} />         /*we have passed one prop*/
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/> /* here lastMessageKey is passed dynamically in [], this is a prop, in theirMessage we have passed two props*/ 
                        }
                        {/* here in second line of this block, message is passed as a prop */}
                    </div>
                    <div className="read-receipts" style={ { marginRight: isMyMessage ? '18px' : '0px' , marginLeft: isMyMessage ? '0px' : '68px'}}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>

                </div>
            );
        })
    }

    if(!chat)  return 'Loading... ';    {/*if no chat is there, returna string of loading */}
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>   {/*this is the div where we will going to render out title*/}
                {/*question mark means that we must have a chat before accessing the title of chat */}
                <div className="chat-subtitle"> 
                {
                    chat.people.map((person ) => ` ${person.person.username}`)     
                }
                {/*this will gonna be our chat subtitle*/}
                </div>
                
            </div>
            { renderMessages()}            {/*here we are calling our render messages, using dynamic logic*/}
                <div style={{ height: '100px'}} />          {/* because we want some space after rendering messages*/}
                <div className="message-form-container">
                    <MessageForm {...props} chatId={activeChat}/>
                    </div>       {/* this form container is made so that users can send the messages*/}
        </div>
    );


}


export default ChatFeed;
