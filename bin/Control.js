sap.ui.define(['sap/ui/core/Control'],
    function(base) {
        'use strict';

        var ControlName = base.extend('namespace.controlname', {
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
        ControlName.prototype.init = function() {};
        return ControlName;

    }, true);
