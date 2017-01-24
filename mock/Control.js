sap.ui.define(['sap/ui/core/Control'],
    function(base) {
        'use strict';
		
		//  @ui5JSDoc
        var Control = base.extend('namespace.controlname', {
            metadata: {
                properties: {
                    property1: {
                        type: "boolean",
                        defaultValue: true
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
					baseClass: "sap.ui.core.Control"
                }
            }
        });
        Control.prototype.init = function() {};
        return Control;

    }, true);
