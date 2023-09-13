# File organization

This is *digital* text media. In print media, we have many pages because the amount of content overflows a single page. In digital media, we don't have that limitation because we can scroll. so instead, we can use pages as a tool for grouping.

Works can be posted as

As a single page or hierarchies of pages

- Document
  - Page
    - Headings

- Journal
  - A catalog of existing 

We can see that this is mostly hierarchical. If your writing is "flat" with more than three consecutive units, consider adding another layer to the hierarchy. E.g. heading 1, heading 1,  heading 1 -> heading 1 heading 2 heading 1 heading 2 heading 1 heading 2

Each page is written as a .md file, with most of the same formatting as GitHub Flavored Markdown. Sections are by default numbered, but can be left unenumerated with *

```yaml
# document.config.yaml
title: Document Title
authors:
	- Author Name
organization: Big Company
style: midnight

contents:
  - *Foreword
  - Being
    - Biological life
      - Animals
      - Plants
    - Inanimate materials
  - Nothingness

syntax: docbase 0.1
labels:
	callout:
		# :ref'ing will override this setting to "true"
		enumerate: false
		format: "Cool callout"
	diagram:
		enumerate: true
		format: "Diagram"
	equation:
		enumerate: true
		
```



- Headings are foldable
- Links without preview show the URL instead



# Directives

## Inline

### Footnotes

footnote should be an element that is displayed on hover

```
:foonote[footnote text]{#id}
```

### References

converts to a smart link with text for target ID type

```
:ref[#target_id]
```

### Highlight

`:highlight[hilighted text]{#id}`

## Block

### Callouts

Can have the following types / icons / colors:

```
purple:, console, brackets, bug, example
blue: info, note, abstract, summary, tldr, tip
green: success, check, done, solution
yellow: question, help, frown
orange: warning, caution, attention
red: danger, error, failure, x, bug, fire
pink: love, heart, smile
```

#### normal callout

```
:::callout{#id .type}
title
***
body
:::
```

#### dropdown

```
:::callout-dropdown{#id. .type}
title
***
body
:::
```

### Figures

#### Normal figure

```
:::figure{#id src="image.webp"}
caption
:::
```

#### Slideshow

```
:::figure-slideshow{#id src="image1.webp image2.webp"}
caption
:::
```

#### Slider

```
:::figure-slider{#id src="image1.webp image2.webp"}
caption
:::
```

### Diagrams

Specifically for vector diagrams. Has different counter than Figure.

```
:::diagram{#id src="diagam.svg"}
caption
:::
```

### Tables

```
:::table{#id src="table.md"}
caption
:::
```

Or, can be inserted manually

```
:::table{#id}
body
***
caption
:::
```



### Code

```
:::code{#id src="code.py"}
caption
:::
```

```
:::code{#id highlight="1-3 4 /carrot/"}

:::
```



### Plots

```
:::plotly{#id src="data.json"}
caption
:::
```

### Equations

```
::equation{#id src="eqn.tex"}
```

```
:::equation{#id src="eqn.tex"}
caption
:::
```

```
:::equation{#id}
$$
f(x)
$$
:::
```

### Academic

```
:::theorem{#id}
body
:::
```

```
:::lemma{#id}
body
:::
```

```
:::corollary{#id}
body
:::
```

```
:::proposition{#id}
body
:::
```

```
:::axiom{#id}
body
:::
```

```
:::definition{#id}
body
:::
```

```
:::example{#id}
body
:::
```

```
:::algorithm{#id}
body
:::
```

```
:::Exercisde{#id}
body
:::
```

Pair an exercise block with an internal `callout-dropdown` to hide the solution.

### Audio

```
:::audio{#id src="song.m4a"}
caption
:::
```

```
:::audio-playlist{#id src="song1.m4a song2.m4a"}
caption
:::
```

### Video

Video source must be an external hyperlink!

```
:::audio{#id src="song.m4a"}
caption
:::
```

### Tabs

```
:::tab{#id}
Content 1
***
Content 2
:::
```

### Blocks

You can have a generic expandable block

```
:::block{#id}
title
***
body
***
caption
:::
```

Within it, you can have horizontal sub-blocks

```
::::block{#id}
  title
  ***
  :::subblock
  	Content 1
  :::
  :::subblock
	  Content 2
  :::
  ***
  caption
::::
```

### References

```
::references{#id src="references.json"}
```

### Embedded

Google Sheets

```
:::embedded-sheets{#id src="url"}
caption
:::
```

Replit

```
:::embedded-replit{#id src="url"}
caption
:::
```