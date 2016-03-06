---
title: BSides St. John's, 2012
category: me
tags: [conferences, security]
---
Today I attended the [BSides](http://www.securitybsides.com/w/page/51753351/BSidesStJohns2012) 
security conference in St. John's, Newfoundland. Although it's not particularly
an area of interest or an area pertinent to my current position, there were
some interesting talks.

If you're interested in summaries of the talks, click "Read More".
Morning Talks
=============

### The Basics & Other Things We're Probably Doing Wrong ####################

__Mark Nunnikhoven__ talks about three things he believes we should be using
more (in ops):

1. __Automation__ is key.

    * Stop doing repetitive tasks, because that's what computers were designed for!

2. __Document__ everything.

	* Comments help keep you on track and simplifies the ramp-up process
	* Use plain text documents instead of word, because it's more likely to be read.
	  Need something more readable? Use something like markdown, which is
	  human-readable, but with more semantics.

3. Don't focus on _awareness_, __educate__.

    * Engage __users__ and integrate them into the flow.

### Anatomy of an Apache vulnerability report, and Secure Release Management ###

__Jamie Goodyear__ introduces us to the process of submitting a vulnerability
report to Apache whenever some exploit/vulnerability exists in an Apache
project. Roughly, this process goes like the following:

1. Report the vulnerability
2. Investigation into whether or not the problem is pertinent to the project
3. Common Vulnerabilities and Exposure (CVE) number requested (internally)
4. The project team discusses and agrees on a fix
5. Release
6. Announcement for the fix, with full disclosure of the vulnerability

This is followed with a section on secure release management. Apache focuses on
two technologies:

1. MD5 hashes for all artifacts released
2. PGP signatures to verify the release came from a trusted source

### Key Considerations in Securing Internet Access ##########################

__Russ Doucet__ talks about webfiltering and making the right web use policy in
your company:

* A typical webfilter may
	* Monitor/log/report everything
	* Blocking by categories and sub-categories
	* Block unknown sites
* One should have
	* Policy, to ensure consequences are clear. The policy _needs_ to be clear.
	* Webfiltering, so that action is being taken.
	* Monitoring, e.g., for referencing of multiple offences.

### Command & Control And Data Exfiltration 2.9 #############################

__Karim Nathoo__ introduces us to interesting of dealing with __C2 (command and
control)__, a malicious piece of code or software that facilitates controlling
and/or ex-filtrating data on a system, and __Exfiltration__, the process of
extracting data from a secure system. He shows several examples using file
sharing services (e.g., Box.net, DropBox) and DNS tunneling.


Afternoon Talks
===============

### How NOT To Do Security: Lessons Learned From the Galactic Empire ########

__Kellman Meghu__ takes us on a whimsical journey into data loss incidents,
using a "Star Wars" perspective on how to do security. The moral was simple:
the most basic security policies are often the ones that mitigate issues.

### Have Credentials. Will Travel... Literally. #############################

__Darryl MacLeod__ gave his opinion on becoming a Certified Information Systems
Security Professional (CISSP), and what he felt it has done for him. To sum up
his opinion: "it's worth it."

### Today's Threat Landscape -- Facts, Figures, Myths and Perceptions #######

Symantec representative __Stefano Tiranardi__ talks about the internet security
threat report from 2011. Four trends were discovered:

1. Malware attacks up 81%
2. Targeted attacks expand
3. Mobile threats expose all
4. Data breaches on rise

### Services defense in depth: an emerging paradigm for protecting the Data Center ###

__Bruno Germain__ focused on how he believes it's time for security to consider
a different model for defending one's systems. He introduced a service-centric
approach to security. 

