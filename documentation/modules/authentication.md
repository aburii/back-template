# Authentication

### Logic

Authentication module gathers all the logic from registering users to logging them out.
This gathers verification too through tokens sent by email.

## Endpoints

### Public Routes
___

#### POST `/register`
[!badge variant="success" text="201"]

##### Body

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

##### Response
```json
{
  "access_token": "",
  "refresh_token": ""
}
```
___

#### POST `/login`
[!badge variant="success" text="200"]

##### Body

```json
{
  "email": "email@example.com",
  "password": "password"
}
```

##### Response
```json
{
  "access_token": "",
  "refresh_token": ""
}
```
___

### Protected Routes
[!badge variant="danger" text="401"] [!badge variant="danger" text="403"]

Taking the `access_token` object as __Bearer Token__ in the Authentication Header section.
___


#### POST `/logout`
[!badge variant="success" text="200"]

Logs out the user by deleting its `refresh_token` in the DB.

___

#### POST `/verify` 
[!badge variant="success" text="200"]

ℹ️ User must NOT be verified

Verifies the code sent by email to the users.

Grants user more permission on success

##### Body

```json
{
  "code": 234567
}
```

##### Response
```json
{
  "access_token": "",
  "refresh_token": ""
}
```
___

#### POST `/redeem-verification-code`
[!badge variant="success" text="201"]

ℹ️ User must NOT be verified

Sends an email with verification code

___

#### POST `/refresh`
[!badge variant="success" text="201"]

⚠️ Takes the refresh token as __Bearer Token__ in the Authentication Header

##### Response
```json
{
  "access_token": "",
  "refresh_token": ""
}
```
