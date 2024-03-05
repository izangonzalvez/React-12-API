import { Button } from "react-bootstrap";

export default function Contact() {
  return (
    <>
      <div className="bg-contact">
        <div className="video-container">
          <video autoPlay loop muted className="bg-video">
            <source src="/src/contact/video/bg-video.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>
        <div className="content-overlay">
          <h1 className="text-primary">Contactan's</h1>
          <h2 className="text-primary">Envia el teu missatge</h2>
          <Button variant="primary">
            <a href="/contact/form" accessKey="Ñ">
              Formulari de contacte
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
