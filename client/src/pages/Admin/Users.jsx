import React, {useState} from 'react';
import axios from 'axios';


export default function Home(props) {
    const [mail, setMail] = useState('');
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');


    const getUsers = async () => {
        /*let res = await axios.post('http://localhost:3000/users/login', {
            mail: "test@email.com",
            password: "password"
        });
        let config = {
            headers: {
                Authorization: 'Bearer ' + res.data,
            }
        };
        res = await axios.get('http://localhost:3000/users', config);
        setUsers(res.data.data.map((u, id) => {
            return <p key={id}>{u.mail}</p>
        }));*/
    };

    const addUser = async (event) => {
        event.preventDefault();
        console.log(event);
        console.log(mail);
        console.log(password);
        const req = await axios.post('http://localhost:3000/users', {
            mail: mail,
            password: password
        });
        console.log(req)
    };

    const handleMailChange = (event) => {
        setMail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <>

            <form onSubmit={addUser}>
                <label>
                    Mail:
                    <input type="text" name="mail" value={mail} onChange={handleMailChange}/>
                </label>
                <label>
                    Password:
                    <input type="text" name="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <input type="submit" value="Add user"/>
            </form>
            <button onClick={getUsers}>
                Show all users
            </button>
            {users}
        </>
    );
}
