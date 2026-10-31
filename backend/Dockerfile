# Stage 1: Build the Spring Boot application using Maven & Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (improves caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build jar
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight Java 21 JRE runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy executable jar from build stage
COPY --from=build /app/target/cybersafe-community-1.0.0.jar app.jar

# Render assigns dynamic port via $PORT env var (default: 8080)
ENV PORT=8080
EXPOSE 8080

# Launch application
ENTRYPOINT ["java", "-jar", "app.jar"]
