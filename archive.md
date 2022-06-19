---
layout: page
title: Archive
---
# Archive

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
  <h3>{{ year.name }}</h3>
  {% assign postsByMonth = year.items | group_by_exp:"post", "post.date | date: '%B'" %}

{% for month in postsByMonth %}
<h4>{{ month.name }}</h4>
<ul>
  {% for post in month.items %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <br>{{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

{% endfor %}
{% endfor %}