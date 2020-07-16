sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function(Controller,JSONModel,MessageToast) {
  "use strict";

  return Controller.extend("com.apptech.ui5dayone.controller.Login", {
    onInit:function(){
      ///CREATE JSONMODEL OBJECT LOGIN JSON
      this.oModel = new JSONModel("model/login.json");
      ///SETTING OF MODEL OF THIS VIEW
      this.getView().setModel(this.oModel,"oModel");
    },
    onPressButton:function(oEvent){
      console.log("Hello World");
    },
    onLogin:function(){
      var oDatabase = this.oModel.getData().DataRecord.Database;
      var oUsername = this.oModel.getData().DataRecord.UserName;
      var oPassword = this.oModel.getData().DataRecord.Password;
      var oLoginCredentials = {};
          oLoginCredentials.CompanyDB = oDatabase;
          oLoginCredentials.UserName = oUsername;
          oLoginCredentials.Password = oPassword;
      $.ajax({
        url: "https://18.136.35.41:50000/b1s/v1/Login",
        data: JSON.stringify(oLoginCredentials),
        type: "POST",
        crossDomain: true,
        xhrFields: {
        withCredentials: true
      },
        error: function (xhr, status, error) {
        var Message = xhr.responseJSON["error"].message.value;
        MessageToast.show(Message);
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
          }
        });
});
