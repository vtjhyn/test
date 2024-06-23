## Prerequisites

Make sure you have installed:

- Docker
- Docker Compose

## Installation and Usage

### Clone Repository

```bash
git clone https://github.com/vtjhyn/test.git
cd test
```

### Configuration

1. Create a `.env` file in the project root and set the required environment variables, for example:

   ```plaintext
   DATABASE_URL=postgresql://postgres:postgres@mekar-db:5432/mekar?schema=public
   ```

2. Customize other configurations as per your project requirements.

### Build and Run with Docker Compose

1. Build and run all services:

   ```bash
   docker-compose up --build
   ```

   Optional: Add `-d` to run in detached mode.

2. Access the applications:

   - **Server**: Open `http://localhost:3000` in your browser.
   - **Client**: Open `http://localhost:8080` in your browser.

### Stopping Services

To stop the services:

```bash
docker-compose down
```

### Important Notes

- Ensure all ports used by services do not conflict with other ports in use on your system.
- Make sure the `mekar-pgdata` volume is properly configured to persist PostgreSQL data.

## Docker Documentation

For Docker-specific configurations and options, refer to Docker's official documentation:

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
