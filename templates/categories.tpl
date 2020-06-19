<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
<div class="row">

	<div class="clearfix">

	</div>


	<div class="<!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
		<div class="sticky">
			<div class="center-sticky-button">
				<!-- IF loggedIn -->
					<a href="{config.relative_path}/compose?cid={cid}" component="category/post"
					id="new_topic" class="btn btn-primary" data-ajaxify="false" role="button">Poster un nouveau message</a>

				<!-- ELSE  -->
					<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-primary">[[category:guest-login-post]]</a>
				<!-- ENDIF !loggedIn -->

				<a href="{url}" class="inline-block">
					<div class="alert alert-warning hide" id="new-topics-alert"></div>
				</a>
			</div>
		</div>
		<h1 class="categories-title">[[pages:categories]]</h1>
		<ul class="categories" itemscope itemtype="http://www.schema.org/ItemList">
			{{{each categories}}}
			<!-- IMPORT partials/categories/item.tpl -->
			{{{end}}}
		</ul>
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
		{{{each widgets.sidebar}}}
		{{widgets.sidebar.html}}
		{{{end}}}
	</div>
</div>
<div data-widget-area="footer">
	{{{each widgets.footer}}}
	{{widgets.footer.html}}
	{{{end}}}
</div>
