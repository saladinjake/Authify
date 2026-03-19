import { computed, toRefs, ref, onMounted } from 'vue';
import { useAuthClient, useAuthState } from './plugin';

export function useAuth() {
    const client = useAuthClient();
    const state = useAuthState();

    const isLoaded = computed(() => state.status !== 'loading');
    const isSignedIn = computed(() => state.status === 'authenticated');

    return {
        // State (Using computed to unwrap for easy usage, or just return state directly)
        state,
        isLoaded,
        isSignedIn,
        user: computed(() => state.user),
        session: computed(() => state.session),
        error: computed(() => state.error),
        status: computed(() => state.status),

        // Actions
        signIn: client.signIn.bind(client),
        signOut: client.signOut.bind(client),
        signInWithProvider: client.signInWithProvider.bind(client),
        forgotPassword: client.forgotPassword.bind(client),
        verifyResetCode: client.verifyResetCode.bind(client),
        resetPassword: client.resetPassword.bind(client),
    };
}

export function useUser() {
    const { user, isSignedIn, isLoaded } = useAuth();
    return { user, isSignedIn, isLoaded };
}

export function useGoogleAuth() {
    const client = useAuthClient();
    const token = ref<string | null>(null);

    const login = () => client.signInWithProvider('google');
    const signup = () => client.signInWithProvider('google');

    onMounted(() => {
        if (typeof window === 'undefined') return;
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        
        if (urlToken) {
            token.value = urlToken;
            client.verifyMagicLink(urlToken).catch(console.error);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });

    return { login, signup, token };
}
