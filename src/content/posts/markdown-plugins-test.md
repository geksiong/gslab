---
title: "Markdown Plugins Test"
date: 2020-10-09T19:08
thumb: ""
tags:
    - markdown
    - sample
katex: true
---

# markdown-it-emoji

Technically you can just insert the unicode symbol directly into the post. The plugin allows you to use text shortcuts such as `:)` and `:+1:`.

- **Emoticons:** :) :(
- **Emojis:** :joy: :+1:

# markdown-it-container

::: warning
This is a warning
:::

::: success
Success message
:::

::: info
For your information
:::

::: danger STOP
This is dangerous!
:::

::: details click me
This is a paragraph

```js
function hello() {
  console.log("Hello!");
}
```
:::

## markdown-it-katex

Inline formula $\sqrt{3x-1}+(1+x)^2$

Block formula

$$\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}$$
