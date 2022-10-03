### README.MD

### --- REPOSITORY NTAFrontend HAS TO BE USED IN COMBINATION WITH THIS ONE --- ###

First generate an API key and clientID at the hellosign website (this is an paid API!). In ./config/secrets.js type the following module.exports (case sensitive):

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET",
  API_KEY: "YOUR_API_KEY",
  clientId: "YOUR_CLIENTID",
};


This file is included in .gitignore

### About the project
This project manages the signing of legal binding documents using the HelloSign API. HelloSign is a company that companies use to let (e.g.) customers sign legally binding documents. Unfortunately, HelloSign's website does not have a lot of funcitonality, and moreover, documents have to be prepared by the administrators before it's sent to the customer for signing. The company I work for asked if it's possible to automate this process, as well as creating a more maintainable website, where documents are stored more organized and where you're be able to also search for data thats on a document, instead of only the document name. Lastly, the workflow is not optimized for customers, who until now had to ask for papers before they could continue buying our product. This costs time, energy and manpower, and therefore we decided to automate this. The division that should be using this medium is called the Onboarding and Compliance division, and hence the name of this medium is call Global Catering Supplies Onboarding.

### Project concept
Now that the concept is clear, we can focus on the implementation. There are two strategies that the API offers: 1. Embedded signing; 2. Non-embedded signing. The difference is that with the embedded signing, the signing of the document happens on our website. The document is opened in an iFrame, and there HelloSign handles everything (populating fields, IP address checks, signing etc.) Whereas non-embedded signing redirects the customers to the hellosign website, and after signing again back to our website. Since we want it to be the easiest for the customer without too many redirections and different webpages, we choose the embedded signing. This also offers more stability on the long run (the salespeople tell us :P).
After reading the API documentation, I came to the following conclusions: 1. The API is a BETA, and therefore not all the functionality works 100%. 2. The API is also very limited, particularly the embedded part, and therefore can not implement all the functionality we want. 3. Because of the API's limitations, some functionality had to be reduced, so that our database will be synchronous to the HelloSign's database.

### Project features
Now that the idea is clear, we can go in depth about the features we need.
1. Administrators and salespeople need to be able to login. Only Administrators will be able to delete customers, companies or documents.
2. Clients must be able to go to the website and sign the documents they want right away. Also, if they're unsure about which documents to sign, they need to be able to take a roadmap. When filling in the required information, the roadmap "handles" the information and on the last step shows the available documents.
3. Customers must retrieve an email with the signed documents.
4. Customers must be able to retrieve all the information/documents we have about them when signing in with only the documentnumber of their passport.
5. Multiple people must be able to sign for multiple companies, so many to many relations are needed.