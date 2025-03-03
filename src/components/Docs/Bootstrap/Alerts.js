import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Alert } from "react-bootstrap"

const Alerts = () => {
  return (
    <div id="alerts" className="docs-item element">
      <h5 className="text-uppercase mb-4">Alert</h5>
      <div className="docs-desc">
        <p className="lead">
          Provide contextual feedback messages for typical user actions with the
          handful of available and flexible alert messages. See the{" "}
          <a href="https://react-bootstrap.github.io/components/alerts/">
            React Bootstrap documentation
          </a>{" "}
          for more details.{" "}
        </p>
      </div>
      <div className="mt-5">
        <div className="docs-example">
          <Alert variant="primary">This is a primary alert—check it out!</Alert>
          <Alert variant="secondary">
            This is a secondary alert—check it out!
          </Alert>
          <Alert variant="success">This is a success alert—check it out!</Alert>
          <Alert variant="danger">This is a danger alert—check it out!</Alert>
          <Alert variant="warning">This is a warning alert—check it out!</Alert>
          <Alert variant="info">This is a info alert—check it out!</Alert>
          <Alert variant="light">This is a light alert—check it out!</Alert>
          <Alert variant="dark">This is a dark alert—check it out!</Alert>
        </div>
      </div>
      <div className="mt-4">
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {highlightCode}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default Alerts

const highlightCode = `import { Alert } from 'react-bootstrap'

export default () => {
    return (
        <Alert variant="primary">This is a primary alert—check it out!</Alert>
        <Alert variant="secondary">This is a secondary alert—check it out!</Alert>
    )
}`
