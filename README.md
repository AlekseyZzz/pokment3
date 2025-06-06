# Poker Mentor - Multi-Module Spring Boot Application

A comprehensive AI-powered poker training and analysis platform built with Spring Boot, Maven, and Thymeleaf.

## Architecture

This is a multi-module Maven project with the following structure:

```
mentor/
├── api/           # OpenAPI generated interfaces and models
├── backend/       # Core business logic and data persistence
├── webui/         # Thymeleaf-based web interface
└── pom.xml        # Parent POM (BOM)
```

## Modules

### API Module
- **Purpose**: Contains OpenAPI specification and generated interfaces
- **Technology**: OpenAPI 3.0, Swagger Codegen
- **Generated**: REST API interfaces, DTOs, and validation annotations

### Backend Module
- **Purpose**: Core business logic, services, and data persistence
- **Technology**: Spring Boot, Spring Data JPA, PostgreSQL/H2
- **Features**: 
  - JPA entities for sessions, hands, goals
  - Repository layer with custom queries
  - Service layer with business logic
  - REST controllers implementing API interfaces

### WebUI Module
- **Purpose**: Web interface using Spring Thymeleaf
- **Technology**: Spring Boot, Thymeleaf, Bootstrap 5, Chart.js
- **Features**:
  - Server-side rendered templates
  - Responsive design with Bootstrap
  - Interactive charts and analytics
  - Form handling and validation

## Key Features

### Session Management
- Pre-session preparation and goal setting
- Post-session reflection and analysis
- Performance grading (A, B, C, D game states)
- Mental state tracking and tilt management

### Hand Analysis
- Detailed hand breakdowns with screenshots
- Initial vs. adaptive thought processes
- Arguments for/against decision making
- Tagging and categorization system

### Analytics & Progress Tracking
- Game quality distribution charts
- Performance metrics over time
- Goal setting and progress monitoring
- Monthly profit projections

### Knowledge Base
- Searchable poker concepts and strategies
- Personalized learning recommendations
- Progress tracking for study materials

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL (optional, H2 included for development)

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mentor
   ```

2. **Build all modules**
   ```bash
   mvn clean install
   ```

3. **Run the backend API server**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8080/api/v1`

4. **Run the web interface**
   ```bash
   cd webui
   mvn spring-boot:run
   ```
   The web interface will be available at `http://localhost:8081`

### Database Configuration

#### Development (H2)
The application uses H2 in-memory database by default for development:
- Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`

#### Production (PostgreSQL)
Update `application.yml` in both backend and webui modules:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/poker_mentor
    username: your_username
    password: your_password
    driver-class-name: org.postgresql.Driver
```

## API Documentation

The OpenAPI specification is located at `api/src/main/resources/openapi.yaml`.

Key endpoints:
- `GET /sessions` - List poker sessions
- `POST /sessions` - Create new session
- `GET /sessions/{id}/hands` - Get hands for session
- `GET /analytics/game-quality` - Game quality analytics
- `GET /goals` - User goals and progress

## Development

### Adding New Features

1. **Update OpenAPI specification** in `api/src/main/resources/openapi.yaml`
2. **Regenerate API interfaces** by running `mvn clean compile` in the api module
3. **Implement business logic** in the backend module
4. **Create/update templates** in the webui module

### Database Schema

The application uses JPA entities with automatic schema generation. Key entities:
- `SessionEntity` - Poker sessions with performance data
- `HandEntity` - Individual hands with analysis
- `GoalEntity` - User goals and objectives
- `TaskEntity` - Goal sub-tasks

### Frontend Development

The web interface uses:
- **Thymeleaf** for server-side templating
- **Bootstrap 5** for responsive design
- **Chart.js** for data visualization
- **Lucide** for icons
- **Custom CSS** for poker-specific styling

## Deployment

### Docker (Recommended)

Create a `Dockerfile` for each module:

```dockerfile
FROM openjdk:17-jre-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Traditional Deployment

1. Build the application: `mvn clean package`
2. Deploy the JAR files to your server
3. Configure external database
4. Set up reverse proxy (nginx/Apache)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.