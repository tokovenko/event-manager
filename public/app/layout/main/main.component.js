import angular from 'angular';
import styles from './main.scss';
import userModule from './../../modules/user';

class MainLayoutController {}

export default angular
    .module('app.layout.main', [userModule])
    .directive('emMainLayout', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: MainLayoutController,
            controllerAs: 'vm',
            scope: {},
            template: `
                <div id="page">
                    <header layout="row" layout-xs="column">
                        <div class="logo" flex-offset="40"  flex-offset-xs="0" flex="40">
                            <a ui-sref="home">
                                <img src="images/logo.png">
                                <span>Event manager</span>
                            </a>
                        </div>
                        <em-user-menu class="menu" flex"></em-user-menu>
                    </header>
                    <content>
                        <ng-transclude></ng-transclude>
                    </content>
                </div>
            `
        }
    })
    .name;
