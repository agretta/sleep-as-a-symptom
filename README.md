# sleep-as-a-symptom
**Team JDA-8308**
**CS 3312/LMC 3431**
**Fall 2018-Spring 2019**

Typically, when researchers want information about the way we sleep, they conduct a laboratory sleep study, involving expensive equipment and a huge hassle for participants. The app Sleep as a Symptom helps two researchers from the University of Alabama at Huntsville to gather that sleep data from people’s FitBits which they’re already using regularly. With the FitBit sleep data, the researchers can conduct their study with far more information at a far lower cost than with a traditional method.

## Release Notes
Release Notes must address the following information:
### New Software Features
The entire web application is new this release
**An overview of features:**
* Participant and Researcher accounts
* FitBit integration
* Admin management (for researchers)
* Sleep data viewer (for participants)
* Account management
* Health data loading
* Sleep data logging
    
### Known bugs and defects
* Missing non-json sleep data download abilities
* manual interaction to log sleep data is required

# Install Guide
The Install Guide must address the following questions as applicable to the team’s product/system:

## Pre-requisites:

### Dependent libraries that must be installed:

* npm version 6.5 or later 
* Node version 8.16.0 or later
* A modern Web browser

### Download instructions: how will the customer and users get access to the project?
Clone the project from Github to a local directory

```
git clone https://github.com/agretta/sleep-as-a-symptom.git
```

## Build instructions:

Run ``` npm install ``` in the main directory of the project. This will install all the packages in package.json that are needed to run the project.

## Installation of actual application:

To run the website publically, register the site with whatever node-compatable domain service is being used and provide and launch the files there.

## Run Instructions:
 Run ``` npm start ``` in the project directory to launch the application.

## Troubleshooting: 
#### Node or npm is not the correct version
* To correct this: install either the indicated version of node and/or npm.

Currently there are no other known errors during installation that the team has encountered.
