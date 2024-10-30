import React, { useContext } from "react";
import "./ContactRef.css";
import { FaMap } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoTimeSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContactImg from "../../../assets/contactImg.jpg";
import { motion } from "framer-motion";
import { AppContext } from "../../../context/AppContext";

import AxiosInstance from "../../../api/AxiosInstance";

import { Button, message, Space } from "antd";

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Your Name is required")
    .max(15, "Name must be at most 15 characters")
    .test(
      "no-leading-space",
      "Name cannot start with a space",
      (value) =>
        typeof value === "string" && !/^\s/.test(value) && value.length > 0
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Your Email is required")
    .test(
      "no-leading-space",
      "email cannot start with a space",
      (value) =>
        typeof value === "string" && !/^\s/.test(value) && value.length > 0
    ),
  phoneNumber: Yup.string()
    .required("Phone is required")
    .matches(
      /^[1-9]\d{9}$/,
      "Must be a valid phone number without leading zeros"
    ),
  message: Yup.string()
    .required("Message is required")
    .test(
      "no-leading-space",
      "message cannot start with a space",
      (value) =>
        typeof value === "string" && !/^\s/.test(value) && value.length > 0
    ),
});

const ContactRef = () => {
  const { AtozInfo } = useContext(AppContext);

  const [messageApi, contextHolder] = message.useMessage(); // for ant design
  const successAlert = () => {
    messageApi.open({
      type: "success",
      content: "Contact added successfully!",
      duration: 1,
    });
  };

  const errorAlert = () => {
    messageApi.open({
      type: "error",
      content: "Failed to contact.",
      duration: 1,
    });
  };
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const res = await AxiosInstance.post(
        "/usercontact/add-user-contact",
        values
      );

      successAlert();
      setSubmitting(false);
      resetForm();
    } catch (error) {
      // console.error("Error submitting form:", error);

      if (error.response && error.response.data) {
        setErrors(
          error.response.data.errors || {
            general: "An error occurred. Please try again.",
          }
        );
      }
      errorAlert();
    }
  };

  return (
    <section className="main-contact-ref" style={{ overflow: "hidden" }}>
      {contextHolder}
      <div className="contact-area py-2">
        <div className="container">
          <div className="contact-content">
            <div className="row">
              {/* Contact Information Section */}
              <motion.div
                className="col-lg-3 col-md-6 col-12"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <span>
                      <FaMap />
                    </span>
                  </div>
                  <div className="contact-info-content">
                    <h5>Office Address</h5>
                    <p>{AtozInfo[0]?.address}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="col-lg-3 col-md-6 col-12"
                initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <span>
                      <BiSolidPhoneCall />
                    </span>
                  </div>
                  <div className="contact-info-content">
                    <h5>Call Us</h5>
                    <p>{AtozInfo[0]?.phone}</p>
                    <p>{AtozInfo[0]?.phone1}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="col-lg-3 col-md-6 col-12"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <span>
                      <MdEmail />
                    </span>
                  </div>
                  <div className="contact-info-content">
                    <h5>Email Us</h5>
                    <p>{AtozInfo[0]?.email}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="col-lg-3 col-md-6 col-12"
                initial={{ x: 200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <span>
                      <IoTimeSharp />
                    </span>
                  </div>
                  <div className="contact-info-content">
                    <h5>Open Time</h5>
                    <p>Mon - Sat (10.00AM - 05.30PM)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form Section */}
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
                      phoneNumber: "",
                      email: "",
                      message: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form id="contact-form">
                        <div className="row">
                          <div className="col-md-6">
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
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <Field
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                placeholder="Your Phone"
                              />
                              <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
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
