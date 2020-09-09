require 'set'

def foo
  puts "test"
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

methods = Set.new
trace = TracePoint.new(:call, :c_call) do |tp|
  if tp.self.to_s != "main"
    methods << "#{tp.defined_class}##{tp.method_id}"
  else
    methods << tp.method_id
  end
end

trace.enable { func2 }
puts methods
