import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  Dropdown,
  NavItem,
  NavLink,
} from "react-bootstrap"
import Icon from "../../Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const NavbarComponent = () => {
  const [dropdown1, setDropdown1] = useState(false)
  const [dropdown2, setDropdown2] = useState(false)
  const [dropdown3, setDropdown3] = useState(false)
  return (
    <div id="navbar" className="docs-item element">
      <h5 className="text-uppercase mb-4">Navbar</h5>
      <div className="docs-desc">
        <p className="lead">
          {" "}
          Bootstrap’s powerful, responsive navigation header, the navbar.
          Includes support for branding, navigation, and more, including support
          for our collapse plugin. See the{" "}
          <a href="https://react-bootstrap.github.io/components/navbar/">
            React Bootstrap documentation
          </a>
          for more details.{" "}
        </p>
      </div>
      <div className="mt-5">
        <Navbar expand="lg" variant="light" className="shadow mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="text-uppercase fw-bold">
              <span>Directory </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Nav.Item className="active">
                  <Nav.Link href="#">
                    Home <span className="sr-only">(current)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">Link</Nav.Link>
                </Nav.Item>
                <Dropdown
                  as={NavItem}
                  onToggle={() => setDropdown1(!dropdown1)}
                >
                  <Dropdown.Toggle as={NavLink}>Dropdown</Dropdown.Toggle>
                  <Dropdown.Menu className={`${!dropdown1 ? "hide" : ""}`}>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item>
                  <Nav.Link href="#" disabled>
                    Disabled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Form className="my-2 my-lg-0 d-sm-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="me-sm-2"
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="my-2 my-sm-0"
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar expand="lg" variant="light" className="shadow mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              <span className="fw-bold text-uppercase">Directory </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav navbar className="mx-auto">
                <Nav.Item className="active">
                  <Nav.Link href="#">
                    Home <span className="sr-only">(current)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">Link</Nav.Link>
                </Nav.Item>
                <Dropdown
                  as={NavItem}
                  onToggle={() => setDropdown2(!dropdown2)}
                >
                  <Dropdown.Toggle as={NavLink}>Dropdown</Dropdown.Toggle>
                  <Dropdown.Menu className={`${!dropdown2 ? "hide" : ""}`}>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
              <div className="right-col d-flex align-items-center justify-content-between justify-content-lg-end my-3 my-lg-0">
                <Nav.Item as="div" className="navbar-icon-link">
                  <Icon icon="search-1" />
                </Nav.Item>
                <Nav.Item as="div" className="user">
                  <a href="#" className="navbar-icon-link">
                    <Icon icon="male-user-1" />
                    <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">
                      Log in
                    </span>
                  </a>
                </Nav.Item>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar expand="lg" variant="dark" bg="dark" className="shadow mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              <span className="fw-bold text-uppercase">Directory </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-label="Toggle navigation">
              <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse>
              <Nav className="mx-auto">
                <Nav.Item className="active">
                  <Nav.Link href="#">
                    Home <span className="sr-only">(current)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#">Link</Nav.Link>
                </Nav.Item>
                <Dropdown
                  as={NavItem}
                  onToggle={() => setDropdown3(!dropdown3)}
                >
                  <Dropdown.Toggle as={NavLink}>Dropdown</Dropdown.Toggle>
                  <Dropdown.Menu className={`${!dropdown3 ? "hide" : ""}`}>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
              <div className="right-col d-flex align-items-center justify-content-between justify-content-lg-end my-3 my-lg-0">
                <Nav.Item as="div" className="navbar-icon-link">
                  <Icon icon="search-1" />
                </Nav.Item>
                <Nav.Item as="div" className="user">
                  <a href="#" className="navbar-icon-link">
                    <Icon icon="male-user-1" />
                    <span className="text-sm ms-2 ms-lg-0 text-uppercase text-sm fw-bold d-none d-sm-inline d-lg-none">
                      Log in
                    </span>
                  </a>
                </Nav.Item>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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

export default NavbarComponent

const highlightCode = `import React, { useState } from 'react'
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  Dropdown,
  NavItem,
  NavLink
} from "react-bootstrap"

export default () => {
    const [dropdown1, setDropdown1] = useState(false)
    
    return (
      <Navbar expand="lg" variant="light" className="shadow mb-3">
        <Container fluid>
          <Navbar.Brand href="/" className="text-uppercase fw-bold">
            <span>Directory</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item className="active">
                <Nav.Link href="#">
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">Link</Nav.Link>
              </Nav.Item>
              <Dropdown
                  as={NavItem}
                  onToggle={() => setDropdown(!dropdown)}
                >
                  <Dropdown.Toggle as={NavLink}>Dropdown</Dropdown.Toggle>
                  <Dropdown.Menu className={!dropdown ? "hide" : ""}>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              <Nav.Item>
                <Nav.Link href="#" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Form className="my-2 my-lg-0 d-sm-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-sm-2"
              />
              <Button
                type="submit"
                variant="outline-primary"
                className="my-2 my-sm-0"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}`
