// app/page.tsx (or your Home component file)
// This component remains a Server Component to fetch session data securely.

import LoginStatus from "@/components/LoginStatus";
import UserProfileForm from "@/components/profile";
import SpitGrid from "@/components/grid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// In Next.js App Router, export a metadata object to set the page title.
// The <title> tag does not work inside the component body.
export const metadata = {
    title: 'SPITTER',
};

export default async function Home() {
    // Fetch session data on the server. This is the correct approach.
    const session = await getServerSession(authOptions);
    // This is the shared header content that will be displayed for everyone.
    const headerSection = (
        <>
            <div className="relative bg-amber-950 p-3">
                <header className="font-bold font-serif text-9xl">SPITTER</header>
                <div className="absolute top-0 bottom-0 right-0 bg-indigo-400 p-3 rounded-2xl">
                    <h1>NextAuth.js Session Authentication</h1>
                    {/* LoginStatus is a Client Component, it will handle its own state */}
                    <LoginStatus/>
                </div>
            </div>
            <SpitGrid/>
        </>
    );

    return (
        <main style={{ padding: '20px' }}>
            {headerSection}
            <br/>
            {/* --- Conditional Rendering --- */}
            {/* If the user is logged in (session exists), show the profile form. */}
            {session ? (

                    <UserProfileForm />


            ) : (
                // If the user is not logged in, you can show a message or a login prompt.
                <div className="text-center bg-gray-800 text-white p-10 mt-4 rounded-lg">
                    <h2 className="text-2xl font-bold">Please sign in to continue</h2>
                    <p className="mt-2">Sign in to create your profile and start spitting facts!</p>
                </div>
            )}
        </main>
    );
}
