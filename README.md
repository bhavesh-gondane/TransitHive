TransitHive

TransitHive is a full-stack transportation management system built with two different backend technologies (ASP.NET Core and Spring Boot) and a React frontend.

Project Structure

TransitHive/
│-- backend-dotnet/      # .NET Core Backend (Runs on port 5205)
│-- backend-springboot/  # Spring Boot Backend (Runs on port 8080)
│-- frontend-react/      # React Frontend (Connects to respective backend)

Prerequisites

Node.js (Latest LTS version)

.NET 6.0 SDK (For .NET backend)

Java 17+ (For Spring Boot backend)

Maven (For Spring Boot backend)

PostgreSQL/MySQL (Depending on database configuration)

Backend Setup

ASP.NET Core Backend

Navigate to the .NET backend directory:

cd backend-dotnet

Restore dependencies:

dotnet restore

Update the appsettings.json file with your database connection string.

Run the application:

dotnet run

The API will be available at http://localhost:5205

Spring Boot Backend

Navigate to the Spring Boot backend directory:

cd backend-springboot

Build the project:

mvn clean install

Run the application:

mvn spring-boot:run

The API will be available at http://localhost:8080

Frontend Setup

Navigate to the React frontend directory:

cd frontend-react

Install dependencies:

npm install

Update the API base URL in the .env file:

REACT_APP_API_URL=http://localhost:5205  # For .NET
# REACT_APP_API_URL=http://localhost:8080  # For Spring Boot

Start the development server:

npm start

The frontend will be available at http://localhost:3000

API Endpoints

The API follows RESTful conventions. The available endpoints differ slightly between .NET and Spring Boot versions. Please refer to the respective backend documentation for details.

Deployment

Docker Setup (Optional)

A Dockerfile and docker-compose.yml can be used to containerize the application. Follow these steps:

Build the containers:

docker-compose up --build

The backend and frontend should now be accessible at their respective ports.

Contributing

Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Added new feature")

Push to the branch (git push origin feature-name)

Open a pull request

License

This project is licensed under the MIT License.

Contact

For any queries, please open an issue on GitHub or contact the project maintainers.

Happy Coding! 🚀
