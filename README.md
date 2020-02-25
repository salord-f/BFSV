# Webstore

GitHub link: [https://github.com/salord-f/BFSV](https://github.com/salord-f/BFSV)

## Requirements
Node 12 is required. [Download link](https://nodejs.org/en/download/)

### Database
MongoDB is required. [Download link](https://www.mongodb.com/download-center/community)

It’s also possible to use MongoDB in docker instead.


`docker run --rm --name mongo -p 27017:27017 -d mongo:4.2.2-bionic`

To stop mongo : `docker stop mongo`

### Client

```
cd client
npm install
```

### Server
```
cd server
npm install
npm install -g http-server
```

## Quickstart

### Client

```
cd client
npm start
```

Browse to `localhost:8000`

### Server

You must start two servers.  
For the first one:

```
cd server
npm start
```

For the second:

```
npm run http-server
```

## Features

The various features are described mainly by the page they are in for the client side and by what they bring for the server side.

### Server side
#### Authentication
Authentication is made with JSON web tokens. It enables sending user information in a compact form and makes the server entirely stateless.

#### Tests
Some basic tests are present to ensure the server is working correctly. There are two sets of tests : tests manipulating the models directly, and tests using the routes to simulate real requests.  
They are run with Mocha and Chai with the command `npm test`.

### Client side
#### Plugins

The website’s homepage is a list of all the available plugins in the store. The list of plugins is paginated : only 12 plugins are shown until you click the “Voir plus” button. This button isn’t shown if it’s the last page.
You can search for a specific plugin or just browse the whole collection. You can click on a plugin to open a more detailed view. 

<div style="page-break-after: always;"></div>

#### Plugin details

On a plugin’s detailed page you have access to all the information you need to know : the description, price, categories and much more. You can add the plugin to your shopping cart or like it if you think it’s worth it. You can also see the comments left by other users that might help you decide if you want to buy this plugin or not, or add your own. You can also try the plugin to see for yourself. If you are the owner you can also check if your plugin complies to standards by running a batch of tests.


#### Account

To submit new plugins, it is needed to be authenticated. You first need to create an account with your email and password, then connect with the same information.


#### My Plugins

This page keeps a list of all the plugins you have uploaded and bought on the store. It also contains a form for you to upload a new plugin. The plugin in itself is uploaded as a zip file.

#### Modify a plugin

In My Plugins page, you can find all your plugins. But this page also allows you to modify any of your plugins to update it. When you click on a plugin, you are redirected to a page with all the fields it is possible to modify. On this page you can also set if it is hidden or not in the store. 


#### Cart

Once connected, you are able to buy some new plugins : simply click on the “Ajouter au panier” button on a plugin’s details page. Once you want to pay, it’s as easy as clicking on the cart icon in the top right corner of the website and review all your items. You can then pay for your whole cart. The cart is saved no matter what so feel free to decide later.


## Who did what

- Laurent Benazet: plugins page with pagination and search (search is available on the whole site with homepage auto-redirection)
- Baptiste Frère: plugin details, plugin submission (optional fields and field requirements), comments on plugin details, 404 page
- Florian Salord: database models, api routes, tests, trying and testing plugins in the browser, plugin submission (required fields) with server-side unzip, token authentication, image async fetching
- Gaëtan Vialon: account page (creation and connection), cart, payment, modify plugin, client state saving with Redux