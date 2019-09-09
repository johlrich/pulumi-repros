import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup("resourceGroup");

// Create an Azure resource (Storage Account)
const account = new azure.storage.Account("storage", {
    // The location for the storage account will be derived automatically from the resource group.
    resourceGroupName: resourceGroup.name,
    accountTier: "Standard",
    accountReplicationType: "LRS",
});

const table = new azure.storage.Table("table", {
    storageAccountName: account.name,
})

const container = new azure.storage.Container("container", {
    storageAccountName: account.name,
})

const queue = new azure.storage.Queue("queue", {
    storageAccountName: account.name,
})


// Error output, note the url has the resource group and not the storage account.

// johlrich/storage-table/repro (pulumi:pulumi:Stack)
// error: update failed

// table (azure:storage:Table)
// error: Plan apply failed: Error checking for existence of existing Storage Table "table3a4db274" (Account "storageca2999c2" / Resource Group "resourcegroupa22eacc9"): tables.Client#Exists: Failure sending request: StatusCode=0 -- Original Error: Get https://resourcegroupa22eacc9.table.core.windows.net/Tables('table3a4db274'): dial tcp: lookup resourcegroupa22eacc9.table.core.windows.net: no such host