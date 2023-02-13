# js-8384-repro

This is a minimal app created to reproduce the bug described in [Issue #8384](https://github.com/aws-amplify/amplify-js/issues/8384).

### Steps to reproduce:

1. Sign In
2. Restart App
3. Hit the "Sign Out" button (calls Auth.signOut())
4. Hit the "Current User" button (calls Auth.currentAuthenticatedUser())
