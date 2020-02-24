import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Profile(props) {

    const [i, setI] = useState(0);

    const loginReducer = useSelector(state => state.tokenReducer);

    const history = useHistory();


    useEffect(() => {
        if (i > 0) {
            if (loginReducer.user === undefined)
                history.push("/")
        } else {

            setTimeout(() => setI(1), 100)
        }
    }, [i, loginReducer])

    return (
        <>
            <div>
                Profile page
            </div>
        </>
    );
}
