import styles from './event-registration-preview.scss';

class EventRegistrationPreviewController {

    constructor(EventService) {
        this.eventService = EventService;
    }

    getSessionsTitles(sessionIds, sessions) {
        let titles = [];
        sessionIds.map(sessionId => {
            if(!sessions) { return ;}
            let list = sessions.filter(session => session.id==sessionId);
            if(list.length>0) {
                titles.push(list[0].title);
            }
        });

        return titles.join(', ')
    }

    removeRegistration(event, registration) {
        this.eventService.removeRegistration(event, registration);
    }

}

EventRegistrationPreviewController.inject = ['EventService'];

export default {
    template: `
        <div class="md-list-item-text event-registration-preview" layout="row" layout-xs="column">
            <div class="info" flex="30" flex-xs="100">
                <ul>
                    <li><b>First Name:</b> {{vm.registration.firstName}}</li>
                    <li><b>Last Name:</b> {{vm.registration.lastName}}</li>
                    <li><b>Email:</b> {{vm.registration.email}}</li>
                </ul>
            </div>
            <div class="info" flex="30" flex-xs="100">
                <ul>
                    <li><b>Phone:</b> {{vm.registration.phone}}</li>
                    <li><b>Company:</b> {{vm.registration.company}}</li>
                </ul>
            </div>
            <div class="info" flex="30" flex-xs="100" ng-if="vm.registration.sessions.length>0">
                <ul>
                    <li>
                        <b>Session:</b> {{vm.getSessionsTitles(vm.registration.sessions, vm.event.sessions)}}
                    </li>
                </ul>
            </div>
            <div flex="5" flex-xs="100">
                <md-button
                    class="md-raised remove"
                    ng-click="vm.removeRegistration(vm.event, vm.registration)"
                >х</md-button>
            </div>

        </div>
    `,
    controller: EventRegistrationPreviewController,
    controllerAs: 'vm',
    bindings: {
        registration: '=',
        event: '='
    }
};
