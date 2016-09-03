class EventService {
    constructor($q, $http) {

        this.$q = $q;

        this.$http = $http;

        this.statuses = {
            DRAFT: 1,
            OPEN: 2,
            SOLD_OUT: 3,
            CLOSED: 4
        };

        this.statusLabels = {
            [this.statuses.DRAFT]: 'Draft',
            [this.statuses.OPEN]: 'Open',
            [this.statuses.SOLD_OUT]: 'Sold Out',
            [this.statuses.CLOSED]: 'Closed'
        };

        this.list = [];

    }

    getList() {
        let deferred = this.$q.defer();

        this.$http
            .get('/events')
            .then(resp => {
                this.list = resp.data.events || [];
                deferred.resolve(this.list)
            });

        return deferred.promise;
    }

    addUserToEvent(event, user) {
        event.registrations.push(user);
        event.remainingSeats--;
    }

    getStatusTitle(status) {
        return this.statusLabels[status] || '';
    }

    getEventById(id) {
        let deferred = this.$q.defer();
        if(this.list.length==0) {
            this.getList().then(events => {
                this.list = events;
                let list = this.list.filter(event => event.id==id);
                deferred.resolve(list[0]);
            })
        } else {
            let list = this.list.filter(event => event.id==id);
            deferred.resolve(list[0]);
        }
        return deferred.promise;
    }

    getEventIndexById(id) {
        let list = this.list.filter(event => event.id==id);
        let index = this.list.indexOf(list[0])
        return index > -1 ? index : null;
    }

    getStatusAlias(status) {
        return this.getStatusTitle(status)
            .replace(/\s+/g,'-')
            .toLocaleLowerCase();
    }

    registerUserToEvent(event, user) {
        let deferred = this.$q.defer();

        this.$http
            .post('/events//user-registration', {
                eventId: event.id,
                user: user
            })
            .then(resp => {
                deferred.resolve(resp)
            });

        return deferred.promise;
    }

    saveEvent(event) {
        let deferred = this.$q.defer();

        this.$http
            .post('/events/save', {event: event})
            .then(resp => {
                let index;
                if(index=this.getEventIndexById(resp.data.event.id)) {
                    this.list[index] = resp.data.event;
                } else {
                    this.list.unshift(resp.data.event);
                }
                deferred.resolve(resp.data.event);
            });

        return deferred.promise;
    }

    removeEvent(event) {
        let deferred = this.$q.defer();
        let index = this.list.indexOf(event);

        this.$http
            .post('/events/delete', {id: index})
            .then(resp => {
                if(resp.data.status=='ok') {
                    this.list.splice(index, 1);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    }

    removeRegistration(event, registration) {
        let deferred = this.$q.defer();
        let index = event.registrations.indexOf(registration);

        this.$http
            .post('/events/delete-registration', {id: index, eventId: event.id})
            .then(resp => {
                if(resp.data.status=='ok') {
                    event.registrations.splice(index, 1);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    }


    isAvailableToRegister(event) {
        return event.status == this.statuses.OPEN;
    }
}

EventService.inject = ['$q','$http'];

export default EventService;
