FROM quay.io/keycloak/keycloak:latest

# Set environment variables for database connection
ENV KC_DB=postgressDatabase
ENV KC_DB_URL_HOST=dpg-cv0ad4hopnds73b70gh0-a.render.com
ENV KC_DB_URL_DATABASE=keycloak_kbvm
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=YQdw9E7nWazYWBnVSnZOUfcDFdRUBbO9
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=adminpassword

# Expose port
EXPOSE 8080

# Start Keycloak in development mode
CMD ["/opt/keycloak/bin/kc.sh", "start-dev"]
