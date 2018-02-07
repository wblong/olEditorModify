/**
 * @classdesc
 * 
 *  在状态栏上显示地图缩放的级别及分辨率
 * @constructor
 * @extends {ol.control.Control}
 * @param {olx.control.ControlOptions} options Control options.
 */
ol.control.ZoomAndResolution=function(opt_options){
    var options=opt_options||{};
    var _this=this;
    var controlDiv=document.createElement("div");
    controlDiv.className=options.className||"ol-zoom-pos ol-unselectable ol-control";
    var label=document.createElement('label');
    controlDiv.appendChild(label);
    ol.control.Control.call(this, {
        element: controlDiv,
        target: options.target
    });
    this.set('element', label);
}

ol.inherits(ol.control.ZoomAndResolution, ol.control.Control);

ol.control.ZoomAndResolution.prototype.setMap = function(map) {
    ol.control.Control.prototype.setMap.call(this, map);
    if (map === null) {
        ol.Observable.unByKey(this.get('eventId'));
    } else {
        var _this = this;
        this.set('eventId', map.getView().on('change:resolution', function (evt) {

            this.get('element').innerHTML ="Zoom:"+Math.round(map.getView().getZoom());
            //alert(this.get('element').innerHTML);
        }, this));
    }
};