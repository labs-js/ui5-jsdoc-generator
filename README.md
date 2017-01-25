# ui5-jsdoc-generator 
Creates automatic documentation for control libraries done in ui5 

## Install
    npm install ui5-jsdoc-generator --save-dev
 
## Setup  
    node ./node_modules/ui5-jsdoc-generator/bin/ui5-jsdoc.js --input=inputFolder --output=outputFolder

## Template 
Create a file (templates/template.html) inside your web project with the following content:
```html 
        @class
        <b> #__CONTROL_NAME__# </b> <br>
        <i> #__CONTROL_DESCRIPTION__#</i>
        
        <br>
        <br>
        Supported settings are:
        <ul>
        <li>Properties
            <ul>#__PROPERTIES__#</ul>
        </li>
        <li>Aggregations
            <ul>#__AGGREGATIONS__#</ul>
        </li>
        <li>Associations
            <ul>#__ASSOCIATIONS__#</ul>
        </li>
        <li>Events
            <ul>#__EVENTS__#</ul>
        </li>
        </ul>
        <br>
        In addition, all settings applicable to the base type {@link #__BASE_CLASS__#} can be used as well.
        
        @extends #__BASE_CLASS__# 
        
        @author #__AUTHOR__#
        @version #__VERSION__#
        
        @public
        @alias #__CONTROL_NAME__# 
```

# JSDoc integration 
__ui5-jsdoc-generator__ can be easily integrated with jsdoc using an npm script:

Run the following commands 

* `npm init` (_note: we're creating package.json_)
* `npm install jsdoc --save-dev`
* `npm install ui5-jsdoc-generator --save-dev`

Edit the script tag of the package.json with the following information 
```json    
    {
      "name": "test",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "ui5JSDoc":"node ./node_modules/ui5-jsdoc-generator/bin/ui5-jsdoc.js --input=inputControlFolder --output=tmpJSDoc",
         "jsdoc":"./node_modules/.bin/jsdoc -r tmpJSDoc -d tmp ",
          "doc": "npm run ui5JSDoc && npm run jsdoc"
      },
      "author": "",
      "license": "ISC"
    }
```
And finally, execute `npm run doc`

# Why ?
A common ui5 control looks like the following code - 
```javascript
    sap.ui.define(['sap/ui/core/Control'], function(base) {
        'use strict';
    
        var Control = base.extend('namespace.controlname', {
            metadata: {
                properties: {
                    property1: { type: "boolean", defaultValue: true }, 
                    property2: { type: "string", defaultValue: "defaultValueString" }
                },
                aggregations: { 
                    agg1: { type: 'namespace.aggregation' }
                },
                events: { click: {} },
            }
        });
        Control.prototype.init = function() {};
        return Control;
    }, true);
```
Everything is fine until the alarm rings with the following sound 'where is the documentation?'. No problem sir! We have a "quick" solution on mind. You go through every control in your library adding the jsdoc annotations manually. Now everything looks like:
```javascript
    sap.ui.define(['sap/ui/core/Control'], function(base) {
        'use strict';
    		/** 
            * @class
            * <b> namespace.controlname </b> <br>
            * <i> this is the control description</i>
            * Supported settings are:
            * <ul>
            * <li>Properties
            *     <ul>
            *      <li>property1 type: boolean defaultValue: true</li>
            *      <li>property2 type: string defaultValue: defaultValueString</li>
            *     </ul>
            * </li>
            * <li>Aggregations
            *     <ul><li>agtest type: namespace.aggregation</li></ul>
            * </li>
            * <li>Associations
            *     <ul>no value</ul>
            * </li>
            * <li>Events
            *     <ul><li>click</li></ul>
            * </li>
            * 
            * In addition, all settings applicable to the base type {@link sap.ui.core.Control} can be used as well.
            * 
            * @extends sap.ui.core.Control 
            * 
            * @author author name
            * @version 1.0.0
            * 
            * @public
            * @alias namespace.controlname 
            * 
        var Control = base.extend('namespace.controlname', {
            metadata: {
                properties: {
                    property1: { type: "boolean", defaultValue: true }, 
                    property2: { type: "string", defaultValue: "defaultValueString" }
                },
                aggregations: { 
                    agg1: { type: 'namespace.aggregation' }
                },
                events: { click: {} },
            }
        });
        Control.prototype.init = function() {};
        return Control;
    }, true);
```
Why are we adding all that information manually when ui5 stores everything into the metadata ? Isn't it unnecessary ? What happends if we add a new property? We need to change the header comments once again!
To avoid all those problems just change the control in the following way - 

```javascript
    sap.ui.define(['sap/ui/core/Control'], function(base) {
        'use strict';
    
        // @ui5JSDoc
        var Control = base.extend('namespace.controlname', {
            metadata: {
                properties: {
                    property1: { type: "boolean", defaultValue: true }, 
                    property2: { type: "string", defaultValue: "defaultValueString" }
                },
                aggregations: { 
                    agg1: { type: 'namespace.aggregation' }
                },
                events: { click: {} },
                ui5JSDoc: {
                    description: "this is a new control", 
                    author: "the best developer ever!"
                    version: "0.0.1",
                    baseClass: "sap.ui.core.Control"
                }
            }
        });
        Control.prototype.init = function() {};
        return Control;
    }, true);
```
ui5-jsdoc-generator will parse the metadata structure and generate the necessary notations for jsdoc automagically :sparkles:
