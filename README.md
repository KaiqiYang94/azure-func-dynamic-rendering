# Azure Function for Dynamic Rendering
[![Pulls from Docker Hub](https://img.shields.io/docker/pulls/kaiqiy/azurefunctionsimage.svg)](https://hub.docker.com/r/kaiqiy/azurefunctionsimage) [![Stars on Docker Hub](https://img.shields.io/docker/stars/kaiqiy/azurefunctionsimage.svg)](https://hub.docker.com/r/kaiqiy/azurefunctionsimage)

Azure function running in a docker container which dynamically renders a page of your choice to html. For testing dynamic rendering.

This example runs a headless Chrome in a node environment. Credits to [estruyf](https://github.com/estruyf/azure-function-node-puppeteer) for the docker image.


## Development

After editing, build the container tagging with dev:
`$dockerid` is the id you are using for login into docker;

To run it local:
Modify the `authLevel` in the `function.json` file to the following:

```diff
{
    "bindings": [
      {
-       "authLevel": "function",
+       "authLevel": "anonymous",
        "type": "httpTrigger",
        "direction": "in",
        "name": "req",
```

```powershell
$dockerid = <yourid>
docker build --tag $dockerid/azurefunctionsimage:dev .
docker run -p 8080:80 -it $dockerid/azurefunctionsimage:dev
```

## Deployment

```bash
$dockerid="<your id>"
$version="<version number>"

docker build --tag $dockerid/azurefunctionsimage:latest  --tag $dockerid/azurefunctionsimage:v$version .

docker push $dockerid/azurefunctionsimage:latest

docker push $dockerid/azurefunctionsimage:v$version
```
## Deployment

You can also set up Webhook in docker pointing to the AzureFunction which enables a smooth CI/CD process. Every time an image with at specific tag is pushed, the function will be deployed again.  

More info: [Create a function on Linux using a custom container](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=portal%2Cbash&pivots=programming-language-typescript#push-the-image-to-docker-hub)
