import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  userImage?: string;
  invitedByEmail: string;
  portalName: string;
  portalImage?: string;
  inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const InviteMemberEmail = ({
  userImage = `${baseUrl}/static/vercel-user.png`,
  invitedByEmail,
  portalName,
  portalImage = `https://react-email-demo-ijnnx5hul-resend.vercel.app/static/vercel-team.png`,
  inviteLink,
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByEmail} on ${portalName} on T3-Dataportal`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{portalName}</strong> on{" "}
              <strong>T3-Dataportal</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-emerald-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{portalName}</strong> data portal
              on <strong className="text-emerald-600">T3-Dataportal</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={`https://react-email-demo-ijnnx5hul-resend.vercel.app/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={portalImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-emerald-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your accounts safety, please
              reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteMemberEmail;
