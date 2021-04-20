# CompositeUi - Node (SSR) + Create React App + Redux + React Router

## Installation
* `yarn install`: Downloads dependencies
* `yarn start`: Starts Create React App (CRA) built in server
* `yarn serve`: Starts Node for Server Side Rendering (SSR)

## Folder structure
* `build`: Production ready files created by `yarn build`
* `node_modules`: Vendor folder with required dependencies
* `public`: Files served by CRA
* `server`: Tiny Node.js app to run SSR
* `src`: Application code
    * `api`: Clients to connect with API endpoints. Use one folder for each provider (f.e. WordPress)
    * `routing`: Routes used by the application. Use one folder for each concept (f.e. Posts) for large applications
    * `store`: Actions and reducers that modify store's state. Use one folder for each concept (f.e. Posts)
        for large applications
    * `ui`: React components using atomic folder structure. One folder for each element containing related files (CSS,
        React component, tests...)
    * `index.js`: Application entry point
    * `store.js`: Loads all reducers


## Getting started
To test the application you have to follow the next guide:

Firstly, you need to install the dependencies.
```bash
$ yarn install
``` 
Then you have to compile de JavaScript files with npm scripts.
```bash
$ yarn build
```
After that, you can launch the tiny Node.js server with the following command. It uses *Nodemon* to
catch the errors and relaunch the server:
```bash
$ yarn serve
```
Finally, you can load the *Webpack's dev-server* with the following command:
```bash
$ yarn start
```
That's all, now you can test server side rendering using Curl via CLI.
```bash
$ curl http://localhost:3000/1
```
And you can test client side rendering using browser.
```bash
$ open http://localhost:3001/1
```

# Deployment to Google Cloud
Run the docker service and build a new image for the application:
```
$ docker build -f etc/docker/Dockerfile -t storybook .
```

Tag the image with the reference to the *Google cloud* image repository, and push the image:
```
$ docker tag storybook eu.gcr.io/plantillas-lin3s-2019/lin3s-storybook
$ docker push eu.gcr.io/plantillas-lin3s-2019/lin3s-storybook
```

From [Google Cloud](https://cloud.google.com):
1. Open the project `Plantillas LIN3S`

2. Go to the section `Cloud Run` on the left menu. 

3. A service called  *lin3s-storybook* should be running in the list at the dashboard, click on the
service to enter the details.

4. To deploy a new release, click over *deploy a new revision* from the top-right menu, select the
latest image and push the deploy button.
