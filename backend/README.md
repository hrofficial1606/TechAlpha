# TechAlpha Backend

Spring Boot backend for TechAlpha with:
- OTP registration and login
- Supabase PostgreSQL support
- PayPal checkout
- Cloudinary media uploads
- Admin event, gallery, and hackathon management

## Environment Variables

Copy values from `.env.example` into your deployment platform or local environment.

Required for startup:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_FROM`
- `JWT_SECRET`

Optional but recommended:
- `ADMIN_EMAIL`
- `PAYPAL_ENABLED`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_BASE_URL`
- `PAYPAL_RETURN_URL`
- `PAYPAL_CANCEL_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_DEFAULT_FOLDER`
- `CORS_ALLOWED_ORIGINS`

## Local Run

```powershell
mvn spring-boot:run
```

Health endpoint:

```text
http://localhost:8080/api/public/health
```

## Build

```powershell
mvn clean package
```

## Deployment Notes

- Set all secrets through environment variables, not in `application.yml`
- Use a hosted PostgreSQL database such as Supabase
- Keep the frontend API URL pointed to your deployed backend
- For production mail, verify the mailbox credentials separately before enabling OTP
- For PayPal production, switch from sandbox credentials and sandbox base URL
