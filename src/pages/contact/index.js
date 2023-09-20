import styled from "styled-components";
import { useCallback, useState } from "react";

import Section from "../../components/Section";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import LabeledElement from "../../components/LabeledElement";
import Button, { themes } from "../../components/Button";
import { Heading as UnstyledHeading } from "../shared";

const Heading = styled(UnstyledHeading)`
  text-align: center;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexLabeledElement = styled(LabeledElement)`
  flex: 1;
`;

export default function Contact() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const validateName = useCallback(
    (value) => {
      setName(value);
      if (value.trim().length === 0) {
        setErrors((prev) => {
          return { ...prev, name: "Please enter a value" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, name: "" };
        });
      }
    },
    [setName, setErrors]
  );

  const validateEmail = useCallback(
    (value) => {
      setEmail(value);
      if (value.trim().length === 0) {
        setErrors((prev) => {
          return { ...prev, email: "Please enter a value" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, email: "" };
        });
      }
    },
    [setErrors, setEmail]
  );

  const validateMessage = useCallback(
    (value) => {
      setMessage(value);
      if (value.trim().length === 0) {
        setErrors((prev) => {
          return { ...prev, message: "Please enter a value" };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, message: "" };
        });
      }
    },
    [setErrors, setMessage]
  );

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({ name: "", email: "", message: "" });
  }, [setName, setEmail, setMessage, setErrors]);

  const submitForm = useCallback(() => {
    const data = { name, email, message };

    const emailValid = email.match(
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailValid) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid email address" };
      });
    }

    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.message === "" &&
      emailValid
    ) {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://bvgqo6ynu7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer",
        true
      );
      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      xhr.send(JSON.stringify(data));

      resetForm();

      setShowValidationMessage(true);

      return false;
    }
  }, [
    name,
    email,
    message,
    setErrors,
    errors,
    resetForm,
    setShowValidationMessage,
  ]);

  return (
    <Section testId="contact-section">
      <Card testId="contact-card">
        <Container>
          <Heading>Contact Me!</Heading>
          <LabeledElement
            label="Name"
            required
            error={errors.name}
            width={"66%"}
          >
            <Input value={name} onChange={(value) => validateName(value)} />
          </LabeledElement>
          <LabeledElement
            label="Email"
            required
            error={errors.email}
            width={"66%"}
          >
            <Input value={email} onChange={(value) => validateEmail(value)} />
          </LabeledElement>
          <FlexLabeledElement
            label="Message"
            required
            error={errors.message}
            width={"66%"}
          >
            <TextArea
              value={message}
              onChange={(value) => validateMessage(value)}
            />
          </FlexLabeledElement>
          <Button
            theme={themes.tertiary}
            type="submit"
            onClick={submitForm}
            disabled={errors.name || errors.email || errors.message}
            margin={"0 0 16px 0"}
          >
            Submit
          </Button>
          {showValidationMessage && (
            <Alert
              testId="successful-message-alert"
              color="green"
              onClose={() => setShowValidationMessage(false)}
            >
              Your message has been sent!
            </Alert>
          )}
        </Container>
      </Card>
    </Section>
  );
}
