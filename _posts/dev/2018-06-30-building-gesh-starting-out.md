---
title: "Building Gesh: Starting Out"
category: dev
tags: [rust]
series: Building gesh
published: false
---
I recently decided I wanted to do two things: learn a new language, and build a shell. I settled on
learning [Rust]. This mini blog series will be a little about learning Rust and a little about
building a shell. I've decided to call it [gesh]. This will be the first post in a series of me
building the shell.

## What is a shell?

[Wikipedia][shell] defines it as:

> _a shell is a user interface for access to an operating system's services._

Great, so we'll be building a UI for the operating system. Before we can do that, what kinds of
services does the OS provide that we'll be exposing? Well, to start, I'm going to focus on two:

1. creating and managing processes, and
2. file management.

To help expose those, we'll also need some features for our UI, such as a language for the UI, and
some customization features. If you've used a shell before, you've probably come across all of this.

## What I have so far

I've already began building the shell, so future blog posts will be a little more focused, but for
now I'll talk about what I have so far.

First, I needed to be able to parse basic commands and execute them. For parsing, I chose
[nom] to make it quick and easy to get up and running. It's a parser combinator library with
no copying, and can be streamed. I kept it simple for now, so we can pass arguments to a command,
with support for simple environment variable interpolation.

For command execution, we need:

- an [environment] under which the commands will run, containing the current working directory
  and all of the environment variables;
- a [registry] to find commands, which could be aliases, shell builtins, or executables on the path; and
- a [prompt] to input the commands.

## Building a command registry

The most interesting challenge so far has been building a command registry. Finding and executing
commands on the path is pretty straightforward, but once I introduced builtins (for example, `cd`)
I had some challenges. I wanted to take a builder approach, similar to Rust's [Command]. The
challenge was that I needed to give a mutable reference to the environment. This is necessary
because shell builtins could mutate the environment. For example, `cd` will change the current
working directory and `export` would add new vars to the environment. After battling with the
borrow checker, I came to this solution:

```rust
pub struct CommandBuilder<'e, Iter, Args>
    fn args(&mut self, args: Args) -> &mut Self;
    fn env(&mut self, env: &'e mut Environment) -> &mut Self;
    fn execute(mut self) -> Result;
}
```

The key was that executing the command we are building needed to move `self`. If I wrote it as a
reference to `self` no one would be able to use the mutable reference to the environment. This
forced me to realize that moving `self` makes complete sense for the "build" part of a builder, at
least a builder that isn't meant to be reused.

```rust
pub fn execute(&self, env: &mut Environment, command: &String, args: Vec<ShellString>) -> Result<ExitStatus, Error> {
    match command.as_ref() {
        // Builtins
        "cd" => Ok(CommandBuilder::new(Box::new(builtin::cd))),
        ...,

        // Executables on the path
        _ => {
            self.find_executable(&PathBuf::from(command))
                .map(|path| CommandBuilder::new(Box::new(Executable::new(path))))
                .ok_or(Error::UnknownCommand)
        }
    }.and_then(|mut builder| {
        match ShellString::to_string_vec(args.into_iter(), &env) {
            Some(args) => {
                builder.args(args).env(env);
                builder.execute()
            },
            None => Err(Error::Unknown),
        }
    })
}
```

I decided to go with the `Fn` trait to represent a thing that can be executed. I built it this way
because I was hoping to build up the registry over time, with aliases and perhaps cache commands.
It's not perfect, but it works. One thing I've come to appreciate is the chaining operations in
`Option` and `Result`.

## What next?

So many things!

- Directory stack with builtin commands `popd` and `pushd`.
- Command history with builtin command `history`.
- Filesystem globs.
- Mutating the environment, by using `export` or by prefixing commands with `VAR=VALUE`.
- Piping commands together.
- Backgrounding commands and interacting with them.
- Redirecting file descriptors, like stdin and stdout.
- Prompt and shell customization.
- Command aliases.

I've set up a [project board](https://github.com/thegedge/gesh/projects/1?add_cards_query=is%3Aopen)
to capture a lot of this. Stay tuned!


[Rust]: https://www.rust-lang.org/en-US/
[gesh]: https://github.com/thegedge/gesh/tree/master/src
[shell]: https://en.wikipedia.org/wiki/Shell_(computing)
[nom]: https://github.com/Geal/nom
[environment]: https://github.com/thegedge/gesh/blob/master/src/environment/mod.rs
[registry]: https://github.com/thegedge/gesh/blob/master/src/command/registry.rs
[prompt]: https://github.com/thegedge/gesh/blob/master/src/prompt/mod.rs
[Command]: https://doc.rust-lang.org/std/process/struct.Command.html
