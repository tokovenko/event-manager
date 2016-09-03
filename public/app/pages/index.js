import angular from 'angular';

import EventModule from './../modules/event';
import UserModule from './../modules/user';

import IndexPageComponent from './index/index.component';
import EventPageComponent from './event/event.component';
import SigninPageComponent from './signin/signin.component';

export default angular
    .module('app.pages', [EventModule, UserModule])
    .component('emIndexPage', IndexPageComponent)
    .component('emEventPage', EventPageComponent)
    .component('emSigninPage', SigninPageComponent)
    .name;
