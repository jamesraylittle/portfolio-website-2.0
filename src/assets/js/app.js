/* 
* A Set of Functions for jameslittle.org
* Author: James Little
*/

const PRELOADER_ID = "#preloader";
const PAGE_CONTENT_ID = "#page-content";
const MAIN_NAV_ID = "#main-nav";

const ERROR_PAGE_FN = "error";
const ERROR_TITLE_ID = "#error-title";
const ERROR_MSG_ID = "#error-message";

//Loads the contents from a given HTML file
//from the pages directory. 
function setContent(page) {
	if (page == null || page == undefined || page.length <= 0)
		return;

	$(PRELOADER_ID).show();
	$(PAGE_CONTENT_ID).load(getFilePath(page), function (response, status, xhr) {
		$(PRELOADER_ID).fadeOut();

		if (status == "error") {
			loadErrorPage(xhr.status, xhr.statusText);
			return;
		}

		setCurrentNav();
		
	});
}

function loadErrorPage(title, message) {
	$(PAGE_CONTENT_ID).load(getFilePath(ERROR_PAGE_FN), function (response, status, xhr) {

		if (status == "error") {
			$(PAGE_CONTENT_ID).html("Something went wrong! Please Refresh!");
			return;
		}

		$(ERROR_TITLE_ID).html(title);
		$(ERROR_MSG_ID).html(message);
	});
}

function getCurrentPageName() {
	const params = new URLSearchParams($(location).attr("search"));
	return params.get("p");
}

function setCurrentNav() {
	var loc = window.location.search;
	if (loc == '') {
		$("#default-nav").addClass("active");
		return;
	}

	$(MAIN_NAV_ID).find("a.nav-link").each(function (){
		$(this).toggleClass('active', $(this).attr('href') == loc);
	});

}

function getFilePath(pageName, ext = ".html", directory = "pages/") {
	return directory + pageName + ext;
}

function showError(status, statusText) {
	
	$("#error-title").html(status);
	$("#error-message").html(statusText);
	showContent("#error");
}