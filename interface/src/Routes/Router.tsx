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
import NewEditions from "../Pages/NewEditions/NewEditions";
import Profile from "../Pages/Profile/Profile";
import Documentation from "../Pages/Documentation/Documentation";

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/magazines" element={<WithTemplate><Magazines /></WithTemplate>} />
                <Route path="/editions" element={<WithTemplate><Editions /></WithTemplate>} />
                <Route path="/new-editions" element={<WithTemplate><NewEditions /></WithTemplate>} />
                <Route path="/profile" element={<WithTemplate><Profile /></WithTemplate>} />
                <Route path="/documentation" element={<WithTemplate><Documentation /></WithTemplate>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;