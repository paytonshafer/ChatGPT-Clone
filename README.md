# ChatGPT Clone
This my ChatGPT clone created using React for the frontend and a Node.js server for the backend. The page has the ability to send a message and using the OpenAI API get a response from the model gpt-3.5-turbo. The user will have the ability to create a new chat as well as revisit their previous chats using the history on the side. The user can also choose to delete a chat by pressing the X next to the chat they want to delete. By default the app opens in dark mode but by using the toggle in the bottom left the user can switch back and forth between light and dark modes. The API calls are done by the backend and the frontend makes a POST request to the backend which then takes the POST from the frontend and does a POST to OpenAI and returns the response to the frontend. 

# Usage
You will first need to clone the repository and cd to the outer most directory (most likley named chatgpt-clone or chatgpt-clone-main). Once there you need to ensure that all the correct dependancies are installed so you will run:
```sh
npm install
```
This command will install all the needed packages and dependancies to run the project. Next you need to add your own OpenAI API key to the app so that you can make API calls. To do this ensure that you have your key and run:
```sh
cp .env.template .env
```
This creates a .env file for your project. Now, open the .env file and put you API key where it says PLACE_YOUR_API_KEY_HERE. Now you are ready to start the project. You need to have two terminal windows open both in the same directory (the same one where you ran npm install) where one window is for the frontend and the other is for the backend. In the first terminal we will start the frontend by running:
```sh
npm run start:frontend
```
This command will start the frontend of the project and direct you to the webpage which can be accessed at http://127.0.0.1:3000 and you can stop the frontend by typing CONTROL-C into the terminal window. Next open the other window and here we will start the backend with the command:
```sh
npm run start:backend
```
To stop the backend type CONTROL-C into the terminal window. Now the project is fully running and acts as a ChatGPT clone.
