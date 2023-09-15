sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();

                view.setModel(productModel, "modeloProduto");
            },
            onPressBuscar: function() {
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();

                let parameters = {
                    url: "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method: "GET",
                    async: true,
                    crossDomain: true
                };

                $.ajax(parameters).done(function(response){
                    let oProdModel = this.getView().getModel("modeloProduto");
                    oProdModel.setData({});
                    oProdModel.refresh();
                    oProdModel.setData(response);
                    oProdModel.refresh();
                }.bind(this)).fail(function(){

                }.bind(this));


            },
            onClickImagem: function(oEvent) {
                urlObject.redirect(oEvent.getSource().getSrc(), true);
            }
        });
    });
