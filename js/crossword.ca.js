
const puzzle = "puzzle-";
var puzzleNumber = puzzle;
var correctAnswers = 0;
var puzzleArray = [];
var prevClass = "";
var $prevCell = "";
var timer;
var submitted = false;
var phone = window.matchMedia("(max-width: 768px)");


$(function() {
    for(var i = 0; i < questions; ++i) {
		puzzleArray.push((puzzle+(i+1)) + " ");
	}
});

$(function() {
    $("#checkcw").click(function() {
        for(var i = 0; i < questions; ++i) {
			var userAnswer = ""
			puzzleSelector = "." + puzzleNumber + (i+1) + " input";
			$(puzzleSelector).each(function() {
				userAnswer += $(this).val();
			});

			if(userAnswer) {
				if(userAnswer.toUpperCase() == answers[i]) {
					$(puzzleSelector).css("background-color", "springgreen");
				}
				else {
					$(puzzleSelector).each(function() {
						if($(this).css("background-color") != "rgb(0, 255, 127)") {
							$(this).css("background-color", "indianred");
						}
					});
				}
			}
		}
		
		clearTimeout(timer);
			timer = setTimeout(function(){ 
				$('.puzzle-input input').css("background-color", "white");
			}, 2000);
			
		if (phone.matches) {
			window.scrollTo(0, 0);
		}
    });
});

$(function() {
    $("#submitcw").click(function() {
		$('.form-input').each(function(i) {
			if(!i) {
				$(this).val(sessionStorage.getItem("name"));
			}
			else{
				var userAnswer = ""
				puzzleSelector = "." + puzzleNumber + i + " input";
				$(puzzleSelector).each(function() {
					userAnswer += $(this).val();
				});
				$(this).val(userAnswer.toLowerCase());
			}
		});

		if(!submitted) {
			$('#google-form').trigger("submit");
			submitted = true;
		}
		$('#submitted-p').html("Submitting answers...");
		$('#submitted-img1').css("display", "none");
		$('#submitted-img2').css("display", "inline");
		$('#submitted-footer').addClass('important-display-none');
		
		setTimeout(function(){ 
			$('#submitted-p').html("Successfully submitted!");
			$('#submitted-img2').css("display", "none");
			$('#submitted-img3').css("display", "inline");
		}, 3000);
		
		setTimeout(function(){ 
			window.location.href = "index.html";
		}, 5000);
    });
});





$(function() {
    $('.puzzle-input').on('input', function(e) {
		var $focused = $(':focus').parent();
		var count = 0;
		var x = ""
		var class1 = "";
		var class2 = "";

		var thisClass = $(this).attr("class");
		for(var i = 0; i < puzzleArray.length; ++i) {
			if(thisClass.indexOf(puzzleArray[i]) != -1) {
				++count;
				if(!class1) {
					class1 = puzzleArray[i];
				}
				else {
					class2 = puzzleArray[i];
				}
			}
		}
		
		if(count == 1) {
			thisClass = class1;
		}
		else {
			if($('.'+class1).index($focused) == 0 && $('.'+class2).index($focused) == $('.'+class2).length-1) {
				thisClass = class1;
			}
			else if ($('.'+class2).index($focused) == 0 && $('.'+class1).index($focused) == $('.'+class1).length-1) {
				thisClass = class2;
			}
			else if (($('.'+class1).index($prevCell) != -1 && ($('.'+class1).index($focused) - 1) == $('.'+class1).index($prevCell)) || ($('.'+class2).index($prevCell) != -1 && ($('.'+class2).index($focused) - 1) == $('.'+class2).index($prevCell))) {
				thisClass = prevClass
			}
			else if ($('.'+class1).eq($('.'+class1).index($focused)+1).children("input").val()) {
				thisClass = class2;
			}
			else if ($('.'+class2).eq($('.'+class2).index($focused)+1).children("input").val()) {
				thisClass = class1;
			}
			else if (prevClass == class1 || prevClass == class2) {
				thisClass = prevClass;
			}
			else {
				thisClass = class1;
			}
		}

		var index = $('.'+thisClass).index($focused);
		$('.'+thisClass).eq(index+1).children("input").focus().select();
		prevClass = thisClass;
		$prevCell = $focused;
	});
});

function empty() {
	var puzzleInputs = document.getElementsByClassName("puzzle-input");
	for(var i = 0; i < puzzleInputs.length; ++i) {
		var input = puzzleInputs[i].getElementsByTagName("input");
		input[0].value = "";
	}
	no();
}

function prompt(){
    document.getElementById('modal').style.display = "flex";
}

function no(){
    document.getElementById("modal").style.display = "none";
	  document.getElementById("modal2").style.display = "none";
}




/////////////////////////////////////////////////////////////////////////////////////////////////

/*
$(function() {
    $("#check").click(function() {
        correctAnswers = 0;
		if(checkAnswers()) {
			$("#modal2").css("display", "flex");
		}
		else {
			$("#p-number").html("Puzzle Incomplete!<br>" + correctAnswers + "/" + questions);
			$("#modal3").css("display", "flex");
		}
    });
});


function checkAnswers() {
	for(var i = 0; i < questions; ++i) {
		puzzleNumber = puzzle + (i+1);
		if(checkAnswer(puzzleNumber, answers[i], lengths[i])) {
			++correctAnswers;
		}
	}

	if(correctAnswers == questions) {
		return true;
	}
	else {
		return false;
	}
}

function checkAnswer(puzzleName, answer, length) {
	var puzzleClasses = document.getElementsByClassName(puzzleName);
	for (var i = 0; i < length; ++i) {
		var input = puzzleClasses[i].getElementsByTagName("input");
		if(input[0].value.toUpperCase() != answer[i]) {
			return false;
		}
	}
	return true;
}

function GetInputsToString(className, length) {
	var userAnswer = ""
	var puzzleElements = document.getElementsByClassName(className);
	for (var i = 0; i < length; ++i) {
		var input = puzzleElements[j].getElementsByTagName("input");
		userAnswer += input[0].value.toLowerCase();
	}
	return userAnswer;
}
*/
