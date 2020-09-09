require 'diff/lcs'
require 'parser/current'

require 'pathname'
require 'set'

def foo
  Parser::CurrentRuby.parse("2 + 2")
  seq1 = %w(a b c e h j l m n p)
  seq2 = %w(b c d e f j k l m r s t)
  #Diff::LCS.LCS(seq1, seq2)
end

bar = Proc.new do
  Parser::CurrentRuby.parse("2 + 2")
  foo
end

GEM_HOME = Pathname.new(ENV['GEM_HOME']).join("gems")
GEM_HOME_GLOB = GEM_HOME.join('**').to_s
RUBY_ROOT_GLOB = Pathname.new(ENV['RUBY_ROOT']).join("**").to_s

gems = {}
stack = []
tracer = TracePoint.new(:call, :b_call, :return, :b_return) do |tp|
  path = Pathname.new(tp.path)
  is_gem = path.fnmatch?(GEM_HOME_GLOB)
  is_stdlib = path.fnmatch?(RUBY_ROOT_GLOB)

  case tp.event
  when :call, :b_call
    stack << tp.method_id unless is_gem || is_stdlib
  when :return, :b_return
    if is_gem
      gem_relative_path = path.relative_path_from(GEM_HOME)
      gem_name = gem_relative_path.each_filename.first
      gems[gem_name] ||= Set.new
      gems[gem_name] << stack.last
    elsif !is_stdlib
      stack.pop
    end
  end
end

tracer.enable { foo; bar.call }
pp gems
