class UserMenuController {

    constructor(UserService, $mdDialog, $location) {
        this.userService = UserService;
        this.$mdDialog = $mdDialog;
        this.$location = $location;
    }

    isAutorized() {
        return this.userService.currentUser;
    }

    openDialog(e) {
        this.$mdDialog.show({
          controller: ['$mdDialog', '$timeout', function($mdDialog, $timeout) {
              this.closeDialog = function() {
                  $timeout(() => $mdDialog.hide(), 1500);
              }
              this.event = null;
          }],
          controllerAs: 'vm',
          template: `
            <div>
                <em-event-form on-added="vm.closeDialog()" event="event"></em-event-form>
            </div>
          `,
          parent: angular.element(document.body),
          targetEvent: e,
          clickOutsideToClose:true
        })
    }

    logout() {
        this.userService.logout();
    }

}

UserMenuController.inject = ['UserService','$mdDialog', '$location']

export default {
    template: `
        <nav ng-if="!vm.isAutorized()">
            <md-button ui-sref="signin" class="md-raised md-primary">Sign In</md-button>
        </nav>
        <nav ng-if="vm.isAutorized()">
            <md-button ng-click="vm.openDialog($event)" class="md-raised md-warn"> + Add event</md-button>
            <md-button ng-click="vm.logout()" class="md-raised md-primary">Logout</md-button>
        </nav>
    `,
    controller: UserMenuController,
    controllerAs: 'vm'
}
