import angular from 'angular';
import styles from './event-sessions-list.scss';

class EventSessionsListController {}

export default {
    template: `
        <div class="session-list">
            <md-list flex>
              <md-subheader class="md-no-sticky">Event sessions</md-subheader>
              <md-list-item ng-repeat="session in vm.sessions">
                <em-event-session-preview session="session"></em-event-session-preview>
              </md-list-item>
            </md-list>
        </div>
    `,
    controller: EventSessionsListController,
    controllerAs: 'vm',
    bindings: {
        sessions: '='
    }
};
