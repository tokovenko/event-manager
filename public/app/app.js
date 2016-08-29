var angular = require('angular');
var router = require('angular-ui-router');
var ngMaterial = require('angular-material');

var ngMaterialCss = require('angular-material/angular-material.css');
var sass = require('./app.scss');

var pagesModule = require('./pages');
var routing = require('./app.routes');
var mainLayout = require('./layout/main/main.component');

angular
    .module('app', [pagesModule, ngMaterial, router, mainLayout])
    .config(routing);
