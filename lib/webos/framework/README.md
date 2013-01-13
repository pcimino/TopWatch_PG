TopWatch
========

Generated code for the TopWatch application, created using the TopWatch_Build repo. This is Part IIa of my [rambling tutorial](http://pcimino.blog.com/enyo/). Not necessarily a step-by-step, and not exactly lessons learned, somewhere in between, like "brunch."

Here, all I did was create a Git repository and update the README, add all the files that were in the [TopWatch_Build](https://github.com/pcimino/TopWatch_Build) \deploy\TopWatch\ directory. This will allow me to use that project as a submodule in Part III, where I start leveraging [PhoneGap](http://phonegap.com/).

The only modification I had to make to the project was to account for the submodules still in the \lib\ directory. The canvas and Shape2D libaries were not minified into the application during the build process, but are referenced by relative path. So I copied the .gitmodules file feom the build project, and modified it so it only contained the entries for canvas and Shape2D.



