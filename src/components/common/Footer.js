import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Footer = (props) => {
  return (
    <Navbar expand="lg" fixed="bottom" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className="fs-6">
          SpendWize
        </Navbar.Brand>

        <cite className="text-muted" style={{ fontSize: "small" }}>
          created by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/coldcoffeee"
            className="text-decoration-none"
          >
            coldcoffeee
          </a>
        </cite>
      </Container>
    </Navbar>
  );
};

export default Footer;
