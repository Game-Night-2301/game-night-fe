<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!-- [![Contributors][contributors-shield]][https://img.shields.io/github/contributors/Game-Night-2301/game-night-fe.svg?style=for-the-badge]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->

<!-- These require shields.io which I've not figured out how to use -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Game-Night-2301/game-night-fe">
    <img src="https://user-images.githubusercontent.com/120869196/253766698-18414249-a92b-4b58-9032-ac67ce3b26b0.png" alt="Logo" >
  </a>

<h3 align="center">Game Night</h3>

  <p align="center">
    Welcome to the front-end repository for Game Night <br /> Game Night is a web application built for the Turing School of Software and Design's Mod 4 Capstone project. Read more about project requirements: https://mod4.turing.edu/projects/capstone/
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#db-design">Front End Design</a></li>
    <li><a href="#endpoint">Endpoint</a></li>
    <li><a href="#technical-solutions">Technical Solutions</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Game Night is an app designed for organizing and scheduling board game get-togethers. Users can create a board game event based on the games in their collection, and join games happening near them.

Game Night is an excellent way to take the hassle out of scheduling get-togethers with your friends, and acts as means of meeting new people who share your passion for tabletop gaming.

- [Production Website](https://game-night-fe.vercel.app/)
- Backend can be accessed using `graphQL` queries to the following URL: https://game-night-backend-172o.onrender.com/graphql
- Github repositories:
* Front End: [Repo](https://github.com/Game-Night-2301/game-night-fe)
* Back End: [Repo](https://github.com/Game-Night-2301/game-night-be)

<!-- if you want to do it the way BE did it, it does look really nice, but still uses shield io
  * Front End: [![Github][Github]][project-fe-gh-url]
  * Back End: [![Github][Github]][project-be-gh-url] -->
  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With:

*   <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
* <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
*   <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
* <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
* <img src="https://user-images.githubusercontent.com/120869196/253420930-fa40df17-082f-4cb4-92a2-97986e1cd676.png" width="85" height="28"/>
* <img src="https://user-images.githubusercontent.com/120869196/253767245-15d1faeb-4585-4b7a-adba-33d42190a172.jpg" witdth="auto" height="28"/>
* <img src="https://user-images.githubusercontent.com/116964982/238382095-7d4a3eeb-c907-4e1c-b8cf-abf6b8c20c6e.png"/>
* <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
* <img src="https://user-images.githubusercontent.com/120869196/253767662-710a07ce-2cee-41e1-8c4e-ade25a38f86d.png" width="auto" height="28"/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To demo Game Night on your local machine, follow these steps: 

### Front End Repository

1. Fork the [repository](https://github.com/Game-Night-2301/game-night-fe) to your GitHub account.
2. Copy the SSH key from GitHub by navigating to the code dropdown.
3. Using the terminal, run the following command: `git clone [SSH key here]`.
4. Change into the repository directory: `cd game-night-fe`.
5. Open the repository in your preferred code editor, such as Visual Studio Code.
6. Install the necessary dependencies by running: `npm install`.
7. Start the application by running: `npm start`.
8. Click the hyperlink where the project is running to launch the application in your web browser, or enter `http://localhost:3000/` into your web browser's address bar.


### Back End Repository
1. Clone the front end [here](https://github.com/Game-Night-2301/game-night-be)
2. Follow instructions in the back-end repo `README`


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Testing -->
## Testing
 
 <img alt="Cypress" src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e"/>

Front End Testing was done using End to End testing with Cypress and ensure that all happy and sad paths could be reached as planned for the best user experience. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Front End Design -->
## Wireframe and Component Hierarchy
 ![Design Layout](https://i.imgur.com/gB6n2Ls.png)

![Hierarchy](https://i.imgur.com/jZXSfc2.png)
 
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Endpoint

### graphQL Queries

#### Get a User
``` 
  query {
          user(id: 1 ) {
            id
            username
            password
            city
            state
            lat
            lon
            attendingEvents {
              id
            }
            hostedEvents {
              id
            }
            recommendedGames {
              id
              name
              minPlayers
              maxPlayers
              minPlaytime
              maxPlaytime
              description
              imageUrl
              averageUserRating
              averageStrategyComplexity
            }
          }
        }
  ```
#### Get Events

  ```
query {
  event(id: 1) {
    id
    date
    address
    state
    city
    zip
    title
    cancelled
    description
    hostId
    game
    gameType
    playerCount
    startTime
    endTime
    lat
    lon
    full
    distanceFrom
    gameDetails {
      id
      name
      minPlayers
      maxPlayers
      minPlaytime
      maxPlaytime
      description
      imageUrl
      averageUserRating
      averageStrategyComplexity
    }
    host {
      id
      username
    }
    attendees {
      id
      username
    }
  }
}
```



#### Get Games
```
query {
  games {
    id
    name
    minPlayers
    maxPlayers
    minPlaytime
    maxPlaytime
    description
    imageUrl
    averageUserRating
    averageStrategyComplexity
  }
}
```


#### Get Random Game
```
query {
  randomGame {
     id
     name
     minPlayers
     maxPlayers
     minPlaytime
     maxPlaytime
     description
     imageUrl
     averageUserRating
     averageStrategyComplexity
  }
}
```
### graphQL Mutations


#### Create Event
```
mutation {
  createEvent(input: {
    date: "2023/11/7",
    address: "123 This street",
    state: "Colorado",
    city: "Denver",
    zip: 15555,
    title: "Grandma's basement",
    description: "We'll be playing caracasonne for 9 hours",
    host: 4744564,
    game: 97833646,
    gameType: "board game",
    startTime: "10:00",
    endTime: "12:00"
  }) {
    event {
      id
    }
  }
}
```

#### Create User Event
```
mutation {
  createUserEvent(input: {
      userId: 1
      eventId: 8
  }) 
  {
    userEvent {
      id
      userId
      eventId
      event {
        id
        date
        address
        state
        city
        zip
        title
        cancelled
       description
        hostId
        game
        gameType
        playerCount
        attendees {
          id
          username
        }
        }
      }
    }
  }
```

#### Create User Game
```
mutation {
            createUserGame(input: {
              userId: 1
              gameId: 2000
            }) {
              userGame {
                id
                userId
                gameId
                newGame {
                  name
                  minPlayers
                  maxPlayers
                  minPlaytime
                  maxPlaytime
                  description
                  imageUrl
                  averageUserRating
                  averageStrategyComplexity
                }
              }
            }
          }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Technical Solutions -->
## Technical Solutions

Our small team working on the Game Night application faced unexpected challenges as we delved into GraphQL integration on both the front-end and back-end, we soon realized that Cypress required some adjustments to accommodate the unique aspects of GraphQL queries and mutations. We spent considerable time troubleshooting and adapting our testing approach to handle GraphQL interactions effectively. Despite the unexpected hurdles, our team's perseverance and collaborative efforts paid off. We not only learned how to use GraphQL effectively but also enhanced our proficiency with Cypress by finding innovative solutions to overcome the challenges. Additionally, during our development journey, we also had the opportunity to explore and incorporate GitHub Actions, which allowed us to automate various aspects of our build, test, and deployment processes. The combination of mastering GraphQL, overcoming Cypress challenges, and adopting GitHub Actions resulted in an application that exceeded our initial expectations. We take great pride in the final product we delivered and the valuable lessons we learned along the way.

<!-- maybe expand here?? -->


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

Additional features, functionality, and potential refactors:
* User Authentication
  * Google OAuth and/or Board Game Atlas OAuth
* Cache external API calls to improve performance
* Consume additional external API to expand beyond just tabletop games to video games and alike
  * Set up functionality to organize and plan, similar to board game nights:
    * Video Game tournaments
    * LAN Parties
    * TTRPG Sessions

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact



<br>

### Front-end Team

| [<img alt="Ashlee Webb" width="100" src="https://user-images.githubusercontent.com/120869196/253776976-0bae2ece-d4c5-4272-a584-b0353fbc6302.jpeg"/>](https://www.linkedin.com/in/ashlee-webb/) | [<img alt="Adriane Sutherland" width="100" src="https://user-images.githubusercontent.com/120869196/253777040-2a305d4d-c3f4-427d-a2d0-6d345b628f86.jpeg"/>](https://www.linkedin.com/in/adriane-sutherland/) | [<img alt="Trey Marshall" width="100" src="https://user-images.githubusercontent.com/120869196/253777102-92b26459-2e10-497c-91f2-7bb784de7d66.png"/>](https://www.linkedin.com/in/tdmars/) | [<img alt="John Featherstone" width="100" src="https://user-images.githubusercontent.com/120869196/253777161-8d90b254-594f-4178-8ac1-5699ccbe38ce.jpeg"/>](https://www.linkedin.com/in/john-w-featherstone/) |
| ------------ | ------------------ | ------------- | ----------------- |
| Ashlee Webb | Adriane Sutherland | Trey Marshall | John Featherstone |
| Front-end Developer | Front-end Developer | Front-end Developer | Front-end Developer |
| [GitHub](https://github.com/AshleeAWebb) | [GitHub](https://github.com/asutherland91) | [GitHub](https://github.com/tdmburr) | [GitHub](https://github.com/JWFeatherstone) |
| [LinkedIn](https://www.linkedin.com/in/ashlee-webb/) | [LinkedIn](https://www.linkedin.com/in/adriane-sutherland/) | [LinkedIn](https://www.linkedin.com/in/tdmars/) | [LinkedIn](https://www.linkedin.com/in/john-w-featherstone/) |

<br>

### Back-end Team

| [<img alt="Dyson Breakstone" width="100" src="https://user-images.githubusercontent.com/120869196/253776345-1471e248-ddc1-461b-aeee-d8ac4d59bba4.jpeg"/>](https://www.linkedin.com/in/dyson-breakstone-4978291a2/) | [<img alt="Brian Guthrie" width="100" src="https://user-images.githubusercontent.com/120869196/253776434-25807eec-dbb2-49f8-a1fd-3fda117a3685.png"/>](https://www.linkedin.com/in/brian-guthrie-1bba73232/) | [<img alt="Stephen McPhee" width="100" src="https://user-images.githubusercontent.com/120869196/253780562-bdea39b0-2222-448b-bdb3-83f47804a79c.jpg"/>](https://www.linkedin.com/in/smcphee19/) |
| ------------------ | ------------ | ---------------- | 
| Dyson Breakstone | Brian Guthrie | Stephen McPhee |
| Back-end Developer | Back-end Developer | Back-end Developer |
| [GitHub](https://github.com/DysonBreakstone) | [GitHub](https://github.com/Brianisthebest) | [GitHub](https://github.com/SMcPhee19) |
| [LinkedIn](https://www.linkedin.com/in/dyson-breakstone-4978291a2/) |  [LinkedIn](https://www.linkedin.com/in/brian-guthrie-1bba73232/) | [LinkedIn](https://www.linkedin.com/in/smcphee19/) |

<p align="right">(<a href="#readme-top">back to top</a>)</p>
1:26
<!-- MARKDOWN LINKS & IMAGES -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/Game-Night-2301/game-night-fe.svg?style=for-the-badge
[contributors-url]: https://github.com/Game-Night-2301/game-night-be/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Game-Night-2301/game-night-fe.svg?style=for-the-badge
[forks-url]: https://github.com/Game-Night-2301/game-night-be/network/members
[stars-shield]: https://img.shields.io/github/stars/Game-Night-2301/game-night-fe.svg?style=for-the-badge
[stars-url]: https://github.com/Game-Night-2301/game-night-be/stargazers
[issues-shield]: https://img.shields.io/github/issues/Game-Night-2301/game-night-fe.svg?style=for-the-badge
[issues-url]: https://github.com/Game-Night-2301/game-night-be/issues
[license-shield]: https://img.shields.io/github/license/Game-Night-2301/game-night-fe.svg?style=for-the-badge
[license-url]: https://github.com/Game-Night-2301/game-night-be/blob/main/LICENSE.txt
[linkedin]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[stephen-li-url]: https://www.linkedin.com/in/smcphee19/
[Github_Actions]: https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white
[GHA_url]: https://docs.github.com/en/actions
[Github]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[project-fe-gh-url]: https://github.com/Game-Night-2301/game-night-fe
[project-be-gh-url]: https://github.com/Game-Night-2301/game-night-be
[stephen-gh-url]: https://github.com/SMcPhee19# graphQL schema and types -->

