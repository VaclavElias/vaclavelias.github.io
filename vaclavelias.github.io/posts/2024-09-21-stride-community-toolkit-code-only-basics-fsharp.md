---
title: Stride Community Toolkit Preview - Code-Only Feature Basics in F#
description: Learn how to use the Stride Community Toolkit’s code-only feature with F# for game development in the Stride engine.

categories: stride3d
date: 2024-09-21
tags:
  - F# 
  - Stride3D
  - .NET
  - Game Development
  - Advanced
image: /assets/img/stride-logo-blue-toolkit.svg
---

Discover how to use the Stride Community Toolkit's **code-only** feature with F#, showcasing a powerful set of extensions and helpers specifically tailored for game development in the Stride engine. Learn the basics of integrating F# with Stride's game engine to create 3D scenes, handle input, and manage entities, all using functional programming techniques.

---

Table of Contents:

[[TOC]]

## Introduction

This article is a condensed version of the original tutorial aimed at C# developers. You can find the original article [here](/stride3d/stride-community-toolkit-code-only-basics-csharp-bepu-physics).

Though I’m not an F# developer, I wanted to demonstrate how easy it is to use the Stride Community Toolkit with F#. The code provided is a direct translation of the original C# implementation into F#.

## Prerequisites 🏠

To follow this tutorial, you should have a solid understanding of F# and .NET.

These steps were tested on a fresh installation of Windows 11.

