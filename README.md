### README.MD

### --- REPOSITORY NTAFront HAS TO BE USED IN COMBINATION WITH THIS ONE --- ###
### --- CHECKOUT [https://github.com/JS1209/NTAFront] FOR THE PROJECT EXPLANATION --- ###

First generate an API key and clientID at the hellosign website (this is an paid API!). In ./config/secrets.js type the following module.exports (case sensitive):

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET",
  API_KEY: "YOUR_API_KEY",
  clientId: "YOUR_CLIENTID",
};


This file is included in .gitignore
