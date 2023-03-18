---
title: "Visual Studio Debugger Enumerable Visualizer"
description: "View IEnumerable objects such as Arrays, List, etc. in a customized tabular view."
categories: dotnet
date: 2019-06-11
tags:
 - C# 
 - Visual-Studio
image: /assets/img/visual-studio.png
---
Visual Studio Debugger Enumerable Visualizer without any `[Serialize]` attribute, using Json was an experiment to get a better experience when debugging IEnumerables.
<!-- excerpt -->

{% include _alert-svg.html %}
{% include _alert.html type:'warning' title:'This is now <strong>inbuilt</strong> in <a href="https://devblogs.microsoft.com/visualstudio/view-net-collections-with-the-new-ienumerable-debugger-visualizer/">Visual Studio 2022</a> from version 17.2.' %}

![Visualiser example](https://user-images.githubusercontent.com/4528464/59273012-2dc98f80-8c4f-11e9-8a76-c11620581a3e.png){: .img-fluid}

![Visualiser example](https://user-images.githubusercontent.com/4528464/46559908-c0a87200-c8e9-11e8-83ba-deea211840f0.png){: .img-fluid}

Read more about my implementation here [EnumerableVisualizer](https://github.com/codecapital/EnumerableVisualizer).

