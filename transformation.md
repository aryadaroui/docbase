```
some paragraph

:::callout{#id type="warning"}

Text with :text[inline]{#id}

:::
```



```
<p>some paragraph</p>

<directive-block directive="callout" id="id" type="warning">

	<p>Text with <directive-inline id="id"> </directive-inline></p>

</directive-block>
```

