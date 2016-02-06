require('biz-ui');
require('../common/common')

function init() {
    $('#name').bizInput();

    $('#query').bizButton({
        theme: 'dark'
    });

    $('#client').bizSelect();
    $('#keyword').bizInput();
    $('input[name="vip"]').bizCheckbox();
    $('input[name="client"]').bizRadio();

    /**
     * Table
     */
    function getAverage(data, field) {
        var sum = 0;
        $.each(data, function(index, val) {
            sum = sum + (val[field] - 0);
        });
        return Math.round(sum / data.length);
    }

    var column = [{
        field: 'no',
        title: 'No.',
        width: 70,
        content: function(item, index, field) {
            return index;
        },
        footContent: function(field) {
            return 'Average';
        }
    }, {
        field: 'name',
        title: 'Name',
        width: 100,
        content: [
            function(item, index, field) {
                return item.name;
            },
            function(item, index, field) {
                return item.id;
            },
            function(item, index, field) {
                return field;
            }
        ]
    }, {
        field: 'height',
        title: 'Height(cm)',
        editable: true,
        sortable: true,
        currentSort: 'des',
        align: 'right',
        width: 120,
        content: function(item, index, field) {
            return item.height;
        },
        footContent: function(field) {
            return getAverage(this.getData(), field);
        }
    }, {
        field: 'weight',
        title: 'Weight(kg)',
        editable: true,
        sortable: true,
        align: 'right',
        width: 120,
        content: function(item, index, field) {
            return item.weight;
        },
        footContent: function(field) {
            return getAverage(this.getData(), field);
        }
    }, {
        field: 'age',
        title: 'Age',
        sortable: true,
        align: 'right',
        width: 120,
        content: function(item, index, field) {
            return item.age;
        },
        footContent: function(field) {
            return getAverage(this.getData(), field);
        }
    }, {
        field: 'email',
        title: 'Email',
        editable: true,
        width: 200,
        content: function(item, index, field) {
            return item.email;
        }
    }, {
        field: 'op',
        title: 'Operation',
        escapeContent: false,
        width: 100,
        content: function(item, index, field) {
            return '<a href="#" id="' + item.id + '">Detail</a>';
        },
        visible: false
    }];


    var data2 = [{
        id: 500,
        name: 'E',
        height: 178,
        weight: 56.1,
        age: 30,
        email: 'e@sogou.com'
    }, {
        id: 600,
        name: 'F',
        height: 171,
        weight: 52.2,
        age: 28,
        email: 'f@sogou.com'
    }, {
        id: 700,
        name: 'G',
        height: 168,
        weight: 75.8,
        age: 29,
        email: 'g@sogou.com'
    }, {
        id: 800,
        name: 'H',
        height: 160,
        weight: 72.9,
        age: 27,
        email: 'h@sogou.com'
    }];

    $('.data').bizTable({
        column: column,
        data: data2,
        noDataContent: '<p>No data</p>',
        foot: 'top',
        skin: 'myTable',
        selectable: true,
        resizable: true,
        lockHead: true,
        onSort: function(data, e) {
            console.log(data);
        },
        onSelect: function(data, e) {
            console.log(data);
        },
        onValidate: function(data, e) {
            switch (data.field) {
                case 'height':
                    return /^\d+$/.test(data.newValue);
                case 'weight':
                    return /^\d+(\.)?\d+$/.test(data.newValue);
            }
        },
        onEdit: function(data, e) {
            console.log(data);
        }
    });

    /**
     * Page
     */
    $('.page-size').bizSelect().change(function(e) {
        $('.page').bizPage('setPageSize', e.target.value);
    });
    $('.page').bizPage({
        pageSize: 10,
        pageNumber: 1,
        totalNumber: 200
    });
    $('.page-number').bizInput({
        onEnter: go
    });
    $('.go').bizButton().click(go);

    function go() {
        var value = parseInt($('.page-number').val(), 10),
            pageCount = $('.page').bizPage('getPageCount');

        if (/^\d+$/.test(value) && value > 0 && value <= pageCount) {
            $('.page').bizPage('setPageNumber', value);
            $('.page-number').val('');
        } else {
            $('.page-number').focus();
        }
    }
}

module.exports = init;