import styled from "styled-components";
import { useCallback, useState } from "react";

import Section from "../../components/Section";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import LabeledElement from "../../components/LabeledElement";
import Button, { themes } from "../../components/Button";
import { Heading as UnstyledHeading } from "../../components/shared";

const Heading = styled(UnstyledHeading)`
  text-align: center;
`;

const Container = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexLabeledElement = styled(LabeledElement)`
  flex: 1;
`;

const HoneypotInput = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Contact() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

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
    setHoneypot("");
    setErrors({ name: "", email: "", message: "" });
  }, [setName, setEmail, setMessage, setHoneypot, setErrors]);

  const submitForm = useCallback(
    async (e) => {
      e.preventDefault();

      const nextErrors = {
        name: name.trim() ? "" : "Please enter a value",
        email: email.trim() ? "" : "Please enter a value",
        message: message.trim() ? "" : "Please enter a value",
      };

      if (nextErrors.email === "" && !EMAIL_REGEX.test(email)) {
        nextErrors.email = "Please enter a valid email address";
      }

      setErrors(nextErrors);
      setSubmitStatus({ type: "", message: "" });

      if (nextErrors.name || nextErrors.email || nextErrors.message) {
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            website: honeypot,
          }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(
            body?.error ||
              "Something went wrong while sending your message. Please try again."
          );
        }

        resetForm();
        setSubmitStatus({ type: "success", message: "Your message has been sent!" });
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message:
            error?.message ||
            "Something went wrong while sending your message. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, message, honeypot, resetForm]
  );

  return (
    <Section testId="contact-section">
      <Card testId="contact-card">
        <Container onSubmit={submitForm}>
          <Heading>Contact Me!</Heading>
          <HoneypotInput
            aria-hidden
            tabIndex={-1}
            autoComplete="off"
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
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
            disabled={isSubmitting}
            margin={"0 0 16px 0"}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
          {submitStatus.type && (
            <Alert
              testId={`${submitStatus.type}-message-alert`}
              color={submitStatus.type === "success" ? "green" : "#bf2d2d"}
              onClose={() => setSubmitStatus({ type: "", message: "" })}
            >
              {submitStatus.message}
            </Alert>
          )}
        </Container>
      </Card>
    </Section>
  );
}
