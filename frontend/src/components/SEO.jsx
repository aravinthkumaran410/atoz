import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ title, description, name, type,linkk }) {
  console.log(description);
  
  return (
    
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Technology solutions, Business solutions, Innovative solutions, Expert services, Web development, Android app development E-commerce, Billing software"></meta>
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
      <link rel="canonical" href={linkk}></link>
    </Helmet>
  );
}
