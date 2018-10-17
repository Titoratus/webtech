---
layout: default
title: Теория
permalink: /theory/
---

<div class="container">
	<div class="row justify-content-center">
		<div class="col-5">
			<h1 class="page-title">Теория по метрологии, стандартизации и сертификации</h1>
			<ul class="theory-units">
				{% for post in site.categories.posts %}
					<li>
						<a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
					</li>
				{% endfor %}
			</ul>
		</div>
	</div>
</div>