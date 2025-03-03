import React from "react"
import Link from "next/link"

import { Container, Row, Col, Breadcrumb, Card } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Docs Changelog",
    },
  }
}

const DocsChangelog = () => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-7">
        <Container className="position-relative">
          <Breadcrumb listProps={{ className: "ps-0 justify-content-center" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/docs/docs-introduction" passHref>
              <Breadcrumb.Item>Documentation</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Changelog</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="hero-heading">Changelog</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container fluid>
          <Row className="px-xl-5">
            <Col lg="2">
              <DocsNav />
            </Col>
            <Col lg="10" xl="8" className="docs-content">
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.5</h5>
                <div className="docs-desc">
                  <p className="text-muted">July 13, 2023</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        - <strong>update:</strong> Updated to Bootstrap 5.3.0, React Bootstrap 2.8.0 (affected file: src/scss/custom/_forms.scss)
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.4</h5>
                <div className="docs-desc">
                  <p className="text-muted">October 9, 2022</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        - <strong>update:</strong> Updated to NextJS 12.3.1,
                        React 18.2.0, Bootstrap 5.2.1, FontAwesome 6, Leaflet
                        1.9.1, React Select 5.4.0,{"\n"} Swiper 8.3.2, React
                        Bootstrap 2.5.0, React Leaflet 4.1.0 and many more
                        {"\n"}
                        {"-"} <strong>new:</strong> Converted from React Image
                        Lightbox to Yet Another React Lightbox for React 18
                        support (see docs{" "}
                        <a href="https://yet-another-react-lightbox.com/">
                          here
                        </a>
                        ){"\n"}
                        {"-"} <strong>new:</strong> Converted from
                        next-react-svg to @svgr/webpack{"\n"}
                        {"-"} <strong>improvement:</strong> Removed Next Compose
                        Plugins and transformed next.config.js to native Nextjs
                        code
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.3</h5>
                <div className="docs-desc">
                  <p className="text-muted">February 3, 2022</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        - <strong>fix:</strong> Fixed compatibility issue with
                        NPM version 7+
                        <br /> (using react-day-picker instead of react-dates,
                        <br />
                        see pages: category-2-rooms, category-3-rooms.js,
                        detail-rooms.js)
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.2</h5>
                <div className="docs-desc">
                  <p className="text-muted">January 22, 2022</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        - <strong>fix:</strong> Fixed Webpack SVG escaping
                        problem on Windows
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.1</h5>
                <div className="docs-desc">
                  <p className="text-muted">November 12, 2021</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        - <strong>improved:</strong> Added sizes prop to
                        CardRestaurant & CardRoom components (for <img /> sizes
                        prop), added sizes prop to these components in
                        /category-* pages for better image rendering{"\n"}-{" "}
                        <strong>fix:</strong> Resize bug in MapLeaflet component
                        from v2.0.0, updated react-leaflet to 3.2.2. (MapLeaflet
                        component updated accordingly) {"\n"}
                        {"-"} <strong>improved:</strong> Added a Orion Icons SVG
                        sprite demo to src/assets/svg {"\n"}
                        {"-"} <strong>improved:</strong> Updated Browserslist
                        config in package.json to align with B5
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div id="version1.1.0" className="docs-item">
                <h5 className="text-uppercase mb-4">Version 2.0.0</h5>
                <div className="docs-desc">
                  <p className="text-muted">November 5, 2021</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        {"-"} <strong>update:</strong> Updated to Bootstrap 5
                        {"\n"}
                        {"-"} <strong>new:</strong> Converted from ReactStrap to
                        React Bootstrap package (see docs{" "}
                        <a href="https://react-bootstrap.github.io/components/alerts">
                          here
                        </a>
                        ){"\n"}
                        {"-"} <strong>new:</strong> Font Awesome React component
                        (see usage{" "}
                        <a href="https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react">
                          here
                        </a>
                        ){"\n"}
                        {"-"} <strong>new:</strong> Avatar component (
                        <code>src/components/Avatar</code>){"\n"}
                        {"-"} <strong>new:</strong> Header component is split to
                        multiple components for better readiblity (
                        <code>src/components/Header</code>){"\n"}
                        {"-"} <strong>updated packages:</strong> NPM update,
                        Next.js (12.0.1), Swiper (7.0.6), Sass 1.38.1{"\n"}-{" "}
                        <strong>new:</strong> next-react-svg,
                        next-compose-plugin (next.config.js)
                        {"\n"}- <strong>improved:</strong> Removed Swiper react
                        wrapper (ReactIdSwiper). Using Swiper.js's react
                        component
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div id="version1.1.0" className="docs-item">
                <h5 className="text-uppercase mb-4">Version 1.1.0</h5>
                <div className="docs-desc">
                  <p className="text-muted">December 15, 2020</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">
                      <pre className="card-text">
                        {"-"} <strong>new pages:</strong> Invoice (
                        <code>/user-invoice</code>),
                        {"\n"}
                        &nbsp;&nbsp;User messages (<code>/user-messages</code>),
                        {"\n"}
                        &nbsp;&nbsp;User messages - Conversation (
                        <code>/user-messages-detail</code>),{"\n"}
                        &nbsp;&nbsp;Knowledge Base (<code>/knowledge-base</code>
                        ),{"\n"}
                        &nbsp;&nbsp;Knowledge Base - Topic(
                        <code>/knowledge-base-topic</code>),{"\n"}
                        &nbsp;&nbsp;Terms &amp; Conditions (<code>/terms</code>)
                        {"\n"}- <strong>next/image:</strong> &lt;img&gt;
                        elements converted to new Next.js Image component.{" "}
                        <a
                          href="https://nextjs.org/docs/api-reference/next/image"
                          target="_blank"
                        >
                          Read more on Next.js
                        </a>{" "}
                        and{" "}
                        <Link href="/docs/components-directory#images">
                          <a>in our docs</a>
                        </Link>
                        {"\n"}- <strong>new icon component:</strong> new
                        component for using Orion Icons.{" "}
                        <Link href="/docs/components-directory#icons-directory">
                          <a>Read more</a>
                        </Link>
                        {"\n"}- <strong>new svg icons component:</strong> new
                        component for cached loading of svg sprites.{"\n"}-{" "}
                        <strong>new:</strong> much simpler Map component
                        importing{"\n"}-{" "}
                        <strong>improved optimization & performance</strong>
                        {"\n"}- <strong>improved IE support</strong>
                        {"\n"}- <strong>new:</strong> Object-Fit polyfill
                        (_app.js, package.json){"\n"}-{" "}
                        <strong>updated packages:</strong> NPM update, Next.js
                        (10.0.3){"\n"}- <strong>new:</strong> next-react-svg,
                        next-compose-plugin (next.config.js){"\n"}-{" "}
                        <strong>fixed:</strong> named exports
                        {"\n"}- <strong>fixed:</strong> display issues in
                        Comparison Page (compare.js)
                        {"\n"}- <strong>improved:</strong> Google Fonts Loading
                        (package.json, Layout.js)
                        {"\n"}- <strong>improved:</strong> Font Awesome moved to
                        _app.js & removed CDN (_app.js, Layout.js)
                        {"\n"}- <strong>improved:</strong> Swiper SCSS moved
                        into _swiper.scss & removed CDN (_app.js, Layout.js)
                      </pre>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div id="version1.0.0" className="docs-item">
                <h5 className="text-uppercase mb-4">Version 1.0.0</h5>
                <div className="docs-desc">
                  <p className="text-muted">June 30, 2020</p>
                </div>
                <div className="mt-5">
                  <Card className="bg-gray-100 border-0">
                    <Card.Body className="py-4">Initial Release</Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default DocsChangelog
