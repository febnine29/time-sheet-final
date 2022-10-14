# Time sheet App

## Requirement

### Create TimeSheet App

1. Current timesheet app:

- Sample app: http://dev-timesheet.nccsoft.vn/app/main/mytimesheets
- Swagger: http://dev-api-timesheet.nccsoft.vn/swagger/index.html
- Account: `admin/123qwe`

2. Reuse current backend api and rebuild 3 features: Authentication, Task Manager, Project Manager

- Login/Logout
- [Task Manager](http://dev.timesheet.nccsoft.vn/app/main/tasks)
- [Project Manager](http://dev.timesheet.nccsoft.vn/app/main/projects)

3. Feel free for choosing which design pattern, UI lib that you want but have to match:

- Great UI/UX and Try if we can make it better than the sample.
- Clear & Clean source code - Easy for understanding and maintaining.

4. Recommended Library

- [Axios](https://github.com/axios/axios) for http request
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) for routing
- [Redux & Toolkit](https://redux.js.org/) as a stage management
- [react-hook-form](https://react-hook-form.com/get-started) or [formik](https://formik.org/docs/overview) for form handling
- [yup](https://github.com/jquense/yup) for validation
- [material-ui](https://material-ui.com/getting-started/installation/) or [antd](https://ant.design/docs/react/getting-started) for UI lib

5. Structure/Architecture

Read more in 

- https://reactjs.org/docs/faq-structure.html
- https://engineering.opsgenie.com/how-to-organize-react-files-before-its-messed-up-c85387f691be

You can chose once of the following:

    5.1. Group by File Type

        - https://reactjs.org/docs/faq-structure.html#grouping-by-file-type

    5.2. Group by Feature (Default redux cra template)

        - https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes
        - https://www.youtube.com/watch?v=w4t527D69vI
        - https://github.com/reduxjs/cra-template-redux

6. Recommended Pattern

    - https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
    - https://medium.com/@learnreact/container-components-c0e67432e005
    - [Container Component and Presentation Component](https://css-tricks.com/learning-react-container-components/?__cf_chl_captcha_tk__=pmd_d64801e1bdb4d0f6f97846725a1b020423fe8e46-1628754281-0-gqNtZGzNAuKjcnBszQii#container-components)

## [NCC React basic checklist](https://nccasia.github.io/ncc-react-basic/)

https://nccasia.github.io/ncc-react-basic/

## [How to Write Cleaner React Code](https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/)

https://www.freecodecamp.org/news/how-to-write-cleaner-react-code/

## Working Process

[View details](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/448/About)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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
