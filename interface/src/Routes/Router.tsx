import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
//Pages
import Landing from "../Pages/Landing/Landing";
import Main from "../Pages/Main/Main";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;