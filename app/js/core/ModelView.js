/*
 	One of four base views: Render a template with model data.
*/
const ModelView = Backbone.View.extend({

    render: function() {

        let data = this.serializeData();

        this.$el.html(this.getRenderedHTML(data));

        return this;

    },

    serializeData: function() {
        
        let data;

        if (this.model) {
            data = this.model.toJSON();
        }

        return data;

    },

    getRenderedHTML: function(data) {
        // If template is a function assume that is a compiled
        // template, if not assume that is a CSS selector where
        // the template is defined and is compatible with
        // underscore templates
        let renderedHtml;

        if (_.isFunction(this.template)) {
            renderedHtml = this.template(data);
        } else if (_.isString(this.template)) {
            let compiledTemplate = this.compileTemplate();
            renderedHtml = compiledTemplate(data);
        }

        return renderedHtml;
    },

    compileTemplate() {
        let $el = $(this.template);
        return _.template($el.html());
    }

});

module.exports = ModelView;
