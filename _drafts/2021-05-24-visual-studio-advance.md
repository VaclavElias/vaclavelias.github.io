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
Depends on your circumstances and your team workflow, you might find different (sometimes confusing) folder structure patterns. 

Projects can be in different physical locations on your drive and your solution is referencing them wherever the projets are. You can have also multiple solutions **.sln* if you need to reference/view projects in different ways. Many projects will be grouped together is their parent folder.

Your solution projects might be independent from each other or some of them might have depencies. The circular dependencies are not allowed and it is an anti-pattern.

Note: Visual Studio 2022+ supports managing multiple repositories from one solution.

ToDo: Explain projects physical location and relationship in between projects and good practises + project dependencies hierarchy

There are many ways how to organise your solution. If you work in the team the consistency is important.

See some basic folder structure examples:

**Example 1 - Projects in one repository - Mono-repo**

This example is showing independant projects with no dependencies, which are grouped together in the *api-bureau.sln* solution. The intention might be to extract a common library which will be used by all projects. 
```
/api-bureau
/api-bureau/api-bureau.sln
/api-bureau/.gitignore

/api-bureau/src/ApiBureau.CloudCall.Api
/api-bureau/src/ApiBureau.Confluence.Api
/api-bureau/src/ApiBureau.SharePoint.Api

/api-bureau/test/ApiBureau.CloudCall.Api.UnitTests
/api-bureau/test/ApiBureau.Confluence.Api.UnitTests
/api-bureau/test/ApiBureau.SharePoint.Api.UnitTests

```

**Example 2 - Projects in multipe repositories**

This example is showing projects, which are grouped together in the *ApiBureau.AllApis.sln* solution. The only dependency is that *all-apis* project is depending on all other APIs.

```
/api-bureau
/api-bureau/all-apis/.gitignore
/api-bureau/all-apis/ApiBureau.AllApis.sln
/api-bureau/all-api/src/ApiBureau.AllApis.Console

/api-bureau/cloudcall-api/.gitignore
/api-bureau/cloudcall-api/ApiBureau.CloudCall.sln
/api-bureau/cloudcall-api/src/ApiBureau.CloudCall.Api
/api-bureau/cloudcall-api/test/ApiBureau.CloudCall.Api.UnitTests

/api-bureau/confluence-api/.gitignore
/api-bureau/confluence-api/ApiBureau.Confluence.sln
/api-bureau/confluence-api/src/ApiBureau.Confluence.Api
/api-bureau/confluence-api/test/ApiBureau.Confluence.Api.UnitTests

/api-bureau/sharepoint-api/.gitignore
/api-bureau/sharepoint-api/ApiBureau.SharePoint.sln
/api-bureau/sharepoint-api/src/ApiBureau.SharePoint.Api
/api-bureau/sharepoint-api/test/ApiBureau.SharePoint.Api.UnitTests

```

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