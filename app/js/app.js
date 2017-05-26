const ContactsRouter = require('./contacts/router');

const DefaultRouter = Backbone.router.extend({
	routes: {
		'*route': 'defaultRoute'
	},

	defaultRoute: function(route) {
		console.log(route);
	}

});

const App = {
	
	models: {},
	collections: {},
	routers: {},

	start: function() {
		_.each(_.values(this.routers), Router => new Router());

		this.router = new DefaultRouter();
		Backbone.history.start();

	}


}

App.routers.ContactsRouter = ContactsRouter;

module.exports = App;