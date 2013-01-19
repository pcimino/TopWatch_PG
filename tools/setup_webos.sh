#!/bin/bash

# Assumes Base directory is the project root, and current directory
BASE=`pwd`
TARGET_DIR=lib/webos/framework

# Remove the framework directory
rm -f -R $TARGET_DIR

# Create a new framework directory
mkdir $TARGET_DIR

# Copy the code into the framework directory
cp -f -R $BASE/codeBase/* $TARGET_DIR

# Remove Git related files
rm -f -R $TARGET_DIR/.git $TARGET_DIR/.git*

# copy project specific files
cp -f -R $BASE/codeBase/webos/* $TARGET_DIR

