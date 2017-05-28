Ext.define('Admin.view.dashboard.Services', {
    extend: 'Ext.Panel',
    xtype: 'services',

    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.Rotate'
    ],

    cls: 'service-type shadow',
    bodyPadding: 15,
    title: 'Services',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function()
    {
        this.items = [
            {
                xtype: 'container',
                width: 140,
                defaults: {
                    height:126,
                    insetPadding: '7.5 7.5 7.5 7.5',
                    background: 'rgba(255, 255, 255, 1)',
                    colors: [
                        '#6aa5dc',
                        '#fdbf00',
                        '#ee929d'
                    ],
                    bind: '{servicePerformance}',
                    series: [
                        {
                            type: 'pie',
                            label: {
                                field: 'xField',
                                display: 'rotate',
                                contrast: true,
                                font: '12px Arial'
                            },
                            useDarkerStrokeColor: false,
                            xField: 'yvalue',
                            donut: 50,
                            padding:0
                        }
                    ],
                    interactions: [
                        {
                            type: 'rotate'
                        }
                    ]
                },
                items: [
                    {
                        xtype: 'polar'
                    },
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype:'component',
                        data: this.dataProgress[0],
                        tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                    },
                    {
                        xtype: 'progressbar',
                        cls: 'bottom-indent service-finance',
                        height: 4,
                        minHeight: 4,
                        value: 0.2
                    },
                    {
                        xtype:'component',
                        data: this.dataProgress[1],
                        tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                    },
                    {
                        xtype: 'progressbar',
                        cls: 'bottom-indent service-research',
                        height: 4,
                        minHeight: 4,
                        value: 0.68
                    },
                    {
                        xtype:'component',
                        data: this.dataProgress[2],
                        tpl: '<div class="left-aligned-div">{name}</div><div class="right-aligned-div">{value}</div>'
                    },
                    {
                        xtype: 'progressbar',
                        cls: 'bottom-indent service-marketing',
                        height: 4,
                        value: 0.12
                    },
                ]
            }
        ]
        this.callParent(arguments)
    }
});
