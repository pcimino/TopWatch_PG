
TopWatch_PG
===========

TopWatch setup for a PhoneGap project

# [Enyo Tutorial Part III](http://pcimino.blog.com/enyo/)

The goal of Part III is to have something like the bootplate environment, something that can help manage a single code base, but use it to build and deploy to multiple platforms. Unfortunately, each platform has a different configuration and setup. After multiple failures I decided to include TopWatch as a submodule and write build scripts for each platform.  
  
# Setting up the repository
Using the  dupliforking process from Part I:  
1. Create your project on Github, in this case TopWatch_PG
2. Cloner the [PhoneGap Hello World](https://github.com/phonegap/phonegap-start) starter project  
  > git clone git://github.com/phonegap/phonegap.git TopWatch_PG
3. Point the local copy of TopWatch_PG to the Git repository
  > git remote set-url origin git@github.com:your_username/TopWatch_PG.git
  > git push
4. Brint in TopWatch as a submodule
  > git submodule add https://github.com/pcimino/TopWatch.git codeBase
  > git submodule update --recursive
5. Create a tools directory for the build scripts. The idea is to have a single place for the project common code, and copy them to the Hello World application structure as needed, then followthe PhoneGap tutorial to deploy.


  
Now we tie it all together. This project includes the PhoneGap framework with the TopWatch code. Here'e the steps to follow for your own project.  
  
Originally, I wanted to use the dupliforking technique we started with in Part I. One issue I ran into, is the git index in the PhoneGap project thinks there are already submodules, so possibly the project started oput that way, they cleaned them up but didn't clean the cache. I tried various commands to remove the cache, and the git index is a binary, so I was a bit stuck. The unfortunate and ultimate option was to purge the PhoneGap history and start fresh with a copy (instead of a clone).


Using the copy technique:  
1. Clone TopWatch_PG
  > git clone git://github.com/pcimino/TopWatch_PG.git
2. Clone the PhoneGap framework  
  > git clone git://github.com/phonegap/phonegap.git 
3. Copy ONLY the /lib directory to the /TopWatch_PG directory

Next, we need to delete the 'Hello World' example code and replace it with TopWatch. The code exists as copies in each platform. Ideally there should be a direcory which we can replace with TopWatch. We don't want to copy TopWatch and have 8+ copies all over the place, we want to include TopWatch as a submodule. Let's start with webOS, since that's pretty simple.

1. Remove the /framework directory from the /lib/webos directory
2. Add TopWatch as a submodule, replacing the /framework directory  
  > git submodule add https://github.com/pcimino/TopWatch.git lib/webos/framework
3. Keeping in mind TopWatch has submodules of its own, we need to run a recursive update  
  > git submodule foreach --recursive


git remote set-url origin git@github.com:your_username/TopWatch_PG.git


  git remote set-url origin git@github.com:your_username/TopWatch_PG.git  
  
  git remote set-url origin git@github.com:pcimino/TopWatch_PG.git
  
  
4. Load the TopWatch app as a submodule for each platform. Remember, TopWatch is based on the [PhoneGap Hello World](https://github.com/phonegap/phonegap-start) app

Next we want to include TopWatch source into as many of the source folders as possible. So for each project, we'll replace the code with TopWatch, as a submodule. Then when and update comes through we just need to update the the whole project instead of modifying each source copy.  
  
Unfortunately, it isn't as easy as I'd like (nothing ever is) each platform has a different project structure. Let's start with webOS, since that should be the easiest.  

Git uses [submodules](http://chrisjean.com/2009/04/20/git-submodules-adding-using-removing-and-updating/) to include remote projects within your project. 
1. Clone TopWatch_PG, which is, at this point, an empty project
1. Purge the framework code 
  > git rm –cached /lib/webos/framework
2. Import TopWatch as a submodule  
  > git submodule add https://github.com/pcimino/TopWatch.git lib/webos/framework

