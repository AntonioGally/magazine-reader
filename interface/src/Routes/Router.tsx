import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
//Pages
import Landing from "../Pages/Landing/Landing";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;