Ext.define('Admin.view.dashboard.Dashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',
    
    listeners: {
        //hide: 'onHideView'
    },

    items: [
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
        },*/
        {
            xtype: 'services', 
            title: 'Ingreso Mensual - Trimestre',
            userCls: 'big-50 small-100',
            dataProgress:[
                {
                    name: 'Marzo',
                    value: '$20.000'
                },
                {
                    name: 'Abril',
                    value: '$68.000'
                },
                {
                    name: 'Mayo',
                    value: '$ 12.000'
                },
            ]
        },
        {
            xtype: 'services',
            title: 'Ocupación mensual - Trimestre',
            userCls: 'big-50 small-100',
            dataProgress:[
                {
                    name: 'Marzo',
                    value: '20%'
                },
                {
                    name: 'Abril',
                    value: '68%'
                },
                {
                    name: 'Mayo',
                    value: '12%'
                },
            ]
        }
    ]
});
