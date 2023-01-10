# CRUD

### Logic

This module gathers CRUD logic

## Endpoints

### Protected Routes
[!badge variant="danger" text="401"] [!badge variant="danger" text="403"]
___

#### GET `/`
[!badge variant="success" text="200"]

You have the freedom to select the hashed fields or not.

##### Response
```json
[
  {
    "id": 1,
    "email": "example@email.com",
    "password": "hash",
    "token_hash": "hash",
    "is_verified": false,
    "created_at": "2023-01-09T20:37:46.372Z",
    "updated_at": "2023-01-09T23:42:09.000Z"
  },
  {
    ...
  }
]
```
___

#### GET `/:id`
[!badge variant="success" text="200"]

##### Response

You have the freedom to select the hashed fields or not.

```json
{
  "id": 1,
  "email": "example@email.com",
  "password": "hash",
  "token_hash": "hash",
  "is_verified": false,
  "created_at": "2023-01-09T20:37:46.372Z",
  "updated_at": "2023-01-09T23:42:09.000Z"
}
```
___

#### PATCH `/:id`
[!badge variant="success" text="200"]

ℹ️ User must be verified

##### Body

```json
{
  "email": "...",
  ... (and other properties of user)
}
```

Check `UpdateUserDto` class

##### Response
Empty on success
___

#### PATCH `/:id/password`
[!badge variant="success" text="200"]

ℹ️ User must be verified

##### Body

```json
{
  "password": "...",
}
```

Check `UpdatePasswordDto` class

##### Response
Empty on success
___

#### DELETE `/:id`
[!badge variant="success" text="201"]

ℹ️ User must be verified

##### Response
```json
{
  "raw": [],
  "affected": 1
}
```

