# Rudder Webapp

Rudderstack has two components _control plane_ and _data plane_
Control plane manages the configuration of your sources and destinations. Data plane reliably delivers your event data.
Recommended setup is _a managed control plane_ and _a self hosted data plane_.

# Control Plane Features

1. Data plane authentication
2. Webapp to manage users
3. UI to manage the source and destination configurations
4. View Live Events
5. JavaScript Editor to write custom transformation to enrich event data, test your custom transformations
6. UI for Event Replay
7. APIs to manage the configurations
8. AWS Cognito support for authentication

Control plane has two components

1. _rudder-config-backend_ Backend for the control plane
2. _rudder-webapp_ React UI to interact with the rudder-config-backend

# Setup

1. `npm install`
2. `REACT_APP_BACKEND_URL=http://localhost:5000 npm start`

# Authentication

Rudder config-backend uses local authentication by default which does not support verification: http://localhost:3000/signup. Any random OTP works to signup.

Use the same credentials for login.

# Sending Events

Once you setup an account, Control plane creates a new workspace for you. Use the Token in the home page to run the [data plane](https://github.com/rudderlabs/rudder-server)
