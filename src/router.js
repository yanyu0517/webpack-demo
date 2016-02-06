var Backbone = require('backbone');

var Router = Backbone.Router.extend({
    routes: {
        'region': 'region',
        'client': 'client',
        '': 'region'
    },
    region: function() {
        $('#dimension').bizTab('select', 0);
        require.ensure(['./region/region'], function(require){
            require('./region/region')();
        }, 'region')
    },
    client: function() {
        $('#dimension').bizTab('select', 1);
        require.ensure(['./client/client'], function(require){
            require('./client/client')();
        }, 'client')
    }
})
module.exports = Router;
