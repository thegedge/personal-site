---
layout: post
title: OpenGL Text Rendering With FreeType
category: dev
tags: [c++, graphics, voxels, freetype]
---
The latest post in my voxel dev journal is my work on rendering text using the
[FreeType](//www.freetype.org) library. I was pleasantly surprised at how easy
it was to use the FreeType library to render TrueType fonts (TTF) as bitmaps.

<!-- more -->

You can get some quick and dirty text rendering up and running with just four
functions:

 1. `FT_Init_FreeType`, to initialize the FreeType library;
 2. `FT_New_Face`, to initialize a new face from a TTF file;
 3. `FT_Load_Char`, to load character data from a face; and
 4. `FT_Set_Pixel_Sizes`, to specify pixel dimensions for rendered characters.

You'll probably want to clean up after yourself, so keep `FT_Done_Face` and
`FT_Done_FreeType` in mind. Might I suggest having an RAII wrapper for these
guys to make sure things get cleaned up in all circumstances. Loading a font
from a TTF file is quite simple:

{% highlight c++ linenos=table tabsize=4 %}
FT_Library ft_lib{nullptr};
if(FT_Init_FreeType(&ft_lib) != 0) {
	std::cerr << "Couldn't initialize FreeType library\n";
	return 1;
}

FT_Face face{nullptr};
if(FT_New_Face(ft_lib, "my_font.ttf", 0, &face) != 0) {
	std::cerr << "Couldn't initialize FreeType library\n";
	return 1;
}
{% endhighlight %}

We initialize the FreeType library and then load the face from file. Pretty
simple, eh? Now the slightly harder, but still fairly straightforward part:
rendering the text. Let's step through it in small chunks:

{% highlight c++ linenos=table tabsize=4 %}
void render_text(const std::string &str, FT_Face face, float x, float y, float sx, float sy) {
    glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
	const FT_GlyphSlot g = face->glyph;
{% endhighlight %}

First, this function takes the following parameters, in order:

  1. the string we want to render,
  2. the FreeType face we'll use for rendering,
  3. the x/y coordinates for drawing in normalized device coordinates (NDC), and
  4. sx/sy scaling parameters that convert pixel values to NDC.

The scaling parameters are simply 2 divided by the window's width/height in
pixels. This function assumes you've taken care of binding a 2D texture and
vertex buffer object before calling `render_text`. First we have to set the
unpack alignment to 1 byte, because FreeType renders 8-bit bitmaps. Next we
iterate through the string:

{% highlight c++ linenos=table tabsize=4 %}
	for(auto c : str) {
		if(FT_Load_Char(face, c, FT_LOAD_RENDER))
			continue;

        glTexImage2D(GL_TEXTURE_2D, 0, GL_R8,
		             glyph->bitmap.width, glyph->bitmap.rows,
                     0, GL_RED, GL_UNSIGNED_BYTE, glyph->bitmap.buffer);
{% endhighlight %}

First, we make sure we successfully load the current character. We pass the
`FT_LOAD_RENDER` flag to tell FreeType to render the character to the bitmap.
We then upload the bitmap's buffer to the bound texture. Remember, the bitmap
is only 8 bits per pixel, so we have to use a single byte format. Next we
create a quad to render the texture:

{% highlight c++ linenos=table tabsize=4 %}
		const float vx = x + glyph->bitmap_left * sx;
		const float vy = y + glyph->bitmap_top * sy;
		const float w = glyph->bitmap.width * sx;
		const float h = glyph->bitmap.rows * sy;

		struct {
			float x, y, s, t;
		} data[6] = {
			{vx    , vy    , 0, 0},
			{vx    , vy - h, 0, 1},
			{vx + w, vy    , 1, 0},
			{vx + w, vy    , 1, 0},
			{vx    , vy - h, 0, 1},
			{vx + w, vy - h, 1, 1}
		};
{% endhighlight %}

A fairly straightforward generation of a quad. We just need to remember to
scale pixel values to NDC values. Finally, we draw the quads and advance our
position:

{% highlight c++ linenos=table tabsize=4 %}
		glBufferData(GL_ARRAY_BUFFER, 24*sizeof(float), data, GL_DYNAMIC_DRAW);
		glDrawArrays(GL_TRIANGLES, 0, 6);

		x += (glyph->advance.x << 6) * sx;
		y += (glyph->advance.y << 6) * sy;
    }
	glPixelStorei(GL_UNPACK_ALIGNMENT, 4);
}
{% endhighlight %}

Again, we need to make sure we advance our location in NDC values, not pixels.
FreeType uses 26.6 fixed-point advance values (1/64th of a pixel), so we shift
it appropriate to get pixel values. We also reset the pixel alignment to its
default (let's play nice with our friends). Before calling this function, you
should call `FT_Set_Pixel_Sizes` to set the pixel size of the font face before
rendering. Here are some simple vertex/fragment shaders to render this data:

{% highlight glsl linenos=table tabsize=4 %}
#version 410 core

in vec4 position;
out vec2 texCoords;

void main(void) {
	gl_Position = vec4(position.xy, 0, 1);
	texCoords = position.zw;
}
{% endhighlight %}
{% highlight glsl linenos=table tabsize=4 %}
#version 410 core

uniform sampler2D tex;
in vec2 texCoords;
out vec4 fragColor;
const vec4 color = vec4(1, 1, 1, 1);

void main(void) {
	fragColor = vec4(1, 1, 1, texture(tex, texCoords).r) * color;
}
{% endhighlight %}

<p style="text-align: center;">
	{% capture imgurl %}{{ site.production_url }}assets/img/voxels/2013_12_08.png{% endcapture %}
	<a href="{{ imgurl }}">
		<img src="{{ imgurl }}" alt="Screenshot" width="400"/>
	</a>
</p>

It seems like a lot when you write about it, but I was actually surprised by
how little there was to do. Now, what I've shown here was my initial
implementation, which performs terribly due to uploading texture/vertex data
for every character, on every frame. To get good performance there's a couple
of things you can do:

  1. Store a texture atlas of characters. For this we'll need to maintain
     a mapping between characters and their location within the atlas.
  2. For strings that rarely change, we can cache the vertex data in a VBO.

[Example GLFW Application Source Code]({{ site.production_url }}code/opengl_text_rendering.cpp.txt)
