# Users

### Base approach of 'users'

Users' approach differs on every application.
This template only set-ups the minimum logic it needs.

Therefore, its entity only has `email`, `password`, and a `is_verified` field that I will explain in further chapters.
You don't need to worry about other fields.


#### Update user's shape

If you want to touch the shape of the `user` entity, go to the `entities/user/*.entity` file.

__Be careful! if you change the object check out the Data Transfer Objects (dto)__.