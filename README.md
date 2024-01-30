# react-learning
Learning React from scratch with real world examples


# blog app with appwrite
---- packages to install -----
- npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
- add .env and env-sample file at root level
- .env will not be pushed to github or production, so add that into .gitignore file.
- .env-sample file will hold all the variables with emppty string as reference.

// RULES TO DEFINE ENVIORNMENT VARIABLES AND ACCESS - VITE app rules - Read docs for other app type React_app etc..
- all the variables should suffix as VITE_VARIABLE_NAME
- access it as import.mata.env.VITE_VARIABLE_NAME
