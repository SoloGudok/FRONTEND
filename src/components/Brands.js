import React, { useState, useEffect } from "react"

import { Container } from "react-bootstrap"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import Image from "./CustomImage"

const Brands = (props) => {
  const [domLoaded, setDomLoaded] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  const params = {
    className: `swiper-container brands-slider pb-5`,
    slidesPerView: 2,
    modules: [Pagination],
    spaceBetween: 15,
    loop: true,
    roundLengths: true,
    pagination: props.pagination !== undefined && {
      type: "bullets",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      991: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
    },
  }

  return (
    <section className={`py-6 ${props.greyBackground ? "bg-gray-100" : ""}`}>
      <Container>
        <h5 className="text-center text-uppercase letter-spacing-3 mb-5">
          {props.title}
        </h5>
        {domLoaded && (
          <Swiper {...params}>
            {props.brands.map((brand, index) => (
              <SwiperSlide
                key={index}
                className="h-auto d-flex align-items-center justify-content-center"
              >
                <div className="w-6rem opacity-7">
                  <Image
                    src={`/content/${brand.img}`}
                    width={151}
                    height={150}
                    layout="intrinsic"
                    alt={brand.title}
                    className="img-fluid"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  )
}

export default Brands
