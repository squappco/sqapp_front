Ext.define('Admin.store.Billing', {
    extend: 'Ext.data.Store',
    alias: 'store.billing',
    fields: [
        'Id',
        'date',
        'description',
        'amount',
    ],
    autoLoad:true,
    proxy:
    {
        type: 'rest',
        reader:
        {
            rootProperty: 'data',
            type: 'json'
        },
        url: '/api/billing',
    }
});
