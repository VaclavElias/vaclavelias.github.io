---
title: Stride Community Toolkit Preview
description: Explore the Stride Community Toolkit preview, a collection of extensions and helpers for the Stride 3D game engine.
categories: stride3d
date: 2024-06-04
tags:
  - C# 
  - Stride3D
  - .NET
  - Game
image: /assets/img/11ty-logo-400x400.png
---

C# and .NET developers can now create games using the Stride 3D engine with a code-only approach. The Stride Community Toolkit preview is a collection of extensions and helpers for the Stride 3D game engine. This toolkit is a community-driven FOSS project that aims to provide tools to help developers create 2D/3D games or visualizations with Stride.

---

Table of Contents:

[[TOC]]

## Introduction

I would like to introduce the [Stride Community Toolkit](https://stride3d.github.io/stride-community-toolkit/index.html) preview, a collection of extensions and helpers for the [Stride 3D](https://www.stride3d.net/) C# game engine. The toolkit is a community-driven FOSS project that aims to provide tools to help developers create 2D/3D games or visualizations with Stride.

The toolkit is still in the early stages of development but already includes a number of useful features. I will be focusing on the code-only approach in this post, which is one of the features that I found very useful.

This article assumes you have some .NET and C# programming experience.

## Code-Only on Windows

The toolkit allows you to create a game using a code-only approach. This means you can create a game without using the Stride [Game Studio](https://doc.stride3d.net/latest/en/manual/game-studio/index.html). As a C#/.NET developer in my day job, I found this approach very useful for onboarding into the Stride 3D engine and game development without having to dive into the Game Studio.

Some other reasons for using the code-only approach are listed [here](https://stride3d.github.io/stride-community-toolkit/manual/code-only/index.html) in the toolkit documentation.

We will be using a standard .NET 8 **Console App** to create a simple game and adding some NuGet packages to get started.

I found the following process to be the easiest way to get started with the code-only approach:

1. Run the minimal possible code to get the game window running
1. Add primitives/objects to the scene
1. Add interaction with mouse and keyboard
1. Add output to the console or screen

### Prerequisites

These prerequisites were tested on clean Windows 11 installations.

1. Install [Microsoft Visual C++ 2015-2022 Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) (25MB) and restart if your system asks you to.
1. Install [.NET 8 SDK x64](https://dotnet.microsoft.com/en-us/download) (200MB)
1. Install IDE of your choice. I will be using [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/), but you can use [Visual Studio Code](https://code.visualstudio.com/) or Rider or any other IDE that supports .NET development

### The story of the brave explorers

🌍 Welcome, brave explorers of the digital wilderness! 🌲 Today, we embark on a thrilling journey into the heart of the Stride 3D game engine. 🎮 Our guide? None other than the Stride Community Toolkit. 🛠️

In the vast expanse of the coding universe, we'll create a new world from nothing but a .NET 8 Console App. 🌑 Prepare to witness the birth of a game window, a black void of nothingness that will soon teem with life. 🌌

As we venture further, we'll summon light into our world, transforming the black void into a mesmerizing blue expanse. 💡🔵 And what's a world without its inhabitants? We'll conjure a 3D capsule, our first digital lifeform, into existence. 🧙‍♂️🧊

But beware, fellow adventurers! Our capsule is a wild creature, prone to falling into the void. 😱 Fear not, for we'll harness the power of a 3D camera controller to keep a watchful eye on our creation. 🎥👀

So, strap on your virtual hiking boots, refresh your mouse agility skills 🖱️, and join us on this exhilarating expedition. Let's dive into the code! 🏊‍♂️💻


### Step 1 - Create a new C# .NET 8 Console App - Nothingness

1. Create a new C# .NET 8 Console App in your IDE.
1. Add the following NuGet package
    ```bash
    dotnet add package Stride.CommunityToolkit.Windows --prerelease
    ```
1. Paste the following code into your `Program.cs` file
    ```csharp
    using Stride.Engine;

    using var game = new Game();

    game.Run();
    ```
1. Run the application
1. See the black void of nothingness 🙀

### Step 2 - Let it be light - Or at least blue

Once upon a time in a galaxy far far away, you should see a window with a black background. This is the Stride 3D game window. As a black screen is not very exciting, let's add some mystery code to make it more interesting. This time we use the `Stride.CommunityToolkit.Engine` so we can reference some of the toolkit helper methods.

```csharp
using Stride.CommunityToolkit.Engine;
using Stride.Engine;

using var game = new Game();

game.Run(start: Start);

void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera();
}
```
We added a `Start` method that takes a `Scene` object as a parameter. We then added two helper methods to the `Game` object. The `AddGraphicsCompositor()` method adds a graphics compositor to the game, and the `Add3DCamera()` method adds a 3D camera to the game.

- `AddGraphicsCompositor()` a [graphics compositor](https://doc.stride3d.net/latest/en/manual/graphics/graphics-compositor/index.html) organizes how scenes are rendered in the Stride engine, allowing for extensive customization of the rendering pipeline.
- `Add3DCamera()` a 3D camera is a component that allows you to view the scene from different angles.

With these new additions, let's run the application again.

Well, we have now blue screen, instead of black. Not very exciting. We are looking through camera but there is nothing to see.

Let's add something to the scene. This time we will be utilising ` Stride.CommunityToolkit.Rendering.ProceduralModels`. 

```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.Engine;

using var game = new Game();

game.Run(start: Start);

void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
}
```

We added a new line that creates a 3D primitive capsule. The `Create3DPrimitive()` method takes a `PrimitiveModelType` enum as a parameter and returns an `Entity` object. The `PrimitiveModelType` enum is an enumeration of primitive 3D models that can be created using the `Create3DPrimitive()` method.

Let's run the application again.

Surprise, nothing happened. We created an entity but we didn't add it to the scene. A typical beginners mistake 🤦‍♂️. Update the `Start` method to look like this below, by the way, now you see why we needed `rootScene`:

```csharp
void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Scene = rootScene;
}
```

Now, let's run the application again.

You should see now a capsule in the middle of the screen if you are lucky because it is falling down. Fast.

Maybe, we could at least look around the scene and see the capsule from different angles. While it is falling down into the void 😠?

Let's add a 3D camera controller to the game. This extension will add some basic functionality to the camera, with the instructions printed on the screen. Time to refresh your mouse 🖱️ agility skills.


```csharp
game.Add3DCamera().Add3DCameraController();
```

Now, let's run the application again and use right click to rotate the camera towards the capsule.

Maybe a little bit more satisfying? Let's make the experience more interesting.

Firstly, let's reposition the capsule, so we have a few more seconds of excitement looking at it.

Update the `Start` method to look like this:


```csharp
void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera().Add3DCameraController();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Transform.Position = new Vector3(0, 8, 0);
    entity.Scene = rootScene;
}

```



--------------------


You should see a window with a capsule in the middle of the screen. You can move the camera around using the mouse and keyboard as instructed in the screen.

- `SetupBase3DScene()` is a toolkit helper method that sets up a basic 3D scene with a camera and light
- `Create3DPrimitive()` is a toolkit helper method that creates a 3D primitive

An experienced game developer can explore these helper methods and reuse them in their game development.

### Step 2 - Add primitives

### Step 3 - Interaction

### Step 4 - Output
    

## Code-Only on other platforms

This options is not yet available but is planned for the future ([Use CompilerApp crossplatform binary instead of exe](https://github.com/stride3d/stride/pull/2279)). While Stride is a cross-platform engine, we can build the game on Windows and then run it on other platforms. One of the build gears called `Stride.Core.Assets.CompilerApp.exe` responsible for building the assets is currently only available on Windows.