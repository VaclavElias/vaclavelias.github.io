---
title: How to reference remote C# code in 11ty
description: Referencing remote C# code or any programming language code in 11ty
categories: dotnet
date: 2023-03-15
tags:
  - C# 
  - .NET
  - 11ty
  - Advance
image: /assets/img/11ty-logo-400x400.png
---
We write blog posts and we want to reference our GitHub project C# code or any code from our projects in 11ty. This is a great way to share and maintain code snippets with the community.
<!-- excerpt -->

## 11ty and remote code

I am new to 11ty so I asked the 11ty community here at [GitHub Discussions](https://github.com/11ty/eleventy/discussions/2862) and [@pehann](https://github.com/pdehaan) helped me out.

I have modified the original implementation for this post so it is more generic.

```javascript
eleventyConfig.addAsyncShortcode("remote_include", async function (urlPath) {

    const sample = await EleventyFetch(url, {
        duration: "1d"
    });

    return sample;
});
```
Example remote C# code reference in markup.

````
```csharp{% raw %}
{% remote_include 'https://raw.githubusercontent.com/stride3d/stride/master/samples/Tutorials/CSharpIntermediate/CSharpIntermediate/CSharpIntermediate.Game/01_UI-Basics/UIByEditor.cs' %}{% endraw %}
```
````
Result:

```csharp
{% remote_include 'https://raw.githubusercontent.com/stride3d/stride/master/samples/Tutorials/CSharpIntermediate/CSharpIntermediate/CSharpIntermediate.Game/01_UI-Basics/UIByEditor.cs' %}
```