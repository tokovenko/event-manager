class EventListController {}

export default {
    template: `
        <div layout="row" layout-xs="column" layout-wrap="wrap">
          <div class="event-preview" ng-repeat="event in vm.events" flex="33" flex-xs="100">
            <em-event-preview event="event"></em-event-preview>
          </div>
        </div>
    `,
    controller: EventListController,
    controllerAs: 'vm',
    bindings: {
        events: '='
    }
};
