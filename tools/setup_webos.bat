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

:: Remove Git related files
::rmdir /S /Q %BASE%\%TARGET%\.git 
del /F /Q %BASE%\%TARGET%\.git*

