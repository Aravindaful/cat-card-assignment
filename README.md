# Guide to run the application

## Install dependencies by executing below command
npm install

## Create .env file. Then copy & paste the content inside env.dev

## To Run this application, execute below command
npm start -- --greeting=hello --who=Supun --width=400 --height=500 --color=Pink --size=100 --fileName=cat-data.jpg

## To Run unit test cases
npm run test


# Summary
Application is implemented in flexible and adaptable for different asset types, such as images and videos, I have used the Factory Pattern and create a common interface for the merging process.Additionally I have followed Single Responsibility Principle among these classes, then added environment configuration file and now application is adaptable with different environments.And also I have created constants in a separate file and used it to avoid magic strings.