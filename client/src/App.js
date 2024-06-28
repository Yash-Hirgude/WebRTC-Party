import React from 'react';

import HomePage from './homePage';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Party from './Party';
import VideoStream from './VideoStream';

const App = ()=>{
    return (
    <Router>
            <Routes>
                <Route path="/party" element = {<Party/>} />
                <Route path="/" element = {<HomePage/>} />
                <Route path="/video" element = {<VideoStream/>} />
            </Routes>
    </Router>
    )
}

export default App