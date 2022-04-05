import { useState } from 'react';
import axios from 'axios';               /*for api calls*/

//const projectID = '4cd9646e-f6d5-477e-842a-83d4ada88ddd';

const LoginForm = () => {
  //below 3 are 3 useState fields and setting their initial values as empty
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');         //is for error handling if user is not logged in


  //this is basic error function that accepts event, the first thing that we do on every event submit is to prevent page refreshing
  const handleSubmit = async (e) => {
    e.preventDefault();
//username | password => chatengine -> give messages (used for checking if user exists)
//works out -> logged in    (if yes)
//error -> try with new username...       (if no)


//creating object for new user
    const authObject = { 'Project-ID': "4cd9646e-f6d5-477e-842a-83d4ada88ddd", 'User-Name': username, 'User-Secret': password };
//in try and catch we are using asynchronous code, that why that event above must be asynchronous 
    try {
      //username | password => chatengine -> give messages (used for checking if user exists)
        //headers are sending objects, since it is astnchronous we have to add await before the code
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      //works out -> logged in    (if yes)
      //for this we storing username and password to a local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      //for reloading page, 
      window.location.reload();
      setError('');

    } catch (error) {
      //error -> try with new username...       (if no)
      setError('Oops, incorrect credentials.');
    }
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />     {/*callback function where e is event and target.value is the value obtained after performing that event */}    
          {/*here we are caling a call back for setting new username and password*/}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
          <h1 className='error'>{error}</h1>
        </form>
      </div>
    </div>

  );
}

export default LoginForm;