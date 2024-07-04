# backend 

> The backend programs split into a microservices architecture

## Services

> [!WARNING]
> **Hi**, just saying, nothing is permanant here, this is random stuff that came by my head and I thought made sense, but it can definitely be changed, so don't hesitate :+1:

- `api/`
  - A REST API designed to be a bridge with other micro-services

- `auth-service/`
  - Handles authentication matters, like direct login, registration, or 2FA

- `chat-service/`
  - Chat (global, private) and group management
- `chat-websocket/`
  - The websocket the chat uses

- `game-service/`
  - Game manager, handles game state management, match finding, and tournaments.

- `user-service/`
  - Manages users, no clue what to say about it lol

- `website/`
  - Provides the website's rendered pages directly over nginx
