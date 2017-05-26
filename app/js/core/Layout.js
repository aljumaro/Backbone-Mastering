const ModelView = require('./ModelView');

const Layout = ModelView.extend({

    render: function() {
    	this.closeRegions();

    	let result = ModelView.prototype.render.call(this);

    	this.configureRegions();

    	return result;
    },

    configureRegions: function() {
    	let regionDefinitions = this.regions || {};

    	if (!this._regions) {
    		this._regions = {};
    	}

    	_.each(regionDefinitions, (selector, name) => {
    		let $el = this.$(selector);
    		this._regions[name] = new Region({el: $el});
    	});
    },

    getRegion: function(name) {

    	let regions = this._regions || {};

    	return regions[name];
    },

    remove: function(options) {
    	ModelView.prototype.remove.call(this, options);
    	this.closeRegions();
    },

    closeRegions: function () {
    	var regions = this._regions || {};

    	_.each(regions, region => {
    		if (region && region.remove) {
    			region.remove();
    		}
    	})
    }

});

module.exports = Layout;
