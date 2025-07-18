'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginStatus() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {session.user?.image && (
                    <Image
                        src={session.user.image}
                        alt={session.user.name ?? 'User avatar'}
                        width={40}
                        height={40}
                        style={{ borderRadius: '50%' }}
                    />
                )}
                <div>
                    <p>Signed in as {session.user?.email}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <p>Not signed in</p>
            <br/>
            <div className="flex items-center justify-center w-full bg-indigo-900 rounded-2xl">
            <button onClick={() => signIn("google")}>Sign in with Google</button>
            </div>
            </div>
    );
}