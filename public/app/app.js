import angular from 'angular';
import router from 'angular-ui-router';
import ngMaterial from 'angular-material';

import ngMaterialCss from 'angular-material/angular-material.css';
import sass from './app.scss';

import pagesModule from './pages';
import routing from './app.routes';
import mainLayout from './layout/main/main.component';

angular
    .module('app', [ngMaterial, router, mainLayout, pagesModule])
    .config(routing);
