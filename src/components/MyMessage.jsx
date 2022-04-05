//layout of MyMessage component

//this function will accept only one prop that is message
const MyMessage = ( {message }) =>{
    //this if block will find out whether that message is actually a message or an image
    if(message?.attachments?.length>0){
        //if it is true then it means that message is an image, that's why we are returning an image here
        return (   
        <img 
            src={message.attachments[0].file}                      //following are some props of image tag, first attachment is being used here in src this is the src of file 
            alt="message-attachment"
            className="message-image"
            style={ { float: 'right'}}
        />
        )
    }
    //if message is not image, then the following code will execute
    return(
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#0b5ebd'}}>    {/*here we are doing some inline styles, because it is our own message that's why it is aligned right */}
            {message.text}
        </div>
    );

}



export default MyMessage;