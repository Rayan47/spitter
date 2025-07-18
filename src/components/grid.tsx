"use client";
import React, {useEffect, useState} from 'react';

// Define the type for a single card's data for type safety
interface CardData {
    _id: string;
    username: string;
    email: string;
    text: string;
    __v: number;
}



// Reusable Card Component
const SpitCard: React.FC<{ data: CardData }> = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="bg-indigo-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                        {data.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                        <h3 className="font-bold text-gray-900 text-lg">{data.username}</h3>
                        <p className="text-gray-500 text-sm">{data.email}</p>
                    </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{data.text}</p>
            </div>
        </div>
    );
};


// Grid Component to display the cards
const SpitGrid: React.FC<{ spits: CardData[] }> = ({ spits }) => {
    if (!spits || spits.length === 0) {
        return <p className="text-center text-gray-500">No spits to display.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {spits.map((spit) => (
                <SpitCard key={spit._id} data={spit} />
            ))}
        </div>
    );
};
const App: React.FC = () => {
    // 1. Set up state to hold the fetched data, loading status, and errors
    const [spits, setSpits] = useState<CardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch('/api/tweet', {
                method: 'GET'
            });
                const data: CardData[] = await response.json();
                setSpits(data); // Store the fetched data in state
                setIsLoading(false);
        };

        fetchData();
    }, []); // The empty array [] means this effect runs only once

    // --- Render based on the state ---
    const renderContent = () => {
        if (isLoading) {
            return <p className="text-center text-gray-500">Loading spits...</p>;
        }

        // 3. Pass the fetched data (now in the 'spits' state) as a prop
        return <SpitGrid spits={spits} />;
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">The Spit Wall</h1>
                <p className="text-center text-gray-600 mb-10">The latest facts from around the world.</p>
                {renderContent()}
            </div>
        </div>
    );
};


export default App;
