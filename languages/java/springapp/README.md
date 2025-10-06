Spring Boot Java app (pure Java, professional)

Endpoints:
- POST /api/collect {"value": number}
- GET /api/analyze
- POST /api/encrypt {"value": "text"}
- POST /api/decrypt {"cipher":"...","wrappedKey":"...","privateKey":"..."}

Build & run:

mvn -f languages/java/springapp clean package
java -jar languages/java/springapp/target/springapp-0.1.0.jar

Docker (after packaging):

docker build -f languages/java/springapp/Dockerfile -t springapp:0.1 .
docker run -p 5003:5003 springapp:0.1
