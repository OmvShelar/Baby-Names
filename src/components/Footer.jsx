import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2b2b2b", color: "#fff", padding: "3rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        
        {/* Logo & Socials */}
        <div>
          <h2 style={{ color: "#f9c900", fontSize: "1.5rem", fontWeight: "bold", display: "flex", alignItems: "center" }}>
             Pick Baby Names
          </h2>
          <p style={{ marginTop: "1rem", fontWeight: "bold" }}>SOCIAL MEDIA</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <a href="#" style={iconStyle}><FaFacebookF /></a>
            <a href="#" style={iconStyle}><FaTwitter /></a>
            <a href="#" style={iconStyle}><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={headingStyle}>QUICK LINKS</h4>
          <ul style={ulStyle}>
            <li><a href="#" style={linkStyle}>Home</a></li>
            <li><a href="#" style={linkStyle}>Blog</a></li>
            <li><a href="#" style={linkStyle}>Popular Names</a></li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h4 style={headingStyle}>HELP CENTER</h4>
          <ul style={ulStyle}>
            <li><a href="#" style={linkStyle}>Contact Us</a></li>
            <li><a href="#" style={linkStyle}>Support</a></li>
            <li><a href="#" style={linkStyle}>FAQs</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 style={headingStyle}>GET IN TOUCH</h4>
          <ul style={ulStyle}>
            <li><FiPhone /> (+91) 7796196502</li>
            <li><FiMail /> pickbabyname@gmail.com</li>
            <li><FiMapPin /> Kolhapur, Maharastra</li>
          </ul>
        </div>
      </div>

      <hr style={{ borderColor: "#444", margin: "2rem 0" }} />

      <div style={{ textAlign: "center" }}>
        <p>© All rights reserved by pickbabynames.in</p>
      </div>
    </footer>
  );
};

// Styles
const iconStyle = {
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: "50%",
  padding: "0.5rem",
  fontSize: "1rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const headingStyle = {
  fontWeight: "bold",
  marginBottom: "0.5rem",
};

const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  lineHeight: "2",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default Footer;
