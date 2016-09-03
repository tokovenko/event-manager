import styles from './event-session-preview.scss';

class EventSessionPreviewController {
}

EventSessionPreviewController.inject = ['EventService'];

export default {
    template: `
        <div class="md-list-item-text event-session-preview" layout="row" layout-xs="column">
            <div class="title">
                {{vm.session.title}}
            </div>
            <em-event-date
                start="vm.session.startTime"
                end="vm.session.endTime"
            ></em-event-date>
        </div>
    `,
    controller: EventSessionPreviewController,
    controllerAs: 'vm',
    bindings: {
        session: '='
    }
};
