/**
 * @classdesc
 * The Editor is the core component of OL3ditor.
 * This is very similar to the Map object, but has a few extra
 * methods and properties.
 *
 * @constructor
 * @extends {ol.Object}
 * @param {olx.MapOptions} options Map options.
 * @fires ol.MapBrowserEvent
 * @fires ol.MapEvent
 * @fires ol.render.Event#postcompose
 * @fires ol.render.Event#precompose
 * @api stable
 */
ol.Editor = function(options) {
    var options = options || {};
    var attributeManager_, layerManager_;
    /**
     * [properties selectedFeatures]
     * @type {[ol.Collection]}
     */
    this.selectedFeatures = (options.selectedFeatures
        && options.selectedFeatures instanceof ol.Collection)
        ? options.selectedFeatures : new ol.Collection();
    /**
     * [getLayerManager description]
     * @return {[ol.control.LayerManager]} [description]
     */
    this.getLayerManager = function() {
        if (layerManager_ === undefined) {
            layerManager_ = null;
        }
        return layerManager_;
    };
    
    this.setLayerManager = function(object) {
        if (object instanceof ol.control.LayerManager) {
            layerManager_ = object;
        }
        return layerManager_;
    };
    
    this.getAttributeManager = function() {
        if (attributeManager_ === undefined) {
            attributeManager_ = null;
        }
        return attributeManager_;
    };
    
    this.setAttributeManager = function(object) {
        if (object instanceof ol.control.AttributeManager) {
            attributeManager_ = object;
        }
        return attributeManager_;
    };
    
    this.sendMessage = function(text) {
        var success = false;
        this.getControls().forEach( function(control) {
            if (control instanceof ol.control.Message) {
                control.element.textContent = text;
                success = true;
            }
        }, this);
        if (!success) {
            console.log(text);
        }
    };
    /**
     * new ol.Map(options)
     */
    ol.Map.call(this, options);
};
/**
*    ol.inherits = function(childCtor, parentCtor) {
*         childCtor.prototype = Object.create(parentCtor.prototype);
*         childCtor.prototype.constructor = childCtor;
*   };
*/

//ol.inherits(ol.Editor, ol.Map);
//inherit relationship
//prototype原型对象 =对象
//constructor 属性
//原型对象的实例
// call
// apply
// 修改prototype属性后,必须手动修改prototype.constructor属性
// new 与 Object.create的区别子对象是否具有父对象实例的方法
// 闭包
// 函数式编程
// 函数工厂
ol.Editor.prototype=Object.create(ol.Map.prototype);
ol.Editor.prototype.constructor=ol.Editor;
/**
 * Add the given control to the editor.
 * @param {ol.control.Control} control Control.
 * @api stable
 */
ol.Editor.prototype.addControl = function(control) {
    ol.Map.prototype.addControl.call(this, control);
    /*
    if (control instanceof ol.control.LayerManager) {
        this.setLayerManager(control);
    }
    if (control instanceof ol.control.AttributeManager) {
        this.setAttributeManager(control);
    }
    */
};