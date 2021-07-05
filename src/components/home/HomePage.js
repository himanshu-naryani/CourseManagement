import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className='jumbotron'>
        <h1>Hi, Himanshu Naryani</h1>
        <p>Builing React applications using React, Redux and React Router for responsive web-apps.</p>
        <Link to="about" className='btn btn-primary btn-lg'>
            Learn more
        </Link>
    </div>
)
export default HomePage;