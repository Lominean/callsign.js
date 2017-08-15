# callsign.js

Add callsign.js and callsign.css to the HTML document's `head` section.
```html
<link href="callsign.css" rel="stylesheet">
<script src="callsign.js" defer></script>
```

It will then parse the document, looking for common callsign patterns.
```html
<p>I heard SM8AYA in contact with SA8YAY on shortwave.</p>
```
Here `SM8AYA` and `SA8YAY` will be identified.

You can turn off the pattern search and rely on markup.
```html
<p>I heard <callsign>SM8AYA</callsign> and <callsign>SA8YAY</callsign> on shortwave.</p>
```

# Options
Options can be set in the variable `csettings`. Make sure it's defined before callsign.js executes. The defaults are like this:
```javascript
var csettings = {
  flag: true,
  measure: true,
  search: true,
  zero: true
};
```

| Name | Description |
| --- | --- |
| debug | Write performance information to the browser console. |
| flag | Show the country flag before the call sign. |
| search | Parse the entire document for text patterns.<br>⚠️ Potentially CPU intense. Turn off if not needed. |
| zero | Replace 0 with 0&#x0338; in call signs. |

# References
* [ARTICLE 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
