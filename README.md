Set Up Guide

Prerequisites

Python 3.12.x
Node.js & nmp
MySQL


If need installation, here are the links to install 
MySQL
Install here: https://dev.mysql.com/downloads/installer/
Make sure to select your corresponding operating system. Install MySQL Workbench too if it doesn't come with the default installation.

Python
https://www.python.org/downloads/

Node.js & nmp
https://nodejs.org/en

Clone the Repository Your System

Open Command Prompt/Powershell on Windows or Terminal on Mac

Change into the directory that you want to put the project in e.g:

cd Desktop
Clone the repo and go into it

cd Desktop  # or any directory where you want the project
git clone https://github.com/MrHitaDavid3/Library_Book_Front.git
cd Library_Book_Front
code .  # optional, opens the project in VSCode

Set Up Each Folder

Open a new Terminal inside VSCode

For Windows: Ctrl + Shift + 

For Mac: Command + Shift + 
Open client folder

cd client
npm install
npm run dev
Open a different terminal to set up server

cd server

#Windows
py -3 -m venv .venv
.venv\Scripts\activate

#macOS/Linux
python3 -m venv .venv
source .venv/bin/activate

Make sure your virtual environment is active or install from requirements.txt
pip install -r requirements.txt

Run the backend server
python app.py

Set up the MySQL server
Open db.py or any files which connect the database
python db.py

*Open the server and in the URL add /api/users to the end of the URL

Go to the frontend server and refresh it. If it is working properly, you will see a list of names.

Test MySQL database

Open the create_database.py file and update the password in the connector to whatever your MySQL password is.
Run the file.
If it works correctly, you should be prompted to log in or to sign up, once you sign up and login you will be able to explore the program and mess around with it
