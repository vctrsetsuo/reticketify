FROM maven:3.9.9-amazoncorretto-21 AS build
WORKDIR /usr/src/app
COPY pom.xml .
# RUN mvn org.apache.maven.plugins:maven-dependency-plugin:3.8.1:go-offline
COPY src ./src
# RUN mvn -B -e -o -T 1C verify
RUN mvn -B -e -T 1C verify

FROM amazoncorretto:21-alpine
WORKDIR /app
COPY --from=build /usr/src/app/target/reticketify-backend-user-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
