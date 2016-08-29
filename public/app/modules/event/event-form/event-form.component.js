import styles from './event-form.scss';

class EventFormController {
    constructor(EventService) {

        this.eventService = EventService;

        if(!this.event) {

            this.event = {
              title: '',
              startTime: '',
              endTime: '',
              status: 0,
              registrationLimit: '',
              remainingSeats: '',
              sessions: [],
              registrations: [],
              id: null
            }

            this.eventDates = {
                startDate: '',
                startTime: '00:00',
                endDate: '',
                endTime: '00:00',
            }

        } else {

            this.event = angular.copy(this.event);

            this.eventDates = {}
            this.setDates(this.eventDates, this.event.startTime, this.event.endTime);

            this.event.sessions.map(session => {
                this.setDates(session, session.startTime, session.endTime);
            });

        }

        this.eventStatuses = EventService.statuses;

        this.isVisibleSuccesMessage = false;
    }

    setDates(obj, startTime, endTime) {
        let sdate = new Date(startTime);
        let edate = new Date(endTime);

        obj.startDate = sdate;
        obj.startTime = this.getTime(sdate);
        obj.endDate = edate;
        obj.endTime = this.getTime(edate);
    }

    updateTime(date, time) {
        let timeData = `${date}`.replace(/[0-9]{2}:[0-9]{2}/, time);
        return (new Date(timeData)).getTime();
    }

    getTime(date) {
        let hours = `0${date.getHours()}`.slice(-2);
        let minutes = `0${date.getMinutes()}`.slice(-2);
        return  `${hours}:${minutes}`;
    }

    getEventStatusTitle(status) {
        return this.eventService.getStatusTitle(status);
    }

    saveEvent(event, eventDates) {
        event.startTime = this.updateTime(eventDates.startDate, eventDates.startTime);
        event.endTime = this.updateTime(eventDates.endDate, eventDates.endTime);

        event.status = +event.status;

        event.sessions.map(session => {
            session.startTime = this.updateTime(session.startDate, session.startTime);
            session.endTime = this.updateTime(session.endDate, session.endTime);

            delete session.startDate;
            delete session.endDate;
        });

        this.eventService.saveEvent(event).then(event => {
            this.isVisibleSuccesMessage = true;
            if(this.onAdded) {
                this.onAdded();
            }
        });

    }

    addSession() {
        this.event.sessions.push({
          title: '',
          startDate: '',
          startTime: '00:00',
          endDate: '',
          endTime: '00:00',
          id: Math.random() * (new Date()).getTime()
      });
    }

    removeSession(session) {
        let index = this.event.sessions.indexOf(session);
        if(index>-1) {
            this.event.sessions.splice(index, 1);
        }
    }

}

EventFormController.inject = ['EventService']

export default {
    template: `
        <div class="form">

            <h1 class="md-headline">
                {{ vm.event.id ? 'Update event #' + vm.event.id : 'Add new event'}}
            </h1>

            <div ng-if="vm.isVisibleSuccesMessage" class="alert-success">
                Successfully added!
            </div>

            <form name="eventForm" ng-if="!vm.isVisibleSuccesMessage">

                <div layout="row" layout-xs="column" layout-align="center">
                    <md-input-container class="md-block" flex="45" flex-xs="100">
                        <label>Title</label>
                        <input required name="title" ng-model="vm.event.title" />
                    </md-input-container>
                    <md-input-container class="md-block" flex="45" flex-xs="100">
                        <label>Status</label>
                        <md-select ng-model="vm.event.status">
                          <md-option ng-repeat="status in vm.eventStatuses" value="{{status}}">{{vm.getEventStatusTitle(status)}}</md-option>
                        </md-select>
                    </md-input-container>
                </div>

                <div layout="row" layout-xs="column" layout-align="center">
                    <md-input-container class="md-block" flex="33" flex-xs="100">
                        <label>Start date</label>
                        <md-datepicker ng-model="vm.eventDates.startDate"></md-datepicker>
                    </md-input-container>
                    <md-input-container class="md-block" flex="15" flex-xs="100">
                        <label>Start time</label>
                        <input required name="startTime" ng-model="vm.eventDates.startTime" />
                    </md-input-container>
                    <md-input-container class="md-block" flex="33" flex-xs="100">
                        <label>End date</label>
                        <md-datepicker ng-model="vm.eventDates.endDate"></md-datepicker>
                    </md-input-container>
                    <md-input-container class="md-block" flex="15" flex-xs="100">
                        <label>End time</label>
                        <input required name="status" ng-model="vm.eventDates.endTime" />
                    </md-input-container>
                </div>

                <div layout="row" layout-xs="column" layout-align="center">
                    <md-input-container class="md-block" flex="45" flex-xs="100">
                        <label>Remaining seats</label>
                        <input type="number" required name="remainingSeats" ng-model="vm.event.remainingSeats" />
                    </md-input-container>
                    <md-input-container class="md-block" flex="45" flex-xs="100">
                        <label>Registration Limit</label>
                        <input type="number" required name="registrationLimit" ng-model="vm.event.registrationLimit" />
                    </md-input-container>
                </div>

                <h2 class="md-title">
                    Sessions
                    <md-button
                        class="md-raised add-session"
                        ng-click="vm.addSession()"
                    >+</md-button>
                </h2>

                <div class="sessions-wrapper">
                    <div class="sessions" layout="column" ng-repeat="session in vm.event.sessions">
                        <md-input-container class="md-block title">
                            <label>Session Title</label>
                            <input required name="sessionsTitle[]" ng-model="session.title" />
                        </md-input-container>
                        <div layout="row" layout-xs="column" layout-align="center">
                            <md-input-container class="md-block" flex="30" flex-xs="100">
                                <label>Start date</label>
                                <md-datepicker ng-model="session.startDate"></md-datepicker>
                            </md-input-container>
                            <md-input-container class="md-block" flex="15" flex-xs="100">
                                <label>Start time</label>
                                <input required name="sessionsStartTime[]" ng-model="session.startTime" />
                            </md-input-container>
                            <md-input-container class="md-block" flex="30" flex-xs="100">
                                <label>End date</label>
                                <md-datepicker ng-model="session.endDate"></md-datepicker>
                            </md-input-container>
                            <md-input-container class="md-block" flex="15" flex-xs="100">
                                <label>End time</label>
                                <input required name="sessionsEndTime[]" ng-model="session.endTime" />
                            </md-input-container>
                            <div flex="6">
                                <md-button
                                    class="md-raised remove-session"
                                    ng-click="vm.removeSession(session)"
                                >х</md-button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn-container">
                    <md-button
                        class="md-raised md-primary"
                        ng-disabled="eventForm.$invalid"
                        ng-click="vm.saveEvent(vm.event, vm.eventDates)"
                    >Save</md-button>
                </div>
            </form>
        </div>
    `,
    controller: EventFormController,
    controllerAs: 'vm',
    bindings: {
        onAdded: '&',
        event: '='
    }
}
