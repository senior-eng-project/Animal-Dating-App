import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.In";
import Footer from "./components/Footers/Footer.js";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { UserProvider, useUser } from './UserContext';
import Home from "./pages/home.js";
import Cats from "./pages/cats.js";
import Dogs from "./pages/dogs.js";
import Others from "./pages/others.js";
import Pets from "./pages/pets.js";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin.js";
import Dashboard from "./pages/shelterDashboard.js";
import Settings from "./pages/accountSettings.js";
import Pet from "./pages/pet.js";
import Shelter from "./pages/shelter.js";
import FullScreenLoader from './components/FullScreenLoader';
import Header from './components/Header/Header.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./components/404Page/404Page.js";
import PetMatcher from "./pages/petMatcher.js";
import Messages from "./pages/messages.js";
import Admin from "./pages/admin.js";
import { AdminContext } from "./adminContext.js";

function App() {
    const [adminPreviewID, setAdminPreviewID ] = useState(null);
    return (
        <UserProvider>
            <AdminContext.Provider value={{adminPreviewID, setAdminPreviewID}}>
                <Router>
                    <div className="App">
                        <AuthenticatedApp />
                    </div>
                </Router>
            </AdminContext.Provider>
        </UserProvider>
    );
}

function AuthenticatedApp() {
    const { user, userLoaded, showUserLoader, startFading } = useUser();

    if (!userLoaded) { return <FullScreenLoader />}

    return (
        <>
            { showUserLoader && <FullScreenLoader fadingOut={startFading} /> }
            <Header />
            <Navbar user={user} />
            <ToastContainer />
            <div className="pageWrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cats" element={<Cats />} />
                    <Route path="/dogs" element={<Dogs />} />
                    <Route path="/others" element={<Others />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/match" element={<PetMatcher />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/sign-up" element={<SignUp user={user} />} />
                    <Route path="/sign-in" element={<SignIn user={user} />} />
                    <Route path="/pet" element={<Pet />} />
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/shelter">
                        <Route
                            path=":id"
                            element={<Shelter />}
                        />
                    </Route>
                    <Route path="/messages" element={<Messages />} />
                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;