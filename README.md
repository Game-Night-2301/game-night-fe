## RESTful Endpoints

<details close>


### Get a User


```http
GET /api/v1/users/:id
```

<details close>
<summary>  Details </summary>
<br>
    
Parameters: <br>
```
No Parameters
```

| Code | Description |
| :--- | :--- |
| 200 | `OK` |

Example Value:

```json

{
    "data": {
        "user_id": "1",
        "type": "user",
        "attributes": {
          "username": "user1",
          "password": "password",
          "city": "Denver",
          "state": "Colorado",
          "lat": 249.21,
          "long": 1,
          "hosted_events": [],
          "attending_events": [],
          "game_collection": []
        }
    }
}
```
| Code | Description |
| :--- | :--- |
| 404 | `Not found` |

Example Value:

```json

{
    "errors": [
      "message": "User not found"
    ]
}
```


</details>

---

### Get Events


```http
GET /api/v1/events
```

<details close>
<summary>  Details </summary>
<br>
    
Parameters: <br>
```
No Parameters
```

| Code | Description |
| :--- | :--- |
| 200 | `OK` |

Example Value:

```json

{
    "data": [
      {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
          "game_details": {
            "game_title": "Settlers of Catan",
            "game_description": "It is a game.",
            "category": "Strategy",
            "game_img_big": "https://gameimage.com.jpg",
            "game_img_thumb": "https://lilimage.com.jpg",
            "min_players": 2,
            "max_players": 6,
            "min_playtime": 50,
            "max_playtime": 180,
          },
          "attendees": [ 1, 2, 4],
          "host_id": 5,
          "event_description": "Playing Catan at my mom's house",
          "status": "Active"
        }
      },
      {
        "event_id": "2",
        "type": "event",
        "attributes": {
          "date": "05/17/2022"
          "location": {
            "address": "1579 Downing St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80206"
            "lat": 50,
            "long: 15.171,
          }
          "game_details": {
            "game_title": "Monopoly",
            "game_description": "Happy families.",
            "category": "Money",
            "game_img_big": "https://money.com.jpg",
            "game_img_thumb": "https://lilmoney.com.jpg",
            "min_players": 1,
            "max_players": 25,
            "min_playtime": 2000,
            "max_playtime": 8500,
          }
          "attendees": [ 1, 3, 4],
          "host_id": 2,
          "event_description": "Need pretext for divorcing my family.",
          "cancelled": false,
        }
      },
      ...
    ]
}
```
```
| Code | Description |
| :--- | :--- |
| 204 | `No content` |

Example Value:

```json

{
    "errors": [
      "message": "No events found"
    ]
}
```
</details>

---


### Get User Events


```http
GET /api/v1/users/:id/events/:id
```

<details close>
<summary>  Details </summary>
<br>
    
Parameters: <br>
```
No Parameters
```

| Code | Description |
| :--- | :--- |
| 200 | `OK` |

Example Value:

```json

{
    "data":  {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
        "game_details": {
          "game_title": "Settlers of Catan",
          "game_description": "It is a game.",
          "category": "Strategy",
          "game_img_big": "https://gameimage.com.jpg",
          "game_img_thumb": "https://lilimage.com.jpg",
          "min_players": 2,
          "max_players": 6,
          "min_playtime": 50,
          "max_playtime": 180
        },
        "attendees": [ 1, 2, 4],
        "host_id": 5,
        "event_description": "Playing Catan at my mom's house",
        "cancelled": false,
        }
      }
}
```
```
| Code | Description |
| :--- | :--- |
| 404 | `Not found` |

Example Value:

```json

{
    "errors": [
      "message": "Event not found"
    ]
}

```
</details>

---

### Post a New Event


```http
POST /api/v1/events
```

<details close>
<summary>  Details </summary>
<br>
    
Parameters: <br>
```
CONTENT_TYPE=application/json
```

| Code | Description |
| :--- | :--- |
| 201 | `CREATED` |

Example Value:

