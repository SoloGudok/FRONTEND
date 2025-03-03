import React from "react"
import { Container } from "react-bootstrap"
import Image from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faVimeo,
} from "@fortawesome/free-brands-svg-icons"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      hideHeader: true,
      hideFooter: true,
      noPaddingTop: true,
      title: "Coming soon",
    },
  }
}

const ComingSoon = () => {
  const social = [
    {
      icon: "twitter",
      link: "#",
    },
    {
      icon: "facebook",
      link: "#",
    },
    {
      icon: "instagram",
      link: "#",
    },
    {
      icon: "pinterest",
      link: "#",
    },
    {
      icon: "vimeo",
      link: "#",
    },
  ]
  return (
    <div className="mh-full-screen d-flex align-items-center dark-overlay">
      <Image
        src="/content/img/photo/photo-1490578474895-699cd4e2cf59.jpg"
        alt="Coming Soon"
        className="bg-image"
        loading="eager"
        layout="fill"
        priority={true}
      />
      <Container className="text-white text-center text-lg overlay-content py-6 py-lg-0">
        <h1 className="sr-only">Coming soon</h1>
        <div className="mb-6 mx-auto">
          <Image
            src="/content/img/coming-soon.png"
            width={489}
            height={279}
            layout="intrinsic"
            alt="Coming Soon"
            className="img-fluid"
            priority
          />
        </div>

        <h3 className="mb-5 text-shadow">
          Our directory is coming to you soon.
        </h3>
        <p className="fw-light mb-4">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Directory
          Ltd. | 25 Baker St., LB8 E18 London, UK
        </p>
        <ul className="list-inline">
          {social &&
            social.map((icon) => {
              let socialIcon
              switch (icon.icon) {
                case "facebook":
                  socialIcon = faFacebook
                  break
                case "instagram":
                  socialIcon = faInstagram
                  break
                case "pinterest":
                  socialIcon = faPinterest
                  break
                case "vimeo":
                  socialIcon = faVimeo
                  break
                default:
                  socialIcon = faTwitter
              }
              return (
                <li key={icon.icon} className="list-inline-item">
                  <a
                    href={icon.link}
                    target="_blank"
                    title={icon.icon}
                    className="text-white"
                  >
                    <FontAwesomeIcon icon={socialIcon} />
                  </a>
                </li>
              )
            })}
        </ul>
      </Container>
    </div>
  )
}

export default ComingSoon
