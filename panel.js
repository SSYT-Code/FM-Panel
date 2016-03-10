/*
* Panel Javascript code
* www.lanenicu.com
* Stark Codes !
* Last Update: 2016-03-03 03:49:51
*/

(function(jQuery, $) {
	var lnpanel_set = {
		memento: false,
		error_host: null ? true : false,
		ads: {'et': false, 'fg': false},
		reload: 1000*24*60*60,
		checkTime: (new Date().getTime()) - (1000*24*60*60)
	}; 
	
	jQuery(function() {
		var arr = new Array();
		var _panelData = JSON.parse(localStorage.getItem('_userdata')), postText, postDate;
		if(_panelData.logged == 1)
		{
			jQuery('li.user-avatar > a').html(_panelData.avatar);
			
    	jQuery('li.user-avatar > a').attr({
    		'href' : '/u'+ _panelData.id +'-'+ escape(_panelData.name) +'',
    		'alt' : ''+ _panelData.name +'\'s Profile'
    	});
			
    	jQuery('li.user > a').attr({
    		'href' : '/u'+ _panelData.id +'-'+ escape(_panelData.name) +'',
    		'alt' : ''+ _panelData.name +'\'s Profile'
    	});
			
			jQuery('li.user > a').html(_panelData.name + ' <i class="fa fa-chevron-circle-down"></i>');
			
			var panel_set = JSON.parse(localStorage.getItem('panel_update_w'));
			if(panel_set && window.localStorage && (new Date() - panel_set.exp) - lnpanel_set.reload)
			{
				setTimeout(function()
				{
					jQuery.get('/t5691-panel-update', function(data) {
						postText = $('.border div div#ips_Posts .post_block:last .post_wrap .post_body .post.entry-content', data).html();
						postDate = $('.border div div#ips_Posts .post_block:last .post_wrap h3 .post_date abbr.published', data).text();
						var saved = {"post_update": postText, "post_date": postDate, exp: +new Date()};
						localStorage.setItem('panel_update_w', JSON.stringify(saved));
						jQuery('div#panel-updates').html(postText + '<hr /> Posted ' + postDate);
					}).done(function(){
						if(!localStorage.getItem('panel_update_w')) jQuery('div#panel-updates').html(postText + '<hr /> Posted ' + postDate);
						console.log("[PANEL] Succes reloaded content...");
					});
				}, 50);
			} else
			{
				setTimeout(function()
				{
					jQuery.get('/t5691-panel-update', function(data) {
						postText = $('.border div div#ips_Posts .post_block:last .post_wrap .post_body .post.entry-content', data).html();
						postDate = $('.border div div#ips_Posts .post_block:last .post_wrap h3 .post_date abbr.published', data).text();
						var saved = {"post_update": postText, "post_date": postDate, exp: +new Date()};
						localStorage.setItem('panel_update_w', JSON.stringify(saved));
						jQuery('div#panel-updates').html(postText + '<hr /> Posted ' + postDate);
					}).done(function(){
						if(!localStorage.getItem('panel_update_w')) jQuery('div#panel-updates').html(postText + '<hr /> Posted ' + postDate);
						console.log("[PANEL] Succes loaded info...");
					});
				}, 50);
			}
			
			var str = JSON.parse(localStorage.getItem("panel_update_w"));
			if(localStorage.getItem("panel_update_w")) $("div#panel-updates").html(str.post_update+"<hr /> Posted "+str.post_date);
			
      $('input#cancel_staff_button').click(function(x) {x.preventDefault(); location.reload()});
      $('form#staff_apps, form#app_partnership, form#add_dns, form#app_bugs').submit(function(x) {x.preventDefault()});
			
			if(/\/h4-/.test(window.location.pathname))
			{
				console.log("[PANEL] This page is Applications (Staff)")
				if(!localStorage.getItem('time_per_app') || localStorage.getItem('time_per_app') != 0)
				{
					$('#app_staff_button').click(function(e) {
						e.preventDefault();
						
						// Tetx 
						arr['app_arr0'] = $('form#staff_apps fieldset dd input[name="application_area0"]').val();
						arr['app_arr1'] = $('form#staff_apps fieldset dd input[name="application_area1"]').val();
						arr['app_arr2'] = $('form#staff_apps fieldset dd input[name="application_area2"]').val();
						arr['app_arr3'] = $('form#staff_apps fieldset dd input[name="application_area3"]').val();
						arr['app_arr4'] = $('form#staff_apps fieldset dd input[name="application_area4"]').val();
						arr['app_arr5'] = $('form#staff_apps fieldset dd input[name="application_area5"]').val();
						arr['app_arr6'] = $('form#staff_apps fieldset dd input[name="application_area6"]').val();

						var msg = "Nick: "+ arr.app_arr0 +" <br /> Prenume: "+ arr.app_arr1 +" <br /> Varsta: "+ arr.app_arr2 +" <br /> Localitate: "+ arr.app_arr3 +"<br /> De cand ai cont pe forum?: "+ arr.app_arr4 +"<br />"+
						"Experienta: "+ arr.app_arr5 +"<br /> Rank dorit: "+ arr.app_arr6 +"";
						if(arr.app_arr1 != "" && arr.app_arr2 != "" && arr.app_arr3 != "" && arr.app_arr4 != "" && arr.app_arr5 != "" && arr.app_arr6 != "")
						{
							$.post('http://www.lanenicu.com/post?f=33&mode=newtopic', {
								post_icon: 0,
								subject: "[Pending] Aplicatie " + arr.app_arr0,
								message: msg,
								auth: [],
								auth: [],
								mode: "newtopic",
								f: 33,
								lt: 0,
								topictype: 0,
								post: 1
							}, function(x) {
								submitApplication = 1;
								localStorage.setItem('time_per_app', '1');
								$('fieldset dd input[type="text"], textarea').val("");
							}).done(function() {
								$('form#staff_apps').before('<p class="succes">[LN Bot]: Aplicatia ta a fost inregistrata cu succes !<br />[LN Bot]: Daca aceasta va fii acceptata vei primi un PM !</p>');
								setTimeout(function() {location.reload()}, 10000);
							}).fail(function() {
								$('form#staff_apps').before('<p class="succes">[LN Bot]: Aplicatia ta nu a putut fii inregistrata cu succes !<br />[LN Bot]: Te rog sa incerci mai tarziu !</p>');
								setTimeout(function() {location.reload()}, 10000);
							});
						} else alert("Nu s-au putut prelua informatii !");
					});
				} else alert("Ai postat deja o aplicatie !");
			}
			
			if(/\/h7-/.test(window.location.pathname))
			{
				console.log("[PANEL] This page is Server DNS");
				$('#app_staff_button').click(function(e) {
					e.preventDefault();
					
					// Get informations of form
					arr['dns_field1'] = $('form#add_dns fieldset dd input[name="dns_array_1"]').val();
					arr['dns_field2'] = $('form#add_dns fieldset dd input[name="dns_array_2"]').val();
					arr['dns_field3'] = $('form#add_dns fieldset dd input[name="dns_array_3"]').val();
					arr['dns_field4'] = $('form#add_dns fieldset dd input[name="dns_array_4"]').val();
					arr['dns_field5'] = $('form#add_dns fieldset dd input[name="dns_array_5"]').val();
					arr['dns_field6'] = $('form#add_dns fieldset dd input[name="dns_array_6"]').val();
					arr['dns_field7'] = $('form#add_dns fieldset dd input[name="dns_array_7"]').val();
					arr['dns_field8'] = $('form#add_dns fieldset dd input[name="dns_array_8"]').val();
					arr['dns_field9'] = $('form#add_dns fieldset dd input[name="dns_array_9"]').val();
					
					var msg = "Nume Owner: "+arr.dns_field1+"<br />Varsta Owner: "+arr.dns_field2+"<br />IP-ul Server: "+arr.dns_field3+"<br />" +
										"DNS: "+arr.dns_field4+"<br />Game: "+arr.dns_field5+"<br />ID Contact: "+arr.dns_field6+"<br />" +
										"Game Mod: "+arr.dns_field7+"<br />Slots: "+arr.dns_field8+"<br />Firma Host: "+arr.dns_field9+"<br />";
					if(arr.dns_field1 != "" && arr.dns_field2 != "" && arr.dns_field3 != "" && arr.dns_field4 != "" && arr.dns_field5 != "" && arr.dns_field6 != "" && arr.dns_field7 != "" && arr.dns_field8 != "" && arr.dns_field9 != "")
					{
						$.post('http://www.lanenicu.com/post?f=134&mode=newtopic', {
							post_icon: 0,
							subject: "[Pending] DNS Request",
							message: msg,
							auth: [],
							auth: [],
							mode: "newtopic",
							f: 134,
							lt: 0,
							topictype: 0,
							post: 1
							}, function(x) {
							        $('fieldset dd input[type="text"], textarea').val("");
							}).done(function() {
								$('form#add_dns').before('<p class="succes">[LN Bot]: Cererea ta DNS a fost inregistrata cu succes, aceste aplicatii sunt acceptate dupa 12h !<br />[LN Bot]: Daca aceasta va fii acceptata vei primi un PM !</p>');
								setTimeout(function() {location.reload()}, 10000);
							}).fail(function() {
								$('form#add_dns').before('<p class="succes">[LN Bot]: Cererea ta DNS nu a putut fii inregistrata cu succes !<br />[LN Bot]: Te rog sa incerci mai tarziu !</p>');
								setTimeout(function() {location.reload()}, 10000);
							});
					} else alert("Nu s-au putut prelua informatii !");
				});
			}
			if(/\/h5-/.test(window.location.pathname))
			{
				console.log("[PANEL] This page is Partnership");
				$('#app_staff_button').click(function(e) {
					e.preventDefault();

					// Get informations of form
					arr['app_field1'] = $('form#app_partnership fieldset dd input[name="app_partner_1"]').val();
					arr['app_field2'] = $('form#app_partnership fieldset dd input[name="app_partner_2"]').val();
					arr['app_field3'] = $('form#app_partnership fieldset dd input[name="app_partner_3"]').val();
					arr['app_field4'] = $('form#app_partnership fieldset dd input[name="app_partner_4"]').val();
					arr['app_field5'] = $('form#app_partnership fieldset dd input[name="app_partner_5"]').val();
					arr['app_field6'] = $('form#app_partnership fieldset dd input[name="app_partner_6"]').val();
					arr['app_field7'] = $('form#app_partnership fieldset dd textarea[name="app_partner_7"]').val();

					var msg = "Site URL: [url="+arr.app_field1+"]"+arr.app_field1+"[/url]<br />Site Name: "+arr.app_field2+"<br />Site Statistics: [url="+arr.app_field3+"]Statistics[/url]<br />" +
										"Members: "+arr.app_field4+"<br />Posts: "+arr.app_field5+"<br />Administrator: "+arr.app_field6+"<br />" +
										"Mini-Banner: [spoiler]"+arr.app_field7+"[/spoiler]";
					if(arr.app_field1 != "" && arr.app_field2 != "" && arr.app_field3 != "" && arr.app_field4 != "" && arr.app_field5 != "" && arr.app_field6 != "" && arr.app_field7 != "")
					{
						$.post('http://www.lanenicu.com/post?f=135&mode=newtopic', {
							post_icon: 0,
							subject: "[Pending] Partnership Request",
							message: msg,
							auth: [],
							auth: [],
							mode: "newtopic",
							f: 135,
							lt: 0,
							topictype: 0,
							post: 1
						}, function(x) {
							$('fieldset dd input[type="text"], textarea').val("");
						}).done(function() {
							$('form#app_partnership').before('<p class="succes">[LN Bot]: Cererea ta DNS a fost inregistrata cu succes, aceste aplicatii sunt acceptate dupa 12h !<br />[LN Bot]: Daca aceasta va fii acceptata vei primi un PM !</p>');
							setTimeout(function() {location.reload()}, 10000);
						}).fail(function() {
							$('form#app_partnership').before('<p class="succes">[LN Bot]: Cererea ta DNS nu a putut fii inregistrata cu succes !<br />[LN Bot]: Te rog sa incerci mai tarziu !</p>');
							setTimeout(function() {location.reload()}, 10000);
						});
					} else alert("Nu s-au putut prelua informatii !");
				});
			}
			
			if(/\/h6-/.test(window.location.pathname))
			{
				console.log("[PANEL] This page is Bugs Report");
				$('#app_staff_button').click(function(e) {
					e.preventDefault();

					// Get informations of form
					arr['bug_field1'] = $('form#app_bugs fieldset dd input[name="bug_array_1"]').val();
					arr['bug_field2'] = $('form#app_bugs fieldset dd input[name="bug_array_2"]').val();
					arr['bug_field3'] = $('form#app_bugs fieldset dd input[name="bug_array_3"]').val();
					arr['bug_field4'] = $('form#app_bugs fieldset dd textarea[name="bug_array_4"]').val();

					var msg = "Nick: "+ arr.bug_field1 +"<br />Pagina: "+ arr.bug_field2 +"<br />Imagine: [img]"+ arr.bug_field3 +"[/img]<br />Descriere bug: [spoiler=\"Descriere bug\"]"+ arr.bug_field4 +"[/spoiler]";
					if(arr.bug_field1 != "" && arr.bug_field2 != "" && arr.bug_field3 != "" && arr.bug_field4 != "")
					{
						$.post('http://www.lanenicu.com/post?f=14&mode=newtopic', {
							post_icon: 0,
							subject: "[Pending] Bug Report",
							message: msg,
							auth: [],
							auth: [],
							mode: "newtopic",
							f: 14,
							lt: 0,
							topictype: 0,
							post: 1
						}, function(x) {
							$('fieldset dd input[type="text"], textarea').val("");
						}).done(function() {
							$('form#app_bugs').before('<p class="succes">[LN Bot]: Multumim ca ai raportat acest bug, un admin/moderator va rezolva problema !</p>');
							setTimeout(function() {location.reload()}, 10000);
						}).fail(function() {
							$('form#app_bugs').before('<p class="succes">[LN Bot]: Raportul tau nu a putut fii inregistrata cu succes !<br />[LN Bot]: Te rog sa incerci mai tarziu !</p>');
							setTimeout(function() {location.reload()}, 10000);
						});
					} else alert("Nu s-au putut prelua informatii !");
				});
			}

			if(/\/h11-/.test(window.location.pathname))
			{
				console.log("[PANEL] This page is Buy Premium");
				$('#app_staff_button').click(function(e) {
					e.preventDefault();

					// Get !
					arr['premium_rows1'] = $('form#premium_apps fieldset dd input[name="application_buya0"]').val();
					arr['premium_rows2'] = $('form#premium_apps fieldset dd input[name="application_buya1"]').val();
					arr['premium_rows3'] = $('form#premium_apps fieldset dd input[name="application_buya2"]').val();
					arr['message'] = "* Name (Nick): "+ arr.premium_rows1 +"<br />* Email: "+ arr.premium_rows2 +"<br />* Premium Days: "+ arr.premium_rows3 +"";

					if(arr.premium_rows1 != "" && arr.premium_rows2 != "" && arr.premium_rows3 != "")
					{
						$.post('/post?f=136&mode=newtopic', {
							post_icon: 0,
							subject: "[Pending] Premium Account",
							message: arr.message,
							auth: [],
							auth: [],
							mode: "newtopic",
							f: 136,
							lt: 0,
							topictype: 0,
							post: 1
						}, function(x) {
							$('fieldset dd input[type="text"], textarea').val("");
						}).done(function() {
							$('form#premium_apps').before('<p class="succes">[LN Bot]: Contul tau premium este in curs de procesare, in acest moment dureaza in jur de 4/6h pentru activare !<br />[LN Bot]: Daca aceasta va fii acceptat vei primi un PM !</p>');
							setTimeout(function() {location.reload()}, 10000);
						}).fail(function() {
							$('form#premium_apps').before('<p class="succes">[LN Bot]: Contul tau premium nu a putut fii inregistrat cu succes !<br />[LN Bot]: Te rog sa incerci mai tarziu !</p>');
							setTimeout(function() {location.reload()}, 10000);
						});
					} else alert("Nu s-au putut prelua informatii !");
				});
			}

			if(/\/h8-/.test(window.location.pathname))
			{
				var ltp1 = $('table#get_premium tbody tr.new_app').length;
				var ltp2 = $('table#get_applications tbody tr.new_app').length;
				var ltp3 = $('table#get_bugs tbody tr.new_app').length;
				$('ul.nav-menu > li:contains("Admin") > a').append('<span attr="get_num">'+ltp1+'/'+ltp2+'/'+ltp3+'</span>');
			}
			
			$('ul.user-right li.user > a').on("click", function(e)
			{
				var oClick = $(this);
				var oTarget = $('#user_box_content');
				e.preventDefault();
				if(!document.getElementById('user_box_content')) return false;
				if(document.getElementById('user_box_content').style.display == "none")
				{
					$('#user_box_content').show();
					$('#user_box_content').css({'left': (oClick.offset().left + oClick.outerWidth()) - oTarget.outerWidth() + 'px', 'top': (oClick.offset().top + oClick.outerHeight()) + 10 + 'px', 'z-index': '9999', 'position': 'absolute'});
					oClick.addClass('active menu');
				} else
				{
					$('#user_box_content').hide();
					oClick.removeClass('active menu');
				}
			});
			
			if(/\/h3-/.test(window.location.pathname))
			{
				$('.short-title.clr h2 a').attr('href','/u' + _panelData.id).html('Profil: ' + _panelData.name);
				$('div#avatar').html(_panelData.avatar);
				$('.getName').html(_panelData.name);
				if(_panelData.logged == 1) $('.getOnline').html('Online');
			}
			
			if(_panelData.level != 1) {
				$('ul.nav-menu a[href="http://www.lanenicu.com/h8-?/page?mode=admin-settings"]').parent().remove();
			}
			console.log("[PANEL] Filescript has been loaded...");
		} else return window.location = "http://www.lanenicu.com";
	});

	$(function() {
		var fields = new Array(), rows = "", rowsx = "", total1,total2,total3,tp;
		$.get('/f33-staff-bd', function(x) {
				if($('.border table#forum_table', x).length)
				{
					$('.border table#forum_table', x).each(function() {
						$('table#get_applications tbody').html($('tr#trow_nan', this));
						total1 = $('tr#trow_nan', this).length;
					});
				} else {
					$('table#get_applications tbody').html('<tr class="no_apps_get"><td></td><td></td><td style="text-align: center;">Nu au fost gasite rezultate in baza de date !</td><td></td><td></td></tr>');
				}
			}).done(function() {
				$('table#get_applications tbody tr#trow_nan').each(function() {
						fields['this'] = this;
						fields['id'] = $('td.col_f_content a#tid-link-nan', fields.this).attr('href').match(/\d+/)[0];
						fields['title'] = $('td.col_f_content a#tid-link-nan', fields.this).text();
						fields['author'] = $('td.col_f_content span a[href*="/u"]', fields.this).text();
						fields['postdate'] = $('td.col_f_content span span[itemprop="dateCreated"]', fields.this).text();
						rowsx = '<tr class="new_app"><td>#'+ fields.id +'</td><td>'+ fields.title +'</td><td>'+ fields.author +'</td><td>'+ fields.postdate +'</td><td></td></tr>';
						$(fields.this).replaceWith(rowsx);
				});
				tp = total1;
				console.log("Succes execute .get !");
		});
			
		$.get('/f136-premium-bd', function(x) {
				if($('.border table#forum_table', x).length)
				{
					$('.border table#forum_table', x).each(function() {
						$('table#get_premium tbody').html($('tr#trow_nan', this));
						total2 = $('tr#trow_nan', this).length;
					});
				} else {
					$('table#get_premium tbody').html('<tr class="no_apps_get"><td></td><td></td><td style="text-align: center;">Nu au fost gasite rezultate in baza de date !</td><td></td><td><i class="fa fa-cog"></i></td></tr>');
				}
			}).done(function() {
				$('table#get_premium tbody tr#trow_nan').each(function() {
						fields['this'] = this;
						fields['id'] = $('td.col_f_content a#tid-link-nan', fields.this).attr('href').match(/\d+/)[0];
						fields['title'] = $('td.col_f_content a#tid-link-nan', fields.this).text();
						fields['author'] = $('td.col_f_content span a[href*="/u"]', fields.this).text();
						fields['postdate'] = $('td.col_f_content span span[itemprop="dateCreated"]', fields.this).text();
						rowsx = '<tr class="new_app"><td>#'+ fields.id +'</td><td>'+ fields.title +'</td><td>'+ fields.author +'</td><td>'+ fields.postdate +'</td><td><i class="fa fa-cog"></i></td></tr>';
						$(fields.this).replaceWith(rowsx);
				});
				tp = total2;
				console.log("Succes execute .get !");
		});
			
		$.get('/f14-bugs-bd', function(x) {
				if($('.border table#forum_table', x).length)
				{
					$('.border table#forum_table', x).each(function() {
						$('table#get_bugs tbody').html($('tr#trow_nan', this));
						total3 = $('tr#trow_nan', this).length;
					});
				} else {
					$('table#get_bugs tbody').html('<tr class="no_apps_get"><td></td><td></td><td style="text-align: center;">Nu au fost gasite rezultate in baza de date !</td><td></td><td></td></tr>');
				}
			}).done(function() {
				$('table#get_bugs tbody tr#trow_nan').each(function() {
						fields['this'] = this;
						fields['id'] = $('td.col_f_content a#tid-link-nan', fields.this).attr('href').match(/\d+/)[0];
						fields['title'] = $('td.col_f_content a#tid-link-nan', fields.this).text();
						fields['author'] = $('td.col_f_content span a[href*="/u"]', fields.this).text();
						fields['postdate'] = $('td.col_f_content span span[itemprop="dateCreated"]', fields.this).text();
						rowsx = '<tr class="new_app"><td>#'+ fields.id +'</td><td>'+ fields.title +'</td><td>'+ fields.author +'</td><td>'+ fields.postdate +'</td><td><i class="fa fa-cog"></i></td></tr>';
						$(fields.this).replaceWith(rowsx);
				});
				console.log("Succes execute .get !");
				tp = tp + tp + total3;
		});

		setTimeout(function() {
			var ltp1 = $('table#get_premium tbody tr.new_app').length;
			var ltp2 = $('table#get_applications tbody tr.new_app').length;
			var ltp3 = $('table#get_bugs tbody tr.new_app').length;
			$('span[attr="get_num"]').html(''+ltp2+'/'+ltp3+'/'+ltp1+'');
			
			$('table#get_premium tbody tr.new_app').each(function() {
				$('td > i', this).click(function() {
					$('div#wrap-panel').after('<div class="mod_tools"><ul><li><span><i class="fa fa-check-square-o"></i> Accept</span></li> <li><span><i class="fa fa-ban"></i> Reject</span></li> <li><span><i class="fa fa-recycle"></i> Delete</span></li></ul></div>');
					
					var oClick = $(this);
					var oTarget = $('.mod_tools');
					
					if(document.getElementsByName('mod_tools') || document.getElementsByName('mod_tools').style.display == "none")
					{
						$('.mod_tools').show();
						$('.mod_tools').css({'left': (oClick.offset().left + oClick.outerWidth())+15 + 'px', 'top': (oClick.offset().top + oClick.outerHeight())-35 + 'px', 'z-index': '9999', 'position': 'absolute'});
						$(this).addClass('active');
					} else {
						$('.mod_tools').hide();
						$(this).removeClass('active');
					}
				});
			});
			
			$('table#get_applications tbody tr.new_app').each(function() {
				$('td > i', this).click(function() {
					$('div#wrap-panel').after('<div class="mod_tools"><ul><li><span><i class="fa fa-check-square-o"></i> Accept</span></li> <li><span><i class="fa fa-ban"></i> Reject</span></li> <li><span><i class="fa fa-recycle"></i> Delete</span></li></ul></div>');
					
					var oClick = $(this);
					var oTarget = $('.mod_tools');
					
					if(document.getElementsByName('mod_tools') || document.getElementsByName('mod_tools').style.display == "none")
					{
						$('.mod_tools').show();
						$('.mod_tools').css({'left': (oClick.offset().left + oClick.outerWidth())+15 + 'px', 'top': (oClick.offset().top + oClick.outerHeight())-35 + 'px', 'z-index': '9999', 'position': 'absolute'});
						$(this).addClass('active');
					} else {
						$('.mod_tools').hide();
						$(this).removeClass('active');
					}
				});
			});
			
			$('table#get_bugs tbody tr.new_app').each(function() {
				$('td > i', this).click(function(e) {
					$('div#wrap-panel').after('<div class="mod_tools"><ul><li><span><i class="fa fa-check-square-o"></i> Accept</span></li> <li><span><i class="fa fa-ban"></i> Reject</span></li> <li><span><i class="fa fa-recycle"></i> Delete</span></li></ul></div>');

					var oClick = $(this);
					var oTarget = $('.mod_tools');
					
					if(document.getElementsByName('mod_tools') || document.getElementsByName('mod_tools').style.display == "none")
					{
						$('.mod_tools').show();
						$('.mod_tools').css({'left': (oClick.offset().left + oClick.outerWidth())+15 + 'px', 'top': (oClick.offset().top + oClick.outerHeight())-35 + 'px', 'z-index': '9999', 'position': 'absolute'});
						$(this).addClass('active');
					} else {
						$('.mod_tools').hide();
						$(this).removeClass('active');
					}
				});
			});
		}, 3000);
	});
})(jQuery, jQuery);
