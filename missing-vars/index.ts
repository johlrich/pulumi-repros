import * as pulumi from "@pulumi/pulumi";
import { getAll } from "./utils"

class Provider implements pulumi.dynamic.ResourceProvider {
  public static instance = new Provider();

  public create: (inputs: any) => Promise<pulumi.dynamic.CreateResult>;

  constructor() {
    this.create = async (inputs: any) => {
      const cfg = getAll()
      console.log("result inside provider is: ", cfg)
      return {
        id: "0",
        outs: undefined,
      };
    };
  }
}

class Resource extends pulumi.dynamic.Resource {
  constructor(name: string, provider?: pulumi.ProviderResource) {
    super(Provider.instance, name, {}, { provider: provider });
  }
}

// Create a resource using the default dynamic provider instance.
let a = new Resource("a");
console.log("result outside provider is: ", getAll())


// Diagnostics:
//   pulumi:pulumi:Stack (missing-vars-missingvarsdev):
//     result outside provider is:  { x: 'x', y: 'y' }
//
//     result inside provider is:  { x: 'x', y: undefined }