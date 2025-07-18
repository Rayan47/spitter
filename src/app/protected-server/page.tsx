import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';
import {authOptions} from "../../../lib/configs/auth/authoptions";

export default async function ProtectedServerPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/protected-server');
    }

    return (
        <div>
            <h1>Protected Server Page</h1>
            <p>Welcome, {session.user?.name}!</p>
        </div>
    );
}