## Version

Current Version: 1.0.1

### Version History

- 1.0.1 (2023-07-06): Project compatability changed to ES6 Standard
- 1.0.0 (2023-07-05): Initial release

# Guide to run the application

## Install dependencies by executing below command
npm install

## Create .env file. Then copy & paste the content inside env.dev

## To run this application, execute below command
npm start -- --greeting=hello --who=Supun --width=400 --height=500 --color=Pink --size=100 --fileName=cat-data.jpg

## To run unit test 
npm run test


# Summary
Application is implemented in flexible and adaptable for different asset types, such as images and videos, I have used the Factory Pattern and created a common interface for the merging process.Additionally I have followed Single Responsibility Principle(SRP) among these classes, then added environment configuration file and now application is adaptable with different environments.And also I have created constants in a separate file and used it to avoid magic strings.