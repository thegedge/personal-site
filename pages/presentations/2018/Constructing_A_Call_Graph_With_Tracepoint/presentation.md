# TracePoint

Examining the execution flow of your code

---

TODO: image of a recording device

> Speaker notes:
>
> Reports execution events in your code

---

## Create your tracer

```rb
methods = Set.new
trace = TracePoint.new(:call, :c_call) do |tp|
  methods << tp.method_id
end
```

---

## `:call, :return`

Call / return from a Ruby function Even if an exception is raised, you still get the `:return` event

---

## `:c_call, :c_return`

Call / return from a C function

---

## `:b_call, :b_return`

Call / return from a block

---

## `:class, :end`

Start / end a class/module definition

---

## `:raise`

Raise an exception

---

## `:line`

Execute a line of Ruby code

---

TODO: Drake image as background

> You used to call me on my cellphone, but now I use Tracepoint and it really makes that hotline
> bling — Drake\*

_\* Not an actual Drake quote_

---

## `Tracepoint#event`

Name of the tracepoint event

---

## `Tracepoint#method_id`

Underlying method name

> Speaker notes:
>
> Also, `callee_id`, which would be the alias if the method was called via an aliased name

---

## `Tracepoint#defined_class`

Class that defined the method

> Speaker notes:
>
> Sometimes `nil`

---

## `Tracepoint#self`

The class at runtime

---

## `Tracepoint#path`

Path of source file of execution point

> Speaker notes:
>
> Also, `#lineno` for the line number

---

## `Tracepoint#return_value`

Value returned from functions/blocks

> Speaker notes:
>
> Also
>
> - `#raised_exception` for `:raise` event
> - `#binding` to evaluate arbitrary expressions in the binding at the execution point

---

TODO: some fun image, from original presentation I used snoop dogg dancing

> Speaker notes:
>
> Niiiiiiiiice

---

## Trace your code

```ruby
methods = Set.new
trace = TracePoint.new(:call, :c_call) do |tp|
  methods << tp.method_id
end

trace.enable { func2 }
puts methods
```

---

## Trace your code

```ruby
def foo
  puts “test”
end

def func1
  foo
end

def bar
  func1
end
```

```ruby
def func2
  func1
  bar
end

func2
```

```
func2
func1
foo
puts
write
bar
```

---

TODO: oprah image

> Speaker notes:
>
> You get a tracepoint, and you get a tracepoint. Everybody gets a tracepoint.

---

## Call graphs

```ruby
def foo
  sleep 0.1
end

def func1
  foo
end

def bar
  func1
end

def func2
  func1
  bar
end
```

=>

![call graph](/presentations/2018/Constructing_A_Call_Graph_With_Tracepoint/callgraph.svg)

---

TracePoint doesn’t track your call stack

---

TODO: Psyduck at computer image

> Speaker notes:
>
> Ugh, okay

---

TODO: good news everyone professor farnsworth

> Speaker notes:
>
> It shouldn’t be that hard to do!

---

```ruby
def foo
  sleep 0.1
end

def func1
  foo
end

def bar
  func1
end

def func2
  func1
  bar
end

func2
```

```
stack = []
callgraph = {}
trace = TracePoint.new(:call, :return) do |tp|
  case tp.event
  when :call
    stack << tp.method_id
    if stack.length >= 2
      callgraph[stack[-2]] ||= Set.new
      callgraph[stack[-2]] << tp.method_id
    end
  when :return
    stack.pop
  end
end
```

|           |          |                                      |
| --------- | -------- | ------------------------------------ |
| `:call`   | `:func2` | `[:func2]`                           |
| `:call`   | `:func1` | `[:func2,` `:func1]`                 |
| `:call`   | `:foo`   | `[:func2,` `:func1,` `:foo]`         |
| `:return` | `:foo`   | `[:func2,` `:func1]`                 |
| `:return` | `:func1` | `[:func2]`                           |
| `:call`   | `:bar`   | `[:func2,` `:bar]`                   |
| `:call`   | `:func1` | `[:func2,` `:bar,` `:func1]`         |
| `:call`   | `:foo`   | `[:func2,` `:bar,` `:func1,` `:foo]` |
| `:return` | `:foo`   | `[:func2,` `:bar,` `:func1]`         |
| `:return` | `:func1` | `[:func2,` `:bar]`                   |
| `:return` | `:bar`   | `[:func2]`                           |
| `:return` | `:func2` | `[]`                                 |

TODO progressive disclosure of above

---

```ruby
{
  func1: #<Set: {:foo}>,
  bar: #<Set: {:func1}>,
  func2: #<Set: {:func1, :bar}>,
}
```

![call graph](/presentations/2018/Constructing_A_Call_Graph_With_Tracepoint/callgraph.svg)

---

TODO: excited image, originally used excited minions

> Speaker notes:
>
> We did it!

---

There’s still more to do...

> Speaker notes:
>
> Previous example was greatly simplified, so we have a lot more to do to really make a useful
> callgraph

---

Include self

> Speaker notes:
>
> Same method could exist on many classes
>
> Can get tangly with singleton classes

---

Filter gems

> Speaker notes:
>
> We don’t care too much about what happens outside of our own codebases
>
> But maybe we could keep it to understand where gems are being used?

---

Compute thetransitive closure

TODO: take previous call graph and show transitive closure

> Speaker notes:
>
> Unnecessary, but good for efficient ancestor/descendant queries

---

```ruby
TracePoint.trace(:raise) do |tp|
  exception = tp.raised_exception.inspect
  location = "#{tp.path}:#{tp.lineno}"
  puts "Raised #{exception} at #{location}"
end
```

> Speaker notes:
>
> Log all exceptions raised

---

```ruby
coverage = {}
trace = TracePoint.new(:line) do |tp|
  coverage[tp.path] ||= Set.new
  coverage[tp.path] << tp.lineno
end
```

> Speaker notes:
>
> Code coverage
>
> - Detecting dead code
>
> Note that there’s a builtin coverage library
>
> - Exact same data structure as above
> - Entirely in C, so will be much faster if you just want simple coverage
> - `#result` disables the system though (quantum entanglement?), but you have `#peek_result`

---

```ruby
stack = []
profile = Hash.new(0)
trace = TracePoint.new(:call, :return) do |tp|
  case tp.event
  when :call
    stack << [tp.method_id, Time.now]
  when :return
    method, start_time = stack.pop
    profile[method] += Time.now - start_time
  end
end
```

> Speaker notes:
>
> Custom runtime profiling
>
> - 🔥🔥🔥 Flamegraphs 🔥🔥🔥
> - Dynamic analysis
> - Detecting native extension use (moving to JRuby?)

---

```ruby
stack = []
tests_to_run = {}
trace = TracePoint.new(:call, :return) do |tp|
  case tp.event
  when :call
    stack << [tp.method_id, tp.path]
  when :return
    _, path = stack.pop
    tests_to_run[path] ||= Set.new
    tests_to_run[path] << stack.first unless stack.empty?
  end
end
```

> Speaker notes:
>
> Detecting tests to run
>
> - Assumes very first call is the test function

---

Thanks!

Twitter: @thegedge

GitHub: @thegedge
