---
layout: default
title: Тесты
permalink: /tests/
---

<div class="container">
	<div class="row">
		{% for post in site.categories.test %}
			<div class="col-xl-3 col-md-6">
				<div class="test">
					<h4 class="test-title">{{ post.title }}</h4>
					<div class="row justify-content-center">
						<div class="col-7">
							<p class="test-num">Вопросов: {{ post.quests.size }}</p>
							<p class="test-time">Время: {{ post.time }} мин.</p>
						</div>
					</div>
					<a href="{{ site.url }}{{ post.url }}"><div class="test-start">Начать</div></a>
				</div>
			</div>
		{% endfor %}
	</div>
</div>