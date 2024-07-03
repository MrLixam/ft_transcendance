# ft_trans

> Ping? Pong! Now with a side of `Uncaught TypeError: this.document is undefined`

## Project structure

- `/` *project root*
  - `api/` *the Django backend*
  - `frontend/` *the HTML front-end*
  - `docker-compose.yml` *a compose config file*

## Chosen modules

The transcendance project is split into multiple Minor and Major modules. Here are the one we're doing:

- **Web**
  - [ ] (Major) Use a Framework as backend
  - [ ] (Minor) Use a front-end framework or toolkit
  - [ ] (Minor) Use a database for the backend
  - [ ] (Major) Store the score of a tournament in a Blockchain

- **User Management**
  - [ ] (Major) Standard user management, authentication, users across tournaments
  - [ ] (Major) Implementing remote authentication (OAuth2)

- **Gameplay and User Experience**
  - [ ] (Major) Remote players
  - [ ] (Major) Multiplayer (> 2 players)
  - [ ] (Major) Add another Game (w/ User History & Matchmaking)
  - [ ] (Minor) Game customization options
  - [ ] (Major) Live chat

- **AI / Algorithm**
  - [ ] (Major) Introduce an AI opponent
  - [ ] (Minor) User and Game stats dashboard

- **Cybersecurity**
  - [ ] (Major) Implement WAF/ModSecurity w/ Hardened Configuration and HashiCorp Vault for Secrets Management
  - [ ] (Minor) GDPR Compliance options with User Anonymization, local data management, and account deletion
  - [ ] (Major) Implement Two-Factor Authentication (2FA) and JWT

- **Devops**
  - [ ] (Major) Infrastructure Setup for Log Management
  - [ ] (Minor) Monitoring system
  - [ ] (Major) Designing the Backend as Microservices

- **Graphics**
  - [ ] (Major) Use of advanced 3D techniques.

- **Accessibility**
  - [ ] (Minor) Support on all devices
  - [ ] (Minor) Expanding Browser compatibility
  - [ ] (Minor) Multiple language support
  - [ ] (Minor) Add accessibility for visually impaired users
  - [ ] (Minor) Server-Side Rendering (SSR) integration

- **Server-Side Pong**
  - [ ] (Major) Replace basic pong with server-side pong and implementing an API
  - [ ] (Major) Enabling pong gameplay via CLI against web users with API integration

## License

This project is released under the [ISC License](./LICENSE).
