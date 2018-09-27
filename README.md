# Project1 # #OneManWolfPack

Home Maintenance To-Do List
============================================================================================
The application will present the user with a list of tasks to be performed on a regular cadence and track completion status.


Usage
============================================================================================
The user will select and existing property or define a new one.  Error checking on the new property input will prevent the same house from being defined twice.  While having the same name is not a technical limitation, it is a consideration for usability.  

Once the property is selected, the list of task to-do and those completed are evaluated and distributed into their appropriate categories.  The application computes the cadence and redistributes the task as appopriate.

The user can "check off" the task by clicking the button to the left.  Once selected, the presentation character changes, the element moves to the new category, and the button is deactivated.

The user can also shop for items realted to their particular task.  The item and store shopped are currently controlled centrally.  In addition to shopping, the user can add the item to the cart and initiate an online purchase.


Technologies
=============================================================================================
The application uses standard HTML, CSS, JQuery, and Javascript.  Data for the application is persisted in a Firebase Database.  The application uses the Siimple CSS Framework for some styling.  It also makes use of the Shave.js library which truncates long descriptions to a predefined number of characters.  


