# Jet Fuel

## Abstract

Jet Fuel is a URL shortening service. Users are able to create a login/ sign in/ create a folders/ add urls to be shortened. Folders and shortened urls are stored on the database.  

## Tech Stack

* Express
* Knex
* PostgreSQL
* ES6
* CSS3
* JQuery
* HTML5

## Authors

* [Franklin Crosby](https://github.com/Obleo33/)
* [Staci McWilliams](https://github.com/stacimcwilliams)

## Base Expectations

>Given that I am an anonymous user of the site
When I visit the site and provide a folder name to the service
Then I expect it to create that folder for storing URLs

>Given that I am an anonymous user of the site
When I visit a folder and provide a URL to the service
Then I expect it to return a service shortened URL for that folder

>Given that I am an anonymous user of the site
When I follow a service shortened URL
Then I expect to be redirected to the original URL

>Given that I am an anonymous user of the site
When I visit a folder
Then I expect to see all URLs relating to that folder

>Given that I am an anonymous user of the site
When I visit a folder
Then I expect the ability to sort the folder's URLs by popularity (number of visits)
And I expect the ability to sort the folder's URLs by how recently they were added
Things to Think About

## Website is live at [HERE](https://jetfuel-.herokuapp.com/)

### Install
* $ git clone
* $ npm install
* $ npm start

### Use
* Type in a folder name and click "Create" button to create a new folder
* Click on the folder name in the folders list to open
* Add a name and url into the "Add New Link" section and click the "Crushify!!!" button to create a shortened link
* Crushed links are listed below the new link form