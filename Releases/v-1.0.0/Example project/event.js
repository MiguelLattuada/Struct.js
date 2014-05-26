$('.form').on('submit', function( event ){
	event.preventDefault();

	var action = $(this).data('action');

	if( action == 'add' ){

		var p = new Person(
			$('#name').val(),
			$('#last').val(),
			$('#age').val()
		);

		var e = new Event(
			Type.add,
			People.add(p)
		);

		EventLogger.add(e);

		$('#names').append('<option value=' + p.id + '>' + p.name + ' ' + p.last + '</option>');
	}

	if( action == 'delete' ){

		var p = People.getBy({id: $('#names option:checked').attr('value') });
		

		var e = new Event(
			Type.delete,
			People.deleteOnject(p)
		);

		EventLogger.add(e);
	}

	$('#show-console').show();
	$('#show-console-all').show();
});

$('#show-console').on('click', function( event ){
	event.preventDefault();
	//Get the last element from the EventLogger ArrayList element and display it as string.
	console.log(EventLogger.last().toString());
});

$('#show-console-all').on('click', function( event ){
	event.preventDefault();
	//Convert the ArrayList tos tring.
	console.log(EventLogger.toString());
});