const ModelView = require('./core/ModelView');
const CollectionView = require('./core/CollectionView');
const TestTemplate = require('./test.handlebars');

$(function() {

    App.sayHi();

    let contact = new Backbone.Model({
        name: 'Jhon Doe',
        age: 65
    });

    let ContactView = ModelView.extend({
        template: TestTemplate
    });

    let contactView = new ContactView({
        model: contact,
        el: '#contact-view'
    });

    contactView.render();

    let contact2 = new Backbone.Model({
        name: 'Dave O. Doe',
        age: 36
    });

    let collection = new Backbone.Collection();
    collection.add([contact, contact2]);

    let SomeCollectionView = CollectionView.extend({
    	el: '#contact-list-view',
    	modelView: ContactView
    });

    let someCollectionView = new SomeCollectionView({collection: collection});
    someCollectionView.render();
});
