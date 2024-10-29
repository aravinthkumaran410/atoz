import React, { useContext } from "react";
import "./ContactRef.css";
import { FaMap } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContactImg from "../../../assets/contactImg.jpg";
import { motion } from "framer-motion";
import { AppContext } from "../../../context/AppContext";

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Your Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your Email is required"),
  phone: Yup.string().required("Phone is required"),
  message: Yup.string().required("Message is required"),
});

const ContactRef = () => {
  const { AtozInfo } = useContext(AppContext);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm(); // Reset form after submission
  };

  return (
    <section className="main-contact-ref" style={{ overflow: "hidden" }}>
      <div className="contact-area py-2">
        <div className="container">
          <div className="contact-content">
            <div className="row">
              {/* Contact Information Sections */}
              {/* ... */}
            </div>
          </div>
          <div className="contact-wrapper my-5">
            <div className="row">
              <motion.div
                className="col-lg-6 align-self-center"
                initial={{ y: 200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-img">
                  <img src={ContactImg} alt="contact-img" />
                </div>
              </motion.div>
              <div className="col-lg-6 align-self-center">
                <div className="contact-form">
                  <div className="contact-form-header">
                    <motion.h2
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      Get In Touch
                    </motion.h2>
                    <motion.p
                      initial={{ y: 100, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </motion.p>
                  </div>
                  <Formik
                    initialValues={{
                      name: "",
                      phone: "",
                      email: "",
                      message: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form id="contact-form">
                        <div className="row">
                          <motion.div
                            className="col-md-6"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="form-group">
                              <Field
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Your Name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            className="col-md-6"
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="form-group">
                              <Field
                                type="number"
                                className="form-control"
                                name="phone"
                                placeholder="Your Phone"
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </motion.div>
                        </div>
                        <div className="form-group">
                          <Field
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Your Email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            as="textarea"
                            name="message"
                            cols={30}
                            rows={5}
                            className="form-control"
                            placeholder="Write Your Message"
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <motion.button
                          initial={{ x: -200, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          type="submit"
                          className="contact-submit-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <IoPaperPlaneOutline className="ms-2 fs-5" />
                        </motion.button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactRef;
