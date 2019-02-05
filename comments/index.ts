import * as pulumi from "@pulumi/pulumi";

class Provider implements pulumi.dynamic.ResourceProvider {
  public static instance = new Provider();

  public create: (inputs: any) => Promise<pulumi.dynamic.CreateResult>;

  // the below appears to be picked up as code to be walked and serialized
  // pulumi preview will succeed if line is removed
  // public update: (id: pulumi.ID, inputs: any) => Promise<pulumi.dynamic.CreateResult>;

  constructor() {
    this.create = async (inputs: any) => {
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

// when ran with comment above:
// Diagnostics:
//   pulumi:pulumi:Stack (comments-dev):
//     Error: Error serializing '() => provider': index.js(19,37)
//     '() => provider': index.js(19,37): captured
//       variable 'provider' which indirectly referenced
//         function 'Provider': index.ts(16,15): which could not be serialized because
//           the function could not be parsed: '{' expected.
//     Function code:
//       class Provider {
//           // the below appears to be picked up as code to be walked and serialized
//           // pulumi preview will succeed if line is removed
//           // public update: (id: pulumi.ID, inputs: any) => Promise<pulumi.dynamic.CreateResult>;
//           constructor() {
//       ...
//         at C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:454:15
//         at Generator.next (<anonymous>)
//         at C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:20:71
//         at new Promise (<anonymous>)
//         at __awaiter (C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:16:12)
//         at throwSerializationErrorAsync (C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:385:12)
//         at C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:207:27
//         at Generator.next (<anonymous>)
//         at C:\dev\pulumi-repros\comments\node_modules\@pulumi\pulumi\runtime\closure\createClosure.js:20:71
//         at new Promise (<anonymous>)

//     error: Error serializing '() => provider': index.js(19,37)

//     '() => provider': index.js(19,37): captured
//       variable 'provider' which indirectly referenced
//         function 'Provider': index.ts(16,15): which could not be serialized because
//           the function could not be parsed: '{' expected.

//     Function code:
//       class Provider {
//           // the below appears to be picked up as code to be walked and serialized
//           // pulumi preview will succeed if line is removed
//           // public update: (id: pulumi.ID, inputs: any) => Promise<pulumi.dynamic.CreateResult>;
//           constructor() {
//       ...
//     error: an unhandled error occurred: Program exited with non-zero exit code: 1

// error: an error occurred while advancing the preview