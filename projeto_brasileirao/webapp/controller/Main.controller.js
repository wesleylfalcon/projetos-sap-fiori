sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {
               /* var dadosGerais = {
                    nomeCampeonato: "Brasileirão 2023 no canal FioriNET",
                    rodada: 99
                };

                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var tela = this.getView();
                tela.setModel(dadosModel, "modeloDadosGerais");*/

                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                var dadosModel = new JSONModel();
                var classifModel = new JSONModel();
                var partidasModel = new JSONModel();

                dadosModel.setData(dadosGerais);
                classifModel.setData(classificacao);
                partidasModel.setData(partidas);

                var tela = this.getView();
                tela.setModel(dadosModel, "ModeloDadosGerais");
                tela.setModel(classifModel, "ModeloTabela");
                tela.setModel(partidasModel, "ModeloPartidas");

                this.onBuscarClassif();
                this.onBuscarDadosGerais();
            },

            onBuscarClassif: function() {
                var oModeloTabela = this.getView().getModel("ModeloTabela");
                var config = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization" : "Bearer live_27ed4b642d070688d10b521e8e35aa"
                    }
                };

                $.ajax(config).done(
                    function(response){
                        oModeloTabela.setData(
                            {
                                "Classificacao": response
                            }
                        );
                    }.bind(this)
                );
            },

            onBuscarDadosGerais: function() {
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");
                var config = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization" : "Bearer live_27ed4b642d070688d10b521e8e35aa"
                    }
                };

                $.ajax(config).done(
                    function(response){
                        oModeloDadosGerais.setData(response);
                        var rodadaAtual = response.rodada_atual.rodada;
                        this.onBuscarPartidas(rodadaAtual);
                    }.bind(this)
                );
            },

            onBuscarPartidas: function(rodadaAtual) {
                var oModeloPartidas = this.getView().getModel("ModeloPartidas");
                var config = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization" : "Bearer live_27ed4b642d070688d10b521e8e35aa"
                    }
                };

                $.ajax(config).done(
                    function(response){
                        oModeloPartidas.setData(response);
                    }.bind(this)
                );
            }
        });
    });
