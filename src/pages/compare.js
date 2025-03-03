import React from "react"

import Link from "next/link"

import {
  Container,
  Row,
  Button,
  Table,
  Breadcrumb,
  Badge,
} from "react-bootstrap"

import Stars from "../components/Stars"

import data from "../data/compare.json"
import Icon from "../components/Icon"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Compare",
    },
  }
}

const Compare = () => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-7">
        <Container className="position-relative">
          <Breadcrumb listProps={{ className: "ps-0 justify-content-center" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{data.title}</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="hero-heading">{data.title}</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            <Table striped responsive="xs" hover className="text-gray-700">
              <tbody>
                <tr className="no-hover no-stripe">
                  <th className="border-bottom-0" />
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        style={{ minWidth: "200px" }}
                        className="border-bottom-0 pb-0"
                      >
                        <Link href="/detail-rooms">
                          <a className="d-inline-block text-reset text-decoration-none">
                            <span className="h6">{column.title}</span>
                            <br />
                            <span className="text-xs">
                              <Stars stars={column.stars} />
                            </span>
                            {column.badge && (
                              <React.Fragment>
                                <br />
                                <Badge
                                  bg={column.badgeColor + "-light"}
                                  text={column.badgeColor}
                                  className="mt-3"
                                >
                                  {column.badge}
                                </Badge>
                              </React.Fragment>
                            )}
                          </a>
                        </Link>
                      </td>
                    ))}
                </tr>
                <tr className="no-hover no-stripe">
                  <th className="border-bottom-0" />
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        style={{ minWidth: "200px" }}
                        className="border-bottom-0"
                      >
                        <Link href="detail-rooms">
                          <a className="d-inline-block hover-animate">
                            {/* not using Image component here as it's not working well in a table cell */}
                            <img
                              src={`/content/img/photo/${column.img}`}
                              alt={column.title}
                              className="img-fluid rounded"
                            />
                          </a>
                        </Link>
                      </td>
                    ))}
                </tr>
                <tr className="no-hover no-stripe">
                  <th className="border-top-0" />
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td key={column.title} className="border-top-0">
                        <strong className="text-sm">
                          {column.price}/night
                        </strong>
                        <Button
                          href="#"
                          size="sm"
                          variant="outline-primary"
                          className="float-end"
                        >
                          Book
                        </Button>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Area</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle"
                      >
                        {column.area} sq.m.
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Rooms</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle"
                      >
                        {column.rooms}
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Bedrooms</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle"
                      >
                        {column.bedrooms}
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Bathrooms</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle"
                      >
                        {column.bathrooms}
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Air conditioning</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative position-relative"
                      >
                        {column.airconditioning}
                        <Icon
                          icon={
                            column.airconditioning ? "checkmark-1" : "close-1"
                          }
                          className={`svg-icon-lg text-${
                            column.airconditioning ? "success" : "danger"
                          }`}
                        />
                        <span className="sr-only">
                          {column.airconditioning ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Swimming pool</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative"
                      >
                        {column.swimmingpool}
                        <Icon
                          icon={column.swimmingpool ? "checkmark-1" : "close-1"}
                          className={`svg-icon-lg text-${
                            column.swimmingpool ? "success" : "danger"
                          }`}
                        />
                        <span className="sr-only">
                          {column.swimmingpool ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Laundry</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative"
                      >
                        {column.laundry}
                        <Icon
                          icon={column.laundry ? "checkmark-1" : "close-1"}
                          className={`svg-icon-lg text-${
                            column.laundry ? "success" : "danger"
                          }`}
                        />
                        <span className="sr-only">
                          {column.laundry ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Window covering</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative"
                      >
                        {column.windowcovering}
                        <Icon
                          icon={
                            column.windowcovering ? "checkmark-1" : "close-1"
                          }
                          className={`svg-icon-lg text-${
                            column.windowcovering ? "success" : "danger"
                          }`}
                        />
                        <span className="sr-only">
                          {column.windowcovering ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Gym</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative"
                      >
                        {column.gym}
                        <Icon
                          icon={column.gym ? "checkmark-1" : "close-1"}
                          className={`svg-icon-lg text-${
                            column.gym ? "success" : "danger"
                          }`}
                        />
                        <span className="sr-only">
                          {column.gym ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr>
                  <th className="py-4 align-middle">Internet</th>
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td
                        key={column.title}
                        className="py-4 text-center align-middle position-relative"
                      >
                        {column.internet}
                        <Icon
                          icon={column.internet ? "checkmark-1" : "close-1"}
                          className={`svg-icon-lg text-${
                            column.internet ? "success" : "danger"
                          }`}
                        />

                        <span className="sr-only">
                          {column.internet ? "Yes" : "No"}
                        </span>
                      </td>
                    ))}
                </tr>
                <tr className="no-hover no-stripe">
                  <th />
                  {data.table &&
                    data.table.columns.map((column) => (
                      <td key={column.title} className="text-center">
                        <Button variant="outline-muted" href="#">
                          Remove
                        </Button>
                      </td>
                    ))}
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Compare
