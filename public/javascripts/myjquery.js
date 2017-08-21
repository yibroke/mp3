/* AutoComplete */
$("#youtube").autocomplete({
    source: function(request, response){
        /* google developer id (optional)*/
        var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
        /* keyword */
        var query = request.term;
        /* youtube query */
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",  
            dataType: 'jsonp',
            success: function(data, textStatus, request) { 
               response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    /* click the suggestion.*/
    select: function( event, ui ) {
        var key = ui.item.label;
        console.log(key);
        $('#youtube').val(key);
        $('#form_search').find('[type="submit"]').trigger('click');

    }
});

// for youtube1
  /* AutoComplete */
$("#youtube1").autocomplete({
    source: function(request, response){
        /* google developer id (optional)*/
        var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
        /* keyword */
        var query = request.term;
        /* youtube query */
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",  
            dataType: 'jsonp',
            success: function(data, textStatus, request) { 
               response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    /* click the suggestion.*/
    select: function( event, ui ) {
        var key = ui.item.label;
        console.log(key);
        $('#youtube').val(key);
        $('#form_search').find('[type="submit"]').trigger('click');

    }
});