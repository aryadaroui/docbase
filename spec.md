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
		enumerate: false
		prefix: "Callout"
	diagram:
		enumerate: true
		prefix: "Diagram"
	equation:
		enumerate: true
		
```



- Headings are foldable
- Links without preview show the URL instead



EVERY directive gets an id in the HTML that matches their label:

```html
<figure id="code-block-1" class="code-block">
	...
  <figcaption>
    Code block 1: ...
  </figcaption>
</figure>
```

This allows people to easily, externally, ref a figure; it's just the label and count in kebab-case.

However, at write-time, you don't know exactly what count your directive is. So you can give it a ref-id with `:dir{#ref-id}` which you use in your reference `:ref[#ref-id]`. This will resolve to a link to the proper HTML id, with the correct label text.

# Directives

## Inline

### Footnotes

footnote should be an element that is displayed on hover

```
:foonote[footnote text]{#ref-id}
```

### References

converts to a smart link to the 

```
:ref[#]
```

### Highlight

`:highlight[hilighted text]{#ref-id}`

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
:::callout{#ref-id .type}
title
***
body
:::
```

#### dropdown

```
:::callout-dropdown{#ref-id. .type}
title
***
body
:::
```

### Figures

#### Normal figure

```
:::figure{#ref-id src="image.webp"}
caption
:::
```

#### Slideshow

```
:::figure-slideshow{#ref-id src="image1.webp image2.webp"}
caption
:::
```

#### Slider

```
:::figure-slider{#ref-id src="image1.webp image2.webp"}
caption
:::
```

### Diagrams

Specifically for vector diagrams. Has different counter than Figure.

```
:::diagram{#ref-id src="diagam.svg"}
caption
:::
```

### Tables

```
:::table{#ref-id src="table.md"}
caption
:::
```

Or, can be inserted manually

```
:::table{#ref-id}
body
***
caption
:::
```



### Code

```
:::code{#ref-id src="code.py"}
caption
:::
```

```
:::code{#ref-id highlight="1-3 4 /carrot/"}

:::
```



### Plots

```
:::plotly{#ref-id src="data.json"}
caption
:::
```

### Equations

```
::equation{#ref-id src="eqn.tex"}
```

```
:::equation{#ref-id src="eqn.tex"}
caption
:::
```

```
:::equation{#ref-id}
$$
f(x)
$$
:::
```

### Academic

```
:::theorem{#ref-id}
body
:::
```

```
:::lemma{#ref-id}
body
:::
```

```
:::corollary{#ref-id}
body
:::
```

```
:::proposition{#ref-id}
body
:::
```

```
:::axiom{#ref-id}
body
:::
```

```
:::definition{#ref-id}
body
:::
```

```
:::example{#ref-id}
body
:::
```

```
:::algorithm{#ref-id}
body
:::
```

```
:::Exercisde{#ref-id}
body
:::
```

Pair an exercise block with an internal `callout-dropdown` to hide the solution.

### Audio

```
:::audio{#ref-id src="song.m4a"}
caption
:::
```

```
:::audio-playlist{#ref-id src="song1.m4a song2.m4a"}
caption
:::
```

### Video

Video source must be an external hyperlink!

```
:::audio{#ref-id src="song.m4a"}
caption
:::
```

### Tabs

```
:::tab{#ref-id}
Content 1
***
Content 2
:::
```

### Blocks

You can have a generic expandable block

```
:::block{#ref-id}
title
***
body
***
caption
:::
```

Within it, you can have horizontal sub-blocks

```
::::block{#ref-id}
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
::references{#ref-id src="references.json"}
```

### Embedded

Google Sheets

```
:::embedded-sheets{#ref-id src="url"}
caption
:::
```

Replit

```
:::embedded-replit{#ref-id src="url"}
caption
:::
```