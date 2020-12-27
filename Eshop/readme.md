
## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own
 Sign Up functional is not implemented so update database with users from users.json, alternativly
 Create users via postman requests 
 example:
 http://localhost:5000/api/v1/auth/register
    method: POST
        body:
        {
            "name": "A11111",
            "email": "1@gmail.com",
            "password": "123214",
            "role":"user"||"admin"
        }
if users.json was successfully imported 
use 
Test@gmail.com
123456
for regular user
and
user@gmail.com
123456
for admin
## Install Dependencies

```
npm install
```

## Run App

```
# Run 
npm run dev,

