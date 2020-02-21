# Rudder Config Generator

Rudderstack has two components _control plane_ and _data plane_
Data plane reliably delivers your event data. Control plane manages the configuration of your sources and destinations.
This configuration can also be read from a file instead of from Control plane, if we want remove an extra dependency.
Config-generator provides the UI to manage the source and destination configurations without needing to signup, etc.

All the source and destination configuration stays on your local storage. You can export/import config to a JSON file.

# Setup

1. `npm install`
2. `npm start`

