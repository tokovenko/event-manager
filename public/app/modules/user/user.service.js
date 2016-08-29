class UserService {

    constructor($q, $http, $cookies) {
        this.$q = $q;
        this.$http = $http;
        this.$cookies = $cookies;

        this.currentUser = angular.fromJson(this.$cookies.get('current-user'));
    }

    signin(user) {
        let deferred = this.$q.defer();

        this.$http
            .post('/users/login', {user: user})
            .then(resp => {
                this.isAuthorized = !!resp.data.login;
                if(this.isAuthorized) {
                    this.currentUser = resp.data.user;
                    this.$cookies.put('current-user', angular.toJson(this.currentUser));
                }
                deferred.resolve(this.isAuthorized);
            });

        return deferred.promise;
    }

    logout() {
        this.$cookies.put('current-user', null);
        location.reload();
    }

}

UserService.inject = ['$q','$http','$cookies'];

export default UserService;
