# custom-github-action

### In order to create package.json. Please run
* npm init -y 

### Now install the dependencies using npm. npm ensures that package.json get updated automatically with all the dependencies.

Run below command to install prod dependencies and add them to package.json
* npm install --save-prod @actions/github @actions/core

Run below command to install dev dependencies and add them to pacakge.json
* npm install --save-dev @vercel/ncc typescript prettier

* package.json contains all the dependencies
* package-lock.json contains all the sub dependencies.

### NOTE
* In order for you to have same environment we now just need to run npm install and we should be good.

* In order to convert typescript to javascript we are using tsc. We can configure tsconfig.json to configure the behavior of tsc. Run tsc --init to create a default typescript configuration file.

