import styles from './event-register-user.scss'

class EventRegisterUserController {
    constructor(EventService) {

        this.eventService = EventService;

        this.user = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            sessions: [],
        }

        this.isVisibleSuccesMessage = false;
    }

    registerUserToEvent(event, user) {
        this.eventService
            .registerUserToEvent(event, user)
            .then(() => {
                this.isVisibleSuccesMessage = true;
                this.eventService.addUserToEvent(event, user);
                if (this.onRegisteredUser) {
                    this.onRegisteredUser();
                }
            })
    }

    isCheckedSession(session) {
        let sessions = this.user.sessions.filter(sessionId => sessionId==session.id);
        return sessions[0];
    }

    toggleSessionCheck(session) {
        let index = this.user.sessions.indexOf(session.id);
        if(index > -1) {
            this.user.sessions.splice(index, 1);
        } else {
            this.user.sessions.push(session.id);
        }
    }
}

EventRegisterUserController.inject = ['EventService']

export default {
    template: `
        <div class="form">

        <div ng-if="vm.isVisibleSuccesMessage" class="alert-success">
            Successfully registered!
        </div>
        <form name="userForm" ng-if="!vm.isVisibleSuccesMessage">

            <h2 class="md-title">Fill you information</h2>

            <div layout="row" layout-align="center">
                <md-input-container class="md-block" flex="45">
                    <label>First Name</label>
                    <input required name="firstName" ng-model="vm.user.firstName" />
                </md-input-container>

                <md-input-container class="md-block" flex="45">
                    <label>Last Name</label>
                    <input required name="lastName" ng-model="vm.user.lastName" />
                </md-input-container>
            </div>
            <div layout="row" layout-align="center">
            <md-input-container class="md-block" flex="45">
              <label>Email</label>
              <input
                required
                ng-pattern="/^.+@.+\..+$/"
                name="email"
                ng-model="vm.user.email" />
            </md-input-container>

            <md-input-container class="md-block" flex="45">
              <label>Phone Number</label>
              <input required name="phone" ng-model="vm.user.phone" />
            </md-input-container>
            </div>
            <div layout="row" layout-align="center">
            <md-input-container class="md-block" flex="45">
                <label>Company</label>
                <input name="company" ng-model="vm.user.company" />
            </md-input-container>
            </div>
            <div ng-if="vm.event.sessions.length>0">
                <h2 class="md-title">Check sessions what you want to visit</h2>
                <div layout="column">
                    <div flex="100" ng-repeat="session in vm.event.sessions">
                      <md-checkbox name="session" ng-checked="vm.isCheckedSession(session)" ng-click="vm.toggleSessionCheck(session)">
                       <div>{{ session.title }}</div>
                       <em-event-date
                           start="session.startTime"
                           end="session.endTime"
                       ></em-event-date>
                      </md-checkbox>
                    </div>
                </div>
            </div>
                <div class="btn-container">
                    <md-button
                        class="md-raised md-primary"
                        ng-disabled="userForm.$invalid"
                        ng-click="vm.registerUserToEvent(vm.event, vm.user)"
                    >Save</md-button>
                </div>
        </form>
        </div>
    `,
    controller: EventRegisterUserController,
    controllerAs: 'vm',
    bindings: {
        event: '=',
        onRegisteredUser: '&'
    }
};
