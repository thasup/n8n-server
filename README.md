![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-starter

This repo contains example nodes to help you get started building your own custom integrations for [n8n](https://n8n.io). It includes the node linter and other dependencies.

## Deployment on Render

### Prerequisites
- Ensure you have a Render account
- Node.js version 20.15 or higher

### Deployment Steps
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Runtime**: Node
   - **Node Version**: 20.15.0

### Build Process Details
The build command `npm run build` executes two key steps:
- `tsc`: Compiles TypeScript files to JavaScript
- `gulp build:icons`: Builds project icons

### Environment Variables
Set the following environment variables in your Render dashboard:
- `NODE_VERSION`: 20.15.0
- Add any additional credentials required by your n8n nodes

### Troubleshooting
- Ensure all dependencies are correctly listed in `package.json`
- Check that the build and start scripts are properly configured
- Verify that environment variables are correctly set

## Original Starter Guide

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 20. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  npm install n8n -g
  ```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).
