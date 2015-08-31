$(document).ready(function() {
    $("#formDataTable").tableDnD({
        onDragClass: "highlight",
    });
    addRows();
});
// function which fetches data from localStorage and displays it during page load
var addRows = function() {
    if (localStorage.length != 0) {
        $('table').css("display", "table");
    }
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var data = '';
            var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
            var arr = Object.keys(JSON.parse(localStorage.getItem(localStorage.key(i))))
            var tbody = document.querySelector('tbody');
            var tr = document.createElement('tr');
            for (var j = 0; j < arr.length; j++) {
                var td = document.createElement('td');
                td.innerHTML = data[arr[j]];
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }
    }
};
// filter function to highlight the matched coloumn
var filter = function() {
    var value = $('#searchBar').val();
    var tr = document.querySelectorAll("tbody tr");
    for (var i = 0; i < tr.length; i++) {
        $(tr[i]).removeClass('highlight');
        var td = tr[i].querySelectorAll("td");
        for (var j = 0; j < td.length; j++) {
            if (td[j].innerHTML == value) {
                $(tr[i]).addClass('highlight');
            }
        }
    }
};
// function to sort the table
var people, asc1 = 1,
    asc2 = 1,
    asc3 = 1,
    asc4 = 1,
    asc5 = 1;
people = document.getElementById("people");
var sort_table = function(tbody, col, asc) {
        var rows = tbody.rows,
            rlen = rows.length,
            arr = new Array(),
            i, j, cells, clen;
        for (i = 0; i < rlen; i++) {
            cells = rows[i].cells;
            clen = cells.length;
            arr[i] = new Array();
            for (j = 0; j < clen; j++) {
                arr[i][j] = cells[j].innerHTML;
            }
        }
        // sort the array by the specified column number (col) and order (asc)
        arr.sort(function(a, b) {
            return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
        });
        // replace existing rows with new rows created from the sorted array
        for (i = 0; i < rlen; i++) {
            rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
        }
    }
    // function to checkInput onblur and display error correspondingly
