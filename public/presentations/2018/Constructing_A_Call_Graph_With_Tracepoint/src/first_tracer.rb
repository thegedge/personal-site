require 'set'

methods = Set.new
trace = TracePoint.new(:call, :c_call) do |tp|
  methods << tp.method_id
end


def foo
  puts "foo"
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

trace.enable { func2 }
puts methods
