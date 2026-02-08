import { AuthSession } from './types';
export declare class AuthApi {
    static sendMagicLink(email: string, apiKey: string): Promise<void>;
    static verifyMagicLink(token: string): Promise<AuthSession>;
    static login(email: string, password: string, apiKey: string): Promise<any>;
    static loginWithEmail(email: string, apiKey: string): Promise<void>;
    static signup(email: string, password: string, name: string, apiKey: string): Promise<any>;
    static socialLogin(provider: string, clientId: string): Promise<void>;
    static verifyMFA(mfaToken: string, code: string, apiKey: string): Promise<AuthSession>;
    static validateSession(token: string, apiKey: string): Promise<AuthSession>;
    static getTenant(apiKey: string): Promise<any>;
    static upgradePlan(reference: string, apiKey: string): Promise<any>;
}