var checkInput = function(e) {
    var $this = $(e);
    var type = $this.attr('type');
    var content = $this.val();
    switch (type) {
        case "email":
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            var is_email = re.test(content);
            if (is_email && content) {
                $this.closest(".devise-form").removeClass('has-error');
                $this.closest(".form-group").removeClass('has-error');
                $this.siblings(".required-error").css("display", "none");
                $this.siblings(".email-error").css("display", "none");
            } else if (!content) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".required-error").css("display", "block");
                $this.siblings(".email-error").css("display", "none");
            } else if (!is_email) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".email-error").css("display", "block");
                $this.siblings(".required-error").css("display", "none");
            }
            break;
        case "text":
            var re = /^[A-Za-z ]*$/;
            var is_name = re.test(content);
            if (is_name && content) {
                $this.closest(".devise-form").removeClass('has-error');
                $this.closest(".form-group").removeClass('has-error');
                $this.siblings(".required-error").css("display", "none");
                $this.siblings(".char-error").css("display", "none");
            } else if (!content) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".required-error").css("display", "block");
                $this.siblings(".char-error").css("display", "none");
            } else if (!is_name) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".char-error").css("display", "block");
                $this.siblings(".required-error").css("display", "none");
            }
            break;
        case "password":
            if (content.length >= 8) {
                $this.closest(".devise-form").removeClass('has-error');
                $this.closest(".form-group").removeClass('has-error');
                $this.siblings(".required-error").css("display", "none");
                $this.siblings(".min-error").css("display", "none");
            } else if (!content) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".required-error").css("display", "block");
                $this.siblings(".min-error").css("display", "none");
            } else {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".min-error").css("display", "block");
                $this.siblings(".required-error").css("display", "none");
            }
            break;
        case "phone":
            var re = /^[0-9]*$/;
            var is_number = re.test(content);
            if (!is_number) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".length-error").css("display", "none");
                $this.siblings(".number-error").css("display", "block");
            } else if (content.length != 10) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".length-error").css("display", "block");
                $this.siblings(".number-error").css("display", "none");
            } else {
                $this.closest(".devise-form").removeClass('has-error');
                $this.closest(".form-group").removeClass('has-error');
                $this.siblings(".length-error").css("display", "none");
                $this.siblings(".number-error").css("display", "none");
            }
            break;
        case "dateOfBirth":
            var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
            var is_date = content.match(re);
            if (is_date && content) {
                if (is_date[1] < 1 || is_date[1] > 31) {
                    $this.closest(".devise-form").addClass('has-error');
                    $this.closest(".form-group").addClass('has-error');
                    $this.siblings(".date-error").css("display", "block");
                    $this.siblings(".required-error").css("display", "none");
                } else if (is_date[2] < 1 || is_date[2] > 12) {
                    $this.closest(".devise-form").addClass('has-error');
                    $this.closest(".form-group").addClass('has-error');
                    $this.siblings(".date-error").css("display", "block");
                    $this.siblings(".required-error").css("display", "none");
                } else if (is_date[3] < 1902 || is_date[3] > (new Date()).getFullYear()) {
                    $this.closest(".devise-form").addClass('has-error');
                    $this.closest(".form-group").addClass('has-error');
                    $this.siblings(".date-error").css("display", "block");
                    $this.siblings(".required-error").css("display", "none");
                } else {
                    $this.closest(".devise-form").removeClass('has-error');
                    $this.closest(".form-group").removeClass('has-error');
                    $this.siblings(".date-error").css("display", "none");
                    $this.siblings(".required-error").css("display", "none");
                }
            } else if (!content) {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".required-error").css("display", "block");
                $this.siblings(".date-error").css("display", "none");
            } else {
                $this.closest(".devise-form").addClass('has-error');
                $this.closest(".form-group").addClass('has-error');
                $this.siblings(".date-error").css("display", "block");
                $this.siblings(".required-error").css("display", "none");
            }
            break;
    }
};
// function which adds row during success
var addRow = function(obj) {
        $('table').css("display", "table");
        var data = JSON.parse(obj);
        var titleArr = [];
        var tr = document.createElement('tr');
        var theadContent = document.querySelectorAll('thead tr th');
        // function to store the ordering of table headers
        for (var i = 0; i < theadContent.length; i++) {
            var titleValue = theadContent[i].getAttribute("class");
            titleArr.push(titleValue);
        }
        // function to insert data according to table headers
        for (var j = 0; j < titleArr.length; j++) {
            var td = document.createElement('td');
            td.innerHTML = data[titleArr[j]];
            tr.appendChild(td);
        }
        $('#formDataTable').append(tr);
    }
    // submit button handler
$('#submitButton').click(function(e) {
    e.preventDefault();
    if ($('.devise-form').hasClass('has-error')) {
        $('#alert').text('*Error submitting the form').removeClass('success-heading').addClass('error-heading');
    } else {
        var user = {};
        user.username = $('#username').val();
        user.password = $('#password').val();
        user.email = $('#email').val();
        user.phone = $('#phone').val();
        user.date = $('#date').val();
        for (var i in user) {
            if (user[i] == '' && i != phone) {
                $('#alert').text('Please fill the necessary fields').removeClass('success-heading').addClass('error-heading');
                return;
            } else {
                $('#alert').text('');
            }
        }
        var notUnique = 0;
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            if (user.email === JSON.parse(localStorage.getItem(localStorage.key(i)))["email"]) {
                $('#alert').text('Email Address is already taken').removeClass('success-heading').addClass('error-heading');
                notUnique++;
            }
        }
        if (!notUnique) {
            $('#alert').text("You have succesfully submitted the data").removeClass('error-heading').addClass('success-heading');
            localStorage.setItem(user.email, JSON.stringify(user));
            var obj = localStorage.getItem(user.email);
            for (var i = 0, len = localStorage.length; i < len; ++i) {}
            addRow(obj);
        }
    }
});