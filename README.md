# Getting Started

Example of using a CAP project to expose either CAP and XSJS services

# Reason 
Porting of XSJS projects from HANA Express to BTP Cloud Foundry:
- all hdbtables converted to CAP entities
- old xsjs services transported as-is (and converted gradually)
- new services exposed with CAP

# Description
The main project is a classic CAP project, `server.js` is used to create an instance of the `@sap/xsjs` compatibilty layer and to bind it to the root path.

Exposed CAP services:
- `catalog/Books`, to get a list of Books
- `catalog/incrementStock`, to increment the stock of the Book with ID 1

Exposed XSJS service:
- `test.xsjs`, very simple service 

(note: there are no examples of xsjs service connected to a DB, however we don't have problems reading from db hana or exposing data with .xsodata files)

# How to run
- clone this repo
- launch the project with `cds watch`
- launch the http calls in file `test.http`

# Remarks
`@sap/xsjs` use the package `@sap/fibrous`, when we load this package before bootstraping of cds we have a strange beaviour, the `cds.load` method return an Object instead of a Promise so we get the error:
```
TypeError: cds.load(...).then is not a function
    at cds_server (/home/sbarzaghi/test/test-together-cap-xsjs/node_modules/@sap/cds/server.js:46:50)
    at Object.serve (/home/sbarzaghi/test/test-together-cap-xsjs/node_modules/@sap/cds/bin/serve.js:175:24)
    at async /home/sbarzaghi/.nvm/versions/node/v14.17.0/lib/node_modules/@sap/cds-dk/bin/watch.js:153:5
```

To workaround the issue we moved the import of the package `@sap/xsjs` from the event `bootstrap` to `served`
