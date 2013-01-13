
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
  > git pull
  > git push
4. Bring in TopWatch as a submodule
  > git submodule add https://github.com/pcimino/TopWatch.git codeBase
  > git submodule update --init --recursive
5. Create a tools directory for the build scripts. The idea is to have a single place for the project common code, and copy them to the Hello World application structure as needed, then followthe PhoneGap tutorial to deploy.

# Setup Scripts
In the /tools directory there are scripts for setting up each project (dos batch and bash shell scripts). 
## webOS
TopWatch was originally setup for webOS, so these scripts are trivial. The basic idea of the setup scripts is remove the 'Hello World' files for the target platform and copy in the appropriate files form /codeBase.  

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
    xcopy /S /Q /R /Y %BASE%\codeBase\* %BASE%\%TARGET%\.

The other platfroms won't be this easy, but the same idea applies. Onr thing I haven't figured out yet is how to treat platform specific configuration files. I had hoped PhoneGap would have a single configuration file and generate the platform specifc files, but that doesn't seem to be the case.


  