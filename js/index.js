window.addEventListener("load", function (){
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
});

$(function(){
    if(sessionStorage.getItem("name")){
		$("#name-showcase").css("display", "none");
		$(".main-content").css("display", "block");
		$(".name-p").html("Greetings " + sessionStorage.getItem("name") + "!");
	}
});

$(function(){
    $('.btn-enter').click(function() {
		$("#name-showcase").css("display", "none");
		$(".main-content").css("display", "block");
		var name = $('.btn-input').val();
		sessionStorage.setItem("name", name);
		$(".name-p").html("Greetings " + name + "!");
	});

	$(document).on("keypress", function (e) {
		if(document.getElementById("name-showcase").style.display != "none") {
			if(e.which == 13) {
				$("#name-showcase").css("display", "none");
				$(".main-content").css("display", "block");
				var name = $('.btn-input').val();
				sessionStorage.setItem("name", name);
				$(".name-p").html("Greetings " + name + "!");
			}
		}
	});
});



$(function(){
    $('.name-link').click(function() {
		$("#name-showcase").css("display", "block");
		$(".main-content").css("display", "none");
		$('.btn-input').val("");
		sessionStorage.removeItem("name");
	});
});

$(function(){
    $('#menu-home').click(function() {
		if($('#i-home').css("display") == "none") {
			$('#i-home').css("display", "inline-block");
			$('#i-about').css("display", "none");
			$('#i-credits').css("display", "none");

			if(sessionStorage.getItem("name")){
				$("#name-showcase").css("display", "none");
				$(".main-content").css("display", "block");
				$(".name-p").html("Greetings " + sessionStorage.getItem("name") + "!");
			}
			else {
				$("#name-showcase").css("display", "block");
				$(".main-content").css("display", "none");
			}
			$('#about-showcase').css("display", "none");
			$('#credits-showcase').css("display", "none");
			$('.toggler').click();
		}
	});

	$('#menu-about').click(function() {
		if($('#i-about').css("display") == "none") {
			$('#i-home').css("display", "none");
			$('#i-about').css("display", "inline-block");
			$('#i-credits').css("display", "none");

			$(".main-content").css("display", "none");
			$("#name-showcase").css("display", "none");
			$('#about-showcase').css("display", "block");
			$('#credits-showcase').css("display", "none");
			$('.toggler').click();
		}
	});

	$('#menu-credits').click(function() {
		if($('#i-credits').css("display") == "none") {
			$('#i-home').css("display", "none");
			$('#i-about').css("display", "none");
			$('#i-credits').css("display", "inline-block");

			$(".main-content").css("display", "none");
			$("#name-showcase").css("display", "none");
			$('#about-showcase').css("display", "none");
			$('#credits-showcase').css("display", "block");
			$('.toggler').click();
		}
	});
});
