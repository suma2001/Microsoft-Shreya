## Microsoft Engage Project

### Project Description

    - A virtual collaborative learning platform which connects students with similar interests.
    - This overcomes problems such as finding like minded peers based on specific interests and lost human connection.

### Features
    - User authentication (Login/ Signup)
    - User Profile
    - Rewards for users; to motivate the users 
    - List of all groups
    - List of recommended groups based on user's weaknesses
    - Creating a group
    - Deleteing a group (only the ones created by the user)
    - Join a group
    - Leaving a group
    - A Chat Room
    
### Project Structure

    - Chat Room : Application for the chatroom
    - Frontend : Contains the client side pages and components 
    
### Tech Stack

    - React Js
    - Node Js
    - MongodB Atlas
    - Express Js
    
### Deployment - Heroku

* Deployed link: https://ms-sumashreya.herokuapp.com/

### How to run ?

#### Main Project

In your root folder, open the terminal and run the following commands

    npm install
    nodemon server
    
Then, create a .env file in your project root and add the following in the file

    PORT = 5000
    mongoURI = mongodb+srv://shreya:RR1Xhv4yMVTOEGew@cluster0.uat9t.mongodb.net/db?retryWrites=true&w=majority
    JWT_SECRET = effhcaneyuihvbndfcv
    
Open a new terminal and run the following commands

    cd frontend && npm install  
    npm start
    
#### Chat-Room 

Navigate to the Chat-Room folder from the project root
    
    cd Chat-Room
    
To run the server, 

    cd server && npm install
    nodemon index
    
To run the client,

    cd client && npm install
    npm start
    
    
### Video Links

* You can find the demo Video link [here](https://drive.google.com/file/d/1ijMY2Hbc-Yc349qmCTXz-5PnZAT9dnBf/view?usp=sharing)

* You can find the PPT [here](https://drive.google.com/file/d/1m751NEBMffAM2disoKAYalP7Dvnafv8j/view?usp=sharing)
    
### Screenshots

![alt text](screenshots/Login.png)
![alt text](screenshots/Signup.png)
![alt text](screenshots/Profile.png)
![alt text](screenshots/Reward-1.png)
![alt text](screenshots/Reward-2.png)
![alt text](screenshots/AllGroups.png)
![alt text](screenshots/CreateGroup.png)
![alt text](screenshots/DeleteGroupPopUp.png)
![alt text](screenshots/RecommendedGroups.png)
![alt text](screenshots/ViewGroupPopUp.png)
![alt text](screenshots/ChatRoom.gif)

