sap.ui.define(['sap/ui/core/Control2'],
    function(base) {
        'use strict';

        //  @ui5JSDoc
        var Control2 = base.extend('namespace.controlname', {
            metadata: {
                properties: {
                    property1: {
                        type: "boolean",
                        defaultValue: true
                    }, 
                    property2: {
                        type: "string", 
                        defaultValue: "defaultValueString"
                    }
                },
                aggregations: {
                    agtest: {
                        type: 'namespace.aggregation'
                    }
                },
                events: {
                    click: {}
                },
                ui5JSDoc: {
                    description: "this is the control description",
                    author: "author name",
                    version: "1.0.0",
                    baseClass: "sap.ui.core.Control2"
                }
            }
        });
        Control2.prototype.init = function() {};
        return Control2;

    }, true);
