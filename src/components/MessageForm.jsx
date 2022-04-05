//in this we are writing all the code required to write and send messages
import {useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';                   //sendMessage function is the function that we are going to call when we want to send a message
import { SendOutlined, PictureOutlined } from '@ant-design/icons';            //icons are imported using this code of line





    const MessageForm = (props) =>{
        const [value, setValue] = useState('');
        const {chatId, creds} = props;             /*for handling  cchange */

    const handleSubmit =(event) => {
        event.preventDefault();              //this will not going to refresh the browser when the message is send, usually brower behaves like this, to prevent we have use this
        
        //this is used to trim the message send, removing leading and trailing white spaces
        const text=value.trim();


        if(text.length>0)  sendMessage(creds, chatId, { text });                          //sendMessage is the function that is coming from  react-chat-engine, in which we have to pass 3 props- first one is creds, chatId and third is object that includes our message(text of our message)
        setValue('');                       //empty string for resetting the empty value in the input box of chat messsage
    }
    /*for this function we are using some react-chat-engine features and importing them like sendMessage, is typing */
    const handleChange =(event) => {
        setValue(event.target.value);   /*this is where the value of input is stored in */

        isTyping(props, chatId);
    }

/* in this event is going to be  an image and senMessage contains 3 props*/
    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text : '' })      //text is set as empty string as we don't have any text there

    }
    return(
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Send a message..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            {/*adding image field , for this we are creating a label and that label will be having a prop as name 'htmlFor*/}
            <label htmlFor="upload-button">
                <span className="image-button">
                    {/* here we are using some icons to make the thing look pretty, foor this we are importing icons from '@ant-design/icons' */}
                    {/*calling pictureOutlined */}
                        <PictureOutlined  className="picture-icon  "/>
                </span>
            </label>
            <input
                type="file"
                multiple={false}              //passing prop of multiple what is set as false
                id="upload-button"
                style={{ display: 'none'}}
                onChange={handleUpload}
            />

            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
            
        </form>
    );

}



export default MessageForm;