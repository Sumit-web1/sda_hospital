import React from "react";
import "./LogoMarquee.css";

// Import logos from assets
import AdityaBirla from "../assets/Logomarque/Aditya Birla.jpeg";
import Volo from "../assets/Logomarque/Volo.png";
import Vidal from "../assets/Logomarque/Vidal.jpeg";
import Universal from "../assets/Logomarque/Universal.png";
import TataAIG from "../assets/Logomarque/Tata AIG.png";
import Reliance from "../assets/Logomarque/Reliance.png";
import Paramount from "../assets/Logomarque/Paramount.png";
import MedSave from "../assets/Logomarque/Med Save.png";
import MDIndia from "../assets/Logomarque/MD India.png";
import IffcoTokio from "../assets/Logomarque/Iffco Tokio.png";
import ICICI from "../assets/Logomarque/ICICI.png";
import HDFC from "../assets/Logomarque/HDFC.png";
import FutureGenerali from "../assets/Logomarque/Future Generali.png";
import FHPL from "../assets/Logomarque/FHPL.png";

const logos = [
  AdityaBirla,
  Volo,
  Vidal,
  Universal,
  TataAIG,
  Reliance,
  Paramount,
  MedSave,
  MDIndia,
  IffcoTokio,
  ICICI,
  HDFC,
  FutureGenerali,
  FHPL,
];

const LogoMarquee = () => {
  return (
    <div className="logo-marquee-section">
      <h2 className="marquee-heading">
        Cashless Insurance Available at SDA Hospital
      </h2>
      <div className="marquee-container">
        <div className="marquee">
          {logos.map((logo, index) => (
            <div className="logo-wrapper" key={index}>
              <img src={logo} alt={`Insurance Partner Logo ${index + 1}`} />
            </div>
          ))}
          {/* Repeat logos for smooth continuous scroll */}
          {logos.map((logo, index) => (
            <div className="logo-wrapper" key={`repeat-${index}`}>
              <img src={logo} alt={`Insurance Partner Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;