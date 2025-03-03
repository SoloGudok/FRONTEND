import React from "react"
import Link from "next/link"

import { Container, Row, Col, Nav } from "react-bootstrap"

import CardRoom from "../components/CardRoom"
import ResultsTopBar from "../components/ResultsTopBar"
import Pagination from "../components/Pagination"
import Map from "../components/Map"

import data from "../data/category-rooms.json"
import geoJSON from "../data/rooms-geojson.json"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms | Category - Map on the top",
    },
  }
}

const CategoryRooms = () => {
  const [hoverCard, setHoverCard] = React.useState(null)
  const onCardEnter = (id) => {
    setHoverCard(id)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }
  return (
    <React.Fragment>
      <section>
        <div className="map-wrapper-450">
          <Map
            center={[51.505, -0.09]}
            className="h-100"
            zoom={14}
            geoJSON={geoJSON}
            hoverCard={hoverCard}
          />
        </div>
      </section>
      <section className="py-5 bg-gray-100 shadow">
        <Container>
          <h1>{data.title && data.title}</h1>
          <p className="lead mb-5">{data.content && data.content}</p>
          {data.cityQuarters && (
            <React.Fragment>
              <h5>{data.cityQuarters.title}</h5>
              <Nav className="nav-pills-custom">
                {data.cityQuarters.items.map((pill, index) => (
                  <Nav.Item key={pill.title}>
                    <Link href={pill.link} passHref>
                      <Nav.Link className={index === 0 ? "active" : ""}>
                        {pill.title}
                      </Nav.Link>
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>
            </React.Fragment>
          )}
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <ResultsTopBar sortBy={data.sortby} />
          <Row>
            {geoJSON.features &&
              geoJSON.features.map((room) => (
                <Col
                  key={room.properties.name}
                  sm="6"
                  lg="4"
                  className="mb-5 hover-animate"
                  onMouseEnter={() => onCardEnter(room.properties.id)}
                  onMouseLeave={() => onCardLeave()}
                >
                  <CardRoom
                    data={room.properties}
                    sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, 420px"
                  />
                </Col>
              ))}
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CategoryRooms
