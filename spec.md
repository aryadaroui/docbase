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

## callout

```
:::callout:warning{#id}
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

## dropdown

```
:::dropdown:warning{#id}
header (title)
***
body
***
footer (caption)
:::
```

