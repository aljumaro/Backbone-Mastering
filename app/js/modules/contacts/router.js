const ContactsRouter = Backbone.Router.extend({
	routes: {
		'contacts': 'showContactList',
		'contacts/page/:page': 'showContactList',
		'contacts/new': 'createContact',
		'contacts/view/:id': 'showContact',
		'contacts/edit/:id': 'editContact'
	},

	showContactList: function(page) {

		let _page = page || 1;
		_page = _page > 0 ? _page : 1;

		let app = this.startApp();
		app.showContactList(_page);

	},

	createContact: function() {

		let app = this.startApp();
		app.showNewContactForm();

	},

	showContact: function (contactId) {

		let app = this.startApp();
		app.showContactById(contactId)

	},

	editContact: function (contactId) {

		let app = this.startApp();
		app.editContactById(contactId)

	},

	startApp: function () {
		return App.startSubApplication(this);
	}


});

module.exports = ContactsRouter;