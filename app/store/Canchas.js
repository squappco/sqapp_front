Ext.define('Admin.store.Canchas', {
    extend: 'Ext.data.Store',
    alias: 'store.canchas',
    autoLoad:true,

    fields: [
        'id',
        'name', 
        'address', 
        'startTime',
        'finishTime',
        'serviceTime',
        'lat',
        'lng',
        'score',
        'client'
    ],
    
    proxy:
    {
        type: 'rest',
        reader:
        {
            rootProperty: 'data',
            type: 'json'
        },
        url: urlAPI + 'fields',
    }
});
