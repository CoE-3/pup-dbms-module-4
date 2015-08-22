var thesislist=[];

function onFormSubmit(event){
	var data = $(event.target).serializeArray();

	var thesis={};

	for (var i=0;i<data.length;i++){
		thesis[data[i].name] = data[i].value;
	}

	var list_element=$('<li id="item"' +'class="' + thesis.year + thesis.title1 + '">');
	
	var item = list_element.html(thesis.year + ' ' + thesis.title1);

	//send data to server
	var thesis_entry_api = '/api/thesis';
	$.post(thesis_entry_api, thesis, function(response){
	//read response from server
	//if student save is successful
		if(response.status = 'OK') {
			//display student
			var full_info = response.data.year + ' ' + response.data.title1+ ' - Entered by:' + response.data.author;
			$('.thesis-list').append('<li>' + full_info + '<li>')
		}
		else {
			//if student is not successful
		}
	});


	return false;
}(jQuery)

function loadAllthesis(){
	var thesis_list_api = '/api/thesis';
	$.get(thesis_list_api, {}, function(response){
		console.log('thesis list', response)
		response.data.forEach(function(thesis) {
			var full_info = thesis.year + ' ' + thesis.title1 + ' - Entered by:' + thesis.author;
			$('.thesis-list').append('<li>' + full_info + '</li>' )
		});
	});
}

$('.create-form').submit(onFormSubmit);

loadAllthesis();