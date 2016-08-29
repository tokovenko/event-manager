
class EventPreviewController {

    constructor(EventService, $mdDialog, UserService) {
        this.userService = UserService;
        this.eventService = EventService;
        this.$mdDialog = $mdDialog;
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

    removeEvent(event) {
        this.eventService.removeEvent(event);
    }

    openDialog(e, event) {
        this.$mdDialog.show({
          controller: ['$mdDialog', '$timeout', function($mdDialog, $timeout) {
              this.closeDialog = function() {
                  $timeout(() => $mdDialog.hide(), 1500);
              }
              this.event = event;
          }],
          controllerAs: 'vm',
          template: `
            <div>
                <em-event-form on-added="vm.closeDialog()" event="vm.event"></em-event-form>
            </div>
          `,
          parent: angular.element(document.body),
          targetEvent: e,
          clickOutsideToClose:true
      });
    }

    isAutorized() {
        return this.userService.currentUser;
    }
}

EventPreviewController.inject = ['UserService','EventService','$mdDialog'];

module.exports = {
    template: `
        <md-card layout="column">
            <md-card-title-text>
                <span class="md-headline">
                    <a ui-sref="event({id: vm.event.id})">{{vm.event.title}}</a>
                </span>
                <span class="md-subhead">
                    <em-event-date
                        start="vm.event.startTime"
                        end="vm.event.endTime"
                    ><em-event-date>
                </span>
            </md-card-title-text>
            <md-card-content layout="row">
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
            </md-card-content>
            <md-card-actions layout="row" layout-align="center" ng-if="vm.isAutorized()">
                <md-button class="md-raised md-mini left" ng-click="vm.openDialog($event, vm.event)">edit</md-button>
                <md-button class="md-raised md-mini right" ng-click="vm.removeEvent(vm.event)">remove</md-button>
            </md-card-actions>
        </md-card>
    `,
    controller: EventPreviewController,
    controllerAs: 'vm',
    bindings: {
        event: '='
    }
};
