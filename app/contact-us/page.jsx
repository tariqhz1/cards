'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
    const [haveCustomDesign, setHaveCustomDesign] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        Email: '',
        phone: '',
        bname: '',
        design: 'No',
        message: ''
    });

    const handleChange = (e) => {
        setHaveCustomDesign(!haveCustomDesign)
        handleInputChange(e);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formSubmissionHandler = async (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.Email ||
            !formData.phone ||
            !formData.bname ||
            !formData.message
        ) {
            toast.error("Please fill out all field before submitting");
            return;
        }

        const response = await fetch("/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.Email,
                phone: formData.phone,
                bname: formData.bname,
                design: formData.design,
                message: formData.message
            }),
        });
        if (!response.ok) {
            toast.error("Error in sending form !!!");
        }
    }

    return (
        <div className="bg-black flex justify-center items-center" style={{ paddingTop: 128, paddingBottom: 64 }}>
            <ToastContainer />
            <div className="w-full max-w-lg p-8 rounded-lg">
                <h1 className="text-6xl font-bold text-white text-center mb-10">
                    Contact Us
                </h1>
                <div className="bg-gray-600 h-px mb-5"></div>
                <form onSubmit={formSubmissionHandler} method="POST" className="form-group" data-gtm-form-interact-id="0">
                    <input type="text" name="name" onChange={handleInputChange} className="form-control p-3 mb-3 text-black rounded-lg w-full" placeholder="Your Name" />
                    <input type="email" name="Email" onChange={handleInputChange} className="form-control p-3 mb-3 text-black rounded-lg w-full" placeholder="Email" />
                    <input type="number" name="phone" onChange={handleInputChange} className="form-control p-3 mb-3 text-black rounded-lg w-full" placeholder="Phone Number" />
                    <input type="text" name="bname" onChange={handleInputChange} className="form-control p-3 mb-3 text-black rounded-lg w-full" placeholder="Your Business Name" />
                    <label className="text-white mb-3 block">If You Have Custom Design</label>
                    <div className="mb-3">
                        <input checked={haveCustomDesign === true} type="radio" name="design" value="Yes" className="text-white mr-2" data-gtm-form-interact-field-id="0" onChange={handleChange} /> <span className="text-white">Yes</span>
                        <input checked={haveCustomDesign === false} type="radio" name="design" value="No" className="text-white ml-4 mr-2" data-gtm-form-interact-field-id="1" onChange={handleChange} /> <span className="text-white">No</span>
                    </div>
                    <textarea placeholder="Type your query here" name="message" onChange={handleInputChange} id="msg" cols="30" rows="10" className="form-control bg-white text-black p-3 mb-3 rounded-lg w-full"></textarea>
                    <button type="submit" className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-4 px-6 rounded-full">
                        Send
                    </button>
                </form>
                <div className="mt-10 text-white text-center">
                    <p>If you need more help or you have any query you can contact our 24/7 customers support</p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
