# custom-github-action

### In order to create package.json. Please run
* npm init -y 

### Now install the dependencies using npm. npm ensures that package.json get updated automatically with all the dependencies.

Run below command to install prod dependencies and add them to package.json
* npm install --save-prod @actions/github @actions/core

Run below command to install dev dependencies and add them to pacakge.json
* npm install --save-dev @vercel/ncc typescript prettier