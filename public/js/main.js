var viewmodel = function(){

	var self = this;
	var socket = io.connect('http://localhost');

	this.clientMessage = ko.observable('');
	this.serverMessages = ko.observableArray([]);

	this.sendMessage = function(){
		socket.emit('cliMsg', { timestamp: new Date(), body: self.clientMessage() });
		self.clientMessage('');
	};

	socket.on('cliConn', function(data){
		self.serverMessages.push(data);
	});

	socket.on('svrMsg', function(data){
		self.serverMessages.push(data);
	});
}

$(document).ready(function(){
	ko.applyBindings(new viewmodel());
});