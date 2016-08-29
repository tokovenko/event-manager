import styles from './event-view.scss';

class EventViewController {

    constructor(EventService, $mdDialog, $timeout, UserService) {
        this.eventService = EventService;
        this.isDialogOpen = false;
        this.$mdDialog = $mdDialog;
        this.$timeout = $timeout;
        this.userService = UserService;
    }

    getSumOccupiedSeats(registrationLimit, remainingSeats) {
        return registrationLimit - remainingSeats
    }

    getStatusTitle(status) {
        return this.eventService.getStatusTitle(status);
    }

    getStatusClassName(status) {
        return this.eventService.getStatusAlias(status);
    }

    openDialog(e) {
        this.$mdDialog.show({
          contentElement: '#register-user',
          parent: angular.element(document.body),
          targetEvent: e,
          clickOutsideToClose: true
        });
    }

    closeDialog() {
        this.$timeout(() => this.$mdDialog.hide(), 1500);
    }

    isAvailableToRegister(event) {
        return this.eventService.isAvailableToRegister(event)
    }

    isAutorized() {
        return this.userService.currentUser;
    }
}

EventViewController.inject = ['EventService','$mdDialog','$timeout','UserService'];


module.exports = {
    template: `
        <md-card layout="column">

            <md-card-title-text>
                <h1 class="md-headline">
                    {{vm.event.title}}
                </h1>
                <span class="md-subhead">
                    <em-event-date
                        start="vm.event.startTime"
                        end="vm.event.endTime"
                    ><em-event-date>
                </span>
            </md-card-title-text>

            <md-card-content>
                <div layout="row">
                    <div class="peoples">
                        <div class="sum" title="Registered / Limit">
                            {{::vm.getSumOccupiedSeats(vm.event.registrationLimit, vm.event.remainingSeats)}} / {{::vm.event.registrationLimit}}
                        </div>
                    </div>
                    <div class="status">
                        <span
                            class="event-status"
                            ng-class="::vm.getStatusClassName(vm.event.status)"
                        >
                            {{vm.getStatusTitle(vm.event.status)}}
                        </span>
                    </div>
                </div>
                <em-event-sessions-list
                    ng-if="vm.event.sessions.length>0"
                    sessions="vm.event.sessions"
                ></em-event-sessions-list>
                <em-event-registrations-list
                    ng-if="vm.isAutorized() && vm.event.registrations.length>0"
                    event="vm.event"
                ></em-event-registrations-list>
            </md-card-content>

            <div ng-if="vm.isAvailableToRegister(vm.event)">
                <md-card-actions layout="row" layout-align="center">
                    <md-button class="md-raised md-primary" ng-click="vm.openDialog($event)">Register</md-button>
                </md-card-actions>

                <div style="visibility: hidden">
                    <div class="md-dialog-container" id="register-user">
                      <md-dialog layout-padding>
                        <h1 class="md-headline">
                          Registration on: {{vm.event.title}}
                        </h1>
                        <br>
                        <em-event-register-user
                            event="vm.event"
                            on-registered-user="vm.closeDialog()">
                        ></em-event-register-user>
                      </md-dialog>
                    </div>
                </div>
            </div>

        </md-card>
    `,
    controller: EventViewController,
    controllerAs: 'vm',
    bindings: {
        event: '='
    }
};
