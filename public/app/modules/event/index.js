import angular from 'angular';

import styles from './event.scss';

import EventService from './event.service';
import EventViewComponent from './event-view/event-view.component';
import EventSessionsListComponent from './event-sessions-list/event-sessions-list.component';
import EventSessionPreviewComponent from './event-session-preview/event-session-preview.component';
import EventRegistrationsListComponent from './event-registrations-list/event-registrations-list.component';
import EventRegistrationPreviewComponent from './event-registration-preview/event-registration-preview.component';
import EventPreviewComponent from './event-preview/event-preview.component';
import EventListCompnent from './event-list/event-list.component';
import EventDateCompnent from './event-date/event-date.component';
import EventRegisterUserCompnent from './event-register-user/event-register-user.component';
import EventFormCompnent from './event-form/event-form.component';

export default angular
    .module('app.event', [])
    .service('EventService', EventService)
    .component('emEventView', EventViewComponent)
    .component('emEventSessionsList', EventSessionsListComponent)
    .component('emEventSessionPreview', EventSessionPreviewComponent)
    .component('emEventRegistrationsList', EventRegistrationsListComponent)
    .component('emEventRegistrationPreview', EventRegistrationPreviewComponent)
    .component('emEventPreview', EventPreviewComponent)
    .component('emEventList', EventListCompnent)
    .component('emEventDate', EventDateCompnent)
    .component('emEventRegisterUser', EventRegisterUserCompnent)
    .component('emEventForm', EventFormCompnent)
    .name;
