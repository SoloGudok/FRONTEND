import React from "react"

import { Row, Col } from "react-bootstrap"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Image from "./CustomImage"

const Gallery = (props) => {
  const data = props.data
  const [lightBoxOpen, setLightBoxOpen] = React.useState(false)
  const [activeImage, setActiveImage] = React.useState(0)

  const onClick = (index) => {
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }
  return (
    <React.Fragment>
      <Row className={props.rowClasses}>
        {data.map((item, index) => (
          <Col
            key={index}
            xs={props.xs}
            sm={props.sm}
            md={props.md}
            lg={props.lg}
            xl={props.xl}
            className={props.colClasses}
          >
            <Image
              key={index}
              src={`/content/img/photo/${item.img}`}
              width={1350}
              height={900}
              alt={item.alt}
              layout="responsive"
              className="img-fluid img-gallery"
              sizes="(max-width:991px) 50vw, 240px"
              onClick={() => onClick(index)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ))}
      </Row>

      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={data?.map((image) => ({
          alt: image.alt,
          src: `/content/img/photo/` + image.img,
        }))}
        index={activeImage}
      />
    </React.Fragment>
  )
}

export default Gallery
