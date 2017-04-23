(function(){
// Override Pie Chart legend to make it tabular
// Data expected to be like this:
// data: [
//     { 'service': 'Books', 'cost':10 },
//     { 'service': 'Paper', 'cost':27 },
//     { 'service': 'Pencils', 'cost':7 }
// ]

Ext.override(Ext.chart.LegendItem, {
    updatePosition: function(relativeTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            currentX = me.x,
            currentY = me.y,
            item, i, x, y, translate, o,
            relativeX, relativeY;

        if (!relativeTo) {
            relativeTo = me.legend;
        }

        relativeX = relativeTo.x;
        relativeY = relativeTo.y;
        for (i = 0; i < ln; i++) {
            translate = true;
            item = items[i];
            switch (item.type) {
                case 'text':
                    switch (item.subtype) {
                        case 'cost':
                            x = 120 + relativeX + currentX;
                            break;
                        default:
                            x = 20 + relativeX + currentX;
                    }
                    y = relativeY + currentY;
                    translate = false;
                    break;
                case 'rect':
                    x = relativeX + currentX;
                    y = relativeY + currentY - 6;
                    break;
                default:
                    x = relativeX + currentX;
                    y = relativeY + currentY;
            }

            o = {
                x: x,
                y: y
            };
            item.setAttributes(translate ? {
                translate: o
            } : o, true);
        }
    },
    createLabel: function(config) {
        var me = this,
            legend = me.legend,
            chart = legend.chart,
            seriesItems = chart.store.data.items;

        me.add('cost', me.surface.add({
            type: 'text',
            subtype: 'cost',
            zIndex: (me.zIndex || 0) + 3,
            fill: legend.labelColor,
            font: legend.labelFont,
            text: chart.currency + ' ' + seriesItems[me.yFieldIndex].get('cost')
        }));

        return me.add('label', me.surface.add({
            type: 'text',
            subtype: 'service',
            zIndex: (me.zIndex || 0) + 2,
            fill: legend.labelColor,
            font: legend.labelFont,
            text: me.getLabelText(),
            style: {
                cursor: 'pointer'
            }
        }));
    },
});
})();
