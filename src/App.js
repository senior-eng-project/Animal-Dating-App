import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.In";
import Footer from "./components/Footers/Footer.js";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Pets from "./pages/pets.js";
import Events from "./pages/events";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin.js";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container-fluid text-center mt-5">
                    <h1>Dating App for Animal Adoption</h1>
                    <p>Coming Soon!</p>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;