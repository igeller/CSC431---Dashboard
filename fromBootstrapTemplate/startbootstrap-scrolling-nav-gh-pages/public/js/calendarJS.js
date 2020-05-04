var currentDate = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var minYear = 1900
var maxYear = 2200

function dynamicDropdownYear() {

    var items = '';

    for (year = minYear; year <= maxYear; year++) {
        items += '<a class="dropdown-item" onclick="$(\'#dropdownMenuButton2\').html(\'' + year + '\'); updateMonth();" href="#">' + year + '</a>\n';
    }

    return  '<div class="dropdown">\n' +
        '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        currentDate.getFullYear() +
        '</button>\n' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton2" style="max-height: 200px; overflow-y: scroll;">\n' +
        items +
        '</div>\n' +
        '</div>\n';
}

function dynamicDropdownMonth() {

    var items = '';

    for (index = 0; index < 12; index++) {
        items += '<a class="dropdown-item" id="dropdown-item" onclick="$(\'#dropdownMenuButton\').html(\'' + months[index] + '\'); updateMonth();" href="#">' + months[index] + '</a>\n'
    }

    return  '<div class="dropdown">\n' +
        '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        months[currentDate.getMonth()] +
        '</button>\n' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 200px; overflow-y: scroll;">\n' +
        items +
        '</div>\n' +
        '</div>\n';
}

function changeMonthLess() {

    var currentMonth = document.getElementById("dropdownMenuButton").textContent;
    var index = months.indexOf(currentMonth);

    if (index <= 0){
        index = 11
        var currentYear = document.getElementById("dropdownMenuButton2").textContent;
        if (currentYear <= minYear){

        } else {
            $('#dropdownMenuButton2').html(--currentYear);
        }
    } else {
        index--;
    }

    $('#dropdownMenuButton').html(months[index]);
    document.getElementById("calendar-layout").innerHTML=generateMonth();
    return;
}

function changeMonthMore() {

    var currentMonth = document.getElementById("dropdownMenuButton").textContent;
    var index = months.indexOf(currentMonth);

    if (index >= 11){
        index = 0
        var currentYear = document.getElementById("dropdownMenuButton2").textContent;
        if (currentYear >= maxYear || currentYear == 0){

        } else {
            $('#dropdownMenuButton2').html(++currentYear);
        }
    } else {
        index++;
    }

    $('#dropdownMenuButton').html(months[index]);
    document.getElementById("calendar-layout").innerHTML = generateMonth();
    return ;
}

function generateMonth() {

    var currentMonth = document.getElementById("dropdownMenuButton").textContent;
    var month = months.indexOf(currentMonth);
    var year = document.getElementById("dropdownMenuButton2").textContent;
    var date = new Date(year, month, 0);
    var isLeap = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
    var lastDay = date.getDay();
    var currentMonthDays = daysInMonth[month];
    var prevMonthDays;
    var dayCounter;
    var items = '';

	if (month == 0){
		prevMonthDays = daysInMonth[11];
	} else if(month == 1){
		if(isLeap){
			currentMonthDays++;
			prevMonthDays = daysInMonth[--month];
		} else {
			prevMonthDays = daysInMonth[--month];
		}
	} else if(month == 2){
		if(isLeap){
			prevMonthDays = daysInMonth[1] + 1;
		} else {
			prevMonthDays = daysInMonth[1];
		}
	} else if(month == 11){
		prevMonthDays = daysInMonth[10];
	} else {
		prevMonthDays = daysInMonth[--month];
	}
	
	dayCounter = prevMonthDays;
	for(i = 0; i < lastDay; i++){
		dayCounter--;
	}

    var onPrevMonth = true;
    var onCurrentMonth = false;
    var onPrevMonth2 = true;
    var onCurrentMonth2 = false;

    for(x = 0; x < 12; x++){
        if(x % 2 == 0){
            items += '<div class="row">\n';
            var rowStart = dayCounter;
        } else {
            items += '<div class="row" style="height: 5.7vw;">\n';
        }
        for(y = 0; y < 7; y++){
            if(x % 2 == 0){
                if(onPrevMonth || !onCurrentMonth){
                    items += '<div class="border-bottom-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
                        '<div class="bg-secondary" onclick="location.href=\'#\';" style="cursor: pointer; height: 100%;">\n' +
                        '<p style="margin-bottom: 0px">' + dayCounter + '</p>\n' +
                        '</div>\n' +
                        '</div>\n';
                } else {
                    items += '<div class="border-bottom-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
                        '<div class="bg-white" onclick="location.href=\'#\';" style="cursor: pointer; height: 100%;">\n' +
                        '<p style="margin-bottom: 0px">' + dayCounter + '</p>\n' +
                        '</div>\n' +
                        '</div>\n';
                }
                dayCounter++;
                if(dayCounter > prevMonthDays && onPrevMonth){
                    dayCounter = 1;
                    onPrevMonth = false;
                    onCurrentMonth = true;
                }
                if(dayCounter > currentMonthDays && onCurrentMonth){
                    dayCounter = 1;
                    onCurrentMonth = false;
                }
            } else {
                if(onPrevMonth2 || !onCurrentMonth2){
                    items += '<div class="border-top-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
                        '<div class="bg-secondary" onclick="location.href=\'#\';" style="cursor: pointer; height: 100%;">\n' +
                        '<p style=" height: 100%; display: flex; justify-content: center; align-items: center; padding-bottom: 10%; margin-bottom: 0px">\n' +
                        'Task\n' +
                        '</p>\n' +
                        '</div>\n' +
                        '</div>\n';

                } else {
                    items += '<div class="border-top-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
                        '<div class="bg-white" onclick="location.href=\'#\';" style="cursor: pointer; height: 100%;">\n' +
                        '<p style=" height: 100%; display: flex; justify-content: center; align-items: center; padding-bottom: 10%; margin-bottom: 0px">\n' +
                        'Task\n' +
                        '</p>\n' +
                        '</div>\n' +
                        '</div>\n';
                }
                rowStart++;
                if(rowStart > prevMonthDays && onPrevMonth2){
                    rowStart = 1;
                    onPrevMonth2 = false;
                    onCurrentMonth2 = true;
                }
                if(rowStart > currentMonthDays && onCurrentMonth2){
                    rowStart = 1;
                    onCurrentMonth2 = false;
                }
            }
        }
        items += '</div>\n';
    }

    return items;
}

function updateMonth() {
    document.getElementById("calendar-layout").innerHTML = generateMonth();
}

