---
title: Stride Community Toolkit Preview - Code-Only Feature Basics in F#
description: Learn how to use the Stride Community Toolkit’s code-only feature with F# for game development in the Stride engine.

categories: stride3d
date: 2024-09-12
tags:
  - F# 
  - Stride3D
  - .NET
  - Game Development
  - Advance
image: /assets/img/stride-logo-blue-toolkit.svg
---

Discover how to use the Stride Community Toolkit's **code-only** feature with F#, showcasing a powerful set of extensions and helpers specifically tailored for game development in the Stride engine. Learn the basics of integrating F# with Stride's game engine to create 3D scenes, handle input, and manage entities—all using functional programming techniques.

---

Table of Contents:

[[TOC]]

## Introduction

This article is a condensed version of the original tutorial aimed at C# developers. You can find the original article [here](/stride3d/stride-community-toolkit-code-only-basics-csharp).

Though I’m not an F# developer, I wanted to demonstrate how easy it is to use the Stride Community Toolkit with F#. The code provided is a direct translation of the original C# implementation into F#.

## Prerequisites 🏠

To follow this tutorial, you should have a solid understanding of F# and .NET.

These steps were tested on a fresh installation of Windows 11.

1. Install the [Microsoft Visual C++ 2015-2022 Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) (25MB) and restart your system if prompted.
2. Install the [.NET 8 SDK x64](https://dotnet.microsoft.com/en-us/download) (200MB).
3. Install the IDE of your choice. I will be using [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/), but you can also use [Visual Studio Code](https://code.visualstudio.com/), Rider, or any other IDE that supports .NET development.

## Getting Started 🚀

1. Create a new F# Console App (.NET Core) project in your IDE.
1. Add the Stride Community Toolkit NuGet package to your project.
    ```bash
    dotnet add package Stride.CommunityToolkit.Windows --prerelease
    ```
1. Replace the contents of the `Program.fs` file with the code below.
1. Run the project and enjoy the scene!


```fsharp
open Stride.CommunityToolkit.Engine
open Stride.CommunityToolkit.Skyboxes
open Stride.CommunityToolkit.Rendering.ProceduralModels
open Stride.Core.Mathematics
open Stride.Engine
open Stride.CommunityToolkit.Rendering.Compositing
open Stride.Physics
open Stride.Games
open Stride.Input

let mutable movementSpeed = 1.0f
let mutable force = 3.0f
let mutable cube1: Entity option = None
let mutable cube2: Entity option = None

let mutable camera: CameraComponent option = None
let mutable simulation: Simulation option = None
let mutable cube1Component: ModelComponent option = None

let game = new Game()

let Start (rootScene: Scene) =
    game.AddGraphicsCompositor().AddCleanUIStage() |> ignore
    game.Add3DCamera().Add3DCameraController() |> ignore
    game.AddDirectionalLight() |> ignore
    game.Add3DGround() |> ignore
    game.AddProfiler() |> ignore
    game.AddSkybox() |> ignore
    game.AddGroundGizmo(Vector3(-5.0f, 0.1f, -5.0f), showAxisName = true)

    let entity = game.Create3DPrimitive(PrimitiveModelType.Capsule)
    entity.Transform.Position <- new Vector3(0f, 8f, 0f)
    entity.Scene <- rootScene

    // Create the first cube (no collider)
    let primitive1 = game.Create3DPrimitive(PrimitiveModelType.Cube, new Primitive3DCreationOptions(
        Material = game.CreateMaterial(Color.Gold),
        IncludeCollider = false
    ))
    primitive1.Scene <- rootScene
    cube1 <- Some primitive1 // Assign to the mutable variable

    // Create the second cube (with collider)
    let primitive2 = game.Create3DPrimitive(PrimitiveModelType.Cube, new Primitive3DCreationOptions(
        Material = game.CreateMaterial(Color.Orange)
    ))
    primitive2.Transform.Position <- Vector3(-3.0f, 5.0f, 0.0f)
    primitive2.Scene <- rootScene
    cube2 <- Some primitive2 // Assign to the mutable variable

    // Initialize camera, simulation, and model component for interactions
    camera <- Some (rootScene.GetCamera())
    simulation <- game.SceneSystem.SceneInstance.GetProcessor<PhysicsProcessor>().Simulation |> Option.ofObj
    cube1Component <- primitive1.Get<ModelComponent>() |> Option.ofObj

let Update (scene: Scene) (time: GameTime) =
    game.DebugTextSystem.Print(sprintf "Entities: %d" scene.Entities.Count, Int2(50, 50))

    // Calculate the time elapsed since the last frame for consistent movement
    let deltaTime = float32 time.Elapsed.TotalSeconds

    // Handle non-physical movement for cube1
    match cube1 with
    | Some cube ->
        let position = cube.Transform.Position
        let newPosition =
            if game.Input.IsKeyDown(Keys.Z) then
                Vector3(position.X - movementSpeed * deltaTime, position.Y, position.Z)
            elif game.Input.IsKeyDown(Keys.X) then
                Vector3(position.X + movementSpeed * deltaTime, position.Y, position.Z)
            else
                position
        cube.Transform.Position <- newPosition
    | None -> ()

    // Handle physics-based movement for cube2
    match cube2 with
    | Some cube ->
        let rigidBody = cube.Get<RigidbodyComponent>()
        if game.Input.IsKeyPressed(Keys.C) then
            rigidBody.ApplyImpulse(Vector3(-force, 0.0f, 0.0f))
        elif game.Input.IsKeyPressed(Keys.V) then
            rigidBody.ApplyImpulse(Vector3(force, 0.0f, 0.0f))
    | None -> ()

[<EntryPoint>]
let main argv =
    game.Run(start = System.Action<Scene>(Start), update = System.Action<Scene, GameTime>(Update))
    0
```

## Conclusion

In this article, you learned how to use the Stride Community Toolkit's **code-only** feature with F# for game development in the Stride engine. We explored the basics of integrating F# with Stride to create 3D scenes, handle input, and manage entities—all while leveraging functional programming techniques.

## Support Stride Engine 🌟

Stride is an open-source project that thrives on community contributions and support. By using Stride, sharing your experiences, and contributing to the community, you help improve the engine for everyone. 🚀

- **Contribute:** Share your knowledge, [contribute to the engine](https://github.com/stride3d/stride), or [report issues](https://github.com/stride3d/stride/issues) to help enhance Stride for all developers.
- **Join the Community:** Engage with fellow developers, ask questions, and showcase your projects on our [Discord](https://discord.gg/f6aerfE) server or in [GitHub Discussions](https://github.com/stride3d/stride/discussions).
- **Sponsor:** Support the ongoing development of Stride by becoming a sponsor on our [Open Collective](https://opencollective.com/stride3d) page.

{% include _alert.html type:'light' title: "This content was reviewed and enhanced with the assistance of ChatGPT." %}