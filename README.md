This application uses JSON-Server API to mock a client-server connection with a real server.
 You can find db-form.json database that will contain all the submitted data in the usersData array in the root folder of this application. 

Please, follow these steps to run the fake server:
1. install json-server globally:  
    npm install -g json-server;
2. run your database file on your localhost (from the application root folder):
    json-server --watch db-form.json; 
    Data will be served on: http://localhost:3000/usersData;
3. now, to start development server run from termional: 
    npm start;   
    The application will be served on: http://localhost:3001;
