var currentDate = new Date();
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var minYear = 1970
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
            $('#dropdownMenuButton2').html(currentYear - 1);
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
            $('#dropdownMenuButton2').html(currentYear + 1);
        }
    } else {
        index++;
    }

    $('#dropdownMenuButton').html(months[index]);
    document.getElementById("calendar-layout").innerHTML = generateMonth();
    return ;
}	

function generateMonth() {
	getTasks((tasks) => {
		var currentMonth = document.getElementById("dropdownMenuButton").textContent;
		var month = months.indexOf(currentMonth);
		var year = document.getElementById("dropdownMenuButton2").textContent;
		var date = new Date(year, month, 0);
		var tasks = taskArray;
		tasks = tasks.sort((a, b) => a.due.valueOf() - b.due.valueOf());
		
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
				prevMonthDays = daysInMonth[month - 1];
			} else {
				prevMonthDays = daysInMonth[month - 1];
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
			prevMonthDays = daysInMonth[month - 1];
		}
		
		dayCounter = prevMonthDays;
		for(i = 0; i < lastDay; i++){
			dayCounter--;
		}
		
		var orderedTasks = createArray();
		var startDate = date;
		startDate.setDate(startDate.getDate() - (prevMonthDays - dayCounter));
		var countDate2 = startDate;
		var countDate = startDate;
		var c = 0;
		for(i = 0; i < tasks.length;){
			var iDate = new Date(tasks[i].due)
			if(!dateCompare(iDate,countDate)){
				c++;
				countDate.setDate(countDate.getDate() + 1);
			} else {
				if(i != 0 && dateCompare(iDate, new Date(tasks[i - 1].due))){
					orderedTasks[c].push(tasks[i]);
					i++;
				} else if(i == 0){
					orderedTasks[c].push(tasks[i]);
					i++;
				} else {
					c++;
					countDate.setDate(countDate.getDate() + 1);
					orderedTasks[c].push(tasks[i]);
					i++;
				}
			}
			if(c > 41){
				break;
			}
		}

		var onPrevMonth = true;
		var onCurrentMonth = false;
		var onPrevMonth2 = true;
		var onCurrentMonth2 = false;

		var z = 0;
		var z2 = 0
		countDate = countDate2;
		
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
							'<div class="bg-secondary" onclick="callModal(new Date('+ countDate2.valueOf() + '));" style="cursor: pointer; height: 100%;">\n' +
							'<p style="margin-bottom: 0px">' + dayCounter + '</p>\n' +
							'</div>\n' +
							'</div>\n';
					} else {
						items += '<div class="border-bottom-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
							'<div class="bg-white" onclick="callModal(new Date('+ countDate2.valueOf() + '));" style="cursor: pointer; height: 100%;">\n' +
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
					countDate2.setDate(countDate2.getDate() + 1);
					z2++;
				} else {
					if(onPrevMonth2 || !onCurrentMonth2){
						var taskString = '';
						if(typeof orderedTasks[z] !== 'undefined'){
							for(i = 0; i < orderedTasks[z].length; i++){
								if(i != orderedTasks[z].length - 1){
									taskString += orderedTasks[z][i].title + '<br>'
								} else {
									taskString += orderedTasks[z][i].title
								}
							}
						}
						items += '<div class="border-top-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
							'<div class="bg-secondary" onclick="callModal(new Date(' + countDate.valueOf() + '));" style="cursor: pointer; height: 100%;">\n' +
							'<p style=" height: 100%; display: flex; justify-content: center; align-items: center; padding-bottom: 10%; margin-bottom: 0px">\n' +
							taskString + '\n' +
							'</p>\n' +
							'</div>\n' +
							'</div>\n';

					} else {
						var taskString = '';
						if(typeof orderedTasks[z] !== 'undefined'){
							for(i = 0; i < orderedTasks[z].length; i++){
								if(i != orderedTasks[z].length - 1){
									taskString += orderedTasks[z][i].title + '<br>'
								} else {
									taskString += orderedTasks[z][i].title
								}
							}
						}
						items += '<div class="border-top-0 border primary col" style="padding-left: 0px; padding-right: 0px;">\n' +
							'<div class="bg-white" onclick="callModal(new Date(' + countDate.valueOf() + '));" style="cursor: pointer; height: 100%;">\n' +
							'<p style=" height: 100%; display: flex; justify-content: center; align-items: center; padding-bottom: 10%; margin-bottom: 0px">\n' +
							taskString + '\n' +
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
					countDate.setDate(countDate.getDate() + 1);
					z++;
				}
			}
			items += '</div>\n';
		}

		document.getElementById("calendar-layout").innerHTML = items;
	});
}

function updateMonth() {
    document.getElementById("calendar-layout").innerHTML = generateMonth();
}

function dateCompare(date1, date2){
	return (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getYear() == date2.getYear());
}

function createArray() {
	var arr = [];
	for(i = 0; i < 42; i++){
		arr.push(new Array());
	}
	return arr;
}

function callModal(date) {
	//this is not ideal behavior <-- GOOD TO KNOW!    
	$('body').append(`
<div class="modal fade" id="modal-b5" tabindex="-1" role="dialog" aria-labelledby="modal-b5" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                            <div class="modal-body p-0">
                                <div class="card bg-secondary shadow-none border-0">
                                    <div class="card-header bg-white pb-5">
                                        <div class="card-body px-lg-5 text-left">
                                            <form role="form">
                                                <div class="form-group row">
                                                    <label for="title" class="col-sm-12 col-form-label"><i class="fas pr-2"></i>Title</label>
                                                    <div class="col-sm-12">
                                                        <input id="title" class="form-control requiredField" placeholder="Insert title here" type="title" required>
                                                    </div>
                                                    <label for="due-date" class="col-sm-12 col-form-label"><i class="fas pr-2"></i>Due Date</label>
                                                    <div class="col-sm-12">
                                                        <input id="due-date" class="form-control requiredField" placeholder="DD/MM/YYYY" type="date" required>
                                                    </div>
                                                    <label for="details" class="col-sm-12 col-form-label"><i class="fas pr-2"></i>Details</label>
                                                    <div class="col-sm-12">
                                                        <input id="details" class="form-control" type="details">
                                                    </div>
                                <label for="timer" class="col-sm-12 col-form-label"><i class="fas pr-2"></i>Timer</label>
                                                    <div class="col-sm-12">
                                                        <input id="timer" class="form-control requiredField" placeholder="HH:MM" type="time" required>
                                                    </div>
                                <label for="priority" class="col-sm-12 col-form-label"><i class="fas pr-2"></i>Priority</label>
                                <div id="aBtnGroup" class="btn-group">
                                    <button type="button" value="Low" class="btn btn-default" id="low">Low</button>
                                    <button type="button" value="Medium" class="btn btn-default" id="medium">Medium</button>
                                    <button type="button" value="High" class="btn btn-default" id="high">High</button>
                                  </div>
                                


                                                </div>
                            <div class="btn-group">
                                <select id="category">
                                    <option value="1" selected="selected">Assignment</option>
                                    <option value="2">Reminder</option>
                                    <option value="3">Exam</option>
                                </select>
                            </div>
                            <nav aria-label="Priority Selection">
                                </div>
                                                </nav>
                                                <div class="text-center">
                                                    <button id="modClose" type="button" onclick="createTask(getValue('title'), getValue('due-date'), getValue('category'), '', 'Medium', getValue('timer'), getValue('details'),() => {redirectPage('index.html')})" class="btn btn-info my-4">Create Task</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>`
);
    $("#modal-b5").modal('toggle');
}

