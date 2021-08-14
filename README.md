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

### Added the configuration to read the commit message to validate it


### Modules
* They define reusable code.
* They are always evaluated in strict mode. Strict mode was added to javascript 5.
* Modules are fundamental to typescript and should always be used.
* Any typescript file that contains either an import or export statement is treated as module.
* Modules are never evaluated in global scope. It is always local. Only exported code can be used outside of the module.
* Modules are always deferred and loaded asynchronously and are only loaded when html parsing is finished.
* es2015 is the first javascript version that natively support modules.
* esmodules-web-server is the minimum required web server for local development.

### How to use this action

```
uses: amitkumardube/custom-github-action@main
with:
    json_file: "benchmark.json"
    comparison_json_file: "old_benchmark/benchmark.json"
    token : ${{ secrets.GITHUB_TOKEN }}

``` 