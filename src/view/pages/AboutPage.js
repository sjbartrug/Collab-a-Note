import React from "react";
import Member from "../components/AboutPage/Member";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div class="header">
        <div class="logo-box">
          <img src="Collab-a-Note Logo.png" alt="Logo" class="logo    " />
        </div>

        <div class="text-box">
          <h1 class="header-text-container">
            <span class="header-main">Collab-a-Note</span>
            <span class="header-sub">Taking notes to the next level</span>
          </h1>

          <a href="/dashboard" class="btn btn-white">
            JOIN US
          </a>
        </div>
      </div>

      <div className="about-section-container">
        <h2 class="about-title">OUR MISSION</h2>
        <p class="about-sub">
          Our mission is to bring a better taking notes experience to students,
          especially during this pandemic. With Collab-a-Note, students can have
          a space to organize their courses and share notes between classmates.
        </p>
      </div>

      <div className="about-section-container">
        <h2 class="about-title">OUR TEAM</h2>
        <p class="about-sub">We are a group of 5 college students</p>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Member
              member={{
                coverImg: "sam_profile_image.jpg",
                name: "Samuel Batrug",
                role: "Product Manager",
              }}
            />
          </div>

          <div className="col-md-6 col-sm-12">
            <Member
              member={{
                coverImg: "Brupal_Image.jpg",
                name: "Brupal Baral",
                role: "Representative",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-12">
            <Member
              member={{
                coverImg: "Steven_Profile.jpg",
                name: "Steven Smith",
                role: "Engineer",
              }}
            />
          </div>

          <div className="col-md-4 col-sm-12">
            <Member
              member={{
                coverImg: "RJ_Profile_img.png",
                name: "Ronald Yarwood",
                role: "Engineer",
              }}
            />
          </div>

          <div className="col-md-4 col-sm-12">
            <Member
              member={{
                coverImg: "dung_profile_img.jpeg",
                name: "Dung (Adron) Nguyen",
                role: "Engineer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
