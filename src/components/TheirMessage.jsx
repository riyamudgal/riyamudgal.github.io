// here two props are passed
const TheirMessage = ( {  lastMessage, message }) =>{
    //following will gonna give us a boolean value which will tell us if this is the first message by the user
    const isFirstMessageByUser= !lastMessage  || lastMessage.sender.username!==  message.sender.username;  //isFirstMessageByUser is used to check whether the message is first message or not, for this we are checking whether it is equal to last mesage or not
    return(
        <div className="message-row">
            {/*above four lines of code is used to check whether the first message is by the user and to set avatar of thta image */ }
            {isFirstMessageByUser && (
                <div 
                    className="message-avatar"
                    style={{ backgroundImage: `url(${message?.sender?.avatar})`}}  //if sender of message is having avatar, then it is set otherwise not
                    />
            )}
            {/* above code is for image only if the first message is by the user*/}
            { message?.attachments?.length>0
                    ? (   
                        <img 
                            src={message.attachments[0].file}                      //following are some props of image tag, first attachment is being used here in src this is the src of file 
                            alt="message-attachment"
                            className="message-image"
                            style={ { marginLeft: isFirstMessageByUser ? '4px' : '48px'}}         //checking if it is the first message by the user or not, if yes then the marginleft will be 4px else 48px
                        />  // if it is an attachment then we are going to return an image
                    )  
                    :  (
                        <div className="message" style={{ float: 'left', backgroundColor: '#7132a8', marginLeft: isFirstMessageByUser ? '4px' : '48px'}}>    {/*here we are doing some inline styles, because it is other person's message that's why it is aligned left */}
                            {message.text}
                        </div>

                    )
                }  
                    {/*if not an image then we are going to render a message   */}
        </div>
    );

};



export default TheirMessage;