import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Card } from "react-bootstrap"

const Images = () => {
  return (
    <div id="images" className="docs-item element">
      <h5 className="text-uppercase mb-4">Images</h5>
      <div className="docs-desc">
        <p className="lead">
          Since <strong>Version 1.1</strong>, this theme uses Next.js{" "}
          <code>next/image</code> component for image optimization.{" "}
        </p>
        <p>
          It has many features, e.g., automatically creates srcsets for your
          images, serves WebP versions for your Jpegs, and lazy loads the
          images. For more information, check out next.js{" "}
          <a href="https://nextjs.org/docs/api-reference/next/image">docs</a>.
        </p>
        <p>
          We developed <code>{"<CustomImage />"}</code> component for usage with{" "}
          <code>next export</code> since, by default, static export won't work
          without using paid external loaders. Using this component, your{" "}
          <strong>static export</strong> will use normal{" "}
          <code>{"<img />"}</code> element instead of Next.js{" "}
          <code>{"<Image />"}</code> component.
        </p>
      </div>
      <div className="mt-5">
        <h6>
          Usage of <code>{"<CustomImage />"}</code> component:
        </h6>
        <p className="text-muted text-sm">
          You can use the same props as the <code>next/image</code> component
          has.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {customImageCode}
        </SyntaxHighlighter>
      </div>
      <div className="mt-5">
        <p className="lead">
          To setup your project for <code>static export</code>, following
          configuration is needed.
        </p>
        <Card className="bg-gray-100 border-0">
          <Card.Body>
            <h6 className="text-muted text-uppercase fw-normal mb-3">
              next.config.js
            </h6>
            <Card.Text>
              <SyntaxHighlighter
                language="javascript"
                style={tomorrow}
                className="rounded shadow p-4"
              >
                {highlightCode}
              </SyntaxHighlighter>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Images

const customImageCode = `import Image from './components/CustomImage'

export default () => {
  return (
    <Image
      src="/some/src.jpg"
      alt="..."
      width={1080}
      height={720}
      layout="intrinsic"
      className="img-fluid card-img-top"
  />
  )
}`

const highlightCode = `{
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // loader: "imgix", // Uncoment this line
    // path: "", // Uncoment this line
  },
  env: {
    production_type: "server", // Change variable to "static"
  },
  // trailingSlash: true, // Uncoment this line
},`
