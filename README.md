# Portfolio 2021

An updated portfolio about all the projects I've done as of 2021.

## If the netlify command does not work:

```
sudo chown -R $(whoami) ~/.npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.profile
```

## Docker

### If error when calling any docker command, run this in another terminal

`sudo dockerd &`

### Create Image

Create the Dockerfile and then run this command

`docker build -t image-name .`

`docker image ls`

#### Create Container

`docker run -d -p 3000:3000 --name portfolio2021 react-image image-name`

`docker ps`
