sap.ui.define(["sap/ui/core/Control"],
    function(base) {
        "use strict";

        var ControlName = base.extend("namespace.controlname", {
            metadata: {
                properties: {
                    width: {
                        type: "string"
                    },
                    height: {
                        type: "string"
                    },
                    source: {
                        type: "string"
                    },
                    type: {
                        type: "string"
                    }
                },
                aggregations: {},
                events: {}
            },
        });

        return ControlName;

    }, true);
