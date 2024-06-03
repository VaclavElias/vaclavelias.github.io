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

### Step 1 - Create a new C# .NET 8 Console App

1. Create a new C# .NET 8 Console App in your IDE.
1. Add the following NuGet package
     ```bash
     dotnet add package Stride.CommunityToolkit.Windows --prerelease
     ```
1. Paste the following code into your `Program.cs` file
     ```csharp
    using Stride.CommunityToolkit.Engine;
    using Stride.CommunityToolkit.Rendering.ProceduralModels;
    using Stride.Core.Mathematics;
    using Stride.Engine;

    using var game = new Game();

    game.Run(start: Start);

    void Start(Scene rootScene)
    {
        game.SetupBase3DScene();

        var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

        entity.Transform.Position = new Vector3(0, 8, 0);

        entity.Scene = rootScene;
    }
   ```
1. Run the application

You should see a window with a capsule in the middle of the screen. You can move the camera around using the mouse and keyboard as instructed in the screen.

- `SetupBase3DScene()` is a toolkit helper method that sets up a basic 3D scene with a camera and light
- `Create3DPrimitive()` is a toolkit helper method that creates a 3D primitive

An experienced game developer can explore these helper methods and reuse them in their game development.

### Step 2 - Add primitives

### Step 3 - Interaction

### Step 4 - Output
    

## Code-Only on other platforms

This options is not yet available but is planned for the future ([Use CompilerApp crossplatform binary instead of exe](https://github.com/stride3d/stride/pull/2279)). While Stride is a cross-platform engine, we can build the game on Windows and then run it on other platforms. One of the build gears called `Stride.Core.Assets.CompilerApp.exe` responsible for building the assets is currently only available on Windows.