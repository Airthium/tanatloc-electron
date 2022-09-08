# Tanatloc electron

Electron builder from [Tanatloc](https://github.com/Airthium/tanatloc)

## Requirements

- [Docker](https://www.docker.com/)
  Follow the Docker installation instruction at https://docs.docker.com/get-docker/

- [postgres docker](https://hub.docker.com/_/postgres)
  Pull the latest postgres docker

  ```shell
  docker pull postgres
  ```

- [tanatloc/worker docker](https://hub.docker.com/repository/docker/tanatloc/worker/tags)
  Pull the latest tanatloc/worker docker
  ```shell
  docker pull tanatloc/worker
  ```

## App

Get the latest app for Linux, MacOS or Windows in the [release](https://github.com/Airthium/tanatloc-electron/releases/latest) and start it.

<ins>Note:</ins> On Linux, you must allow execution of the AppImage file using

```shell
chmod +x ./Tanatloc-x.x.x.AppImage
```
