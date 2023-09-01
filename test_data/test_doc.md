---
title: "test document"
author: myself
syntax: "docbase_0.1"
---

```
this would be separate data that would be stored:
  publish_time: 2023-07-28T20:11:07.750Z
  edit_time: 2023-08-28T20:11:07.750Z
  version_count: 1
  organization: independent
```

# Syntax design philosophy

Must be reasonably backward compatible with common markdown. Media that is not text should refer to external source, so as to keep the .md file primarily text. New syntax should try to stay within :::blocks::: blocks where possible. Otherwise, should fallback to plain looking text in normal markdown processors.

List of internal references must be an accessible object for things like :::references:::, :::table-of-figures:::, and plugins. Also important to track reference/ID namespace for conflicts.

# Heading 1

This is a normal paragraph. Unicode characters? Ḽơᶉëᶆ ȋṕšᶙṁ ḍỡḽǭᵳ ʂǐť ӓṁệẗ, ĉṓɲṩḙċťᶒțûɾ ấɖḯƥĭṩčįɳġ ḝłįʈ, șếᶑ ᶁⱺ  ẽḭŭŝḿꝋď ṫĕᶆᶈṓɍ ỉñḉīḑȋᵭṵńť ṷŧ ḹẩḇőꝛế éȶ đꝍꞎôꝛȇ ᵯáꞡᶇā ąⱡîɋṹẵ.

**bold** *italic* <u>underline</u> [external link](https://en.wikipedia.org/wiki/Wiki) and [internal link](#id)

auto internal link :ref{id} transforms text based on :::block:::

A text mark for internal links is made with :text[text]{#id}. 

- unordered list
  - child 1
  - child 2
    - grandchild

1. ordered list
   1. child 1
   2. child 2
      1. grandchild

==highlight==

Standard footnote[^1]. 

[^1]: standard footnote text

Auto footnote{^footnote text}. Auto footnote is shown at bottom of page.

spoiler text

Footnotes should be a superscript asterisk with a number ->"*1".

Citations should be in the form of superscript number in brackets. "This data I'm referencing[3]."

Undecided on support for superscript and subscript. Should probably use latex for that.



| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |



> Block quote
> $$
> math
> $$
> 

Inline math $f(x)$ block math:

$$
F(x) = \int f(x) \, \mathrm{d}x
$$
inline code `f(x)` inline code with highlight :code[`f(x)`]{#id lang=ts} or :code[`f(x)`]{#id token=comment}

```python
# Prints a greeting to the number of friends you have, but this is also an example of a long line of code.
def howdy_yall(num_friends: int)
  print('howdy to all ' + num_friends + ' of my friends!')
 
howdy_yall(0)
```

```svelte highlight=[3] title="component.svelte"
<a href={link}>
  <div class="link-box">
    <slot />
  </div>
</a>
```

## expandable media blocks

with optional body for caption. Shows default transformation shown, but can be overridden

:::callout {id} title="some warning" collapsed=true ->"Callout #"
body
:::

:::table {id} src="table.json" ->"Table #"

body
---
caption

:::plotly{#id src=plot.json}
caption
:::



:::video {id} src="https://youtu.be/dQw4w9WgXcQ?si=0RxX-sM28NCg5WjU" ->"Video #"
caption
:::

:::figure {id} src=plant.webp ->"Figure #"
caption
:::

:::figure{#id src="plant.webp animal.jpg"}
caption
:::

:::audio {id} src=song.m4a ->"Audio #"
caption
:::

:::audio {id} src=[song1.m4a, song2.m4a]
caption
:::

:::text {id} src=text.txt ->"Text #"
caption
:::

:::code {id} src=main.rs highlight=[3] title="main.rs" ->"Code #"
caption
:::

:::replit {id} src=www.replit.com/example ->"Executable #"
caption
:::

:::math-macros src=macros.tex "->"Equation  #":::

:::math src=math.tex
caption
:::

:::quote src=quote.text
caption
:::

:::quote ->"Quote #"
body
:::

:::references src=bib.json:::