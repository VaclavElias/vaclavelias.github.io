---
title: Stride Community Toolkit Preview - Code-Only Feature - Basics
description: Explore the Stride Community Toolkit's code-only feature, a powerful collection of extensions and helpers for the Stride 3D game engine.

categories: stride3d
date: 2024-08-30
tags:
  - C# 
  - Stride3D
  - .NET
  - Game Development
image: /assets/img/stride-logo-blue-toolkit.svg
---

Discover the Stride Community Toolkit, a powerful collection of extensions and helpers designed for the Stride 3D game engine. In this blog post, we dive into the toolkit's **code-only** feature, empowering C# and .NET developers to create immersive 2D/3D games and visualizations with ease. Explore how this community-driven, open-source project can simplify your game development journey.

---

This blog post is part 1 of a 3-part series:

- Stride Community Toolkit Preview - Code-Only Feature - Basics
- Stride Community Toolkit Preview - Code-Only Feature - Advanced
- Stride Community Toolkit Preview - Code-Only Feature - Refactoring

Table of Contents:

[[TOC]]

## Introduction 🌱

Welcome to the preview of the [Stride Community Toolkit](https://stride3d.github.io/stride-community-toolkit/index.html), a collection of extensions and helpers for the [Stride 3D](https://www.stride3d.net/) C# game engine. This community-driven, [open-source project](https://github.com/stride3d/stride-community-toolkit) is designed to assist developers in creating 2D/3D games and visualizations using [Stride](https://doc.stride3d.net/latest/en/manual/index.html).

Although the toolkit is still in its early stages, it already offers several valuable features. In this post, I will focus on the [code-only](https://stride3d.github.io/stride-community-toolkit/manual/code-only/index.html) approach, which I found particularly useful for development.

This article assumes that you have some experience with .NET and C# programming.

The toolkit allows you to create a game using a code-only approach, meaning you can develop a game without relying on the Stride [Game Studio](https://doc.stride3d.net/latest/en/manual/game-studio/index.html). As a C#/.NET developer in my day job, I found this approach very helpful for getting started with the Stride 3D engine and game development, bypassing the need to work directly in the Game Studio.

Additional details on the benefits of the code-only approach can be found [here](https://stride3d.github.io/stride-community-toolkit/manual/code-only/index.html) in the toolkit documentation.

We will be using a standard .NET 8 **Console App** to create a simple game by adding some NuGet packages to get started.

Here’s the process I found to be the easiest way to begin with the code-only approach:

1. Run the minimal code to get the game window running
2. Add entities/primitives to the scene
3. Add interaction with the keyboard and mouse
4. Add output to the console or screen

### Code-Only on Windows 🪟

The code-only approach is currently available only on Windows. The toolkit provides a set of NuGet packages that you can use to create a game without the need for the Game Studio.

### Code-Only on Other Platforms 🐧 

This option is not yet available but is planned for the future ([Use CompilerApp cross-platform binary instead of exe](https://github.com/stride3d/stride/pull/2279)). While Stride is a cross-platform engine, you can build the game on Windows and then run it on other platforms. However, one of the build tools, `Stride.Core.Assets.CompilerApp.exe`, which is responsible for building the assets, is currently only available on Windows.

## Prerequisites 🏠 

These prerequisites were tested on a clean Windows 11 installation.

1. Install the [Microsoft Visual C++ 2015-2022 Redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) (25MB) and restart your system if prompted.
2. Install the [.NET 8 SDK x64](https://dotnet.microsoft.com/en-us/download) (200MB).
3. Install the IDE of your choice. I will be using [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/), but you can also use [Visual Studio Code](https://code.visualstudio.com/), Rider, or any other IDE that supports .NET development.

## The Story of the Brave Explorers 📘

🌍 Welcome, brave explorers of the digital wilderness! Today, we embark on an exciting journey into the heart of the Stride 3D game engine. Our guide? None other than the Stride Community Toolkit.

In the vast expanse of the coding universe, we'll create a new world from nothing but a .NET 8 Console App. Prepare to witness the birth of a game window, a black void of nothingness that will soon teem with life 🫎.

As we venture further, we'll bring light into our world, transforming the empty void into a vibrant blue expanse. But what's a world without inhabitants? We'll conjure a 3D capsule, our first digital lifeform, into existence.

Beware, fellow adventurers! Our capsule is a wild creature, prone to falling into the void. But fear not, for we'll harness the power of a 3D camera 🎥 controller to keep a watchful eye 👁️ on our creation.

So, refresh your mouse agility skills 🖱️, and join us on this exhilarating expedition. Let's dive into the code! 💻

## Step 1: Create a New C# .NET 8 Console App - Nothingness ⚫

1. Create a new C# .NET 8 Console App in your IDE.
1. Add the following NuGet package: 📦
    ```bash
    dotnet add package Stride.CommunityToolkit.Windows --prerelease
    ```
1. Paste the following code into your `Program.cs` file: 💻
    ```csharp
    using Stride.Engine;

    // Create an instance of the game
    using var game = new Game();

    // Start the game loop
    game.Run();
    ```
1. The first build on your computer requires running the command below. Afterward, you can just use your IDE to build:
    ```bash
    dotnet build --runtime win-x64
    ``` 
1. Run the application.
1. Behold the black void of nothingness 🙀.

{% include _alert-svg.html %}
{% include _alert.html type:'info' title:'The NuGet package <code>Stride.CommunityToolkit.Windows</code> is used specifically for code-only projects. You should use the <code>Stride.CommunityToolkit</code> NuGet package when referencing from a regular Stride project generated from the Game Studio.' %}

## Step 2: Let There Be Light - Or at Least Blue 🌌

Once upon a time in a galaxy far, far away, you should see a window with a black background. This is the Stride 3D game window. 🖥️ As a black screen is not very exciting, let's add some mystery code to make it more interesting. This time, we use the `Stride.CommunityToolkit.Engine` namespace so we can reference some of the toolkit helper methods. 🔧✨


```csharp
using Stride.CommunityToolkit.Engine;  // This was added: Import the toolkit's helper methods
using Stride.Engine;

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start method as a callback
game.Run(start: Start);  // This was updated

// This was added
// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera to the scene to allow viewing from different angles
    game.Add3DCamera();
}
```
The code above does the following:

- `Start()` method is a callback that is invoked when the game starts. It takes a `Scene` object as a parameter, representing the root scene of the game.
- `AddGraphicsCompositor()` organizes [how scenes are rendered](https://doc.stride3d.net/latest/en/manual/graphics/graphics-compositor/index.html) in the Stride engine, enabling extensive customization of the rendering pipeline.
- `Add3DCamera()` adds a 3D camera to the scene, allowing you to view it from various angles.

Run the application again. Now, instead of a black screen, you should see a blue screen. 🌌 While not overly exciting, it’s a step in the right direction. We’re looking through the camera, but there’s nothing to see—yet. 👀

## Step 3: Add Some Shapes - Capsule Time! 🎨

Let's add something to the scene. 🎨 This time, we will be utilizing the `Stride.CommunityToolkit.Rendering.ProceduralModels` namespace, which provides helper methods for generating procedural models like capsules, cubes, and spheres. We will add a capsule to the scene.

```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;  // This was added: Import procedural model helpers
using Stride.Engine;

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start method as a callback
game.Run(start: Start);

// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera to the scene to allow viewing from different angles
    game.Add3DCamera();

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule); // This was added
}
```

In this step, we added a new line that creates a 3D primitive capsule. 🧊 The `Create3DPrimitive()` method takes a `PrimitiveModelType` enum as a parameter and returns an [`Entity`](https://doc.stride3d.net/latest/en/manual/game-studio/add-entities.html) object. The `PrimitiveModelType` enum defines the types of primitive 3D models that can be generated, such as capsules, cubes, and spheres.

Run the application again. Surprise, nothing happened! 😲 We created an entity, but we didn't add it to the scene. This is a typical beginner's mistake 🤦‍♂️. To fix it, update the `Start` method to look like this:

```csharp
// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera to the scene to allow viewing from different angles
    game.Add3DCamera();

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene; // This was added
}
```

Now, run the application again. You should see a capsule in the middle of the screen if you're lucky because it's falling down. Fast! 🚀

## Step 4: Control the Camera - Look Around! 🖱️

Maybe we should at least look around the scene and view the capsule from different angles as it falls into the void 😠?

Let's add a 3D camera controller using the `Add3DCameraController()` method. 🎮 This extension adds basic camera functionality, allowing you to interact with the camera through keyboard and mouse inputs. Specifically, it attaches a regular `SyncScript` to the camera with custom logic to handle camera movement. Time to refresh those mouse agility skills!

```csharp
// This was updated: Add a camera controller for basic camera movement
game.Add3DCamera().Add3DCameraController();
```

Run the application again and use right-click and hold to rotate the camera towards the capsule, or follow the instructions displayed on the screen. 🎥 Feeling a bit more satisfied now? Let's make the experience even more interesting! 🎨✨

## Step 5: Reposition the Capsule - More Excitement! 📍

Let's reposition the capsule to add a bit more excitement and give us a few extra seconds to admire it before it falls. Update the `Start` method as shown below, and don't forget to add the `Stride.Core.Mathematics` namespace for handling the 3D positioning.

```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.Core.Mathematics;  // This was added: Import Vector3 and other math utilities
using Stride.Engine;

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start method as a callback
game.Run(start: Start);

// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0); // This was added

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;
}
```
- `entity.Transform.Position` sets the position of the entity within the scene. The `Vector3` object represents a 3D vector, which in this case, places the capsule at coordinates `(0, 8, 0)`, which is 8 units above the scene's origin.
- `Stride.Core.Mathematics` Stride uses its own implementation of `Vector3` and other math utilities, so we need to add this namespace to access those features.

Run the application again. You should see a capsule falling down from the top of the screen. I know, the capsule is black, but don't worry, we'll fix that later. 😉

## Step 6: Add a Ground - Catch the Capsule! 🛑

Now let's catch the capsule by adding some ground to the scene. Update the `Start` method to look like this:

```csharp
// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround(); // This was added

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;
}
```

- `Add3DGround()` is a toolkit helper method that creates a 3D ground plane in the scene, providing a surface for the capsule to land on.

Run the application again. You should see the capsule falling down and landing on the ground. 🎉 Unfortunately, it's still a black capsule on a black ground 🤦‍♂️. But don't worry, we’ll fix that later! In the meantime, you can move the camera around using the mouse and keyboard (Q or E) to lower or raise the camera and watch the capsule roll around on the ground. 🖱️⌨️

## Step 7: Illuminate the Scene - Add Light! 💡

It's time to brighten things up! Adding some light to the scene will help us see our objects more clearly. Thankfully, there's a helper method called `game.AddDirectionalLight()` that adds a directional light to the scene. Update the `Start` method to look like this:

```csharp
// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a directional light to illuminate the scene
    game.AddDirectionalLight(); // This was added

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround();

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;
}
```

Run the application again. 🌟 You should now see the capsule falling down and landing on the ground, with everything clearly illuminated by the directional light. The capsule and ground are much easier to see, thanks to the added light shining on the scene. 🎉

Finally, no more black-on-black mysteries! 💡

## Step 8: Break 1 - Let's Reflect 😅

Tedious work but great job, explorer! 🎉 You’ve just learned the very basics of game setup behind the scenes—work that’s usually done for you automatically in the Game Studio. Let’s take a moment to reflect on what we've built so far:

- You need a [Graphics Compositor](https://doc.stride3d.net/latest/en/manual/graphics/graphics-compositor/index.html) to render the scene.
- You need a [Camera](https://doc.stride3d.net/latest/en/manual/graphics/cameras/index.html) to view the scene from different angles.
- You need a Camera Controller, a [C# script](https://doc.stride3d.net/latest/en/manual/scripts/index.html), to move the camera around and navigate the scene.
- You need a [Light](https://doc.stride3d.net/latest/en/manual/graphics/lights-and-shadows/index.html) to illuminate the scene and bring everything into focus

Once these basics are set up, you can start adding entities to the scene. In our example, we’ve added:

- A 3D Ground, a simple primitive model that provides a surface.
- A Capsule, another primitive model, which we’ve repositioned and dropped into the scene.

The toolkit automatically added [colliders](https://doc.stride3d.net/latest/en/manual/physics/colliders.html) for the ground and capsule, ensuring that the capsule doesn't fall through the ground but instead interacts realistically with the scene.

Whew! 😅 Take a deep breath, and get ready for the next part of our journey. Up next: performance optimizations and more interactive elements. 🚀

## Step 9: Add Profiler - Performance! 📈

As game developers, we love seeing those sweet FPS numbers! 🎮 The toolkit provides a `game.AddProfiler()` method that adds a performance profiler to the game, allowing us to monitor important metrics like frames per second (FPS).

Update the `Start` method to look like this:

```csharp
// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a directional light to illuminate the scene
    game.AddDirectionalLight();

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround();

    // Add a performance profiler to monitor FPS and other metrics
    game.AddProfiler(); // This was added

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;
}
```

Run the application again. You should see [profiler text output](https://doc.stride3d.net/latest/en/manual/troubleshooting/profiling.html) in the top-left corner of the screen, showing the frames per second (FPS) and other performance metrics. 🚀 Press F1 to cycle through different profiler outputs and monitor various aspects of your game's performance. 📊

## Step 10: Illuminate the Scene - Add Skybox! 🌇

As exciting as things are looking, we can make our scene even better by adding a [skybox](https://doc.stride3d.net/latest/en/manual/graphics/textures/skyboxes-and-backgrounds.html). A skybox will enhance the overall atmosphere and give our scene a more polished, realistic look. 🌇

The toolkit provides a `AddSkybox()` method that adds a skybox to the scene. First, we need to add another NuGet package, `Stride.CommunityToolkit.Skyboxes`, which includes assets required for the skybox.

```bash
dotnet add package Stride.CommunityToolkit.Skyboxes --prerelease
```

Then, update the code to look like this:


```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.CommunityToolkit.Skyboxes;  // This was added: Import skybox helpers
using Stride.Core.Mathematics;
using Stride.Engine;

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start method as a callback
game.Run(start: Start);

// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a directional light to illuminate the scene
    game.AddDirectionalLight();

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround();

    // Add a performance profiler to monitor FPS and other metrics
    game.AddProfiler();

    // Add a skybox to enhance the scene's visuals
    game.AddSkybox(); // This was added

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;
}
```

Run the application again. 🎮 You should now see a beautiful skybox surrounding the scene, making it look more immersive and realistic. 🌅 The [skybox](https://doc.stride3d.net/latest/en/manual/graphics/textures/skyboxes-and-backgrounds.html) is essentially a large, textured 3D model that wraps around the entire scene, providing a visually appealing background. 🌇

## Step 11: Add Motion without Physics - Move the Cube without Colliders! 📦 

Let's add a box (or cube) to the scene! 🎉 But before we start coding, let's consider the different ways we can move the box:

1. **Moving Entities by Changing Their Position Directly (Without Colliders)**
   - Simple movement without interaction with other entities.
   - Non-physical movement that doesn't involve realistic physics or collisions.
2. **Moving Entities Using Physics (With Colliders)**
   - Realistic movement that interacts with the environment.
   - Interaction with other entities, including collisions.
   - Movement influenced by gravity and other forces.
   - Physics-driven game mechanics like bouncing, sliding, or responding to obstacles.
     
We'll start with the first option: moving the cube by directly changing its position. Update the code to look like this:


```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.CommunityToolkit.Skyboxes;
using Stride.Core.Mathematics;
using Stride.Engine;
using Stride.Games;  // This was added

float movementSpeed = 1f; // This was added
Entity? cube1 = null; // This was added

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start and Update methods as callbacks
game.Run(start: Start, update: Update); // This was updated

// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a directional light to illuminate the scene
    game.AddDirectionalLight();

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround();

    // Add a performance profiler to monitor FPS and other metrics
    game.AddProfiler();

    // Add a skybox to enhance the scene's visuals
    game.AddSkybox();

    // Add a ground gizmo to visualize axis directions
    game.AddGroundGizmo(position: new Vector3(-5, 0.1f, -5), showAxisName: true);

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;

    // This was added
    // Create a cube with material, disable its collider, and add it to the scene
    // The cube is hanging in the default position Vector(0,0,0) in the air,
    cube1 = game.Create3DPrimitive(PrimitiveModelType.Cube, new()
    {
        Material = game.CreateMaterial(Color.Gold),
        IncludeCollider = false // No collider for non-physical movement
    });
    cube1.Scene = rootScene;
}

// This was added
// Define the Update method, called every frame to update the game state
void Update(Scene scene, GameTime time)
{
    // Calculate the time elapsed since the last frame for consistent movement
    // This is crucial for frame-independent movement, ensuring consistent
    // behaviour regardless of frame rate.
    var deltaTime = (float)time.Elapsed.TotalSeconds;

    if (cube1 != null)
    {
         // Move the cube along the negative X-axis with frame-independent motion
        cube1.Transform.Position -= new Vector3(movementSpeed * deltaTime, 0, 0);
    }
}

```

- `movementSpeed` determines how fast the cube moves.
- `cube1` is an `Entity` object representing the cube in the scene.
- `AddGroundGizmo()` adds a visual representation of the ground plane and axis directions.
- `CreateMaterial()` allows you to color the cube (and even the capsule if you want 😉).
- `Update()` is a callback method that is called every frame to update the game state.

Run the application. 🏃 You should see a box (cube) moving along the X-axis, without interacting with other entities.

## Step 12: Add Motion with Physics - Move the Cube with Colliders! 🧊

Now that we've moved the cube without colliders, let's dive into the more realistic option: moving the cube using physics. With this approach, the cube will interact with the environment, responding to forces like gravity and colliding with other entities.

Update the code to include physics-based movement:


```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.CommunityToolkit.Skyboxes;
using Stride.Core.Mathematics;
using Stride.Engine;
using Stride.Games;
using Stride.Physics; // This was added

float movementSpeed = 1f;
float force = 3f; // This was added
Entity? cube1 = null;
Entity? cube2 = null; // This was added

// Create an instance of the game
using var game = new Game();

// Start the game loop and provide the Start and Update methods as callbacks
game.Run(start: Start, update: Update); // This was updated

// Define the Start method to set up the scene
void Start(Scene rootScene)
{
    // Add the default graphics compositor to handle rendering
    game.AddGraphicsCompositor();

    // Add a 3D camera and a controller for basic camera movement
    game.Add3DCamera().Add3DCameraController();

    // Add a directional light to illuminate the scene
    game.AddDirectionalLight();

    // Add a 3D ground plane to catch the capsule
    game.Add3DGround();

    // Add a performance profiler to monitor FPS and other metrics
    game.AddProfiler();

    // Add a skybox to enhance the scene's visuals
    game.AddSkybox();

    // Add a ground gizmo to visualize axis directions
    game.AddGroundGizmo(position: new Vector3(-5, 0.1f, -5), showAxisName: true);

    // Create a 3D primitive capsule and store it in an entity
    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);

    // Reposition the capsule 8 units above the origin in the scene
    entity.Transform.Position = new Vector3(0, 8, 0);

    // Add the entity to the root scene so it becomes part of the scene graph
    entity.Scene = rootScene;

    // Create a cube without a collider and add it to the scene (non-physical movement)
    cube1 = game.Create3DPrimitive(PrimitiveModelType.Cube, new()
    {
        Material = game.CreateMaterial(Color.Gold),
        IncludeCollider = false // No collider for simple movement
    });
    cube1.Scene = rootScene;

    // This was added
    // Create a second cube with a collider for physics-based interaction
    cube2 = game.Create3DPrimitive(PrimitiveModelType.Cube, new()
    {
        Material = game.CreateMaterial(Color.Orange)
    });
    cube2.Transform.Position = new Vector3(-3, 5, 0);  // Reposition the cube above the groun
    cube2.Scene = rootScene;
}

// Define the Update method, called every frame to update the game state
void Update(Scene scene, GameTime time)
{
    // Calculate the time elapsed since the last frame for consistent movement
    var deltaTime = (float)time.Elapsed.TotalSeconds;

    if (cube1 != null)
    {
        // Move the first cube along the negative X-axis (non-physical movement)
        cube1.Transform.Position -= new Vector3(movementSpeed * deltaTime, 0, 0);
    }

    // This was added
    // Handle physics-based movement for cube2
    if (cube2 != null)
    {
        // Retrieve the RigidbodyComponent, which handles physics interactions
        var rigidBody = cube2.Get<RigidbodyComponent>();

        // Check if cube2 is stationary by verifying if its linear velocity is effectively zero.
        if (Math.Round(rigidBody.LinearVelocity.Length()) == 0)
        {
            // Apply an impulse to cube2 along the X-axis, initiating movement.
            rigidBody.ApplyImpulse(new Vector3(force, 0, 0));

            // Reverse the direction of the impulse for the next impulse,
            // allowing cube2 to move back and forth along the X-axis.
            force *= -1;
        }
    }
}

```

Key Concepts:

- `RigidbodyComponent`: This component handles physics interactions, allowing the entity to respond to forces, gravity, and collisions.
- `ApplyImpulse()`: This method applies a force to the entity, causing it to move in the direction of the applied force. In this case, we’re applying an impulse to the cube, making it move along the X-axis.
- `LinearVelocity`: This property represents the velocity of the cube. We check if the velocity is near zero (indicating the cube is stationary) before applying the impulse.

Run the application. 🏃‍♂️ You should now see two cubes in the scene:

- **Cube 1** moves along the X-axis using non-physical movement, just like in the previous step.
- **Cube 2** interacts with the environment using physics, responding to forces and collisions.

This step introduces a new level of realism by making the cube react to physical forces, adding depth and complexity to your game. 🎮

The main difference between the two cubes is that **Cube 1** moves without interacting with the environment. We directly modify the entity's `Transform.Position` to move it, resulting in simple, non-physical movement. In contrast, **Cube 2** responds to physics, collisions, and forces. Instead of manually changing its position, we control its movement through the `RigidbodyComponent`, which handles all the physics-based interactions, including gravity, impulses, and collisions with other objects in the scene. This makes Cube 2's movement more realistic and reactive to its surroundings.

## Step 13: Add Keyboard Interaction - Move the Cube! ⌨️

We will use the `Update` method to move the box around using the keyboard. Update the `Update` method to look like this, also make sure that `Stride.Input;` namespace was added:


```csharp
using Stride.CommunityToolkit.Engine;
using Stride.CommunityToolkit.Rendering.ProceduralModels;
using Stride.CommunityToolkit.Skyboxes;
using Stride.Core.Mathematics;
using Stride.Engine;
using Stride.Games;
using Stride.Input;
using Stride.Physics;

float movementSpeed = 5f;
Entity? box1 = null;
Entity? box2 = null;
RigidbodyComponent? rigidBody = null;

using var game = new Game();

game.Run(start: Start, update: Update);

void Start(Scene rootScene)
{
    game.AddGraphicsCompositor();
    game.Add3DCamera().Add3DCameraController();
    game.AddDirectionalLight();
    game.Add3DGround();
    game.AddProfiler();
    game.AddSkybox();

    game.AddGroundGizmo(position: new Vector3(-5, 0.1f, -5), showAxisName: true);

    var entity = game.Create3DPrimitive(PrimitiveModelType.Capsule);
    entity.Transform.Position = new Vector3(0, 8, 0);
    entity.Scene = rootScene;

    // Note that we are disabling the collider for the box and
    // adding a material to it so that we can change the color of the box
    // The box is hanging in the air, so it won't collide with the ground
    box1 = game.Create3DPrimitive(PrimitiveModelType.Cube, new()
    {
        Material = game.CreateMaterial(Color.Gold),
        IncludeCollider = false
    });
    box1.Transform.Position = new Vector3(0, 0, 0);
    box1.Scene = rootScene;

    // This was added
    box2 = game.Create3DPrimitive(PrimitiveModelType.Cube, new()
    {
        Material = game.CreateMaterial(Color.DarkKhaki),
        IncludeCollider = false
    });
    box2.Transform.Position = new Vector3(0, 1, 0);
    box2.Scene = rootScene;

    rigidBody = box1.Get<RigidbodyComponent>();
}

void Update(Scene scene, GameTime time)
{
    if (box1 != null)
    {
        var deltaTime = (float)time.Elapsed.TotalSeconds;

        box1.Transform.Position -= new Vector3(movementSpeed * deltaTime, 0, 0);
    }

    // This was added
    if (box2 != null)
    {
        var deltaMovement = movementSpeed * (float)time.Elapsed.TotalSeconds;

        if (game.Input.IsKeyDown(Keys.Z))
        {
            box2.Transform.Position += new Vector3(-deltaMovement, 0, 0);
        }
        else if (game.Input.IsKeyDown(Keys.X))
        {
            box2.Transform.Position += new Vector3(deltaMovement, 0, 0);
        }
    }
}
```

- `game.Input.IsKeyDown()` checks if a key is pressed. It takes a `Keys` enum value as a parameter.

Run the application. You should see the box moving in the X direction only, left and right when you press the Z and X keys, respectively. Note that the capsule is not colliding with the box because we disabled the collider for the box.

## Step 14: Add Mouse Interaction - Catch the Capsule! 🖱️

```csharp
```

## Step 15: Add Output - Console or Screen! 📺

```csharp
```

## Step 16: Break 2 - Let's Reflect 😅

```csharp
```

## Step 17: Add More Primitives - Let's go crazy! 🤪

```csharp
```


