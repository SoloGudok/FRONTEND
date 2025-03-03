import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Card, Accordion, useAccordionButton, Form } from "react-bootstrap"

const AccordionComponent = () => {
  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey)
    return (
      <span
        style={{ cursor: "pointer" }}
        className="text-primary accordion-link"
        onClick={decoratedOnClick}
      >
        {children}
      </span>
    )
  }
  return (
    <div id="accordion" className="docs-item element">
      <h5 className="text-uppercase mb-4">Accordion</h5>
      <div className="docs-desc">
        <p className="lead">
          Block components used to create an Accordion using Bootstrap' collapse
          plugin.
        </p>
      </div>
      <div className="mt-5">
        <div role="tablist">
          <Accordion defaultActiveKey="1">
            <Card className="border-0 shadow mb-3">
              <Card.Header className="bg-primary-100 border-0 py-0">
                <CustomToggle eventKey="0">Option one</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="py-5">
                  <p className="text-muted">
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget, tempor sit amet, ante. Donec
                    eu libero sit amet quam egestas semper. Aenean ultricies mi
                    vitae est. Mauris placerat eleifend leo. Quisque sit amet
                    est et sapien ullamcorper pharetra. Vestibulum erat wisi,
                    condimentum sed, commodo vitae, ornare sit amet, wisi.
                    Aenean fermentum, elit eget tincidunt condimentum, eros
                    ipsum rutrum orci, sagittis tempus lacus enim ac dui.{" "}
                  </p>
                  <p className="text-muted mb-0">
                    Donec non enim in turpis pulvinar facilisis. Ut felis.
                    Praesent dapibus, neque id cursus faucibus, tortor neque
                    egestas augue, eu vulputate magna eros eu erat. Aliquam erat
                    volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
                    facilisis luctus, metus
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="border-0 shadow mb-3">
              <Card.Header className="bg-primary-100 border-0 py-0">
                <CustomToggle eventKey="1">Paypal</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="py-5">
                  <Form.Check
                    type="radio"
                    name="shippping"
                    id="payment-method-1"
                    className="d-flex align-items-center"
                  >
                    <Form.Check.Input type="radio" />
                    <Form.Check.Label className="ms-3">
                      <strong className="d-block text-uppercase mb-2">
                        Pay with PayPal
                      </strong>
                      <span className="text-muted text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </span>
                    </Form.Check.Label>
                  </Form.Check>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="border-0 shadow mb-3">
              <Card.Header className="bg-primary-100 border-0 py-0">
                <CustomToggle eventKey="2">Pay on delivery</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body className="py-5">
                  <Form.Check
                    type="radio"
                    name="shippping"
                    id="payment-method-2"
                    className="d-flex align-items-center"
                  >
                    <Form.Check.Input type="radio" />
                    <Form.Check.Label className="ms-3">
                      <strong className="d-block text-uppercase mb-2">
                        Pay on delivery
                      </strong>
                      <span className="text-muted text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                      </span>
                    </Form.Check.Label>
                  </Form.Check>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
      <div className="mt-5">
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

export default AccordionComponent

const highlightCode = `import { Card, Accordion, useAccordionButton } from "react-bootstrap"

const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey)
    return (
      <span
        style={{ cursor: "pointer" }}
        className="text-primary accordion-link"
        onClick={decoratedOnClick}
      >
        {children}
      </span>
    )
  }
return (
<div role="tablist">
    <Accordion defaultActiveKey="1">
        <Card className="border-0 shadow mb-3">
            <Card.Header className="bg-primary-100 border-0 py-0">
                <CustomToggle eventKey="0">Option one</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body className="py-5">
                    <p className="text-muted">...</p>
                    <p className="text-muted mb-0">...</p>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card className="border-0 shadow mb-3">
            <Card.Header className="bg-primary-100 border-0 py-0">
                <CustomToggle eventKey="1">Paypal</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body className="py-5">
                    <p className="text-muted">...</p>
                    <p className="text-muted mb-0">...</p>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
</div>
)`
