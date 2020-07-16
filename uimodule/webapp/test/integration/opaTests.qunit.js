/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
  "use strict";

  sap.ui.require([
    "com/apptech/ui5dayone/test/integration/AllJourneys"
  ], function() {
    QUnit.start();
  });
});
