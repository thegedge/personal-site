TracePoint.trace(:raise) do |tp|
  puts "Raised #{tp.raised_exception.inspect} at #{tp.path}:#{tp.lineno}"
end

def foo(v)
  raise ArgumentError, "#{v} is even" if v & 0x1 == 0
end

def bar
  foo(1) rescue nil
  foo(2) rescue nil
  raise StandardError, "shouldn't get here"
end

def spam
  bar rescue nil
  foo(4) rescue nil
  foo(3) rescue nil
end

spam
