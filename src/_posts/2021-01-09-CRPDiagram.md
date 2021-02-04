---
title: "[browser] CRPDiagram"
date: 2021-01-08 20:08:00 +0900
categories: 
  - browser
tags:
  - Critical Rendering Path
  - CRP
toc: true
toc_sticky: true
---



# Minify, Compress, Cache => HTML, CSS, JS

Minimize use of render blocking resources (css)

1. Use midea queries on <link> to unblock rendering
2. Inline CSS

Minimize use of parser blocking resoucres (JS)

1. Defer JS execution
2. Use async attribute on <script>

Patterns:

1. Minimize Bytes
2. Reduce critical resources
3. Shorten CRP length
