Ext.define('Admin.view.canchas.Canchas', {
    extend: 'Ext.container.Container',
    xtype: 'admincanchas',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    /*controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },*/

    //layout: 'responsivecolumn',
    layout: 'fit',
    
    listeners: {
        hide: 'onHideView'
    },

    items: [
        /*{
            xtype: 'label',
            text: 'Hola Pedro'
        },*/
        {
            xtype: 'grid',
            store: null,//userStore,
            //width: 400,
            //height: 200,
            title: 'Administrar Canchas',
            margin: '15',
            columns: [
                {
                    text: 'Name',
                    width: 100,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'name'
                },
                {
                    text: 'Email Address',
                    width: 150,
                    dataIndex: 'email',
                    hidden: true
                },
                {
                    text: 'Phone Number',
                    flex: 1,
                    dataIndex: 'phone'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
            
        }
        /*{
            xtype: 'network',

            // 60% width when viewport is big enough,
            // 100% when viewport is small
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'hddusage',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'earnings',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'sales',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'topmovies',
            userCls: 'big-20 small-50'
        },
        {
            xtype: 'weather',
            cls: 'weather-panel shadow',
            userCls: 'big-40 small-100'
        },
        {
            xtype: 'todo',
            userCls: 'big-60 small-100'
        },
        {
            xtype: 'services',
            userCls: 'big-40 small-100'
        }*/
    ]
});
