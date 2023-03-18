---
layout: post
title:  What is faster in C#
description: What is faster
categories: dotnet
tags: C# .NET
image: https://www.stride3d.net/images/svg/logo.svg
---


## Iterations Tests

Test .NET 6.0.9

Action|Mean|Note
---|---|---
`for (var i = 0; i < Items.Count; i++)` | 6.348 ns
`foreach (var item in Items)` | 7.759 ns
`Items.ForEach(x => x.ProcessCost());` | 18.441 ns
`Items.AsParallel().ForAll(s => s.ProcessCost());` |  43,849.748 ns | Review, seems wrong
`Parallel.ForEach(Items, s => s.ProcessCost());` | 5,534.093 ns | Review, seems wrong


## Deserialization Tests

Test .NET 6.0.9

Action|Mean|Note
---|---|---
`Content.ReadAsStreamAsync()`|2.519 us | And deserialize
`Content.ReadAsStreamAsync()`|2.661 us | And deserialize async
`Content.ReadAsByteArrayAsync()`|2.703 us | And deserialize
`Content.ReadFromJsonAsync<>()`|3.059 us | Deserialized result
`Content.ReadAsStringAsync()`|3.065 us | And deserialize


