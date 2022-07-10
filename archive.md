---
layout: page
title: Blog Archive - Vaclav Elias
---
# Archive

{% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}
  <h3>{{ year.name }}</h3>
  {% assign postsByMonth = year.items | group_by_exp:"post", "post.date | date: '%B'" %}
<ul>
  {% for post in year.items %}
    <li>{{ post.date | date: "%b %d" }}
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% endfor %}