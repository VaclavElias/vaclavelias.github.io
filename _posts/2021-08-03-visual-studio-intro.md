---
layout: post
title:  "Visual Studio Intro"
categories: dotnet
tags: C# Visual-Studio
image: /assets/img/dotnet-bot_scene_juggling-small.png
---

This Intro should help you to familiarise quickly with the key and essential **Visual Studio** (VS) functionality. The VS Integrated Development Environment (IDE) might look overwhelming in the beginning but there is no need to know everything. More you work with VS you will start discovering what you need and you will eventually understand the complexity of VS.  

Initial notes: 

- You should already be familiar with any coding/development IDE
- This is not a tutorial, this is a quick reference on what is the most important or helpful to know when you start working with Visual Studio. Do check any available material to familiarise and learn if you don't understand this guide 
- If you don't know certain terms just google them

## Content

## 1. Solution vs Project
Solution contains 1 or more projects to logically organise your projects together.

## 2. Opening Solution / Project
You can open a project by clicking on a file with extension **.sln** (solution) or **.csproj** (C# project). If you open a project which is part of a solution, the solution might open instead automatically.

## 3. Solution Explorer
Once you open your Solution or Project you want to see your **Solution Explorer** which contains a logical hierarchy of all folders and files which are needed to build your project. You are going to use this window and navigate through it very frequently. Usually you would have your Solution Explorer on the right or on the left always visible.

Note: If you cannot see it go to Menu → View → Click Solution Explorer (first in the menu)

## 4. Windows Management
You might use these options below frequently to arrange your windows. More info about [customising layouts](https://docs.microsoft.com/en-us/visualstudio/ide/customizing-window-layouts-in-visual-studio?view=vs-2022).
- Vertical Document Group - If you need to see different files next to each other
- Image
- Horizontal Document Group - If you need to see different files horizontally
- Split Window - You can split horizontally the edition of a file through Window → Split. This is especially useful when visualizing or editing two locations in a large file
- Image
- New Window - Open an instance of the same file in a separate window, Window → New Window

## 5. F12 is your friend - Go to Definition
The **Go To Definition** feature navigates to the source of a type or member, and opens the result in a new tab.

- Pressing F12 while your text cursor is somewhere inside the symbol name
- Right click mouse on the symbol → Go to Definition
- Or ALT+F12 to peek the identifier definition without opening a new tab

## 6. CTRL+T and CTRL+Q - Search Everywhere
- CTRL+Q - Search everywhere in the code, including menu items
- CTRL+T - Search everywhere in the code

## 7. dotnet command
- It provides commands for working with .NET projects
  - e.g. **dotnet build** builds a project
  - e.g. **dotnet --info** shows detailed information about a .NET installation 
- It runs .NET applications
  - e.g. **dotnet myApplication.exe** or **dotnet myApplication.dll**

## 8. Project story - Viewing csproj in summary
.NET projects are based on the MSBuild format. Project files, which have extensions like **.csproj** for C# project are in XML format. The csproj file includes settings related to targeted .NET Frameworks, project folders, NuGet package references etc.

You can edit in 2 ways

- Solution Explorer → Select your project → Right Click → Select Edit Project File
- Solution Explorer → Double click on the project name