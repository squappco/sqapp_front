Ext.define('Admin.view.canchas.Canchas', {
    extend: 'Ext.container.Container',
    xtype: 'admincanchas',

    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Admin.store.Canchas',
    ],

    //controller: 'canchas',
    /*viewModel: {
        type: 'canchas'
    },*/

    layout: 'fit',
    
    listeners: {
        //hide: 'onHideView'
    },

    urlBase: urlAPI + 'fields',

    items: [
        {
            xtype: 'grid',
            store: {
                type: 'canchas'
            },
            selType: 'checkboxmodel',
            selModel:
            {
                mode: 'SINGLE'
            },
            title: 'Administrar Canchas',
            margin: '15',
            columns: [
                {
                    flex: 1,
                    text: 'Nombre',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'name'
                },
                {
                    flex: 1,
                    text: 'Dirección',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'address'
                },
                {
                    text: 'Hora Ini',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'startTime'
                },
                {
                    text: 'Hora Fin',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'finishTime'
                },
                {
                    text: 'Hora Ini',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'startTime'
                },
                {
                    text: 'Unidad Servicio (Min)',
                    sortable: false,
                    hideable: false,
                    dataIndex: 'serviceTime',
                    renderer: function(v, meta, rec)
                    {
                        return v +' Min'
                    }
                },
            ],

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '->',
                        {
                            text: 'Agregar',
                            action: 'add',
                            listeners:{
                                click: function(thisButton, e, eOpts)
                                {
                                    let panelBase = thisButton.up('admincanchas')
                                    let panelContainer = thisButton.up('panel')
                                    
                                    panelContainer.getEl().mask('Cargando...')
                                    let windowAdd = Ext.create('Ext.window.Window', {
                                        title: 'Agregar Cancha',
                                        height: '80%',
                                        width: '60%',
                                        layout: 'fit',
                                        modal: true,
                                        draggable: false,
                                        resizable: false,
                                        items: {
                                            xtype: 'form',
                                            layout:{
                                                type: 'vbox',
                                                align : 'stretch',
                                                pack  : 'start',
                                            },
                                            defaults:{
                                                margin: 10,
                                                labelWidth: 150,
                                            },
                                            items:[
                                                /*{
                                                    xtype: 'hiddenfield',
                                                    name: 'id',
                                                    value: ''
                                                },*/
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nombre',
                                                    name: 'name'
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Dirección',
                                                    name: 'address'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    name: 'startTime',
                                                    fieldLabel: 'Hora Inicio',
                                                    format: 'H:i',
                                                    //minValue: '6:00 AM',
                                                    //maxValue: '8:00 PM',
                                                    increment: 30,
                                                    //anchor: '100%'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    name: 'finishTime',
                                                    fieldLabel: 'Hora Fin',
                                                    format: 'H:i',
                                                    //minValue: '6:00 AM',
                                                    //maxValue: '8:00 PM',
                                                    increment: 30,
                                                    //anchor: '100%'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Unidad de servicio (min)',
                                                    minValue: 1,
                                                    maxValue: 720,
                                                    name: 'serviceTime'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Latitud',
                                                    name: 'lat'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Longitud',
                                                    name: 'lng'
                                                },
                                            ],
                                            buttons:[
                                                {
                                                    text: 'Guardar',
                                                    action: 'save'
                                                },
                                                {
                                                    text: 'Cancelar',
                                                    action: 'cancel'
                                                },
                                            ]
                                        }
                                    })
                                    windowAdd.show()

                                    windowAdd.afterShow (null, function(){panelContainer.getEl().unmask()}) 

                                    let buttonCancel = windowAdd.down('button[action=cancel]')
                                    buttonCancel.on('click', function(){this.destroy()}, windowAdd)

                                    let buttonSave = windowAdd.down('button[action=save]')
                                    buttonSave.on('click', 
                                        function(thisButton, e, eOpts)
                                        {
                                            let windowAdd = thisButton.up('window')
                                            let formPanel = windowAdd.down('form')
                                            let form = formPanel.getForm()

                                            if(form.isValid())
                                            {
                                                let objData = form.getValues()

                                                windowAdd.getEl().mask('Agregando cancha...')
                                                Ext.Ajax.request({
                                                    url: panelBase.urlBase,
                                                    method: 'POST',
                                                    jsonData: objData,
                                                    scope: this,
                                                    success:function(response)
                                                    {
                                                        windowAdd.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)
                                                        let store = panelBase.down('grid').getStore()
                                                        store.load(function()
                                                        {
                                                            windowAdd.destroy()
                                                        })
                                                    },
                                                    failure: function(response)
                                                    {
                                                        windowAdd.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)

                                                        Ext.Msg.alert('Error', 'Hubo un error al agregar la cancha.');
                                                    }
                                                })
                                            }
                                        }, 
                                        windowAdd
                                    )
                                }
                            }
                        },
                        {
                            text: 'Editar',
                            action: 'edit',
                            listeners:{
                                click: function(thisButton, e, eOpts)
                                {
                                    let panelBase = thisButton.up('admincanchas')
                                    let panelContainer = thisButton.up('panel')
                                    let grid = panelBase.down('grid')
                                    let record = grid.getSelectionModel().getSelection()

                                    if(Ext.isEmpty(record) || record.length != 1)
                                    {
                                        Ext.Msg.alert('Error', 'Recuerde que debe seleccionar un sólo elemento.');
                                        return
                                    }

                                    panelContainer.getEl().mask('Cargando...')
                                    let windowAdd = Ext.create('Ext.window.Window', {
                                        title: 'Agregar Cancha',
                                        height: '80%',
                                        width: '60%',
                                        layout: 'fit',
                                        modal: true,
                                        draggable: false,
                                        resizable: false,
                                        items: {
                                            xtype: 'form',
                                            layout:{
                                                type: 'vbox',
                                                align : 'stretch',
                                                pack  : 'start',
                                            },
                                            defaults:{
                                                margin: 10,
                                                labelWidth: 150,
                                            },
                                            items:[
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'id',
                                                    value: ''
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Nombre',
                                                    name: 'name'
                                                },
                                                {
                                                    xtype: 'textareafield',
                                                    fieldLabel: 'Dirección',
                                                    name: 'address'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    name: 'startTime',
                                                    fieldLabel: 'Hora Inicio',
                                                    format: 'H:i',
                                                    //minValue: '6:00 AM',
                                                    //maxValue: '8:00 PM',
                                                    increment: 30,
                                                    //anchor: '100%'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    name: 'finishTime',
                                                    fieldLabel: 'Hora Fin',
                                                    format: 'H:i',
                                                    //minValue: '6:00 AM',
                                                    //maxValue: '8:00 PM',
                                                    increment: 30,
                                                    //anchor: '100%'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Unidad de servicio (min)',
                                                    minValue: 1,
                                                    maxValue: 720,
                                                    name: 'serviceTime'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Latitud',
                                                    name: 'lat'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'Longitud',
                                                    name: 'lng'
                                                },
                                            ],
                                            buttons:[
                                                {
                                                    text: 'Guardar',
                                                    action: 'save'
                                                },
                                                {
                                                    text: 'Cancelar',
                                                    action: 'cancel'
                                                },
                                            ]
                                        }
                                    })
                                    windowAdd.show()

                                    let formPanel = windowAdd.down('form')
                                    let form = formPanel.getForm()
                                    record = record.pop()
                                    console.log('record:', record)
                                    form.setValues(record.data)

                                    windowAdd.afterShow (null, function(){panelContainer.getEl().unmask()}) 

                                    let buttonCancel = windowAdd.down('button[action=cancel]')
                                    buttonCancel.on('click', function(){this.destroy()}, windowAdd)

                                    let buttonSave = windowAdd.down('button[action=save]')
                                    buttonSave.on('click', 
                                        function(thisButton, e, eOpts)
                                        {
                                            let windowAdd = thisButton.up('window')
                                            let formPanel = windowAdd.down('form')
                                            let form = formPanel.getForm()
                                            let id = formPanel.id
                                            delete formPanel.id

                                            if(form.isValid())
                                            {
                                                let objData = form.getValues()
                                                let id = objData.id
                                                delete objData.id

                                                windowAdd.getEl().mask('Editando la cancha...')
                                                Ext.Ajax.request({
                                                    url: panelBase.urlBase + '/' + id,
                                                    method: 'PUT',
                                                    jsonData: objData,
                                                    scope: this,
                                                    success:function(response)
                                                    {
                                                        windowAdd.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)
                                                        let store = panelBase.down('grid').getStore()
                                                        store.load(function()
                                                        {
                                                            windowAdd.destroy()
                                                        })
                                                    },
                                                    failure: function(response)
                                                    {
                                                        windowAdd.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)

                                                        Ext.Msg.alert('Error', 'Hubo un error al agregar la cancha.');
                                                    }
                                                })
                                            }
                                        }, 
                                        windowAdd
                                    )
                                }
                            }
                        },
                        {
                            text: 'Eliminar',
                            action: 'delete',
                            listeners:{
                                click: function(thisButton, e, eOpts)
                                {
                                    let panelBase = thisButton.up('admincanchas')
                                    let panelContainer = thisButton.up('panel')
                                    let grid = panelBase.down('grid')
                                    let record = grid.getSelectionModel().getSelection()

                                    if(Ext.isEmpty(record) || record.length != 1)
                                    {
                                        Ext.Msg.alert('Error', 'Recuerde que debe seleccionar un sólo elemento.');
                                        return
                                    }

                                    record = record.pop()
                                    
                                    Ext.MessageBox.confirm(
                                        'Confirmación',
                                        '¿Estás seguro de eliminar la Cancha?',
                                        function (buttonId, value, opt)
                                        {
                                            if(buttonId == 'yes')
                                            {
                                                grid.getEl().mask('Eliminando cancha...')
                                                Ext.Ajax.request({
                                                    url: panelBase.urlBase + '/' + record.data.id,
                                                    method: 'DELETE',
                                                    scope: this,
                                                    success:function(response)
                                                    {
                                                        grid.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)
                                                        let store = panelBase.down('grid').getStore()
                                                        store.load(function()
                                                        {
                                                            //grid.destroy()
                                                        })
                                                    },
                                                    failure: function(response)
                                                    {
                                                        grid.getEl().unmask()
                                                        let objResp = Ext.JSON.decode(response.reponseText)

                                                        Ext.Msg.alert('Error', 'Hubo un error al agregar la cancha.');
                                                    }
                                                })
                                            }  
                                        }
                                    )
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'pagingtoolbar',
                            store:{
                                type: 'canchas'
                            },
                            displayInfo: true,
                        }
                    ]
                }
            ],

            listeners:{
                itemcontextmenu: function ( gridView, record, item, index, e, eOpts ) 
                {
                    e.stopEvent(); 
                    
                    let menu = Ext.create('Ext.menu.Menu', {
                        items:[
                            {
                                text: 'Juegos Programados',
                                listeners:{ 
                                    click: function(thisButton, e, eOpts)
                                    {
                                        let panelBase = gridView.up('admincanchas')
                                        let grid = gridView.up('grid')
                                        
                                        grid.getEl().mask('Buscando disponibilidad...')
                                        let storeGame = Ext.create('Ext.data.Store',{
                                            autoLoad:true,

                                            fields: [
                                                'id',
                                                'date', 
                                                'startTime',
                                                'endTime',
                                                'serviceTime',
                                                'estado',
                                                'maxPlayers',
                                            ],
                                            
                                            proxy:
                                            {
                                                type: 'rest',
                                                reader:
                                                {
                                                    rootProperty: 'data',
                                                    type: 'json'
                                                },
                                                url: `${urlAPI}fields/${record.data.id}/games`,
                                            }
                                        })
                                        let windowAdd = Ext.create('Ext.window.Window', {
                                            title: 'Juegos Programados',
                                            height: '80%',
                                            width: '60%',
                                            layout: 'fit',
                                            modal: true,
                                            draggable: false,
                                            resizable: false,
                                            items: {
                                                xtype: 'grid',
                                                store: storeGame,
                                                border: true,
                                                margin: '15',
                                                columns: [
                                                    {
                                                        flex: 1,
                                                        text: 'date',
                                                        sortable: false,
                                                        hideable: false,
                                                        dataIndex: 'date'
                                                    },
                                                    {
                                                        text: 'Hora Ini',
                                                        sortable: false,
                                                        hideable: false,
                                                        dataIndex: 'startTime'
                                                    },
                                                    {
                                                        text: 'HoraFin',
                                                        sortable: false,
                                                        hideable: false,
                                                        dataIndex: 'endTime'
                                                    },
                                                    {
                                                        text: 'Estado',
                                                        sortable: false,
                                                        hideable: false,
                                                        dataIndex: 'estado'
                                                    },
                                                    {
                                                        flex: 1,
                                                        text: 'Max. Jugadores',
                                                        sortable: false,
                                                        hideable: false,
                                                        dataIndex: 'maxPlayers'
                                                    },
                                                ],
                                                dockedItems:[
                                                    {
                                                        xtype: 'toolbar',
                                                        dock: 'bottom',
                                                        items: [
                                                            {
                                                                xtype: 'pagingtoolbar',
                                                                store: storeGame,
                                                                displayInfo: true,
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        })
                                        windowAdd.show()

                                        windowAdd.afterShow (null, function(){grid.getEl().unmask()}) 

                                    }
                                }
                            }
                        ]
                    })

                    menu.showAt(e.getXY());
                }
            }         
        }
    ]
});
