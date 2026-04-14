import React from "react";
import "./DepartmentsSection.css";

const departmentsData = [
    {
    name: "GYNECOLOGY",
    videoSrc: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HrrabAxWinloumzm/897-sehiifzjrevpifraiejpsk5jq0ugrelbr05pu1rjq1mgv09nqu4gmjaynsbiseggnw-iun-j9okq9__bce348ffe38ce5550d8d062a3c97b201__P360.mp4", // APNE VIDEO KA PATH YAHAN DAALEIN
  },
    {
    name: "PEDIATRICS",
    videoSrc: "https://cdn.pixabay.com/video/2021/02/28/66598-518836673_large.mp4",
  },
  {
    name: "GENERAL SURGERY",
    videoSrc: "https://media.istockphoto.com/id/1588532558/video/the-medical-team-is-doing-life-saving-surgery-in-the-operation-room.mp4?s=mp4-640x640-is&k=20&c=RNNzDTRZMn-8Lij7dnPBrFq-1ze7lQsVPA4jOAAR06E=",
  },
  {
    name: "OPTHALMOLOGY",
    videoSrc: "https://media.istockphoto.com/id/2173379636/video/ophthalmologist-placing-trial-frame-on-patient-having-eye-exam.mp4?s=mp4-640x640-is&k=20&c=vbBRj6GKns5vANUsdpiYyRHDNdhpfKSttJpR_d5yq8g=",
  },
  {
    name: "ORTHOPAEDIC",
    videoSrc: "https://media.istockphoto.com/id/2193251126/video/asian-therapist-aids-leg-recovery.mp4?s=mp4-640x640-is&k=20&c=SF77Xez_Kf9dzFvWVS1_KRqb3P3VlT_Bl2062QtLUbM=",
  },
];

const DepartmentsSection: React.FC = () => {
  return (
    <section className="departments-section-new">
      <div className="departments-container-new">
        <div className="departments-header-new">
          <div className="departments-badge-new">Departments</div>
          <h2 className="departments-title-new">
            Expert care in every department — serving with skill and compassion.
          </h2>
        </div>

        <div className="departments-video-grid">
          {departmentsData.map((department, index) => (
            <div key={index} className="department-video-card">
              <video
                className="department-video"
                src={department.videoSrc}
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <div className="department-overlay"></div>
              <div className="department-content">
                <h3 className="department-name-new">{department.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
