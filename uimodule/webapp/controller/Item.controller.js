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

      this.onLogin();
    },
    onAddRow:function(){

      var itemcode = this.oModel.getData().DataRecord.ItemCode;
      var itemname = this.oModel.getData().DataRecord.ItemName;
      var quantity = this.oModel.getData().DataRecord.Quantity;
      var unitprice = this.oModel.getData().DataRecord.UnitPrice;

      this.oModel.getData().Items.push(
        {
          "ItemCode": itemcode,
          "ItemName": itemname,
          "Quantity": quantity,
          "UnitPrice": unitprice
        }
      );
      this.oModel.refresh();
      var oItem = this.oModel.getData().Items[this.oModel.getData().Items.length - 1];
      oItem.ItemType = "itItems";
      oItem.ForeignName = oItem.Quantity;
      oItem.ItemPrices = [];
      oItem.ItemPrices.push({
        "PriceList":1,
        "Price":oItem.UnitPrice
      });
      delete oItem.UnitPrice;
      delete oItem.Quantity;

      debugger;
      this.onSaveItemMaster(oItem);
    },

    onRemoveRow:function(oEvent){
      var oTable = this.getView().byId("productTable");
      var iIndex = oTable.getSelectedIndex();
      if (iIndex === -1) return;
      this.oModel.getData().Items.splice(iIndex, 1);
		  this.oModel.refresh();
    },
    onSaveItemMaster:function(oItem){
      var settings = {
        "url": "https://202.175.234.102:50000/b1s/v1/Items",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        data: oItem
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });

    },
    onLogin:function(){
      $.ajax({
        url: "https://202.175.234.102:50000/b1s/v1/Login",
        data: JSON.stringify({"CompanyDB":"SBODEMOAU","UserName":"manager","Password":"1234"}),
        type: "POST",
        crossDomain: true,
        xhrFields: {
        withCredentials: true
      },
        error: function (xhr, status, error) {
        },
        context: this,
        success: function (json) {

        }
        }).done(function (results) {
            if (results) {
                  MessageToast.show("Welcome: " + username);
                  jQuery.sap.storage.Storage.put("dataBase",oDatabase);
                  jQuery.sap.storage.Storage.put("userCode",oUsername);
              }
          });
      // var settings = {
      //   "url": "https://202.175.234.102:50000/b1s/v1/Login",
      //   "method": "POST",
      //   "timeout": 0,
      //   "headers": {
      //     "Content-Type": "application/json",
      //   },
      //   "data": JSON.stringify({"CompanyDB":"SBODEMOAU","UserName":"manager","Password":"1234"}),
      // };

      // $.ajax(settings).done(function (response) {
      //   console.log(response);
      // });
    }
  });
});
