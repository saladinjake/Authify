import { AuthApi } from './api';
export class AuthStore {
    constructor(apiKey) {
        this.state = {
            status: 'loading',
            user: null,
            session: null,
            error: null,
            mfaChallenge: null,
        };
        this.apiKey = null;
        this.listeners = new Set();
        if (apiKey)
            this.apiKey = apiKey;
        this.hydrate();
    }
    setMFAChallenge(challenge) {
        this.setState({
            status: 'mfa_challenge',
            mfaChallenge: challenge,
            error: null
        });
    }
    getState() {
        return this.state;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.state);
        return () => this.listeners.delete(listener);
    }
    setState(partialState) {
        this.state = Object.assign(Object.assign({}, this.state), partialState);
        this.notify();
    }
    notify() {
        this.listeners.forEach((listener) => listener(this.state));
    }
    hydrate() {
        setTimeout(() => {
            if (typeof window === 'undefined') {
                this.setState({ status: 'unauthenticated' });
                return;
            }
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get('token');
            if (urlToken && this.apiKey) {
                window.history.replaceState({}, document.title, window.location.pathname);
                AuthApi.validateSession(urlToken, this.apiKey).then(session => {
                    this.setSession(session);
                }).catch(() => {
                    this.setState({ status: 'unauthenticated' });
                });
                return;
            }
            const stored = localStorage.getItem('authify_session');
            if (stored) {
                try {
                    const session = JSON.parse(stored);
                    if (this.apiKey) {
                        AuthApi.validateSession(session.token, this.apiKey).then(validSession => {
                            this.setState({
                                status: 'authenticated',
                                session: validSession,
                                user: validSession.user
                            });
                        }).catch(() => {
                            this.clearSession();
                        });
                    }
                    else {
                        this.setState({
                            status: 'authenticated',
                            session,
                            user: session.user
                        });
                    }
                    return;
                }
                catch (e) {
                    console.error('Failed to parse session', e);
                }
            }
            this.setState({ status: 'unauthenticated' });
        }, 100);
    }
    setSession(session) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authify_session', JSON.stringify(session));
        }
        this.setState({
            status: 'authenticated',
            user: session.user,
            session: session,
            error: null,
            mfaChallenge: null,
        });
    }
    clearSession() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authify_session');
        }
        this.setState({
            status: 'unauthenticated',
            user: null,
            session: null,
            error: null,
            mfaChallenge: null,
        });
    }
    setAwaitingVerification() {
        this.setState({
            status: 'awaiting_verification',
            error: null
        });
    }
    setError(error) {
        this.setState({ error });
    }
}
export const createStore = (apiKey) => new AuthStore(apiKey);
