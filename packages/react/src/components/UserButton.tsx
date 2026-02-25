import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks';

export const UserButton = () => {
    const { user, signOut, isSignedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isSignedIn || !user) return null;

    return (
        <div className="authify-user-button-container" style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="authify-user-button-trigger"
            >
                <img
                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name || 'User'}`}
                    alt="Profile"
                    className="authify-avatar"
                />
            </button>

            {isOpen && (
                <div className="authify-dropdown">
                    <div className="authify-dropdown-header">
                        <div className="authify-dropdown-name">{user.name || 'User'}</div>
                        <div className="authify-dropdown-email">{user.email}</div>
                    </div>

                    <button className="authify-dropdown-item">Manage Account</button>

                    <button
                        onClick={() => signOut()}
                        className="authify-dropdown-item authify-dropdown-item-danger"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};
