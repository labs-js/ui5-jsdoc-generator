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
                ui5JSDocDescription: 'this is the description'
            }
        });
        ControlName.prototype.init = function() {};
        return ControlName;

    }, true);
