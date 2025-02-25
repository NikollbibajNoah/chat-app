# Chat-App

## Einführung

Diese Chat-Anwendung wurde mit Docker erstellt und ermöglicht eine effiziente Echtzeit-Kommunikation über einen Chat-Services.

## Projektstruktur

- `backend/`: Enthält den gesamten Backend-Code der Anwendung.
- `chat-service/`: Enthält den Service, der für die Echtzeit-Kommunikation zuständig ist.
- `frontend/`: Enthält den gesamten Frontend-Code der Anwendung.
- `my-sqlinit/`: Enthält die SQL-Initialisierungsdateien für die Datenbank.
- `.gitignore`: Gibt an, welche Dateien und Verzeichnisse von git ignorieren werden sollen.
- `.hintrc`: Konfigurationsdatei für das [webhint](https://webhint.io/) Tool.
- `docker-compose.yml`: Docker Compose-Konfigurationsdatei zum Starten von Multi-Container Docker-Anwendungen.
- `LICENSE`: Lizenziert den Quellcode des Projekts nach der MIT-Lizenz.
- `README.md`: Dieses Dokument, das das Projekt und seine Struktur beschreibt.
- `users.txt`: Eine Textdatei, die Benutzerdaten enthält.
- `.idea/`: Verzeichnis, das von JetBrains IDEs verwendet wird. Es enthält Konfigurationen speziell für Ihr Projekt.
- `External Libraries/`: Enthält alle Abhängigkeiten, die Ihr Projekt von außen bezieht.
- `Scratches and Consoles/`: Ein Verzeichnis, das von JetBrains IDEs verwendet wird für temporäre Dateien, Prototypen und experimentellen Code.# Chat-App


## Pipeline

Unser Entwicklungsprozess folgt einer CI/CD-Pipeline:
1. **Continuous Integration**: Sobald Änderungen im Quellcode vorgenommen und im Repository gepusht wurden, werden automatisch Tests durchgeführt. Dies stellt sicher, dass jede Änderung den Qualitätsstandards entspricht.
2. **Continuous Delivery**: Nach jedem erfolgreichen Integrationsschritt wird die Anwendung automatisch in die Staging-Umgebung deployt, wo sie für zusätzliche Tests und Qualitätssicherung bereitsteht.
3. **Continuous Deployment**: Sobald Änderungen in der Staging-Umgebung validiert wurden, wird die Anwendung automatisch in die Produktionsumgebung deployt.

## Verwendete Tools

Das Projekt verwendet die folgenden Werkzeuge:

- **Docker**: Für die Containerisierung, sorgt für das reibungslose Funktionieren der Anwendung über verschiedene Umgebungen hinweg.
- **Microservices**: Die Anwendung folgt dem Microservices-Architekturmuster für eine flexiblere und skalierbare Lösung.
- **React**: Wird für die Frontend-Entwicklung verwendet, ermöglicht eine interaktive Benutzeroberfläche.
- **Keycloak**: Wird für die Authentifizierung und Autorisierung verwendet, sorgt für die Sicherheit der Anwendung.
- **Knex**: Ein SQL Query Builder für Node.js, wird für den Umgang mit Datenbankoperationen verwendet.

## Ausführungshinweise

Bevor Sie dieses Projekt ausführen, stellen Sie sicher, dass Docker auf Ihrem System installiert ist.
1. Klonen Sie dieses Repository auf Ihr lokales System.
2. Navigieren Sie in das Projektverzeichnis.
3. Führen Sie den folgenden Befehl aus, um die Docker-Container aufzubauen und zu starten:

    ```bash
    docker-compose up -d --build
    ```

4. Während Docker läuft, öffnen Sie ein neues Terminalfenster und navigieren Sie zu den `frontend`, `backend` und `chat-service` Verzeichnissen jeweils und führen Sie den folgenden Befehl aus, um die Abhängigkeiten zu installieren:

    ```bash
    cd frontend
    npm install
    ...
    cd backend
    npm install
    ...
    cd chat-service
    npm install
    ```

5. Danach können Sie das Frontend mit `npm run dev` starten:

    ```bash
    npm run dev
    ```

6. Folgen Sie den Instruktionen im Setup-Prozess, um einen Master-Benutzer zu erstellen.

Bitte stellen Sie sicher, dass Node.js und NPM auf Ihrem System installiert sind, bevor Sie diese Befehle ausführen.

Nachdem Sie das Frontend und die zusätzlichen Services gestartet haben, sollte Ihre Chat-Anwendung jetzt laufen und erreichbar sein unter `localhost:port`. Stellen Sie sicher, dass Sie den genauen `Port` bereitstellen, auf dem Ihre Anwendung läuft.
Bitte stellen Sie sicher, dass Node.js und NPM auf Ihrem System installiert sind, bevor Sie diese Befehle ausführen.
Ihre Chat-Anwendung sollte jetzt laufen und erreichbar sein unter entsprechenden Ports die sie im Terminal sehen `localhost:8080` 
