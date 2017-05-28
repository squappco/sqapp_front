Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: 'Canchas',
                iconCls: 'x-fa fa-check',
                viewType: 'admincanchas',
                routeId: 'canchas',
                leaf: true
            },
            {
                text: 'Estadísticas',
                iconCls: 'x-fa fa-desktop',
                viewType: 'admindashboard',
                routeId: 'dashboard',
                leaf: true
            },
            /*{
                text: 'Facturación',
                iconCls: 'x-fa fa-bank',
                viewType: 'adminbilling',
                routeId: 'billing',
                leaf: true
            },*/
        ]
    }
});
