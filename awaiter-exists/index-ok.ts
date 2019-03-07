import * as pulumi from "@pulumi/pulumi";
import * as dynamic from "@pulumi/pulumi/dynamic";

class ServiceStateProvider implements dynamic.ResourceProvider {
  public static instance = new ServiceStateProvider()

  public readonly create: (props: any) => Promise<dynamic.CreateResult>

  constructor() {
    this.create = async (props: any) => {
      const { default: axios } = await import ("axios")
      const response = await axios.get("https://postman-echo.com/get?foo1=bar1&foo2=bar2")
      return {
        id: "0",
        outs: { response: response.data },
      }
    }
  }
}

class ServiceStateResource extends dynamic.Resource {
  public readonly response: pulumi.Output<any>

  constructor(name: string, args: any, opts?: pulumi.ResourceOptions) {
    super(ServiceStateProvider.instance, name, {...args, response: undefined }, opts);
  }
}

// pulumi.runtime.serializeFunction(() => ServiceStateProvider.instance).then(a => console.log(a.text))

const test = new ServiceStateResource("test", {}) 

// +   └─ pulumi-nodejs:dynamic:Resource  test                               created