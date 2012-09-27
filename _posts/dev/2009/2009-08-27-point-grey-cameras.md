---           
layout: post
title: Point Grey Cameras
category: dev
tags: [research]
---
For anyone who doesn't know my research, I'm looking into stereo vision algorithms in an underwater camera array. What I'm hoping to do is a rough scene reconstruction that has improved results over blindly using an existing stereo algorithm.

<!-- more -->
Now on to what this post is about. I found a little subtle and, as far as I can tell, undocumented feature of the Point Grey cameras. If you use the FlyCapture API then you would normally call `flycaptureStart` and `flycaptureStop` to start/stop grabbing images, respectively. For our purposes, we only need to grab single shots from the camera array, not streamed video. On top of that, we want the shots to be (for the most part) synchronized across the whole array.

Here's the twist, the start/stop calls aren't really what starts the "image grabbing" process, but simply powering up/down the camera (via the `CAMERA_POWER` register). The start/stop calls appear to only lock down/release a DMA context for the purposes of streaming. That means, if you have a firewire card with the TI chipset you can only start 4 cameras simultaneously.

So how do we grab a synchronized set of images using this knowledge? Well this is only applicable to the Grasshopper line of cameras since they have an on-board framebuffer that you can control. Here's what we do:

1. Place the cameras in "image hold" mode by setting bit 6 to 1 in the `IMAGE_RETRANSMIT` (0x12F8) register. This will store images on the camera.
2. Power up the cameras by setting bit 31 to 1 using the `CAMERA_POWER` register.
3. Simply wait around long enough for the frame buffers to fill up
4. Put each camera in trigger mode by setting bit 6 to 1 in the `TRIGGER_MODE` (0x830) register. What this does is prevent any more images from getting stored in the frame buffer.
5. For each camera
  1. Start the camera so you can transfer data over to your system
  2. Set bits 24-31 to 0x01 in the `IMAGE_RETRANSMIT` register to transfer an image.
  3. Stop the camera

This works great for using the cameras in a non-streaming context where you only have a single firewire bus/system to work with. If you want the images to be synchronized, be sure to set them all to the same FPS, and enable image timestamping (`FRAME_INFO` register, 0x12E8). Now all you do is find the set of images across all cameras which are closest together.

One other subtle thing I found with is that if you start the camera with the same dimensional parameters, but with a different bandwidth parameter, the on-board frame buffer will be flushed. Anyways, that's it for this post. I thought it would be nice to post this information just in case someone else out there has had, or will have, a similar issue. Cheers!