1. Install the [Microsoft Visual C++ 2015-2022 Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) (approximately 25MB) and restart your system if prompted.
2. Install the [.NET 8 SDK x64](https://dotnet.microsoft.com/en-us/download) (around 200MB).
3. Install the IDE of your choice. I will be using [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) (the Community version is free), but you can also use:
   - [Visual Studio Code](https://code.visualstudio.com/) - Free
   - [Rider](https://www.jetbrains.com/rider/download/#section=windows) - Free for non-commercial use
   - Any other IDE that supports .NET development

## Getting Started 🚀

1. Create a new F# Console App (.NET Core) project in your IDE.
1. Add the Stride Community Toolkit NuGet packages to your project.
    ```bash
    dotnet add package Stride.CommunityToolkit.Windows --prerelease
    dotnet add package Stride.CommunityToolkit.Skyboxes --prerelease
    dotnet add package Stride.CommunityToolkit.Bepu --prerelease
    ```
1. Replace the contents of the `Program.fs` file with the code below.
1. Run the project and enjoy the scene!

## How to Play ⌨️

- Use the `Z` and `X` keys to move the first cube left and right.
- Use the `C` and `V` keys to apply an impulse to the second cube in the opposite directions.
- Press the `Space` key to create a new cube. You can create multiple cubes this way.
- Click the middle mouse button to apply a random impulse to the cube under the cursor.
- Click the left mouse button to apply an upward impulse to the cube under the cursor.

```fsharp
open Stride.CommunityToolkit.Bepu
open Stride.CommunityToolkit.Engine
open Stride.CommunityToolkit.Skyboxes
open Stride.CommunityToolkit.Rendering.ProceduralModels
open Stride.Core.Mathematics
open Stride.Engine
open Stride.CommunityToolkit.Rendering.Compositing
open Stride.Physics
open Stride.Games
open Stride.Input
open Stride.CommunityToolkit.Helpers
open System
open Stride.Core.Diagnostics
open Stride.Graphics
open Stride.UI.Panels
open Stride.UI.Controls
open Stride.UI
open Stride.Rendering
open Stride.BepuPhysics

let mutable movementSpeed = 1.0f
let mutable force = 3.0f
let mutable cube1: Entity option = None
let mutable cube2: Entity option = None

let mutable camera: CameraComponent option = None
let mutable simulation: BepuSimulation option = None
let mutable cube1Component: ModelComponent option = None

let mutable font: SpriteFont = null

let game = new Game()

let Start (scene: Scene) =
    game.AddGraphicsCompositor().AddCleanUIStage() |> ignore
    game.Add3DCamera().Add3DCameraController() |> ignore
    game.AddDirectionalLight() |> ignore
    game.Add3DGround() |> ignore
    game.AddProfiler() |> ignore
    game.AddSkybox() |> ignore
    game.AddGroundGizmo(Vector3(-5.0f, 0.1f, -5.0f), showAxisName = true)

    let entity = game.Create3DPrimitive(PrimitiveModelType.Capsule)
    entity.Transform.Position <- new Vector3(0f, 8f, 0f)
    entity.Scene <- scene

    // Create the first cube (no collider)
    let primitive1 = game.Create3DPrimitive(PrimitiveModelType.Cube, new Bepu3DPhysicsOptions(
        Material = game.CreateMaterial(Color.Gold),
        IncludeCollider = false
    ))
    primitive1.Scene <- scene
    cube1 <- Some primitive1

    // Create the second cube (with collider)
    let primitive2 = game.Create3DPrimitive(PrimitiveModelType.Cube, new Bepu3DPhysicsOptions(
        Material = game.CreateMaterial(Color.Orange)
    ))
    primitive2.Transform.Position <- Vector3(-3.0f, 5.0f, 0.0f)
    primitive2.Scene <- scene
    cube2 <- Some primitive2

    // Initialize camera, simulation, and model component for interactions
    camera <- Some (scene.GetCamera())
    simulation <- camera |> Option.map (fun c -> c.Entity.GetSimulation())
    cube1Component <- primitive1.Get<ModelComponent>() |> Option.ofObj

    // Create and display a UI text block
    font <- game.Content.Load<SpriteFont>("StrideDefaultFont")

    let canvas = Canvas(
        Width = 300.0f,
        Height = 100.0f,
        BackgroundColor = Color(byte 248, byte 177, byte 149, byte 100),
        HorizontalAlignment = HorizontalAlignment.Left,
        VerticalAlignment = VerticalAlignment.Bottom)

    // Add a text block to the canvas
    let textBlock = TextBlock(
        Text = "Hello, Stride!",
        TextColor = Color.White,
        Font = font,
        TextSize = 24.0f,
        Margin = Thickness(3.0f, 3.0f, 3.0f, 0.0f))

    canvas.Children.Add(textBlock)

    let uiEntity = new Entity()
    uiEntity.Add(UIComponent(
        Page = new UIPage(RootElement = canvas),
        RenderGroup = RenderGroup.Group31))

    uiEntity.Scene <- scene

// Define the Update method, called every frame to update the game state
let Update (scene: Scene) (time: GameTime) =
    game.DebugTextSystem.Print(sprintf "Entities: %d" scene.Entities.Count, Int2(50, 50))

    // Calculate the time elapsed since the last frame for consistent movement
    // This is crucial for frame-independent movement, ensuring consistent
    // behaviour regardless of frame rate.
    let deltaTime = float32 time.Elapsed.TotalSeconds

    // Handle non-physical movement for cube1
    // Move the first cube along the X-axis (non-physical movement)
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
        let rigidBody = cube.Get<BodyComponent>()
        if game.Input.IsKeyPressed(Keys.C) then
            rigidBody.Awake <- true
            rigidBody.ApplyImpulse(Vector3(-force, 0.0f, 0.0f), Vector3.Zero)
        elif game.Input.IsKeyPressed(Keys.V) then
            rigidBody.Awake <- true
            rigidBody.ApplyImpulse(Vector3(force, 0.0f, 0.0f), Vector3.Zero)
    | None -> ()

    if game.Input.IsKeyDown(Keys.Space) then
        let entity = game.Create3DPrimitive(PrimitiveModelType.Cube, new Bepu3DPhysicsOptions(
            Material = game.CreateMaterial(Color.Green),
            Size = new Vector3(0.5f)
        ))
        entity.Transform.Position <- VectorHelper.RandomVector3([| -3f; 3f |], [| 10f; 13f |], [| -3f; 3f |])
        entity.Scene <- scene

    // Ensure camera and simulation are initialized before handling mouse input
    if camera.IsNone || simulation.IsNone || not game.Input.HasMouse then
        ()
    else
        if game.Input.IsMouseButtonDown(MouseButton.Middle) then
            let mutable hitInfo = Unchecked.defaultof<HitInfo>
            let hitResult = camera.Value.Raycast(game.Input.MousePosition, 100f, &hitInfo)
            if hitResult then
                let rigidBody = hitInfo.Collidable.Entity.Get<BodyComponent>()
                if rigidBody <> null then
                    let direction = VectorHelper.RandomVector3([| -20.0f; 20.0f |], [| 0.0f; 20.0f |], [| -20.0f; 20.0f |])
                    rigidBody.Awake <- true
                    rigidBody.ApplyImpulse(direction, Vector3.Zero)
            // Return after handling middle mouse input

        // Handle left mouse button input
        if game.Input.IsMouseButtonPressed(MouseButton.Left) then
            let mutable hitInfo = Unchecked.defaultof<HitInfo>
            let hitResult = camera.Value.Raycast(game.Input.MousePosition, 100f, &hitInfo)
            if hitResult then
                let message = sprintf "Hit: %s" hitInfo.Collidable.Entity.Name
                Console.WriteLine(message)
                GlobalLogger.GetLogger("Program.fs").Info(message)

                let rigidBody = hitInfo.Collidable.Entity.Get<BodyComponent>()
                if rigidBody <> null then
                    let direction = Vector3(0.0f, 3.0f, 0.0f) // Apply upward impulse
                    rigidBody.Awake <- true
                    rigidBody.ApplyImpulse(direction, Vector3.Zero)
            else
                Console.WriteLine("No hit detected.")

            // Check for intersections with non-physical entities using ray picking
            let ray = camera.Value.GetPickRay(game.Input.MousePosition)
            if cube1Component.IsSome && cube1Component.Value.BoundingBox.Intersects(&ray) then
                Console.WriteLine("Cube 1 hit!")

[<EntryPoint>]
// Start the game loop and provide the Start and Update methods as callbacks
// This method initializes the game, begins running the game loop,
// and starts processing events.
let main argv =
    game.Run(start = System.Action<Scene>(Start), update = System.Action<Scene, GameTime>(Update))
    0
```

{% include _alert-svg.html %}
{% include _alert.html type:'info' title: "The video below was recorded for the C# version, but the result is the same for F#." %}

{% video-fluid '/assets/img/2024/stride-basics-step-18.mp4' 'webp' 'false' %}

## Conclusion

In this article, you learned how to use the Stride Community Toolkit's **code-only** feature with F# for game development in the Stride engine. We explored the basics of integrating F# with Stride to create 3D scenes, handle input, and manage entities—all while leveraging functional programming techniques.

If you'd like to see the full project, you can access it on GitHub. Feel free to check it out and experiment! 💻:

- [Bepu F# Physics version](https://github.com/VaclavElias/stride-examples/tree/main/src/CommunityToolkit/CodeOnlyBasicsFSharp).
- [Bullet F# Physics version](https://github.com/VaclavElias/stride-examples/tree/main/src/CommunityToolkit/CodeOnlyBasicsBulletPhysicsFSharp).
- [Bepu C# Physics version](https://github.com/VaclavElias/stride-examples/tree/main/src/CommunityToolkit/CodeOnlyBasics).
- [Bullet C# Physics version](https://github.com/VaclavElias/stride-examples/tree/main/src/CommunityToolkit/CodeOnlyBasicsBulletPhysics). 

## Support Stride Engine 🌟

Stride is an open-source project that thrives on community contributions and support. By using Stride, sharing your experiences, and contributing to the community, you help improve the engine for everyone. 🚀

- **Contribute:** Share your knowledge, [contribute to the engine](https://github.com/stride3d/stride), or [report issues](https://github.com/stride3d/stride/issues) to help enhance Stride for all developers.
- **Join the Community:** Engage with fellow developers, ask questions, and showcase your projects on our [Discord](https://discord.gg/f6aerfE) server or in [GitHub Discussions](https://github.com/stride3d/stride/discussions).
- **Sponsor:** Support the ongoing development of Stride by becoming a sponsor on our [Open Collective](https://opencollective.com/stride3d) page.

{% include _alert.html type:'light' title: "This content was reviewed and enhanced with the assistance of ChatGPT." %}