---           
layout: post
title: Jekyll and GitHub
category: dev
tags: [web, jekyll]
---
So when I created my personal site with Jekyll, I was using the latest version.  Everything looked a-o-k on my own end, but as soon as I pushed everything to GitHub, I found one issue.

<!-- more -->
I was using the `{% raw %}{% assign %}{% endraw %}` tag to grab the year of a
post, or even the year of generation of the site. For example,
`{% raw %}{% assign current_year = site.time | date:"%Y" %}{% endraw %}`. Now,
GitHub's version of Jekyll doesn't seem to like filters in the assign tag, so
the simple workaround is to use a `{% raw %}{% capture %}{% endraw %}` tag.

{% highlight java %}{% raw %}
{% capture current_year %}{{ site.time | date:"%Y" }}{% endcapture %}
{% endraw %}{% endhighlight %}

And voila, we have a filter applied to some value, and then storing it into a
variable for reuse. Simple, I know. Nevertheless, I thought I'd share this
simple workaround to the world.
