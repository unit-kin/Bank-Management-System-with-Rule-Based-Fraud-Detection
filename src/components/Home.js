import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav container">
        {/* logo */}
        <Link className="logo-user" to ='/'>
          <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/logo.svg" alt="logo" />
        </Link>
        {/* navigations */}
        <ul className="nav-item">
          <li className="nav-list"><a href="#" className="nav-links">Home</a></li>
          <li className="nav-list"><a href="#" className="nav-links">About</a></li>
          <li className="nav-list"><a href="#" className="nav-links">Contact</a></li>
          <li className="nav-list"><a href="#" className="nav-links">Blog</a></li>
         
        </ul>
        {/* cta btn */}
        <div className="btn cta-1">
        <Link to="/Login">
        <a href="#" className="cta-btn">Login</a>
      </Link>
          
        </div>
        {/* hamburger menu */}
        <div className="nav-icon">
          <div></div>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero">
        <div className="hero-bg">
          <picture className="picture">
            <source media="(max-width: 799px)" srcSet="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/bg-intro-mobile.svg 100w" />
            <source media="(min-width: 800px)" srcSet="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/bg-intro-desktop.svg" />
            <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/bg-intro-mobile.svg" alt="background" />
          </picture>
          <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/master/images/image-mockups.png" className="mockup" alt="mockup" />
        </div>
        <div className="hero-content container">
          <h1>Next generation digital banking</h1>
          <p>Take your financial life online. Your Easybank account will be a one-stop-shop 
            for spending, saving, budgeting, investing, and much more.</p>
          {/* cta btn */}
          <div className="btn cta-2">
          <Link to="/Login">
            <a href="#" className="cta-btn">Create Account</a>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueSection = () => {
  return (
    <div className="value-section">
      <div class="value-section">
      <div class="desc container">
        <h1>Why choose Easybank?</h1>
        <p>We leverage Open Banking to turn your bank account into your financial hub. Control 
          your finances like never before.
        </p>
      </div>
    </div>
    </div>
  );
};

const ArticleSection = () => {
  return (
    <section className="article-section">
      <div className="article-wrapper container">
        <h1>latest article</h1>
        {/* ... (rest of the component) */}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="footer-items container">
  
       
        <div className="ftr-item-1">
          <div className="ftr-logo">
            <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/logo-white.svg" alt="logo"/>  
          </div>
          <div className="social">
            <a href="#" title="facebook">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-facebook.svg" alt="facebook"/>
            </a>
            <a href="#" title="youtube">
              <img src="
https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-youtube.svg" alt="youtube"/>
            </a>
            <a href="#" title="twitter">
              <img src="
https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-twitter.svg" alt="twitter"/>
            </a>
            <a href="#" title="pinterest">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-pinterest.svg" alt="pinterest"/>
            </a>
            <a href="#" title="instagram">
              <img src="
https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-instagram.svg" alt="instagram"/>
            </a>
          </div>
        </div>
        
        <div className="ftr-item-2">
          <ul className="ftr-nav nav-1">
            <li className="nav-list"><a href="#">About Us</a></li>
            <li className="nav-list"><a href="#">Contact</a></li>
            <li className="nav-list"><a href="#">Blog</a></li>
          </ul>
          <ul class="ftr-nav nav-2">
            <li className="nav-list"><a href="#">Careers</a></li>
            <li className="nav-list"><a href="#">Support</a></li>
            <li className="nav-list"><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className="ftr-item-3">
          
        <div className="btn cta-3">
          <a href="#" class="cta-btn">Request Invite</a>
        </div>
        
        <div className="copyright">
          <p>Easybank. all rights reserved <span class="date"></span></p>
        </div>
        </div>
      </div>
      </footer>
    
      


  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ValueSection />
      <ArticleSection />
      <Footer />
    </>
  );
};

export default Home;
