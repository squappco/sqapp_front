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
            store: {
                type: 'canchas'
            },
            //bind: {
            //    store: '{canchas}'
            //},
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
                    //hidden: true
                },
                {
                    flex: 1,
                    text: 'Phone Number',
                    dataIndex: 'phone'
                },
                {
                    flex: 1,
                    text: 'Calificación',
                    dataIndex: 'score'
                }
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
                                                {
                                                    xtype: 'hiddenfield',
                                                    name: 'uid',
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
                                                    //minValue: '6:00 AM',
                                                    //maxValue: '8:00 PM',
                                                    increment: 30,
                                                    //anchor: '100%'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    name: 'finishTime',
                                                    fieldLabel: 'Hora Fin',
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

                                                Ext.Ajax.request({
                                                    url: 'holaPC',
                                                    method: 'POST',
                                                    jsonData: objData,
                                                    scope: this,
                                                    success:function(response)
                                                    {
                                                        let objResp = Ext.JSON.decode(response.reponseText)
                                                        console.log('objResp:', objResp)
                                                        alert(response.reponseText)
                                                    },
                                                    failure: function(response)
                                                    {
                                                        let objResp = Ext.JSON.decode(response.reponseText)

                                                        alert('Falló')
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
                            action: 'edit'
                        },
                        {
                            text: 'Eliminar',
                            action: 'delete'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            store:{
                                type: 'canchas'
                            }
                        }
                    ]
                }
            ],            
        }
    ]
});
