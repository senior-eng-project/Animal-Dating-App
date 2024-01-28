import React, { useState, useRef, useEffect } from 'react';
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { AnimalForm } from ".";

const AddAnimalModal = ({ showModal, setShowModal, loadAnimals }) => {
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [newAnimal, setNewAnimal] = useState({
        name: "",
        age: "",
        breed: "",
        description: "",
        type: "",
        gender: "",
        pictureUri: "",
        available: true,
        pendingAdoption: false
    });

    const formRef = useRef(null);

    useEffect(() => {
        if (!showModal) {
            setUnsavedChanges(false);
        }
    }, [showModal]);

    const handleModalClose = () => {
        if (unsavedChanges) {
            const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (confirmLeave) {
                setShowModal(false);
            }
        } else {
            setShowModal(false);
        }
    };

    const handleNewAnimalChange = (e) => {
        setUnsavedChanges(true);
        if (e.target.name === 'availability') {
            const isAvailable = e.target.value === 'true';
            const isPending = e.target.value === 'pending';
            setNewAnimal({ 
                ...newAnimal, 
                available: isAvailable, 
                pendingAdoption: isPending 
            });
        } else {
            setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
        }
    };

    const handleAddNewAnimal = async () => {
        if (formRef.current && formRef.current.checkValidity()) {
            await addDoc(collection(db, "animals"), {
                ...newAnimal,
                shelterId: auth.currentUser.uid
            });
        setShowModal(false);
        setNewAnimal({
            name: "",
            age: "",
            breed: "",
            description: "",
            type: "",
            gender: "",
            pictureUri: "",
            available: true
        });
        setUnsavedChanges(false);
        loadAnimals(); // Refresh the list of animals
        } else {
            formRef.current && formRef.current.reportValidity();
        }
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
        backdropFilter: 'blur(5px)', // Apply blur effect (not supported in all browsers)
        zIndex: 10 // Ensure it's above other content but below the modal
    };

    return (
        <>
            { showModal && <div style={overlayStyle}></div> }
            <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Animal</h5>
                            <button type="button" className="btn-close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <AnimalForm formRef={formRef} handleAnimalChange={handleNewAnimalChange} animal={newAnimal} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddNewAnimal}>Add Animal</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAnimalModal;