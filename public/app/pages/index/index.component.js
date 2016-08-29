class IndexPageController {
    constructor($mdDialog, EventService) {

        this.events = [];

        EventService.getList().then(events => {
            this.events = events;
        });

        this.selected = 'red';


        this.isDialogOpen = false;
        this.openDialog = function(ev) {
            $mdDialog.show({
              controller: TestController,
              contentElement: '#myDialog',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true
            });
        }
        this.closeDialog = function() {
            this.isDialogOpen = false;
        }

        console.log('test...')
    }
}

IndexPageController.inject = ['$mdDialog','EventService'];

module.exports =  {
    template: `
        <div ng-cloak>
            <em-event-list events="vm.events"><em-event-list>
        </div>
    `,
    controller: IndexPageController,
    controllerAs: 'vm'
};
