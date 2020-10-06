(function(module) {
'use strict';

const nconf = require.main.require('nconf');
const striptags = require('striptags');
const meta = require.main.require('./src/meta');
const user = require.main.require('./src/user');
const categories = require.main.require('./src/categories');

var theme = {};
//const helpers = require('./lib/helpers');
const util = require('util');

let app;


// console.log(` customHelpers : ${util.inspect(helpers, false, null, true /* enable colors */)}`);

// helpers.register();

// theme.init = function(params, callback) {
//     app = params.router;
// 	var middleware = params.middleware;

// 	app.get('/admin/plugins/mathforu', middleware.admin.buildHeader, renderAdmin);
// 	app.get('/api/admin/plugins/mathforu', renderAdmin);

// 	callback();
// };

// const Widget = module.exports;

theme.init = async function (params) {
	app = params.app;
	const middleware = params.middleware;

	app.get('/admin/plugins/mathforu', middleware.admin.buildHeader, renderAdmin);
	app.get('/api/admin/plugins/mathforu', renderAdmin);
};


theme.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/mathforu',
		icon: 'fa-paint-brush',
		name: 'Theme Mathforu'
	});
	callback(null, header);
};

theme.getTeasers = function(data, callback) {
	data.teasers.forEach(function(teaser) {
		if (teaser && teaser.content) {
			teaser.content = striptags(teaser.content, ['img']);
		}
	});
	callback(null, data);
};

theme.defineWidgetAreas = function(areas, callback) {
	areas = areas.concat([
		{
			name: "Categories Sidebar",
			template: "categories.tpl",
			location: "sidebar"
		},
		{
			name: "Category Sidebar",
			template: "category.tpl",
			location: "sidebar"
		},
		{
			name: "Topic Sidebar",
			template: "topic.tpl",
			location: "sidebar"
		},
		{
			name: "Categories Header",
			template: "categories.tpl",
			location: "header"
		},
		{
			name: "Category Header",
			template: "category.tpl",
			location: "header"
		},
		{
			name: "Topic Header",
			template: "topic.tpl",
			location: "header"
		},
		{
			name: "Categories Footer",
			template: "categories.tpl",
			location: "footer"
		},
		{
			name: "Category Footer",
			template: "category.tpl",
			location: "footer"
		},
		{
			name: "Topic Footer",
			template: "topic.tpl",
			location: "footer"
		}
	]);

	callback(null, areas);
};

theme.defineWidgets = async function (widgets) {
	console.log(`==============defineWidgets=====================`);
	const widgetData = [
		{
			widget: 'commonCategories',
			name: 'Common Categories',
			description: 'Lists the common categories on your forum',
			content: 'admin/commonCategorieswidget',
		},
	];

	// await Promise.all(widgetData.map(async function (widget) {
	// 	widget.content = await app.renderAsync(widget.content, {});
	// }));

	widgets = widgets.concat(widgetData);
	// const groupNames = await db.getSortedSetRevRange('groups:visible:createtime', 0, -1);
	// let groupsData = await groups.getGroupsData(groupNames);
	// groupsData = groupsData.filter(Boolean);
	// groupsData.forEach(function (group) {
	// 	group.name = validator.escape(String(group.name));
	// });

	// const html = await app.renderAsync('admin/groupposts', { groups: groupsData });
	// widgets.push({
	// 	widget: 'groupposts',
	// 	name: 'Group Posts',
	// 	description: 'Posts made my members of a group',
	// 	content: html,
	// });

	return widgets;
}

theme.renderCommonCategories = async function (widget) {
	const data = await categories.getCategoriesByPrivilege('cid:0:children', widget.uid, 'find');
	const excludeList = [110];
	const expurgedData = data.filter(cat => !excludeList.includes(cat.cid));
	console.log(expurgedData);
	const categoriesHtmlContent = await app.renderAsync('widgets/categories', {
		categories: expurgedData,
		relative_path: nconf.get('relative_path'),
	});
	widget.html = `<div class="categories-list"> ${categoriesHtmlContent}</div>`
	return widget;
};

theme.getThemeConfig = function(config, callback) {

	meta.settings.get('mathforu', function(err, settings) {
		config.hideSubCategories = settings.hideSubCategories === 'on';
		config.hideCategoryLastPost = settings.hideCategoryLastPost === 'on';
		config.enableQuickReply = settings.enableQuickReply === 'on';
		callback(null, config);
	});
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/mathforu', {});
}

theme.addUserToTopic = function(data, callback) {
	if (data.req.user) {
		user.getUserData(data.req.user.uid, function(err, userdata) {
			if (err) {
				return callback(err);
			}

			data.templateData.loggedInUser = userdata;
			callback(null, data);
		});
	} else {
		data.templateData.loggedInUser =  {
			uid: 0,
			username: '[[global:guest]]',
			picture: user.getDefaultAvatar(),
			'icon:text': '?',
			'icon:bgColor': '#aaa',
		};
		callback(null, data);
	}
};

theme.getLinkTags = function (data, callback) {
	data.links.push({
		rel: 'prefetch stylesheet',
		type: '',
		href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300',
	});

	callback(null, data);
};

module.exports = theme;

}(module));
