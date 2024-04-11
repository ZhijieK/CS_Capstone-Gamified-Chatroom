import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FriendsList from '../profileComponents/FriendsList.jsx';

const Options = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
        setPopup(!popup)
    }

    return (
        <div className="options">
            <li onClick={() => navigate('profile')}>Profile</li>
            <li onClick={() => navigate('shop_page')}>Shop</li>
            <li onClick={togglePopup}>Friends</li>
            <div className="friends">
                {popup && <FriendsList />}
            </div>
        </div>
    )
}

export default Options;