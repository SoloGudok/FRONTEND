import React from "react"

import Link from "next/link"

import { Container, Row, Col, Pagination, Button, Card } from "react-bootstrap"

import CardPost from "../components/CardPost"

import data from "../data/blog.json"
import Image from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Blog",
    },
  }
}

const Blog = () => {
  const featuredPost = data.posts[0]

  return (
    <React.Fragment>
      {featuredPost && (
        <section className="position-relative py-6">
          {featuredPost.img && (
            <Image
              src={`/content/${featuredPost.img}`}
              alt={featuredPost.title}
              className="bg-image"
              loading="eager"
              layout="fill"
              priority={true}
            />
          )}
          <Container className="position-relative">
            <Row>
              <Col lg="6">
                <Card>
                  <Card.Body className="p-5">
                    <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">
                      {featuredPost.subtitle}
                    </strong>
                    <h2 className="mb-3">{featuredPost.title}</h2>
                    <p className="text-muted">{featuredPost.content}</p>
                    <Link
                      href="/blog/[slug]"
                      as={`/blog/${featuredPost.slug}`}
                      passHref
                    >
                      <Button variant="link" className="p-0">
                        Continue reading{" "}
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <section className="py-6">
        <Container>
          <Row className="mb-5">
            {data.posts &&
              data.posts.map((post, index) => {
                // the first post is featured
                if (index >= 1)
                  return (
                    <Col
                      key={index}
                      sm="6"
                      lg="4"
                      className="mb-4 hover-animate"
                    >
                      <CardPost data={post} index={index} />
                    </Col>
                  )
              })}
          </Row>
          <Pagination
            aria-label="Page navigation example"
            className="d-flex justify-content-between mb-5"
          >
            <Pagination.Item href="#" className="text-sm">
              <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
              Older posts
            </Pagination.Item>
            <Pagination.Item href="#" className="disabled text-sm">
              Newer posts
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Pagination.Item>
          </Pagination>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Blog
