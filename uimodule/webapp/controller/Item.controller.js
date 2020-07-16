sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function(Controller,JSONModel,MessageToast) {
  "use strict";

  return Controller.extend("com.apptech.ui5dayone.controller.Item", {
    onInit:function(){
      ///CREATE JSONMODEL OBJECT LOGIN JSON
      this.oModel = new JSONModel("model/Item.json");
      ///SETTING OF MODEL OF THIS VIEW
      this.getView().setModel(this.oModel,"oModel");
    },
    onAddRow:function(){
      this.oModel.getData().Items.push(
        {
          "ItemCode": "IT0001",
          "ItemName": "Printer",
          "Quantity": 40,
          "UnitPrice": 500.00
        }
      );
      this.oModel.refresh();
    },
    onRemoveRow:function(oEvent){
      var oTable = this.getView().byId("productTable");
      var iIndex = oTable.getSelectedIndex();
      if (iIndex === -1) return;
      this.oModel.getData().Items.splice(iIndex, 1);
		  this.oModel.refresh();
    }
  });
});
