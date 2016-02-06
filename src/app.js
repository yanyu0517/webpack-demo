var Router = require('./router'),
    Backbone = require('backbone');

require('../node_modules/biz-ui/dist/jquery.bizui.css');
require('../asset/css/quick-view.css');
window.jQuery = window.$ = require('jquery');

require('biz-ui');

initTree();
initTab();

var router = new Router();
Backbone.history.start();


function initTree() {
    /**
     * Tree
     */
    var menuData = [{
        id: 100,
        text: 'Dashbord',
        icon: false
    }, {
        id: 200,
        text: 'Consumption',
        icon: false,
        children: [{
            id: 210,
            text: 'PC'
        }, {
            id: 220,
            text: 'Mobile'
        }],
        state: {
            opened: true
        }
    }, {
        id: 300,
        text: 'Report',
        icon: false,
        children: [{
            id: 310,
            text: 'Daily'
        }, {
            id: 320,
            text: 'Weekly'
        }, {
            id: 330,
            text: 'Monthly'
        }]
    }, {
        id: 400,
        text: 'Settings',
        icon: false,
        children: [{
            id: 410,
            text: 'Profile'
        }, {
            id: 420,
            text: 'Security'
        }]
    }];
    $('#menu').on("loaded.jstree", function(e, data) {
        data.instance.select_node(210);
    }).bizTree({
        core: {
            data: menuData
        },
        plugins: ['wholerow']
    });
}

function initTab() {
    /**
     * Tabs
     */
    $('#dimension').bizTab({
        onChange: function(data) {
            router.navigate(data.index === 0 ? 'region': 'client', {trigger: true});
        }
    });
}