---
layout: post
title:  Stride game engine code only approach in C#
description: Stride3D code only approach in C#
categories: stride3d
tags: C# Stride3D .NET Game
image: https://www.stride3d.net/images/svg/logo.svg
---
You can programm in C# and you are now curious about game engines or any way how to code and visualise something in 3D. There are some C# options out there ([Unity®](https://unity.com/), Godot, ..) but there is one in particular which might impress you if you found game engines overwhelming or you don't want to install too many things. 

[Stride](https://www.stride3d.net) is a **free and open source 2D and 3D cross-platform game engine** ([wiki](https://en.wikipedia.org/wiki/Stride_(game_engine))). With the release of version 4.1 you can start playing and be creative just with a few lines of code and without installation of the game engine editor.

{% include alert-svg.html %}
{% include alert.html type='warning' title='You do need to install certain prerequisites (Visual C++ Redistributable) and anything else comes from NuGet packages' %}

**Content**

- Why code only approach and not game editor?
- Prerequisites
- Let's start in 4 steps
  - SetupBase3DScene()
- Let's move the box 
- Are you coming from Unity?

## Why code only approach and not game editor?

- You don't want to install anything on your computer (no Stride installation required)
- You want to start very quickly
- You want to have fun learning C# or game development
- You want to learn C# programming with a nice visual 2D/3D output instead of console
- You want to learn game programming gradually, in the simplest way, without using the game editor
- You find coding and coding tools very complex to understand and navigate around
- You want to start with game development basics before you even start exploring the game editor
- Easy and quick prototyping
- Easy to learn game development concepts and steps
- Performance and feature evaluation
- Any other reason? Suggest here [GitHub Discussion](https://github.com/VaclavElias/vaclavelias.github.io/discussions).

## Prerequisites

1. Install Visual Studio 2022 (Community version is free)
2. Install Visual C++ Redistributable

## Let's start in 4 steps

1. Create a C# console application (.NET 6) in your editor of choice
2. Reference this preview NuGet package [CodeCapital.Stride.GameDefaults](https://www.nuget.org/packages/CodeCapital.Stride.GameDefaults/)
    - This packages contains C# helpers and extensions to run Stride easily without the editor
3. Paste the code below
4. Run and have a fun

{% include alert.html type='info' title='CodeCapital.Stride.GameDefaults is currently in preview and it is intended to be moved to Stride git repository' %}

```c#
using Stride.Core.Mathematics;
using Stride.Engine;
using Stride.GameDefaults;
using Stride.GameDefaults.Extensions;

using var game = new Game();

game.Run(start: (Scene rootScene) =>
{
    game.SetupBase3DScene();

    var entity = game.CreatePrimitive(PrimitiveModelType.Cube);

    entity.Transform.Position = new Vector3(1f, 0.5f, 0);

    entity.Scene = rootScene;
});
```
![Stride Code Only Example](/assets/img/2022/stride-code-only-example-box.jpg){: .img-fluid}

The camera entity can be moved using W, A, S, D, Q and E, arrow keys, a gamepad's left stick or dragging/scaling using multi-touch. Rotation is achieved using the Numpad, the mouse while holding the right mouse button, a gamepad's right stick, or dragging using single-touch.

Let's go line by line.

1. Referencing Stride NuGet packages
```c#
using Stride...
``` 
2. Creating a disposable game object
```c#
using var game = new Game();
``` 
3. Starting game application with a delegate
```c#
game.Run();
```
4. Setting up 3D Scene, read below more
```c#
game.SetupBase3DScene();
```
5. Creating a cube, which is added to entity
```c#
var entity = game.CreatePrimitive(PrimitiveModelType.Cube);
```
6. Positioning entity in 3D
```c#
entity.Transform.Position = new Vector3(1f, 0.5f, 0);
```
7. Adding our entity to the main scene
```c#
entity.Scene = rootScene;
```

### SetupBase3DScene()

This extension method adds bare minimum, similar to the Empty Project created through Stride Editor. See below
```c#
public static void SetupBase3DScene(this Game game)
{
    game.AddGraphicsCompositor();

    game.AddMouseLookCamera(game.AddCamera());

    game.AddDirectionalLight();

    game.AddSkybox();

    game.AddGround();
}
```

## Let's move the box

## Are you coming from Unity?

- Check this post - [Stride for Unity® developers](https://doc.stride3d.net/latest/en/manual/stride-for-unity-developers/index.html)