# Using GitHub with SSH on Cloud9
Run the following commands in a shell in your Cloud9 IDE.

Generate your own SSH key:

`ssh-keygen -t rsa`

On GitHub open the settings for your personal account, not the repository. You'll find these by clicking on your face and selecting Settings.

Select SSH and GPG keys.

Create a new SSH key and paste in the output of this command:

`cat ~/.ssh/id_rsa.pub`

Set up your SSH agent:

````
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
````

You can now clone and use repositories using SSH.

`git clone git@github.com:Hampshire-Scouts-Rifle-Club/NationalsWebEntry.git`

If you have already cloned using HTTPS you can switch the repository to SSH.

`git remote set-url origin git@github.com:Hampshire-Scouts-Rifle-Club/NationalsWebEntry.git`

By default all commits will be listed by "EC2 Default User". Change this to your own name with these commands:

````
git config --global user.name "Your Name"
git config --global user.email "name@example.com"
````