```json

{
    "data":  {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
        "game_details": {
          "game_title": "Settlers of Catan",
          "game_description": "It is a game.",
          "category": "Strategy",
          "game_img_big": "https://gameimage.com.jpg",
          "game_img_thumb": "https://lilimage.com.jpg",
          "min_players": 2,
          "max_players": 6,
          "min_playtime": 50,
          "max_playtime": 180
        },
        "attendees": [],
        "host_id": 5,
        "event_description": "Playing Catan at my mom's house",
        "cancelled": false,
        }
      }
}

```

| Code | Description |
| :--- | :--- |
| 422 | `Unprocessable Entity` |

Example Value:

```json

{
    "errors": [
      "message": "Variable depending on what's missing."
    ]
}
```
</details>

---

### Adding a User to an Event


```http
POST /api/v1/user_events
```

<details close>
<summary>  Details </summary>
<br>
    
Parameters: <br>
```
No Parameters
```

| Code | Description |
| :--- | :--- |
| 201 | `CREATED` |

Example Value:

```json

{
    "data":  {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
        "game_details": {
          "game_title": "Settlers of Catan",
          "game_description": "It is a game.",
          "category": "Strategy",
          "game_img_big": "https://gameimage.com.jpg",
          "game_img_thumb": "https://lilimage.com.jpg",
          "min_players": 2,
          "max_players": 6,
          "min_playtime": 50,
          "max_playtime": 180
        },
        "attendees": [2],
        "host_id": 5,
        "event_description": "Playing Catan at my mom's house",
        "cancelled": false,
        }
      }
}

```
| Code | Description |
| :--- | :--- |
| 404 | `Not found` |

Example Value:

```json

{
    "errors": [
      "message": "Event not found"
    ]
}
```

</details>

---

### Removing a User from an Event


```http
DELETE /api/v1/user_events
```

<details close>
<summary>  Details </summary>
<br>
     
Parameters: <br>
```
CONTENT_TYPE=application/json
```

| Code | Description |
| :--- | :--- |
| 204 | No Content |

Example Value:

```json
""
```
</details>

---

### Cancelling an Event

```http
PUT /api/v1/user_events
```

<details close>
<summary>  Details </summary>
<br>
     
Parameters: <br>
```
CONTENT_TYPE=application/json
```

| Code | Description |
| :--- | :--- |
| 202 | `ACCEPTED` |

Example Value:

```json

{
    "data":  {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
        "game_details": {
          "game_title": "Settlers of Catan",
          "game_description": "It is a game.",
          "category": "Strategy",
          "game_img_big": "https://gameimage.com.jpg",
          "game_img_thumb": "https://lilimage.com.jpg",
          "min_players": 2,
          "max_players": 6,
          "min_playtime": 50,
          "max_playtime": 180
        },
        "attendees": [2],
        "host_id": 5,
        "event_description": "Playing Catan at my mom's house",
        "cancelled": true,
        }
      }
}
```
</details>

---

### Updating an Event


```http
PATCH /api/v1/events/:id
```

<details close>
<summary>  Details </summary>
<br>
     
Parameters: <br>
```
CONTENT_TYPE=application/json
```

| Code | Description |
| :--- | :--- |
| 202 | `ACCEPTED` |

Example Value:

```json

{
    "data":  {
        "event_id": "1",
        "type": "event",
        "attributes": {
          "date": "05/15/2022"
          "location": {
            "address": "202 S Pearl St",
            "city": "Denver",
            "state": "Colorado",
            "zip": "80209"
            "lat": 20.589,
            "long": 15.179,
          },
        "game_details": {
          "game_title": "Settlers of Catan",
          "game_description": "It is a game.",
          "category": "Strategy",
          "game_img_big": "https://gameimage.com.jpg",
          "game_img_thumb": "https://lilimage.com.jpg",
          "min_players": 2,
          "max_players": 6,
          "min_playtime": 50,
          "max_playtime": 180
        },
        "attendees": [2],
        "host_id": 5,
        "event_description": "Playing Catan at my step-dad's house",
        "cancelled": false,
        }
      }
}
```
</details>

---
