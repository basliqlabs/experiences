---
title: "Maybe We Should Start Using `npm ci` Instead of `npm i`"
description: "Why packages are missing sometimes? We will take a look at package-lock.json and try to find an answer."
slug: "use-npm-ci-instead-of-npm-i"
publishDate: "21 Mar 2024"
tags: ["atareversei", "javascript", "node"]
author: "atareversei"
---

## So What Is the Difference and Why Should I Care?

Recently I was working on a project on my PC and I decided to continue the work on my laptop. They both run Windows 10 and have the same version of NodeJS and NPM. As I tried to run the project after letting `npm i` install the dependencies, I received an error saying some packages could not be found.

I tried many different techniques that I found on the internet but only one seemed to work: `npm ci`. `ci` stands for **Clean Install**, and unlike `npm i`, it installs the packages based on the versions that are defined in `package-lock.json`. As I was investigating this trickery, I found out that this command is used in creating production builds to ensure that the versions are exactly the same as the development environment.

I think using `npm ci` to initially install the packages of the project is better than `npm i`, but I have to preform further researches.
