# CircleCI config
You need to make sure the following CircleCI environment variables are configured:

  1. `DOCKER_USER` username for Docker hub, see below for how to get this
  1. `DOCKER_PASS` password for Docker hub user
  1. `SSH_USER_SERVER_<branch>` as the SSH connection fragment `user@some.host` used to deploy the service on a VM
    - `SSH_USER_SERVER_master` for production deploys
    - `SSH_USER_SERVER_staging` for staging deploys
  1. `ROLLBAR_ACCESS_TOKEN` for notifying [Rollbar](https://docs.rollbar.com/reference#section-authentication) of a deployment

You also need to [add an SSH key](https://circleci.com/docs/2.0/add-ssh-key/) to the CircleCI account so it can SSH into
our target VM. See below for how to generate the key. leave the hostname blank when creating the SSH key in CircleCI.

# Initial VM setup

The VM that you deploy to should be running Ubuntu and allow SSH access from any host (because we don't where CircleCI
will connect from). When you first set up a VM as a deploy target, do the following:

  1. install `docker` and `docker-compose`
  1. clone this repo to `~/pollin8-web-client`
  1. follow the instructions in the [root README.md](../README.md) for creating the `./start-or-restart.sh` script
  1. generate an SSH keypair for CircleCI to use to SSH to our VM

        # run these commands on the target VM
        cd ~/.ssh/
        # generate the keypair
        ssh-keygen -m pem -f circleci -N ''
        # trust the keypair
        cat circleci.pub >> authorized_keys
        # get the private key
        cat circleci
        # copy that key above into the CircleCI dashboard when you create the SSH key config

  1. configure all the settings in CircleCI as described above

# Docker user credentials

  1. create a new user that you can use just for this task, just sign up to Docker Hub like normal
  1. give this new user read and write access to the Docker Hub repo for this project (it needs to be able to push)
