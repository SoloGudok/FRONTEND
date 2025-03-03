import {
  faAddressBook,
  faAddressCard,
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faAllergies,
  faAmbulance,
  faAmericanSignLanguageInterpreting,
  faAnchor,
  faAngleDoubleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArchive,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons"
import {
  faAddressBook as farAddressBook,
  faAddressCard as farAddressCard,
  faArrowAltCircleDown as farArrowAltCircleDown,
} from "@fortawesome/free-regular-svg-icons"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

const IconsFontAwesome = () => {
  const icons = [
    faAddressBook,
    farAddressBook,
    faAddressCard,
    farAddressCard,
    faAdjust,
    faAlignCenter,
    faAlignJustify,
    faAlignLeft,
    faAlignRight,
    faAllergies,
    faAmbulance,
    faAmericanSignLanguageInterpreting,
    faAnchor,
    faAngleDoubleDown,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDoubleUp,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArchive,
    faArrowAltCircleDown,
    farArrowAltCircleDown,
  ]
  return (
    <div id="icons-fontawesome" className="docs-item">
      <h5 className="text-uppercase mb-4">Icons - Font Awesome</h5>
      <div className="docs-desc">
        <p className="lead">
          Vector icons and social logos on your website with Font Awesome, the
          web’s most popular icon set and toolkit.
        </p>
        <p className="text-muted text-large">
          These icons are mostly used in buttons or for social network links.
          For a complete icon reference, see{" "}
          <a href="https://fontawesome.com/icons?d=gallery">here</a>.
        </p>
        <p className="text-muted text-large">
          Learn more about usage with React{" "}
          <a href="https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react">
            here
          </a>
          .
        </p>
      </div>
      <div className="mt-5">
        <ul className="list-unstyled">
          {icons.map((icon, index) => (
            <li key={index} className="list-inline-item h5 mr-3">
              <FontAwesomeIcon icon={icon} />
            </li>
          ))}
        </ul>
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

export default IconsFontAwesome

const highlightCode = `import { faAddressBook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

return (
    <FontAwesomeIcon icon={faAddressBook} />
)`
