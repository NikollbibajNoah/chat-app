FROM quay.io/keycloak/keycloak:latest

# Set environment variables for database connection
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://dpg-cv0ad4hopnds73b70gh0-a:5432/keycloak_kbvm
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=YQdw9E7nWazYWBnVSnZOUfcDFdRUBbO9
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=adminpassword

# Expose port
EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

# Start Keycloak in development mode
CMD ["start-dev", "--http-port=8080"]


