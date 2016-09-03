export default function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
          url: "/",
          template: `
            <em-index-page></em-index-page>
          `
        })
        .state('event', {
          url: "/event/:id",
          controller: ['$scope', '$stateParams', function($scope, $stateParams) {
              $scope.eventId = $stateParams.id;
          }],
          template: `
            <em-event-page event-id="eventId"></em-event-page>
          `
        })
        .state('signin', {
          url: "/signin",
          template: `
                <em-signin-page></em-signin-page>
          `
        });

};
