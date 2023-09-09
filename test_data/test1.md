# Start test1.md

A normal paragraph with :footnote[footnote here]. inline code `x^2{:js}` `variable{:.variable}`.

code block below this line


:::code{#id h_lines="1 3-5" h_chars="pass code"}
```python
def function():
	pass
# comment
print("hello world") :fake_directive[fake directive here]

f = more * code

print("wow wow wow")
```
:::


```python {1} /pass/
def function():
	pass
# comment
print("hello world", variable)
```

code block above this line

:::callout{#id .warning data-asdf}
callout title
***
callout **body**

more stuff in the body
***
callout footer
:::

more paragraph $f(x) = x^2$