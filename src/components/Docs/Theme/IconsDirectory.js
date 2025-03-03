import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Row, Col } from "react-bootstrap"
import Icon from "../../Icon"

const IconsDirectory = () => {
  return (
    <div id="icons-directory" className="docs-item">
      <h5 className="text-uppercase mb-4">Icons - Directory</h5>
      <div className="docs-desc">
        <p className="lead">
          This theme also comes with a <strong>150+ Premium SVG icons</strong>.
          Icons included cover mostly e-commerce, restaurant and travel niches.
        </p>
        <p className="lead">
          You can use new <strong>Icon</strong> component to conveniently
          display icons.
        </p>
        <SyntaxHighlighter
          language="javascript"
          style={tomorrow}
          className="rounded shadow p-4"
        >
          {`<Icon icon="smartphone-1" className="w-3rem h-3rem mb-5 svg-icon-light" />`}
        </SyntaxHighlighter>
        <p className="text-muted text-large mt-4">
          For a complete icon reference, see{" "}
          <a href="https://demo.bootstrapious.com/directory/1-4/icons/demo.html">
            here
          </a>
          .
        </p>
      </div>
      <div className="mt-5">
        <Row>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="smartphone-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="telephone-operator-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="airplane-mode-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="destination-map-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="beach-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="dollar-sign-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="open-box-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon icon="pen-1" className="w-3rem h-3rem mb-5 svg-icon-light" />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon icon="pay-1" className="w-3rem h-3rem mb-5 svg-icon-light" />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="giftbox-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="store-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
          <Col xs="3" md="2" className="d-flex justify-content-center">
            <Icon
              icon="bank-cards-1"
              className="w-3rem h-3rem mb-5 svg-icon-light"
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default IconsDirectory
