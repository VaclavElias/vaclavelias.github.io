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

## Code-Only

The toolkit allows you to create a game using a code-only approach. This means you can create a game without using the Stride [Game Studio](https://doc.stride3d.net/latest/en/manual/game-studio/index.html). As a C#/.NET developer in my day job, I found this approach very useful for onboarding into the Stride 3D engine and game development without having to dive into the Game Studio.

Some other reasons for using the code-only approach are listed [here](https://stride3d.github.io/stride-community-toolkit/manual/code-only/index.html) in the toolkit documentation.

We will be using a standard .NET Core console application to create a simple game and adding some NuGet packages to get started.

### Prerequisites
