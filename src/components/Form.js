import React from 'react';
import { Formik } from 'formik';
import { Button, FormGroup, Label, Input, Form, Container, Row, Col, FormFeedback } from 'reactstrap';
import * as Yup from "yup";

const phoneRegExp = RegExp(
    /^[+]*[0-9]*[ ]{0,1}[(]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[)]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[0-9]{2}[ ]{0,1}[0-9]{2}[ ]{0,1}[-\.\/]{0,1}[ ]{0,1}[0-9]{1,5}$/g
);


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is a required field"),
    lastName: Yup.string().required("Last name is a required field"),
    email: Yup.string().email("Email is not a valid.").required("Please enter your email address."),
    phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not a valid."),
    website: Yup.string().required().url("Url is not a valid."),
    time: Yup.string().required(),
});

const FormApp = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    company: "",
                    email: "",
                    phoneNumber: "",
                    website: "",
                    time: "Morning",
                    newsletter: ["promotions", "account information"]
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    alert("Form is submitted successfully");
                    alert(JSON.stringify(values, null, 2));
                    resetForm({});
                    console.log(values);
                }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue
                }) => {
                    // console.log("errors: ", errors)
                    return <Container>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <legend>Contact Us</legend>
                            <Row>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            invalid={!!errors.firstName}
                                        />
                                        <FormFeedback invalid={errors.firstName}>{errors.firstName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            invalid={!!errors.lastName}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="company">Company</Label>
                                        <Input
                                            type="text"
                                            name="company"
                                            id="company"
                                            placeholder="Company"
                                            value={values.company}
                                            onChange={handleChange}
                                            invalid={!!errors.company}
                                        />
                                        <FormFeedback invalid={errors.company}>{errors.company}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="phoneNumber">Phone Number</Label>
                                        <Input
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            placeholder="Phone Number"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            invalid={!!errors.phoneNumber}
                                        />
                                        <FormFeedback invalid={errors.phoneNumber}>{errors.phoneNumber}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="example@gmail.com"
                                            value={values.email}
                                            onChange={handleChange}
                                            invalid={!!errors.email}
                                        />
                                        <FormFeedback invalid={errors.email}>{errors.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xs="auto" md="6">
                                    <FormGroup>
                                        <Label for="website">Your Website</Label>
                                        <Input
                                            type="text"
                                            name="website"
                                            id="website"
                                            placeholder="http://example.com"
                                            value={values.website}
                                            onChange={handleChange}
                                            invalid={!!errors.website}
                                        />
                                        <FormFeedback invalid={errors.website}>{errors.website}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <br />
                            <Label>When is the best time of day to reach you?</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="time" value="Morning" id="time" onChange={handleChange} checked={values.time === "Morning"} />
                                     Morning
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="time" value="Evening" id="time" onChange={handleChange} checked={values.time === "Evening"} />
                                     Evening
                                </Label>
                            </FormGroup>
                            <br />
                            <Label>Would you like to receive our email newsletter?</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="newsletter"
                                        value="true"
                                        id="newsletter"
                                        onChange={() => {
                                            const hasPromotion = values.newsletter.indexOf("promotions") > -1;
                                            const currentValues = values.newsletter;
                                            let newValues = [];
                                            if (hasPromotion) {
                                                newValues = currentValues.filter(item => item !== "promotions")
                                            } else {
                                                newValues = [...currentValues, "promotions"];
                                            }
                                            setFieldValue("newsletter", newValues);
                                        }}
                                        checked={values.newsletter.indexOf("promotions") > -1} />
                                     Promotions
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="newsletter"
                                        value="true"
                                        id="newsletter"
                                        onChange={() => {
                                            const hasAccountInformation = values.newsletter.indexOf("account information") > -1;
                                            const currentValues = values.newsletter;
                                            let newsValue = [];
                                            if (hasAccountInformation) {
                                                newsValue = currentValues.filter(item => item !== "account information");
                                            } else {
                                                newsValue = [...currentValues, "account information"];
                                            }
                                            setFieldValue("newsletter", newsValue);
                                        }}
                                        checked={values.newsletter.indexOf("account information") > -1} />
                                     Account information
                                </Label>
                            </FormGroup>
                            <br />
                            <Button color="primary">Submit</Button>
                        </Form>
                    </Container>
                }}
            </Formik>
        </div >
    );
};

export default FormApp