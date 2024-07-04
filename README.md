# ft_trans

> Ping? Pong! Now with a side of `Uncaught TypeError: this.document is undefined`

## Project structure

- `api/` *the Django backend*
  - The django backend, organized in a micro-services fashion
- `frontend/` *the HTML front-end*
- `nginx/`
- `docker-compose.yml` *a compose config file*

## Chosen modules

The transcendance project is split into multiple Minor and Major modules. Here are the one we're doing:

- **Web**
  - [x] (Major) Use a Framework as backend
  - [x] (Minor) Use a front-end framework or toolkit
  - [x] (Minor) Use a database for the backend
  - [ ] (Major) Store the score of a tournament in a Blockchain

- **User Management**
  - [x] (Major) Standard user management, authentication, users across tournaments
  - [x] (Major) Implementing remote authentication (OAuth2)

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
  - [x] (Major) Implement WAF/ModSecurity w/ Hardened Configuration and HashiCorp Vault for Secrets Management (@xtrm-en)
  - [ ] (Minor) GDPR Compliance options with User Anonymization, local data management, and account deletion
  - [x] (Major) Implement Two-Factor Authentication (2FA) and JWT

- **Devops**
  - [ ] (Major) Infrastructure setup for log management
  - [ ] (Minor) Monitoring system
  - [x] (Major) Designing the Backend as Microservices (@xtrm-en)

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
