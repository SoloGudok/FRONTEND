import Image from "./CustomImage"
import React, { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { Navigation } from "swiper"
const SwiperGallery = (props) => {
  const [domLoaded, setDomLoaded] = useState(false)
  useEffect(() => {
    setDomLoaded(true)
  }, [])
  const data = props.data
  const [lightBoxOpen, setLightBoxOpen] = React.useState(false)
  const [activeImage, setActiveImage] = React.useState(0)
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const params = {
    slidesPerView: 3,
    modules: [Navigation],
    spaceBetween: 0,
    loop: true,
    roundLengths: true,
    centeredSlides: true,
    navigation: {
      nextEl: navigationPrevRef.current,
      prevEl: navigationPrevRef.current,
    },
  }

  return (
    <React.Fragment>
      {domLoaded && (
        <Swiper
          {...params}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="img-gallery"
              onClick={() => (setLightBoxOpen(true), setActiveImage(index))}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={`/content/img/photo/${item.img}`}
                width={1350}
                height={900}
                layout="responsive"
                alt={item.alt}
                loading="eager"
                className="img-fluid img-gallery"
                sizes="35vw"
              />
            </SwiperSlide>
          ))}
          <div
            ref={navigationPrevRef}
            className="swiper-button-prev swiper-button-white"
          />
          <div
            ref={navigationNextRef}
            className="swiper-button-next swiper-button-white"
          />
        </Swiper>
      )}
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

export default SwiperGallery
