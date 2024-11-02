import React from "react";
import SubAllbanner from "../pages/subAllBanner/SubAllbanners";

const PrivacyPolicy = () => {
  return (
    <section>
      <SubAllbanner title="Privacy Policy" />
      <div className="container-fluid my-5">
        <h2 className="fw-bold mb-3">Privacy Policy for AtoZ Drop Taxi</h2>
        <p>
          At AtoZ Drop Taxi, accessible from{" "}
          <a href="https://ato-z-drop-taxi.vercel.app">
            https://atozdroptaxi.com/
          </a>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by AtoZ Drop Taxi and how we use it.
        </p>

        <h3 className="my-3">Log Files</h3>
        <p>
          AtoZ Drop Taxi follows a standard procedure of using log files. These
          files log visitors when they visit websites. All hosting companies do
          this and a part of hosting services' analytics. The information
          collected by log files includes internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic
          information.
        </p>

        <h3 className="my-3">Cookies and Web Beacons</h3>
        <p>
          Like any other website, AtoZ Drop Taxi uses 'cookies'. These cookies
          are used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information.
        </p>

        <h3 className="my-3">Google DoubleClick DART Cookie</h3>
        <p>
          Google is one of the third-party vendors on our site. It also uses
          cookies, known as DART cookies, to serve ads to our site visitors
          based upon their visit to www.website.com and other sites on the
          internet. However, visitors may choose to decline the use of DART
          cookies by visiting the Google ad and content network Privacy Policy
          at the
          {/* following URL –{" "}
        <a href="https://policies.google.com/technologies/ads">
          https://policies.google.com/technologies/ads
        </a>
        . */}
        </p>

        <h3 className="my-3">Our Advertising Partners</h3>
        <p>
          Some advertisers on our site may use cookies and web beacons. Our
          advertising partners are listed below. Each of our advertising
          partners has their own Privacy Policy for their policies on user data.
          For easier access, we hyperlinked to their Privacy Policies below.
        </p>
        {/* <ul>
        <li>
          Google:{" "}
          <a href="https://policies.google.com/technologies/ads">
            https://policies.google.com/technologies/ads
          </a>
        </li>
      </ul> */}

        <h3 className="my-3">Privacy Policies</h3>
        <p>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of AtoZ Drop Taxi.
        </p>
        <p>
          Third-party ad servers or ad networks use technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on AtoZ Drop Taxi, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </p>
        <p>
          Note that AtoZ Drop Taxi has no access to or control over these
          cookies that are used by third-party advertisers.
        </p>

        <h3 className="my-3">Third Party Privacy Policies</h3>
        <p>
          AtoZ Drop Taxi's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers'
          respective websites. <strong>What Are Cookies?</strong>
        </p>

        <h3 className="my-3">Children's Information</h3>
        <p>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </p>
        <p>
          AtoZ Drop Taxi does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>

        <h3 className="my-3">Online Privacy Policy Only</h3>
        <p>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in AtoZ Drop Taxi. This policy is not applicable
          to any information collected offline or via channels other than this
          website.
        </p>

        <h3 className="my-2">Consent</h3>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
