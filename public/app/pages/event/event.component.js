class EventPageController {
    constructor(EventService) {

        this.eventService = EventService;

        this.eventService
            .getEventById(this.eventId)
            .then(event => {
                this.event = event;
            });

    }
}

EventPageController.inject = ['EventService'];

module.exports = {
    template: `
        <div class="page">
            <em-event-view
                ng-if="vm.event"
                event="vm.event"
            ></em-event-view>
        </div>
    `,
    controller: EventPageController,
    controllerAs: 'vm',
    bindings: {
        eventId: '='
    }
};
