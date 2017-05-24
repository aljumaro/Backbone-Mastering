/*
	One of four base views: Render a collection of views with collection data; it
should update the list of views automatically when the collection changes
*/

const CollectionView = Backbone.View.extend({

    initialize: function() {

        this.children = {};

        this.listenTo(this.collection, 'add', this.addModel);
        this.listenTo(this.collection, 'remove', this.removeModel);
        this.listenTo(this.collection, 'reset', this.render);
    },

    removeModel: function(model) {
        if (!model) return;

        var view = this.children[model.cid];

        this.closeChildView(view);
    },

    addModel: function(model) {
        this.$el.append(this.renderModel(model).$el);
    },

    renderModel: function(model) {
        // Create a new view instance, modelView should be
        // redefined as a subclass of Backbone.View
        let view = new this.modelView({ model: model });

        // Keep track of which view belongs to a model
        this.children[model.cid] = view;

        // Re-trigger all events in the children views, so that
        // you can listen events of the children views from the
        // collection view
        this.listenTo(view, 'all', eventName => {
            this.trigger('item:' + eventName, view, model);
        });

        view.render();
        return view;
    },

    render: function() {

        // Clean up any previous elements rendered
        this.closeChildren();

        let html = this.collection.map(model => {
            return this.renderModel(model).$el;
        });

        this.$el.html(html);

        return this;
    },

    // Called to close the collection view, should close
    // itself and all the live childrens
    remove: function() {
        Backbone.View.prototype.remove.call(this);
        this.closeChildren();
    },

    // Close all the live childrens
    closeChildren: function() {
        var children = this.children || {};
        // Use the arrow function to bind correctly the "this" object
        _.each(children, child => this.closeChildView(child));
    },

    closeChildView: function(view) {
        // Ignore if view is not valid
        if (!view) return;
        // Call the remove function only if available
        if (_.isFunction(view.remove)) {
            view.remove();
        }
        // Remove event handlers for the view
        this.stopListening(view);
        // Stop tracking the model-view relationship for the
        // closed view
        if (view.model) {
            this.children[view.model.cid] = undefined;
        }
    }

});

module.exports = CollectionView;
