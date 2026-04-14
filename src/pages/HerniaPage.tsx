import React, { useState } from "react";
import "./HerniaPage.css";
import doctorImg from "../assets/dr-kg-mathew.png";

const HerniaPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleBox = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const types = [
    {
      title: "Inguinal Hernia",
      text:
        "This is the most common type of hernia, especially among men. It occurs when a portion of the intestine or fatty tissue pushes through a weakened area in the lower abdominal wall, near the groin. It can cause discomfort, swelling, pain while lifting, and sometimes a visible bulge. Left untreated, it may lead to complications such as incarceration or strangulation."
    },
    {
      title: "Femoral Hernia",
      text:
        "Femoral hernias occur when abdominal tissue pushes into the femoral canal, which sits just below the groin. These are more common in women and often harder to detect. They carry a higher risk of becoming strangulated, making early diagnosis important. Symptoms may include groin pain, lower abdominal discomfort, or a lump near the upper thigh."
    },
    {
      title: "Umbilical Hernia",
      text:
        "Common in babies and adults, this hernia develops when part of the intestine pushes through the abdominal wall near the belly button. In infants, it often resolves naturally, but in adults it may enlarge and require surgical repair. Symptoms include swelling, pain near the navel, and discomfort when coughing or lifting."
    },
    {
      title: "Hiatal Hernia",
      text:
        "A hiatal hernia occurs when part of the stomach moves upward into the chest cavity through the diaphragm. It is closely associated with acid reflux and GERD. Symptoms include heartburn, chest discomfort, difficulty swallowing, and sometimes breathing problems. Large hiatal hernias may require surgical correction."
    },
    {
      title: "Incisional Hernia",
      text:
        "This type develops at the site of a previous abdominal surgery. When the surgical wound fails to heal properly or weakens over time, tissues can push through the incision area. Risk factors include obesity, heavy lifting, wound infection, or multiple surgeries. Incisional hernias often grow larger and usually require mesh repair surgery."
    },
    {
      title: "Epigastric Hernia",
      text:
        "These occur between the belly button and the chest, along the midline of the abdomen. They are caused by the protrusion of fat or tissue through the abdominal muscles. Symptoms include upper abdominal pain, swelling, and discomfort during physical activity. They often appear in multiples and usually require corrective surgery."
    },
    {
      title: "Spigelian Hernia",
      text:
        "A rare form of hernia, occurring along the edge of the abdominal muscles. Because it develops below the layers of muscle, it is often difficult to detect. Symptoms may include sharp abdominal pain, a subtle bulge, or discomfort during bending or lifting. These hernias carry a higher risk of complications."
    },
    {
      title: "Obturator Hernia",
      text:
        "One of the rarest hernia types, commonly seen in elderly women. It occurs when tissue pushes through the obturator canal in the pelvis. Symptoms are often vague—pelvic pain, inner thigh discomfort, or bowel obstruction—making diagnosis difficult. Surgical repair is required once identified."
    }
  ];

  return (
    <div className="hernia-page">
      <div className="hernia-container">

<div className="doctor-wrapper">
  <img src={doctorImg} alt="Dr. K G Mathew" className="imgdoctor" />
</div>


        <div className="hernia-right">
          <h1 className="title">Dr. K G Mathew</h1>
          <h2 className="subtitle">MS.FRCS(I). FRCS(Ed)</h2>

          <p className="desc">
            Consultant General, Laparoscopic, & Abdominal Wall Repair (Hernia) Surgeon
          </p>

          <p className="info">
            <strong>CONSULTANT – Seventh Day Adventist Hospital, Frazer Town, Bangalore, India</strong><br />
            <strong>VISITING CONSULTANT – Aster CMI Hospital, Bangalore, India.</strong>
          </p>

          <p className="experience">
            Extensive surgical experience with focused development in advanced hernia surgery.
          </p>

          <p className="decades">
            More than <span>three decades</span> of experience delivering patient-centered care.
          </p>

          <button className="learn-btn">LEARN MORE</button>
        </div>

      </div>

      <div className="overview-section">
        <h2>Hernia Overview</h2>
        <p>
          A hernia occurs when internal tissue pushes through a weakened part of the muscle or abdominal wall.
          Commonly affecting the abdomen and groin, it may cause pain, bulging, or discomfort.
          Without timely intervention, hernias can increase in size or lead to complications like strangulation.
        </p>
      </div>

      <div className="types-section">
        <h2>Types of Hernia</h2>

        {types.map((item, index) => (
          <div
            key={index}
            className={`type-box ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleBox(index)}
          >
            <h3>{item.title}</h3>
            <p className="type-desc">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HerniaPage;
