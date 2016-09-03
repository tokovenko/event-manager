import angular from 'angular';
import angularCookies from 'angular-cookies';

import UserService from './user.service';
import UserMenuComponent from './user-menu/user-menu.component';
import UserSignInComponent from './user-sign-in/user-sign-in.component';

export default angular
    .module('app.user', [angularCookies])
    .service('UserService', UserService)
    .component('emUserMenu', UserMenuComponent)
    .component('emUserSignIn', UserSignInComponent)
    .name;
