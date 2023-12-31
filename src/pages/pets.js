import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { AnimalGalleryCard } from "../components/Cards";

const Pets = () => {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAnimals = async () => {
            const animalRef = collection(db, "animals");
            const animalSnapshot = await getDocs(animalRef);
            const animalList = animalSnapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            setAnimals(animalList);
        };

        getAnimals();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const animalRef = collection(db, 'animals');
        const querySnapshot = await getDocs(animalRef);
    
        const searchResults = querySnapshot.docs
        .map(doc => ({
            searchTerm: doc.searchTerm,
            ...doc.data() 
        }))
        .filter(animal => animal.type.toLowerCase() === searchTerm.toLowerCase());

        if (searchResults.length === 0) {
           alert("Sorry we do not have " + searchTerm + " in our database just yet. Please stay tuned!");
        }
    
        setResults(searchResults);
        setLoading(false);
        
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for an animal type"
                    />
                    <button type="submit">Search</button>
            </form>
        
                {loading && <p>Loading...</p>}
            <div className="container">
                <div className="row pb-4">
                    {searchTerm === '' ? (
                        // If the search bar is empty, display the entire animal database
                        animals.map(animal => (
                            <div className="col-lg-4 d-flex align-items-stretch my-2" key={animal.id}>
                                <AnimalGalleryCard animal={animal} />
                            </div>
                        ))
                    ) : (
                        // If search bar is not empty, display only the searched animal type
                        results.map(animal => (
                            <div className="col-lg-4 d-flex align-items-stretch my-2" key={animal.id}>
                                <AnimalGalleryCard animal={animal} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Pets;
