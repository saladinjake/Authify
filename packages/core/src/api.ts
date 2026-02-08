import { User, AuthSession } from './types';

const BACKEND_URL = 'http://localhost:5000';

export class AuthApi {


    static async login(email: string, password: string, apiKey: string): Promise<any> {
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data;
    }


}
