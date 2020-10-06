<li component="post" class="posts-list-item row<!-- IF ../deleted --> deleted<!-- ELSE --><!-- IF ../topic.deleted --> deleted<!-- ENDIF --><!-- ENDIF -->" data-pid="{../pid}" data-uid="{../uid}">
    <div class="col-lg-11 col-sm-10 col-xs-9 post-body">
        <a class="topic-title" href="{config.relative_path}/post/{../pid}">
            <!-- IF !../isMainPost -->RE: <!-- ENDIF -->{../topic.title}
        </a>

        <div component="post/content" class="content">
            {../content}
        </div>

        <small class="topic-category"><a href="{config.relative_path}/category/{../category.slug}">[[global:posted_in, {../category.name}]]</a></small>

        <div class="post-info">
            <span class="atc" data-atc="{obfuscateUrl('/', config.relative_path,'/user/', merger.userslug)}">{buildAvatar(../user, "md", true, "user-img")}</span>

            <div class="post-author">
                <span class="atc" data-atc="{obfuscateUrl('/', config.relative_path,'/user/', merger.userslug)}">{../user.username}</span><br />
                <span class="timeago" title="{../timestampISO}"></span>
            </div>
        </div>
    </div>
</li>
