# Gymnasiearbete
A website where users challenges themselves and compete in various tests that measure performance.

## Setup
Follow the instructions below to set up the project.
1. Run "npm install" in "/", "/client" and "/server"
2. Create file named ".env" in "/client" and fill in the following fields:
```
PORT = 3000
HOST = "localhost"

REACT_APP_API_URL = http://localhost:5000
```
3. Create file named ".env" in "/server" and fill in the following fields:
```
PORT = 5000
HOST = "localhost"

DB_HOST = "host"
DB_USER = "root"
DB_DATABASE = "database"
DB_PASSWORD = "password"

JWT_SECRET_KEY = "secret"

CLIENT_URL = "http://localhost:3000"
```
