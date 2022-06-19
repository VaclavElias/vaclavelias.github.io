---
layout: post
title:  "Configuration Experiment in ASP.NET Core – RemoteJsonFile"
---
This is an experiment project to access appsettings.json from Azure Blob through https. I will use simply public access to this file considering no user secrets are included in this file. You would need to add additional options to secure your link if any user secrets are transmitted.

Example url: https://your-storage.blob.core.windows.net/your-blob/appsettings.json

```csharp
public class EFConfigurationValue
{
    public string Id { get; set; }
    public string Value { get; set; }
}
```