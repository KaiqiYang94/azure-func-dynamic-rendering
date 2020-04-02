$dockerid = "<your id>"
docker build --tag $dockerid/azurefunctionsimage:dev .
docker run -p 8080:80 -it $dockerid/azurefunctionsimage:dev