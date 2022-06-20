---
layout: post
title:  "Stride3D Minimal API / Code Only Approach"
categories: dotnet
tags: C# Stride3D .NET Game
---
12 lines of code, this is what it takes to run Stride 3D example below.

This works only with Stride 4.1 which is in beta. Once the NuGet packages are public this below will be possible to do. Related tweet [here](https://twitter.com/VasoElias/status/1525162302487543809).

```csharp
using var game = new Game();

game.Run(start: (Scene rootScene) =>
{
    game.SetupBase3DScene();

    var entity = new Entity(new Vector3(1f, 0.5f, 3f));

    entity.Add(new ModelComponent(new CubeProceduralModel().Generate(game.Services)));

    entity.Scene = rootScene;
});
```