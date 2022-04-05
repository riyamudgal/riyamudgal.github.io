import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';
import LoginForm from './components/LoginForm';

const App= () => {
    //we always don't want to logged in, if user in not logged in then we want login form first
    if(!localStorage.getItem('username')) return <LoginForm/> 
    return (
        <ChatEngine 
            /*different props we are going to pass here */
            /*basically this is admin info, with the help of which anyone can login */
            //using local storage, we are passing only fields name and admin will be cdecided from chatengine.io for particular char group
            

            height="100vh"
            projectID="4cd9646e-f6d5-477e-842a-83d4ada88ddd"     /*copied from Chat Engine, after creating a project*/
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}    /*userpassword*/
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            /*ChatFeed is the most important part of any application
            by going through chatengine(chatengine.io) docs, we can manage various chat function*/
            /*event hooks are used perfect some actions when something happens */
            /*server rest api allows us to get specific data from chat application*/
        />
        /*ChatEngine is a component, as it begins from cpaital letter*/
    );
}


export default App;





//dependencies to be installed for this project
// npm install @ant-design/icons axios react-chat-engine
//axios to make request
//react-chat-engine seems to be main star of the show
