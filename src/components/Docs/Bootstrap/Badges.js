import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Card, Badge } from "react-bootstrap"
import Icon from "../../Icon"

const Badges = () => {
  return (
    <div id="badges" className="docs-item element">
      <h5 className="text-uppercase mb-4">Badge</h5>
      <div className="docs-desc">
        <p className="lead">
          Small count and labeling component. See the{" "}
          <a href="https://react-bootstrap.github.io/components/badge/">
            React Bootstrap documentation
          </a>{" "}
          for more details.{" "}
        </p>
      </div>
      <div className="mt-5">
        <div className="mb-4">
          <Badge bg="primary" className="me-2 p-2">
            primary
          </Badge>
          <Badge bg="secondary" className="me-2 p-2">
            secondary
          </Badge>
          <Badge bg="success" className="me-2 p-2">
            success
          </Badge>
          <Badge bg="warning" className="me-2 p-2">
            warning
          </Badge>
          <Badge bg="info" className="me-2 p-2">
            info
          </Badge>
          <Badge bg="danger" className="me-2 p-2">
            danger
          </Badge>
        </div>
        <h6 className="text-uppercase fw-normal">Pill Badges</h6>
        <div className="mb-4">
          <Badge bg="primary" className="me-2 p-2" pill>
            primary
          </Badge>
          <Badge bg="secondary" className="me-2 p-2" pill>
            secondary
          </Badge>
          <Badge bg="success" className="me-2 p-2" pill>
            success
          </Badge>
          <Badge bg="warning" className="me-2 p-2" pill>
            warning
          </Badge>
          <Badge bg="info" className="me-2 p-2" pill>
            info
          </Badge>
          <Badge bg="danger" className="me-2 p-2" pill>
            danger
          </Badge>
        </div>
        <h6 className="text-uppercase fw-normal">Light Badges</h6>
        <div className="mb-4">
          <Badge bg="primary-light" text="primary" className="me-2 p-2" pill>
            primary
          </Badge>
          <Badge
            bg="secondary-light"
            text="secondary"
            className="me-2 p-2"
            pill
          >
            secondary
          </Badge>
          <Badge bg="success-light" text="success" className="me-2 p-2" pill>
            success
          </Badge>
          <Badge bg="warning-light" text="warning" className="me-2 p-2" pill>
            warning
          </Badge>
          <Badge bg="info-light" text="info" className="me-2 p-2" pill>
            info
          </Badge>
          <Badge bg="danger-light" text="danger" className="me-2 p-2" pill>
            danger
          </Badge>
        </div>
        <h6 className="text-uppercase fw-normal">Notification Badges</h6>
        <a
          className="position-relative text-gray-400 p-2 me-3 text-decoration-none"
          href="#"
        >
          <Icon icon="paper-plane-1" className="svg-icon-md svg-icon-heavy" />
          <span className="notification-badge notification-badge-number bg-primary">
            10
          </span>
        </a>
        <a
          className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
          href="#"
        >
          <Icon icon="smartphone-1" className="svg-icon-md svg-icon-heavy" />
          <span className="notification-badge notification-badge-number bg-warning">
            5
          </span>
        </a>
        <a
          className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
          href="#"
        >
          <Icon icon="money-box-1" className="svg-icon-md svg-icon-heavy" />
          <span className="notification-badge bg-green" />
        </a>
        <a
          className="position-relative text-gray-400 py-2 px-1 me-3 text-decoration-none"
          href="#"
        >
          <Icon icon="bank-cards-1" className="svg-icon-md svg-icon-heavy" />
          <span className="notification-badge bg-blue" />
        </a>
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

export default Badges

const highlightCode = `import { Badge } from 'react-bootstrap'

export default () => {
    return (
        <Badge bg="primary">
            primary
        </Badge>
        <Badge
            bg="secondary-light"
            text="secondary"
            pill
        >
            secondary
        </Badge>
    )
}`
