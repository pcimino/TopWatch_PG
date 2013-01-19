
TopWatch_PG
===========

TopWatch setup for a PhoneGap project

# [Enyo Tutorial Part III](http://pcimino.blog.com/enyo/)

The goal of Part III is to have something like the bootplate environment, something that can help manage a single code base, but use it to build and deploy to multiple platforms. Unfortunately, each platform has a different configuration and setup. After multiple failures I decided to include TopWatch as a submodule and write build scripts for each platform.  
  
# Setting up the repository
Using the  dupliforking process from Part I:  
1. Create your project on Github, in this case TopWatch_PG  
2. Clone the [PhoneGap Hello World](https://github.com/phonegap/phonegap-start) starter project  
&nbsp;&nbsp;`git clone git://github.com/phonegap/phonegap.git TopWatch_PG`  
3. Point the local copy of TopWatch_PG to the Git repository  
&nbsp;&nbsp;`  > git remote set-url origin git@github.com:your_username/TopWatch_PG.git`  
&nbsp;&nbsp;`  > git pull`  
&nbsp;&nbsp;`  > git push`  
4. Bring in TopWatch as a submodule  
&nbsp;&nbsp;`  > git submodule add https://github.com/pcimino/TopWatch.git codebase`  
&nbsp;&nbsp;`  > git submodule update --init --recursive`  
5. Create a tools directory for the build scripts. The idea is to have a single place for the project common code, and copy them to the Hello World application structure as needed, then followthe PhoneGap tutorial to deploy.  

# Setup Scripts
In the /tools directory there are scripts for setting up each project (dos batch and bash shell scripts). 
## webOS
TopWatch was originally setup for webOS, so these scripts are trivial. The basic idea of the setup scripts is remove the 'Hello World' files for the target platform and copy in the appropriate files form /codebase.  

Here's the webOS version:  
setup_webos.bat
    @ECHO OFF
    :: Assumes Base directory is the project root, and current directory
    set BASE=%CD%
    set TARGET=lib\webos\framework

    :: Remove the framework directory
    rmdir /S /Q %BASE%\%TARGET%
    :: Create a new framework directory
    mkdir %BASE%\%TARGET%
    ::Copy the code into the framework directory
    xcopy /S /Q /R /Y %BASE%\codebase\* %BASE%\%TARGET%\.

The other platfroms won't be this easy, but the same idea applies. Only thing I haven't figured out yet is how to treat platform specific configuration files. I had hoped PhoneGap would have a single configuration file and generate the platform specifc files, but that doesn't seem to be the case.

## Split the configurations
I was trying too hard to have a single codebase. But what I realized is the core Enyo code can exist in a single place and then each platorm has unique files in a configuration directory.  
  
so now in the base project, I created  
&nbsp;&nbsp;`/config`  
&nbsp;&nbsp;&nbsp;&nbsp;`/webos`  
&nbsp;&nbsp;&nbsp;&nbsp;`/android`  
&nbsp;&nbsp;&nbsp;&nbsp;`/ios`  
&nbsp;&nbsp;&nbsp;&nbsp;`...`  
  
In in webos I put the appinfo.json file which is only needed for webos, and then modify the scripts thusly:  
&nbsp;&nbsp;&nbsp;&nbsp;`xcopy /S /Q /R /Y %BASE%\config\webos\* %BASE%\%TARGET%\.`  
Ensuring the contents of the config contain the same tree structure required in each project.  

# Lessons Learned

I got some of it right. However I finally realized that I attacked this problem backwards. I wanted to create a common codebase to feed PhoneGap, but started with webOS bootplate feeding the whole process. Taking a step back, I want to revise my steps for the next project.

## Start with [Nodejs](http://nodejs.org/)

Enyo will run in Nodejs, and using this along with Chrome, Safari, Firefox or other HTML5 browsers. Using this combination speeds development by avoiding packaging and deployment to a device or emulator.  
  
## Bootplate
Bootplate is a good foundation; I might modify a copy of the bootplate project so that the minified output gets built directly in a Nodejs /html directory.  

## Separate Configurations
Breaking up the platform dependent files is a chore, but at some level it has to be done anyway. Long-term it's probably best to have the specific files seperate from the platform projects so you know where all your files are (as opposed to the generic PhoneGap files).  
  
I will also probably go a step further and move the icons from the resource directories  
&nbsp;&nbsp;&nbsp;&nbsp;`/codebase/res/icon/{platform}`  
&nbsp;&nbsp;&nbsp;&nbsp;`/codebase/res/screen/{platform}`  
and break them into the platfom specific directories.




  

  
