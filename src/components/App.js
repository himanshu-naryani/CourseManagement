import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './courses/CoursesPage';
import Header from './common/Header'
import PageNotFound from './PageNotFound'
import ManageCoursePage from './courses/ManageCoursePage';
import AuthorsPage from './authors/AuthorsPage';
import ManageAuthorPage from './authors/ManageAuthorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className='fluid' id='#'>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <Route path='/about' component={AboutPage}></Route>
                <Route path='/courses' component={CoursesPage}></Route>
                <Route path='/course/:slug' component={ManageCoursePage}></Route>
                <Route path='/course' component={ManageCoursePage}></Route>
                <Route path='/author/:id' component={ManageAuthorPage}></Route>
                <Route path='/author' component={ManageAuthorPage}></Route>
                <Route path='/authors' component={AuthorsPage}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    )
}
export default App;