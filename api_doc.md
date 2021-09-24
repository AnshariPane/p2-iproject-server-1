# MyVtuberList Server

MyVtuberList is an application to show Vtuber. This app has :

-   JSON formatted response

&nbsp;

## RESTful endpoints

### GET /characters

> Get all assets

_Request Headers_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "Tokino Sora",
        "about": "Debuting on September 7, 2017, she is the first Virtual Idol of Hololive Production.\nShe loves singing and horror games, and her dream has been to “hold a live concert at Yokohama Arena” since the very beginning.",
        "fanbaseName": "Sora-tomo",
        "illustrator": "ordan",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/766395_704791_LtgiASHYk.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 2,
        "name": "AZKi",
        "about": "A diva who became reborn into the virtual world in order to fabricate a new world.",
        "fanbaseName": "Pioneer",
        "illustrator": "kasokuSato",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/922356_129433_IfNr65KjunL.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 3,
        "name": "Robocosan",
        "about": "A lonely, wimpy robot from a random wasteland. She is now hoping to contact and live with lots of people as a Virtual Liver.",
        "fanbaseName": "Robosa",
        "illustrator": "kuromaru9",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/133704_17353_v5HzB875SL.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 4,
        "name": "Sakura Miko",
        "about": "Nya-hello! It's Sakura Miko!",
        "fanbaseName": "35p",
        "illustrator": "kuromaru9",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/539178_681604_QTCPZKKrf7h.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 5,
        "name": "Shirakami Fubuki",
        "about": "A white haired kemomimi (animal-eared) highschool student.",
        "fanbaseName": "Sukon-bu",
        "illustrator": "Nagishiro Mito",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/215939_891350_h2mytN764H.webp",
        "Generation": "1st Generation"
    }
]
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET byPK /movies/:id

> Get movie by id

_Request Headers_

```
not needed
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Response (200)_

```
{
    "id": 23,
    "name": "Hoshimachi Suisei",
    "about": "It's your shooting star, your diamond in the rough, idol VTuber Hoshimachi Suisei! A forever18 VTuber who deeply loves singing and idols. Her dream is to one day hold a live concert in Tokyo Budokan.",
    "fanbaseName": "Stargazers",
    "illustrator": "Teshima Nari",
    "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/718827_142512_gdj2ct-Ec.webp"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Data not found"
}
```

### GET /characters/filtered

> Get all assets

_Request Headers_

```
not needed
```

_Request Body_

```
not needed
```

_Request Query_

```
Generation : <string>
```

_Response (200)_

```
[
    {
        "id": 1,
        "name": "Tokino Sora",
        "about": "Debuting on September 7, 2017, she is the first Virtual Idol of Hololive Production. She loves singing and horror games, and her dream has been to “hold a live concert at Yokohama Arena” since the very beginning.",
        "fanbaseName": "Sora-tomo",
        "illustrator": "ordan",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/766395_704791_LtgiASHYk.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 2,
        "name": "AZKi",
        "about": "A diva who became reborn into the virtual world in order to fabricate a new world.",
        "fanbaseName": "Pioneer",
        "illustrator": "kasokuSato",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/922356_129433_IfNr65KjunL.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 3,
        "name": "Robocosan",
        "about": "A lonely, wimpy robot from a random wasteland. She is now hoping to contact and live with lots of people as a Virtual Liver.",
        "fanbaseName": "Robosa",
        "illustrator": "kuromaru9",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/133704_17353_v5HzB875SL.webp",
        "Generation": "Generation 0"
    },
    {
        "id": 4,
        "name": "Sakura Miko",
        "about": ""Nya-hello! It's Sakura Miko!"",
        "fanbaseName": "35p",
        "illustrator": "kuromaru9",
        "imageUrl": "https://ik.imagekit.io/ky5x0wdtudi/539178_681604_QTCPZKKrf7h.webp",
        "Generation": "Generation 0"
    },
]
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### POST /register

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "username": "<string>",
  "email": "<string>",
  "password": "<string>"
}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "email": "test@mail.com"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
        "Please insert your username."
        "Must be an email format.",
        "Please insert your email.",
        "Insert password"
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

### POST /login

_Request Body_

```
{
  "username": "<string>",
  "password": "<string>"
}
```

_Response (200 - Success)_

```
{
    "username": "admin",
    "email": "admin@mail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYzMjIzMjg4N30.S0ddFBsDbzufP5OiM1_rRJiLlIJtcqIp2TPj5ZwUC2o"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "Email/Password is wrong"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

