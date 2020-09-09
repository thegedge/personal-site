require 'set'
require 'json'

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

trace.enable { func2 }
pp callgraph
