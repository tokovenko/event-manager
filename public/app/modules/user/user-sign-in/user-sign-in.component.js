class UserSignInController {

    constructor(UserService, $state) {
        this.userService = UserService;
        this.user = {email: '', password: ''};
        this.$state = $state;
    }

    signin(user) {
        this.userService.signin(user).then((login) => {
            if(login) {
                this.$state.go('home');
            }
        });
    }

}

UserSignInController.inject = ['UserService','$state'];

export default {
    template: `
        <div class="form" style="width: 250px;">
            <form name="userForm">

                <div layout="column">
                <md-input-container class="md-block" style="margin-bottom: 0;">
                  <label>Email</label>
                  <input
                    required
                    ng-pattern="/^.+@.+\..+$/"
                    name="email"
                    ng-model="vm.user.email" />
                </md-input-container>

                <md-input-container class="md-block">
                  <label>Password</label>
                  <input type="password" required name="password" ng-model="vm.user.password" />
                </md-input-container>
                </div>

                <div style="text-align: right;">
                    <md-button
                        class="md-raised md-primary"
                        ng-disabled="userForm.$invalid"
                        ng-click="vm.signin(vm.user)"
                    >Sign In</md-button>
                </div>
            </form>
        </div>
    `,
    controller: UserSignInController,
    controllerAs: 'vm'
}
