<a href="https://remembermerecipes.com/">
    <img src="https://github.com/cs394-w19/green-rememberme/blob/master/public/logo.png" alt="RememberMe Recipeslogo"     title="RememberMe Recipes" align="right" height="60" />
</a>

# Remember Me Recipes
Built with React as a PWA

Northwestern University
EECS 394
Ryan McHenry, Vanessa Chu, Mingyao Tan, Michael Guo, Cristobal Garcia


## Installation
```
$ git clone https://github.com/cs394-w19/green-rememberme.git
$ cd green-rememberme
$ npm install
```

## Database Setup 
1. Create a [Firebase](https://firebase.google.com/) account and make a new project.
2. Create a new [Cloud Firestore](https://firebase.google.com/docs/firestore/) database for your project.
3. Within the Cloud Firestore database add a "recipes" collection and a "family" collection.
4. Open project settings and locate the "Your Apps" section. Click the "</>" icon.
5. Copy the "config" variable. 
6. Replace the placeholder config in ```src/components/Firebase/firebase.js``` with your config.

## To Run Locally
1. In project root directory: ```$ npm start```
2. Open your browser to [http://localhost:3000](http://localhost:3000)

## Deployment
1. Install the Firebase CLI: ```$ npm install -g firebase-tools```
2. [Connect](https://firebase.google.com/docs/hosting/quickstart) your local project to your Firebase project.
3. Create an optimized production build: ```$ npm run build```
4. Deploy: ```$ firebase deploy```
