FROM quay.io/keycloak/keycloak:latest

# Set environment variables for database connection
ENV KC_DB=postgres
ENV KC_DB_URL=postgresql://keycloak:YQdw9E7nWazYWBnVSnZOUfcDFdRUBbO9@dpg-cv0ad4hopnds73b70gh0-a.frankfurt-postgres.render.com/keycloak_kbvm
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=YQdw9E7nWazYWBnVSnZOUfcDFdRUBbO9
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=adminpassword

# Expose port
EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]

# Start Keycloak in normal mode and bind to 0.0.0.0
CMD ["start", "--http-port=8080", "--hostname-strict=false", "--hostname-strict-https=false", "--hostname=0.0.0.0"]
