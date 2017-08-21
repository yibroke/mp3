
$(document).ready(function () {
    //begin login
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function (data) {
                var obj = $.parseJSON(JSON.stringify(data));

                if (obj['success'] == true) {
                    window.location.reload();
                }
                else {
                    $('#login_error').html('Wrong Username or Password!');
                }
            }
        });//end ajax
    })//end login
    //public button
    $('.btn-public').click(function () {
        $.ajax({
            url: '/show',
            type: 'POST',
            data: {
                live: user_id,
                islive:'1'
            },

            success: function (data) {
                console.log(data);
                var obj = $.parseJSON(JSON.stringify(data));
                if (obj['success'] == true) {
                    window.location.reload();
                }
                else {
                    alert('ERROR');
                }
            }
        });//end ajax
    })//public button
    //offline button
    $('.btn-offline').click(function () {
        $.ajax({
            url: '/show',
            type: 'POST',
            data: {
                live: user_id,
                islive:'0'
            },
            success: function (data) {
                console.log(data);
                var obj = $.parseJSON(JSON.stringify(data));

                if (obj['success'] == true) {
                    window.location.reload();
                }
                else {
                    alert('ERROR');
                }
            }
        });//end ajax
    })//offline button
    //begin form email password
    $('#form_email_password').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/email_password',
            type: 'POST',
            data: {
                email: $('#email_password').val()
            },
            success: function (data) {
                var obj = $.parseJSON(JSON.stringify(data));
                if (obj['success'] == true) {
                    $('#email_password_error').html( obj['message']);
                }
                else {
                    $('#email_password_error').html(obj['message']);
                }
            }
        });//end ajax
    })//end form email password
    //begin form reset password
    $('#form_reset_password').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/reset_password',
            type: 'POST',
            data: {
                password: $('#reset_password').val(),
                password1: $('#reset_password1').val(),
                token:$('#token').val()
            },
            success: function (data) {
                var obj = $.parseJSON(JSON.stringify(data));

                if (obj['success'] == true) {
                    $('#reset_password_error').html( obj['message']);
                }
                else {
                    $('#reset_password_error').html(obj['message']);
                }
            }
        });//end ajax
    })//end form reset password
    //form register
    $('#form_register').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/register',
            type: 'POST',
            data: {
                name1: $('#name1').val(),
                email1: $('#email1').val(),
                username1: $('#username1').val(),
                password1: $('#password1').val(),
                password2: $('#password2').val()
            },
            success: function (data) {
                console.log(data);
                var obj = $.parseJSON(JSON.stringify(data));

                if (obj['success'] == true) {
                    $('#register-success').html('Success! Please check your email to activate your account');
                    $('#register-error').hide();
                }
                else {
                    $('#register-error').html(obj['errors']['msg']);
                }
                if(obj['success']=='already')
                {
                    $('#register-error').html(obj['errors']);
                }
            }
        });//end ajax
    });// end submit register
    //form profile image
    $('#form_profile_img').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/dashboard',
            type: 'POST',
            data: {
                password2: $('#password2').val()
            },

            success: function (data) {
                console.log(data);
                var obj = $.parseJSON(JSON.stringify(data));

                if (obj['success'] == true) {
                    $('#register-success').html('Success! Now you can login');
                    $('#register-error').hide();
                }
                else {

                    $('#register-error').html(obj['errors']['msg']);

                }
                if(obj['success']=='already')
                {
                    $('#register-error').html(obj['errors']);
                }

            }
        });//end ajax


    });// end submit profile image
});//end ready



// Outsite jquery ready

function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
}


