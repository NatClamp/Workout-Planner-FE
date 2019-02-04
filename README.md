# curlFriend

curlFriend is a community-driven workout planning assistant mobile application built as a group portfolio project. The main USP of the product is the 3D model where you can visualise the effect of your workout on each muscle group.

After logging in with Facebook & Firebase authentication, you can view a list of all the exercises added by members, and add them to your current workout, or search by muscle group and add exercises from there. Or why not add your own exercise for yourself and others to use in their workouts?

Once you've built your workout, you can take curlFriend to the gym, tick off the exercises as you complete them, and see the muscles of the model change colour as you progress.

On your profile page, you can keep track of your completed workouts, as well as select previous workouts to complete again.

### Front End
The front end of curlFriend is a mobile application for both iOS and Android, built with React Native and Expo. It makes various calls to retrieves data from our API, from displaying all the exercises available in the database to a user's previously completed workouts. It uses firebase and facebook login to authenticate users, and async storage to retain user information for the period that they're logged in.

### Back End
The back end of curlFriend is built with MongoDB and can be found in a seperate repository, here[https://github.com/NatClamp/Workout-Planner-BE]

## Getting Started
Clone the project to your local system and `cd` into `workout-planner-fe`. 
You will need to download the `Expo` app on your phone to run curlFriend locally, as well as install the dependencies using `npm i`
