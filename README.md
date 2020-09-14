# IVGC-alumni-website/

### How was it done ?

The code is written in Typescript/TSX using ReactJS framework. (create-react-app project)

The design component are extracted from [Material UI](https://material-ui.com/)


### How to setup your environment to start working

You need to install **nodeJS** 

Then you need to **clone** the repository of the project **ekkiden.jobs**  on Github: 

[https://github.com/TranTerrence/IVGC-alumni-website/](https://github.com/TranTerrence/IVGC-alumni-website/)

Then open a terminal and navigate to the folder where you have cloned it.

Execute

<pre>npm install
</pre>

This will install all the dependencies, and library used by the project.

<pre>npm start
</pre>

This will launch a node server on your localhost, and you should now be able to see the app running in your browser.

You can now start working on the project.

I recommend **using VS code IDE** with the React extensions

### How to setup Firebase ?
You will need to create a **.env** file that will contains all the firebase configurations and keys. Ask the lead project for more info.


Please follow the tutorial on the [firebase official documentaion](https://firebase.google.com/docs/hosting/quickstart) to get an idea of how it works.
Before executing the `firebase deploy` command please make sure that you have changed its hosting public config to point towards the build folder.

firebase.json
```JSON
{
  "hosting": {
    "public": "build",
     ...
  }
}
```

### How to deploy the app online ?


As you know we are using Firebase as a provider so make sure setup Firebase before.
Make sure to test everything on your local machine before publishing a new version, it **will erase the current production version**

Open a terminal and navigate to the root folder of the project.
execute `npm run build` this will generate a build of the project in the build folder.
Now execute the command `firebase deploy -m "My message for this release"` The -m option is optional if you want to associate the message to the release.


## Files Organization


### components
Contains all the react components that can be used in different files.

#### constants
Folder containing all the constants used in the app (strings, theme colors, ...)

#### pages
Folder containing each pages of the app

### App.js
Main file 


## Available React Scripts

In the project directory, you can run these using yarn or npm:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
