# inline

## footnote

footnote should be an element that is displayed on hover

```
:foonote[footnote content]
```

## ref

converts to a smart link with text for target ID type

```
:ref[#target_id]
```



# block

## Admonitions

These are all types of admonitions. Callout is non-collapsible, collapsible is. They can have the following types / icons / colors:

- blue
  - info
  - note
  - abstract
  - summary
  - tldr
  - tip
- green
  - success
  - check
  - checkmark
  - done
  - ok
- yellow
  - question
  - help
- orange
  - warning
  - caution
  - attention
- red
  - danger
  - error
  - failure
  - x
  - bug
- purple
  - console
  - brackets
  - bug
  - example
- pink
  - love
  - heart





```
none info warning danger error bug fix
```

## callout

```
:::callout{#id .type}
header (title)
***
body
***
footer (caption)
:::
```

- options:

  - info
  - warning
  - summary / tldr / abstract
  - todo
  - tip / hint
  - ...

  more ideas: https://notes.nicolevanderhoeven.com/Obsidian+Callouts

## collapsible | collapsable

```
:::dropdown:warning{#id}
header (title)
***
body
***
footer (caption)
:::
```

