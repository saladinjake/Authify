import { AuthClient } from '@authify/core';
import { AuthSession } from '@authify/core';
import { AuthState } from '@authify/core';
import { AuthStatus } from '@authify/core';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { User } from '@authify/core';

export declare const AuthClientKey: unique symbol;

export declare const AuthifyPlugin: Plugin_2;

export declare const AuthStateKey: unique symbol;

export declare const SignIn: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare function useAuth(): {
    state: AuthState;
    isLoaded: ComputedRef<boolean>;
    isSignedIn: ComputedRef<boolean>;
    user: ComputedRef<User | null>;
    session: ComputedRef<AuthSession | null>;
    error: ComputedRef<string | null>;
    status: ComputedRef<AuthStatus>;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithProvider: (provider: "google" | "github") => Promise<void>;
};

export declare function useAuthClient(): AuthClient;

export declare function useAuthState(): AuthState;

export declare function useGoogleAuth(): {
    login: () => Promise<void>;
    signup: () => Promise<void>;
    token: Ref<string | null, string | null>;
};

export declare const UserButton: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {
menuRef: HTMLDivElement;
}, any>;

export declare const UserProfile: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare function useUser(): {
    user: ComputedRef<User | null>;
    isSignedIn: ComputedRef<boolean>;
    isLoaded: ComputedRef<boolean>;
};

export { }
