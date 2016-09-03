class IndexPageController {
    constructor($mdDialog, EventService) {
        this.events = [];

        EventService.getList().then(events => {
            this.events = events;
        });

        this.selected = 'red';
    }
}

IndexPageController.inject = ['$mdDialog', 'EventService'];

export default {
    template: `
        <div ng-cloak>
            <em-event-list events="vm.events"><em-event-list>
        </div>
    `,
    controller: IndexPageController,
    controllerAs: 'vm'
};
