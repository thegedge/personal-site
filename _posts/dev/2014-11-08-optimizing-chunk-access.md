---
title: Optimizing Chunk Access
category: dev
tags: [c++, voxels]
---

In general, one should access memory in a contiguous manner, but sometimes it is impossible to do so
without incurring other performance degradations. In this post I'll talk about one possible way to
circumvent this.

## How cache lines (roughly) work

First, let's think about why contiguous access is optimal. Whenever you need to access a memory
address, cache is first asked whether or not it has that memory. Eventually you will get a cache
miss, meaning the memory you're accessing isn't in a cache. Whenever there's a cache miss, the
processor has to read from main memory. Memory around that address will also be read. For example,
the [Sandy Bridge](https://en.wikipedia.org/wiki/Sandy_Bridge) architecture employed in many modern Intel
processors have a 64-byte cache line, meaning that whenever you access main memory, you'll bring 64
byte chunks of memory into the cache (maybe not all at once). If we're accessing memory
contiguously, every 64 bytes will (likely) have cache hits. Want to know how all of this works in
detail? [Ulrich Drepper](https://akkadia.org/drepper/cpumemory.pdf) has your back.

So just how big of a deal is a cache miss? Peter Norvig provided rough estimates of various
operations:

| Operation                   | Time (ns) |
| --------------------------- | :-------: |
| execute typical instruction |    1.0    |
| fetch from L1 cache memory  |    0.5    |
| fetch from L2 cache memory  |    7.0    |
| fetch from main memory      |   100.0   |

Actual timings will likely vary quite a bit, but expect roughly an order of magnitude difference
each time you move up a level. See the entire table on
[Norvig's site](https://norvig.com/21-days.html#answers).

## What can we do?

Suppose we store our chunk data in YZX order; that is, the greatest stride is along the y axis,
followed by z, and finally x. Optimal iteration would look like this:

```cpp
for(int y = 0; y < RADIUS; ++y) {
    for(int z = 0; z < RADIUS; ++z) {
        for(int x = 0; x < RADIUS; ++x) {
            const auto &voxel = chunk.voxel(x, y, z);
            // Do stuff with voxel...
        }
    }
}
```

If we can process voxels in an order-independent manner, that's how we should do it. We can't always
access memory in a cache-efficient manner though. For example,
[greedy meshing](/blog/2014-08-17-greedy-voxel-meshing) accesses voxel data in slices. In many
cases like these, we can alleviate some of the pain by **prefetching** data into the cache. We are
in control of the code, and we know our access patterns, so we can warm up the cache with data we
know that we will soon use. This is similar to how a processor
[prefetches instructions](//en.wikipedia.org/wiki/Instruction_prefetch).

Clang and GCC have a special function to prefetch data:
[\_\_builtin_prefetch](//gcc.gnu.org/onlinedocs/gcc-3.3.6/gcc/Other-Builtins.html). We pass in a
memory address to prefetch, whether or not it we need read-write access, and the temporal locality
of the prefetch (0, 1, 2, or 3 where 0 means ephemeral and 3 means "keep it around in all caches as
long as possible".)

Here's an example of an access pattern that is inefficient, yet we nearly get a 2x speedup due to
prefetching:

<script src="https://gist.github.com/thegedge/55dab0bfa87296926dc0.js"></script>
