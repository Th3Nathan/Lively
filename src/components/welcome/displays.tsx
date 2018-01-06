import * as React from 'react';

export const NewUserDisplay = () => (
    <div>
        <h1>Introduce Yourself!</h1>
        <p>
            Please enter your email, a password, and a display name,
             how your teammates on Lively will see and refer to you
        </p>
        <p>Already have an account? <a href="/signin">login to create a workspace</a></p>
    </div>
);

export const ExistingUserDisplay = () => (
    <div>
        <h1>Welcome Back!</h1>
        <p>Please log in with your credentials to create a new workspace.</p>
        <p>Don't have an account? <a href="/signup">signup to create your first workspace</a></p>
    </div>
);