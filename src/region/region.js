var bizui = require('biz-ui');

function init() {
    /**
     * Region Content
     */
    $('#region').bizSelect();
    $('#range').bizCalendar({
        startDate: '2010-01-01',
        endDate: '2020-12-31',
        language: 'en'
    });

    /**
     * Button
     */
    $('#add').bizButton().click(function() {
        $('#panel').bizPanel('open');
    });
    $('#query').bizButton({
        theme: 'dark'
    });


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

    var data1 = [{
        id: 100,
        name: 'A',
        height: 182,
        weight: 60.5,
        age: 25,
        email: 'a@sogou.com'
    }, {
        id: 200,
        name: 'B',
        height: 173,
        weight: 50.2,
        age: 26,
        email: 'b@sogou.com'
    }, {
        id: 300,
        name: 'C',
        height: 170,
        weight: 62.6,
        age: 27,
        email: 'c@sogou.com'
    }, {
        id: 400,
        name: 'D',
        height: 165,
        weight: 70.3,
        age: 23,
        email: 'd@sogou.com'
    }];

    $('.data').bizTable({
        column: column,
        data: data1,
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

    /**
     * Panel & Dialog
     */
    $('#panel').bizPanel({
        buttons: [{
            text: 'Add',
            click: function() {
                var name = $.trim($('#name').val()),
                    panel = this;
                if (name === '') {
                    bizui.Dialog.alert({
                        title: 'Wanning',
                        content: 'Region name required!',
                        ok: 'OK'
                    });
                } else {
                    bizui.Dialog.confirm({
                        title: 'Confirmation',
                        content: 'Add new region?',
                        ok: 'Yes',
                        cancel: 'No',
                        onOK: function() {
                            panel.close();
                        }
                    });
                }
            }
        }, {
            text: 'Canel',
            click: function() {
                this.close();
            },
            theme: 'dark'
        }]
    });

    $('#description').bizTextarea();
    $('#effective').bizCalendar({
        startDate: new Date(),
        language: 'en'
    });

}

module.exports = init;