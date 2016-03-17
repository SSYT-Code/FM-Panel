// Cacke user datainformation
// Place: All pages !
function saveUserData() {
	$(function() {
		var storage = window.localStorage, data;
		data = {"logged": _userdata.session_logged_in, "level": _userdata.user_level, "name": _userdata.username, "id": _userdata.user_id, "posts": _userdata.user_posts, "avatar": _userdata.avatar};
		storage._userdata = JSON.stringify(data);
	});
	return true;
}; saveUserData();
