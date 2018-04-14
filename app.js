var app = new Vue({
	el: "#main",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {username: '', email: '', mobile: ''},
		clickedUser: {},

	},
	beforeMount: function() {
		console.log('Vuejs is mounthed');
		this.getAllUsers();
	},
	methods: {
		getAllUsers: function(){
			axios.get('http://localhost:8080/vue-php/api.php?action=read')
				.then(function(response){
					//console.log(response);
					if(response.data.error){
						app.errorMessage = response.data.error;
					}else{
						app.users = response.data.users;
					}
				});
		},
		saveUser: function(){
			var formData = app.toFormData(app.newUser);
			axios.post('http://localhost:8080/vue-php/api.php?action=create', formData)
				.then(function(response){
					console.log(response);
					app.newUser = {username: '', email: '', mobile: ''};
					if(response.data.error){
						app.errorMessage = response.data.error;
					}else{
						app.successMessage = 'User added succesfully.'
						app.getAllUsers();
						app.clearMessage();
					}
				});
			
		},
		updateUser: function(){
			var formData = app.toFormData(app.clickedUser);
			axios.post('http://localhost:8080/vue-php/api.php?action=update', formData)
				.then(function(response){
					console.log(response);
					app.clickedUser = {};
					if(response.data.error){
						app.errorMessage = response.data.error;
					}else{
						app.successMessage = 'User updated succesfully.'
						app.getAllUsers();
						app.clearMessage();
					}
				});
		},
		deleteUser: function(){
			var formData = app.toFormData(app.clickedUser);
			axios.post('http://localhost:8080/vue-php/api.php?action=delete', formData)
				.then(function(response){
					console.log(response);
					app.clickedUser = {};
					if(response.data.error){
						app.errorMessage = response.data.error;
					}else{
						app.successMessage = 'User deleted succesfully.'
						app.getAllUsers();
						app.clearMessage();
					}
				});
		},
		selectedUser: function(user){
			app.clickedUser = user;
		},
		toFormData: function(obj){
			var form_data = new FormData();
			for (var key in obj){
				form_data.append(key, obj[key]);
			}
			console.log(form_data);
			return form_data;
		},
		clearMessage: function(){
			setTimeout(function(){
				app.successMessage = '';
				app.errorMessage = '';
			},2500)
		}
	}
});