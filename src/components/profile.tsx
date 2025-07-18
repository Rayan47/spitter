"use client";

import React, { useState } from 'react';



interface FormState {
    username: string;
    text : string;
}

export default function UserProfileForm() {
    const [formData, setFormData] = useState<FormState>({
        username: '',
        text : '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitted:", formData);
        const response = await fetch('/api/tweet', {
            method: 'POST', // 1. Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // 2. Tell the server we're sending JSON data
            },
            body: JSON.stringify(formData), // 3. Convert the form data object to a JSON string
        });
        console.log(response.body);
        alert(`Profile submitted with username: ${formData.username}`);

        setFormData({ username: '' , text : ''});
        location.reload();
        // Reset form after submission
    };

    // ... The rest of your form JSX
    return (
        <form onSubmit={handleSubmit} className="p-4 bg-yellow-100 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Create Your Profile</h3>
            <div className="space-y-4">
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full p-2 border rounded text-gray-800"
                />
                <input
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Time to spit some facts"
                    required
                    className="w-full p-2 border rounded text-gray-800"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </div>
        </form>
    );
}