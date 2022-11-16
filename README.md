# Portfolio Website 2.0

This is my portfolio website, [jameslittle.org](https://jameslittle.org), simplified. I decided to scale down my website significatly.


# Libraries
This website uses:

* [Bootstrap](https://getbootstrap.com/) v5.2.2
* [JQuery](https://jquery.com/) v3.2.1
* [Font Awesome](https://fontawesome.com/) v6.2.0

# Post-Receive Hook

This project uses a Post-Receive Hook, to update the website automatically.

## Prerequisites
In order to use git to automatically update website, the following prerequisites are required:
1. Git is installed on both the webserver, and the development machine
2. Passwordless SSH access to the webserver, using pre-shared keys.

## Setup
To setup the post-receive hook, follow the steps listed below:

1. On the webserver, change directories to where the web files are being served, example:
```
cd /var/www/
```

2. Create a bare repository in the directory where the web files are being served, and execute the following

```
git init --bare --shared jameslittle.org.git
```

3. Setup the following environment variables, most people use the bash profile for this, typcially located at `~/.bash_profile`, with the following:

```
# The directory where the bare repository is located
export JL_WORK_TREE="/var/www/jameslittle.org.git" 

# The branch to use to execute the post-receive hook
export JL_BRANCH="release"
```

*Note: If the file does not exist, it can be created by executing `touch ~/.bash_profile`.*

4. On the development machine, in this repository, add a remote repository pointing to the webserver, by executing the following:
```
git remote add live ssh://<server-address>/<git-repo-path>.git
```
* server-address: This is the address to access the webserver, i.e. `jameslittle.org`
* git-repo-path: This is the path to located this repository on the webserver (*not the bare repository we created, but the local copy of this repository on the webserver*).
