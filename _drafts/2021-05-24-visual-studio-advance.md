---
layout: post
title:  "Visual Studio Advance"
description: "11 Must Things to Know for Visual Studio Beginners"
categories: dotnet
tags: C# Visual-Studio Advance
image: /assets/img/visual-studio.png
---

This post should help you to familiarise quickly with the key and essential **Visual Studio** (VS) functionality. The VS Integrated Development Environment (IDE) might look overwhelming in the beginning but there is no need to know everything. More you work with VS you will start discovering what you need and you will eventually understand the complexity of VS.  

Initial notes: 

- You should already be familiar with any coding/development IDE
- This is not a tutorial, this is a quick reference on what is the most important or helpful to know when you start working with Visual Studio. Do check any available material to familiarise and learn if you don't understand this guide 
- If you don't know certain terms just google them
- [Visual Studio Intro]({% link _posts/2021-04-03-visual-studio-intro.md %})

## Content

- [1. Solution vs Project](#1-solution-vs-project)
- [2. Solution Explorer](#2-solution-explorer)
- [3. Sharing your Code](#2-solution-explorer)
- [4. Default Configuration - AppSettings.cs / appsettings.json](#4-windows-management)
- [5. Manage User Secrets](#5-f12-is-your-friend---go-to-definition)
- [6. editorconfig](#6-ctrlt-and-ctrlq---search-everywhere)
- [Q&A](#qa)

## 1. Solution vs Project
ToDo: Explain projects physical location and relationship in between projects and good practises + project dependencies hierarchy

## 2. Solution Explorer
ToDo: Explain hidden files, (un)pin Solution Explorer

## 3. Sharing your Code

## 4. Default Configuration - AppSettings.cs / appsettings.json

## 5. Manage User Secrets


## 6. editorconfig
- CTRL+Q - Search everywhere in the code, including menu items
- CTRL+T - Search everywhere in the code

## Q&A
### Q: How to create a new project within the solution?


### Q: How to change the .NET version?

ToDo VIE:  Mention multiple framework targeting. Double click on the project file to open the project as xml and edit

A1: Double click on the project file to open the project as XML and edit ```<TargetFramework>net5.0</TargetFramework>``` tag.

A2: Solution Explorer → Right Click on the Project → Click Properties → Click Application → Change Target Framework