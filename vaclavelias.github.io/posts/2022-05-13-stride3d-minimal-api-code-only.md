---
title:  Explore Stride's Minimal API: A Code-Only Approach
description: Dive into a minimal code approach with Stride3D, unlocking the potential of game development with just 12 lines of code using the Stride Community Toolkit.
categories: stride3d
date: 2022-05-13
tags:
  - C# 
  - Stride3D 
  - .NET 
  - Game
image: https://www.stride3d.net/images/svg/logo.svg
---

With only **12 lines of code**, you can kickstart your game development journey in Stride 3D using the [Stride Community Toolkit](https://stride3d.github.io/stride-community-toolkit/index.html), as illustrated in the example below (plus some `usings` at the top).

---

This method is compatible with [Stride](https://www.stride3d.net/) version **4.1** and later.

Follow the steps outlined in the [Stride Community Toolkit](https://stride3d.github.io/stride-community-toolkit/manual/code-only/create-project.html) to get started.

Check out the related [tweet](https://twitter.com/VasoElias/status/1525162302487543809) for more insights.

```csharp
using Stride.CommunityToolkit.Extensions;
using Stride.CommunityToolkit.ProceduralModels;
using Stride.Core.Mathematics;
using Stride.Engine;

using var game = new Game();

game.Run(start: (Scene rootScene) =>
{
    game.SetupBase3DScene();

    var entity = game.CreatePrimitive(PrimitiveModelType.Capsule);

    entity.Transform.Position = new Vector3(0, 8, 0);

    entity.Scene = rootScene;
});
```
