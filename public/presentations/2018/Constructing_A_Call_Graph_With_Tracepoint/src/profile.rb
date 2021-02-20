require 'json'

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

def foo
  sleep 0.01
end

def func1
  sleep 0.02
  foo
end

def bar
  sleep 0.03
  func1
end

def func2
  sleep 0.04
  func1
  bar
end

trace.enable { func2 }
pp profile
