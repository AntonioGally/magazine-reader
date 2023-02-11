import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import WithTemplate from "../Hoc/WithTemplate/WithTemplate";
//Pages
import Landing from "../Pages/Landing/Landing";
import Magazines from "../Pages/Magazines/Magazines";
import Editions from "../Pages/Editions/Editions";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/magazines" element={<WithTemplate><Magazines /></WithTemplate>} />
                <Route path="/editions" element={<WithTemplate><Editions /></WithTemplate>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;