import angular from 'angular';
import styles from './event-registrations-list.scss';

class EventRegistrationsListController {}

module.exports = {
    template: `
        <div class="registrations-list">
            <md-list flex>
              <md-subheader class="md-no-sticky">Event registrations</md-subheader>
              <md-list-item ng-repeat="registration in vm.event.registrations">
                <em-event-registration-preview
                    registration="registration"
                    event="vm.event"
                ></em-event-registration-preview>
              </md-list-item>
            </md-list>
        </div>
    `,
    controller: EventRegistrationsListController,
    controllerAs: 'vm',
    bindings: {
        event: '='
    }
};
