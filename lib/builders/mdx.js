import { addHook as overrideRequire } from "pirates"
import { sync as mdxTransform } from "@mdx-js/mdx"
import jsxBuilder, { transform as jsxTransform } from "./jsx"
import highlight from "remark-highlight.js"
import abbreviate from "remark-abbr"
import { importComponent } from "../utilities"
import React from "react"
import ReactDOMServer from "react-dom/server"
const matter = require("gray-matter")

const transform = (code) => {
  let { content, data } = matter(code)

  let jsxWithMDXTags = mdxTransform(content, {
    remarkPlugins: [abbreviate, highlight],
  })

  let jsx = `
    import { mdx } from "@mdx-js/react"
    export const frontmatter = ${JSON.stringify(data)}
    ${jsxWithMDXTags}
  `

  return jsxTransform(jsx)
}

overrideRequire(transform, { exts: [".mdx"] })

export default async (modulePath, props) => {
  let component = await importComponent(modulePath)
  let data = { ...props, ...component.frontmatter }
  let element = React.createElement(component.default, data)
  if (component.layout) {
    element = React.createElement(component.layout, data, element)
  }

  let html = ReactDOMServer.renderToStaticMarkup(element)

  return {
    meta: component.meta || {},
    output: html,
  }
}
