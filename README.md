The online entry system for the National Scout Rifle Championship.

* Hosted on AWS, using the HSRC account
* A React app, written in Typescript
* Commits to 'main' are automatically built and deployed to https://entry.nationalscoutriflechampionships.org.uk

To run locally:

* `npm install` before first run 
  * [Install Node](https://nodejs.org/en/) if not already installed
* Have `aws_access_key_id` and `aws_secret_access_key` defined
  * In ~/.aws/credentials on my mac
* `npm start` will run the entry system on http://localhost:3000/

AWS Services Used:

* Amplify - Builds and hosts the application
  * Linked to GitHub to automatically build and deploy changes on 'main'
* DynamoDB - Stores entries
* Lambda - Code to read and write entries
* API Gateway - Secure API to the lambda functions
* Cognito - Manages end-user accounts and authentication
* Route53 - Domain management for nationalscoutriflechampionships.org.uk

Plus:

* Lightsail - Hosting the Wordpress installation for https://www.nationalscoutriflechampionships.org.uk
