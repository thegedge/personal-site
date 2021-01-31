---
title: "Java Annotations: A [Somewhat] Brief Introduction"
category: dev
tags: [java]
---

So in my last post where I described a messaging system we implemented, I also mentioned our use of
annotations. I thought it would be appropriate to write a follow-up post with a brief introduction
to them, so here it is. I'm going to talk about annotations in the Java sense, but a lot of this
propagates to other \[reflective\] languages too.

Annotations are often defined as "notes of explanation or comments added to text". In Java, one can
regard an annotation as metadata attached to code, a piece of code describing code. Well, the first
question that one might ask is "Why do I need this when I can just use comments?" and indeed, this
question makes for an excellent starting point when writing an introduction. Well, probably the main
reason to have annotations over comments is that annotations are part of the language, with a
specific syntax, which in turn allows parsers to easily understand them. Comments, on the other
hand, could be in any form and would be a huge mess to understand by a compiler, unless a certain
standard was specified.

"So what good are they for?" you might ask next. Well, they can let you do some pretty neat stuff.
First I should describe the three flavors of annotations in Java:

source code : Present at the source code level only and will be discarded by the compiler during
compilation. These guys are useful to give hints to compilers and programs as to the nature of the
code itself. For example, one may have seen `@Override` or `@Deprecated` annotations when using
Eclipse or other code. The former specifies that an error should be produced if the method doesn't
override one in a super class, and the latter indicates a class, method, etc. as deprecated.

class : This is the default flavor. Compilers will produce bytecode containing these annotations,
but you probably won't be able to access these during runtime. Useful if you are doing bytecode
analysis of code.

runtime : To me, possibly one of the more useful flavors of annotations for developers. These
annotations can be requested at runtime, which allows you to do neat tricks. The reason this is
possible is due to the reflective nature of Java. You can access this through the
`Class.getAnnotations()` method.

So how do we create an annotation? Well, it's pretty straightforward. Note that I'll be using the
messaging system from my previous post as an example. Here's what the Message annotation looks like:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(value = {ElementType.FIELD})
public @interface Message {
	Class<?>[] signature() default {};
}
```

So the first line says we want to be able to retrieve this annotation at runtime. Note the use of
the @ symbol here. This is the notation used for annotations. The second line says what type of
things this annotation can be applied to. In the above example, it can only be applied to a field in
a class, but not methods, or classes themselves. Note the @ symbol before the interface keyword in
the third line. This is how we define an annotation. Finally, the fourth line specifies the one and
only property in our annotation, and that's an array of classes that specify the signature of the
message (i.e., the types for the data that will accompany a message). We specify the default
signature to be an empty array. What's interesting in this example is that we used annotations to
describe an annotation itself (`@Retention` and `@Target` describe `@Message`).

For our messaging system, the field itself is a static member that is a String, and that string
defines the name of the message. For example,

```java
@Message(signature = {String.class})
public final static String MYMESSAGE = "myMessageName";
```

describes a message with the name `myMessageName` which sends a `String` argument to all receiving
functions. If we wanted to, we could have defined a second property in the annotation for the
message name. In our message delivery class, we can then loop through all the fields in a class to
register messages like this:

```java
public void registerSender(Class<? extends MessageSender> sender) {
	MessageData msgData = getData(sender);
	for(Field field : sender.getDeclaredFields()) {
		if(field.isAnnotationPresent(Message.class)) {
			if((field.getModifiers() & Modifier.STATIC) == 0)
				continue;

			Message msg = field.getAnnotation(Message.class);
			msgData.addMessage(field.get(null).toString(), msg.signature());
		}
	}
}
```

Note that, for simplicity, I excluded the try/catch blocks and log messages in the above. A fairly
straightforward piece of code: for each field in the class, if the field is static and has the
Message annotation, we add the message to the set of messages we understand. This is far more
convenient than having to register each individual message. For message receivers we have a
`@ReceiverMethod` annotation that I won't explain, but it looks something like this:

```java
// Annotation for a method that will receive a message
@Retention(RetentionPolicy.RUNTIME)
@Target(value = {ElementType.METHOD})
public @interface ReceiverMethod {
	// Special message name which allows catching all messages from a sender
	public static final String CATCHALL = "<<all>>";

	// Properties
	public Class<? extends MessageSender> senderClass();
	public String message();
}
```

We can then do something similar to the `registerSender` method above to register our receiver. So
that's my quick introduction to annotations. Maybe you can find other interesting ways to make use
of these little critters in your own programs.
