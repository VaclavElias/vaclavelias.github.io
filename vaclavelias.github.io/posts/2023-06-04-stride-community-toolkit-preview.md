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

## Introduction 🌱

Welcome to the preview of the [Stride Community Toolkit](https://stride3d.github.io/stride-community-toolkit/index.html), a collection of extensions and helpers for the [Stride 3D](https://www.stride3d.net/) C# game engine. This toolkit is a community-driven, open-source project designed to assist developers in creating 2D/3D games and visualizations using Stride.

Though still in its early stages, the toolkit already offers several valuable features. In this post, I will focus on the code-only approach, which I found particularly useful.

This article assumes that you have some experience with .NET and C# programming.

## Code-Only on Windows 🪟

The toolkit allows you to create a game using a code-only approach, meaning you can develop a game without using the Stride [Game Studio](https://doc.stride3d.net/latest/en/manual/game-studio/index.html). As a C#/.NET developer in my day job, I found this approach very helpful for getting started with the Stride 3D engine and game development without diving into the Game Studio.

Additional reasons for using the code-only approach are detailed [here](https://stride3d.github.io/stride-community-toolkit/manual/code-only/index.html) in the toolkit documentation.

We will be using a standard .NET 8 **Console App** to create a simple game and adding some NuGet packages to get started.

Here is the process I found to be the easiest way to get started with the code-only approach:

1. Run the minimal possible code to get the game window running.
2. Add primitives/objects to the scene.
3. Add interaction with mouse and keyboard.
4. Add output to the console or screen.

### Prerequisites 🏠 

These prerequisites were tested on clean Windows 11 installations.

1. Install [Microsoft Visual C++ 2015-2022 Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) (25MB) and restart if your system asks you to.
1. Install [.NET 8 SDK x64](https://dotnet.microsoft.com/en-us/download) (200MB).
1. Install the IDE of your choice. I will be using [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/), but you can use [Visual Studio Code](https://code.visualstudio.com/), Rider or any other IDE that supports .NET development.

### The story of the brave explorers 📘

🌍 Welcome, brave explorers of the digital wilderness! Today, we embark on an exciting journey into the heart of the Stride 3D game engine. Our guide? None other than the Stride Community Toolkit.

In the vast expanse of the coding universe, we'll create a new world from nothing but a .NET 8 Console App. Prepare to witness the birth of a game window, a black void of nothingness that will soon teem with life 🫎.

As we venture further, we'll bring light into our world, transforming the black void into a vibrant blue expanse. And what's a world without its inhabitants? We'll conjure a 3D capsule, our first digital lifeform, into existence.

But beware, fellow adventurers! Our capsule is a wild creature, prone to falling into the void. Fear not, for we'll harness the power of a 3D camera 🎥 controller to keep a watchful eye 👁️ on our creation.

So, refresh your mouse agility skills 🖱️, and join us on this exhilarating expedition. Let's dive into the code! 💻

### Step 1: Create a New C# .NET 8 Console App - Nothingness ⚫

1. Create a new C# .NET 8 Console App in your IDE.
1. Add the following NuGet package:
    ```bash
    dotnet add package Stride.CommunityToolkit.Windows --prerelease
    ```
1. Paste the following code into your `Program.cs` file:
    ```csharp
    using Stride.Engine;

    using var game = new Game();

    game.Run();
    ```
1. Run the application.
1. See the black void of nothingness 🙀.

### Step 2: Let There Be Light - Or at Least Blue 🌌

Once upon a time in a galaxy far, far away, you should see a window with a black background. This is the Stride 3D game window. As a black screen is not very exciting, let's add some mystery code to make it more interesting. This time we use the `Stride.CommunityToolkit.Engine` namespace so we can reference some of the toolkit helper methods.

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
The code above does the following:

- `Start()` method is a callback that is called when the game starts. It takes a `Scene` object as a parameter.
- `AddGraphicsCompositor()` organizes [how scenes are rendered](https://doc.stride3d.net/latest/en/manual/graphics/graphics-compositor/index.html) in the Stride engine, allowing for extensive customization of the rendering pipeline.
- `Add3DCamera()` adds a 3D camera, allowing you to view the scene from different angles.

Run the application again. Now we have a blue screen instead of a black one. Not very exciting, right? We're looking through the camera, but there's nothing to see.

### Step 3: Add Some Shapes - Capsule Time! 🎨

Let's add something to the scene. This time we will be utilising `Stride.CommunityToolkit.Rendering.ProceduralModels` namespace. 

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

Run the application again. Surprise, nothing happened! We created an entity but didn't add it to the scene. A typical beginner's mistake 🤦‍♂️. Update the `Start` method to look like this:

```csharp
void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Scene = rootScene;
}
```

Run the application again. You should see a capsule in the middle of the screen if you're lucky because it is falling down. Fast.

### Step 4: Control the Camera - Look Around! 🖱️

Maybe we could at least look around the scene and see the capsule from different angles while it is falling into the void 😠?

Let's add a 3D camera controller `Add3DCameraController()` to the game. This extension will add some basic functionality to the camera, with the instructions printed on the screen. Time to refresh your mouse agility skills.


```csharp
game.Add3DCamera().Add3DCameraController();
```

Run the application again and use the right-click to rotate the camera towards the capsule. Maybe a little bit more satisfying? Let's make the experience more interesting.

### Step 5: Reposition the Capsule - More Excitement! 📍

First, let's reposition the capsule so we have a few more seconds of excitement looking at it. Update the `Start` method to look like this:

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

- `entity.Transform.Position` sets the position of the entity in the scene. The `Vector3` object is a 3D vector representing the position of the entity in the scene. In this case, we set the position of the entity to (0, 8, 0), which is 8 units above the origin of the scene.

Run the application again. You should see a capsule falling down from the top of the screen. I know, the capsule is black, but we will fix that later.

### Step 6: Add a Ground - Catch the Capsule! 🛑

We are going to catch the capsule by adding ground to the scene. Update the `Start` method to look like this:

```csharp
void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera().Add3DCameraController();
    game.Add3DGround();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Transform.Position = new Vector3(0, 8, 0);
    entity.Scene = rootScene;
}
```

- `Add3DGround()` is a toolkit helper method that creates a 3D ground plane in the scene.

Run the application again. You should see a capsule falling down and landing on the ground. Black capsule on a black ground 🤦‍♂️. You can move the camera around using the mouse and keyboard (Q or E) to lower or raise the camera and see the capsule rolling on the ground.

### Step 7: Illuminate the Scene - Add Light! 💡

There must be something to brighten things up. Yes, there is another helper method `game.AddDirectionalLight()` that adds a directional light to the scene. Update the `Start` method to look like this:

```csharp
void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera().Add3DCameraController();
    game.AddDirectionalLight();

    game.Add3DGround();

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Transform.Position = new Vector3(0, 8, 0);
    entity.Scene = rootScene;
}
```

Run the application again. You should see a capsule falling down and landing on the ground. The capsule and ground are now better visible with the directional light illuminating the scene.

### Step 8: Break 1 - Let's Reflect 😅

Tedious work, but you just learned the very basics of game setup behind the scenes, which is usually done in the Game Studio for you automatically.

- You need a Graphics Compositor to render the scene.
- You need a Camera to view the scene.
- You need a Camera Controller to move the camera around.
- You need a Directional Light to illuminate the scene.

Once the basics are set up, you need to add entities to the scene. In our example, we added:

- A 3D Ground, which is a primitive model.
- A Capsule, which is also a primitive model.

The toolkit added colliders for the ground and capsule, so the capsule doesn't fall through the ground.

### Step 9: Illuminate the Scene - Add Skybox! 🌇

### Step 10: Add Keyboard Interaction - Move the Capsule! ⌨️

### Step 11: Add Mouse Interaction - Catch the Capsule! 🖱️

### Step 12: Add Output - Console or Screen! 📺

### Step 13: Break 2 - Let's Reflect 😅

### Step 14: Add More Primitives

## Code-Only on other platforms

This options is not yet available but is planned for the future ([Use CompilerApp crossplatform binary instead of exe](https://github.com/stride3d/stride/pull/2279)). While Stride is a cross-platform engine, we can build the game on Windows and then run it on other platforms. One of the build gears called `Stride.Core.Assets.CompilerApp.exe` responsible for building the assets is currently only available on Windows.
