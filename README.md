# Revelo: Event Manager

[Revelo](https://scaling-octo-enigma.onrender.com/) is an event management platform that revolutionizes the way you plan and
execute unforgettable events. Whether it's an intimate gathering or a large-scale
celebration, Revelo empowers you with a comprehensive suite of tools to streamline
every aspect of the process. Revelo is built with Node.js, Express, ReactJs and MongoDB.

## Features

- Event Creation and Management
- Invite Users to Event
- RSVP Functionality
- Manage Attendees
- Event Calendar

## Setup

Install node.js and pnpm if you haven't already. Then follow the steps below to install and run Lynk on your local machine.

1. Clone the repository: `git clone https://github.com/araj2003/Revelo-Event_Management_application.git`
2. Install dependencies: `pnpm install`
3. Add environment variable to .env in server and client folders:

```
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Start the server: `cd server && pnpm run dev`

### Alternative Setup with Docker

Alternatively, you can run Lynk using Docker. Follow the steps below to build and run the Docker image.

1. Clone the repository: `git clone https://github.com/araj2003/Revelo-Event_Management_application.git`
2. Add environment variable to .env in server and client folders:

```
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Build the Docker image: `docker build -t revelo .`
4. Run the Docker container: `docker run -d -p 3000:3000 revelo`

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you would like to contribute code, please fork the repository and submit a pull request.
