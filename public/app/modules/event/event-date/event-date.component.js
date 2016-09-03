class EventDateController {

    constructor($filter) {
        this.dateFilter = $filter('date');
    }

    getDate(timestamp) {
        let date = new Date(timestamp);
        let format = date.getYear() == (new Date()).getYear() ? 'MMM d, HH:mm' : 'MMM d, yyyy HH:mm';
        return this.dateFilter(date, format);
    }

}

EventDateController.inject = ['$filter'];


export default {
    template: `
        <div class="time">{{::vm.getDate(vm.start)}} - {{::vm.getDate(vm.end)}}</div>
    `,
    controller: EventDateController,
    controllerAs: 'vm',
    bindings: {
        start: '=',
        end: '='
    }
};
