# Socially Twiegand

This is my working version of the Angular-Meteor tutorial app.

See: [Socially - A Meteor-Angular Tutorial App] (http://www.angular-meteor.com/tutorials/socially)

# Deploy

DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy socially.twiegand.com --settings './settings.json'
See: [Deploy to Galaxy] (http://guide.meteor.com/deployment.html#galaxy)

# Socially Tutorial App

In online documentation watch out for &lt being substituted for < or &gt substituted for >

## Command Line Procedures step by step

### Meteor Setup
First step — let's install Meteor!

Open your command line and paste this command:
$ curl https://install.meteor.com/ | sh

Now let's create our app — write this in the command line:
$ meteor create socially

Now let's see what we got. Go into the new folder:
$ cd socially
Run the app like so:

$ meteor
.... App running at: http://localhost:3000/

## Adding Angular 1

To work with AngularJS in the client side, we need to remove the default UI package of Meteor, called Blaze.
We also need to remove Meteor's default ECMAScript2015 package named ecmascript because Angular-Meteor uses a package named angular-babel in order to get both ECMAScript2015 and AngularJS DI annotations.

So let's remove it by running:
$ meteor remove blaze-html-templates
$ meteor remove ecmascript

Now let's add the Angular 1 package to Meteor, back in the command line, launch this command:
$ meteor npm install --save angular angular-meteor
$ meteor add angular-templates pbastowski:angular-babel

That's it! Now we can use Angular 1's power in our Meteor app.

## Inserting parties from the console
Items inside collections are called documents. Let's use the server database console to insert some documents into our collection. In a new terminal tab, go to your app directory and type:

$ meteor mongo
This opens a console into your app's local development database. At the prompt, type:

$ db.parties.insert({ name: "A new party", description: "From the mongo console!" });

## Removing parties

$ db.parties.find();
Now choose one party you want to remove and copy it's id property. Remove it using that id (replace N4KzMEvtm4dYvk2TF with your party's id value):

$ db.parties.remove( {"_id": "N4KzMEvtm4dYvk2TF"});

### Testing
One of the new features of Meteor 1.3 is support for testing. In Socially we want to use Jasmine. Let's add it to our app!
$ meteor add sanjo:jasmine

You probably want to see result of tests:
$ meteor add velocity:html-reporter
$ meteor add velocity:console-reporter

We also have to use angular-mocks:
$ meteor npm install --save-dev angular-mocks

Now, add a script to run unit-tests:

Modify package.json (marked in red)

  "name": "socially",
  "private": true,
  "scripts": {
   "start": "meteor run",</span>
   <span style='color:red'>"test:watch": "meteor test --driver-package sanjo:jasmine"</span>
  },
"dependencies": {
  
Use this command to run tests:
$ meteor npm run test:watch

## UI ROUTER
The routing functionality added by this step is provided by the ui-router module, which is distributed separately from the core Angular 1 framework.

Type in the command line:
$ meteor npm install --save angular-ui-router

## User Accounts - Authentication and Permission

One of Meteor's most powerful packages is the Meteor account system.
Right now, our app is publishing all the parties to all the clients, and all the clients can change those parties. The changes are then reflected back to all the other clients automatically.
This is super powerful and easy, but what about security? We don't want any user to be able to change any party...

First thing we should do is to remove the insecure package that automatically added to any new Meteor application.
The 'insecure' package makes the default behaviour of Meteor collections to permit all.
By removing that package the default behaviour is changed to deny all.

Execute this command in the command line:

$ meteor remove insecure

Now, we need to write an explicit security rule for each operation we want to allow the client to do on the Mongo collection.
So first, let's add the accounts-password Meteor package. It's a very powerful package for all the user operations you can think of: login, sign-up, change password, password recovery, email confirmation and more.

$ meteor add accounts-password

Now we will also add the dotansimha:accounts-ui-angular package. This package contains all the HTML and CSS we need for the user operation forms.
Later on in this tutorial we will replace those default account-ui forms with custom Angular 1 forms.

$ meteor add dotansimha:accounts-ui-angular

## Social login

We also want to let users login with their Facebook and Twitter accounts.
To do this, we simply need to add the right packages in the console:

meteor add accounts-facebook accounts-twitter

## Privacy

Publish and subscribe to data is very different from other methods, such as using REST APIs. So don't miss the articles in the section below for deeper understanding how they work.
Right now our app has no privacy, every user can see all the parties on the screen.
So let's add a public flag on parties - if a party is public we will let anyone see it, but if a party is private, only the owner can see it.
First we need to remove the autopublish Meteor package.
autopublish is added to any new Meteor project. It pushes a full copy of the database to each client. It helped us until now, but it's not so good for privacy...

Write this command in the console:

$ meteor remove autopublish

## pagination directive
Now we need a UI to change pages and move between them.
In Angular 1's eco system there are a lot of directives for handling pagination.
Our personal favorite is angular-utils-pagination.
To add the directive add its Meteor package to the project:
meteor npm install --save angular-utils-pagination

Add it as a dependency to our Socially app:

## Getting the total count of a collection
Getting a total count of a collection might seem easy, but there is a problem: The client only holds the number of objects that it subscribed to. This means that, if the client is not subscribed to the whole array, calling find().count on a collection will result in a partial count.
So we need access on the client to the total count even if we are not subscribed to the whole collection.
For that we can use the tmeasday:publish-counts package. On the command line:

meteor add tmeasday:publish-counts

This package helps to publish the count of a cursor in real-time, without any dependency on the subscribe method.

## To make our lives easier, we can just use underscore package.

$ meteor npm install --save underscore
13.3  Use underscore imports/ui/filters/uninvitedFilter.js »


## Check and Email
First, we check validation with the the check function.
To use check we need to add the check package:

meteor add check

The rest of the code is pretty much self explanatory, but important thing to notice is the Email function that sends email to the invited client. This function can't be called from the client side so we have to put it inside an isServer statement.
Don't forget to add the email package to your project in the command line:

meteor add email

And import Email object from its module:

## Google Maps
Let's add location to our parties.
The most popular maps widget is Google Maps so let's use that.

First, let's add the angular-google-maps Meteor package:
meteor npm install --save angular-google-maps

We also have to install another package:
meteor npm install --save angular-simple-logger

Then let's create a PartyMap component:

## Adding and importing Bootstrap 4
First, we need to add Boostrap 4 to our project - so let's do that.
Run the following command in your Terminal:

meteor npm install bootstrap@4.0.0-alpha.2 --save

Import bootstrap client/main.js »

import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';


## Add LESS
OK, simple styling works, but we want to be able to use LESS.
We can't add LESS from NPM because it is a compiler and we want it to be a part of Meteor build - so we will add it from Atmosphere:

$ meteor add less


