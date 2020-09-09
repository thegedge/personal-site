indent = []
trace = TracePoint.new do |tp|
  next if tp.defined_class == TracePoint

  data = [tp.defined_class, tp.self, tp.callee_id, tp.method_id, "#{tp.path}:#{tp.lineno}"]
  case tp.event
  when :raise
    data << tp.raised_exception
  when :c_return, :return
    data << tp.return_value
  end

  case tp.event
  when :c_return, :return, :end, :b_return
    indent.pop
  end

  puts "#{indent.join}#{tp.event}: #{data.inspect}"

  case tp.event
  when :call, :c_call, :class, :b_call
    indent << "├──"
  end

  puts "" if indent.empty?
end

def foo
  yield
end

puts "----- Example 1 -----\n\n"
trace.enable
sleep 0.2
trace.disable

puts "\n----- Example 2 -----\n\n"
trace.enable
class Foo
  def bar
    foo { sleep 0.5 }
    10
  end

  alias_method :spam, :bar
end

Foo.new.spam
trace.disable
