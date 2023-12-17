
import Image from "next/image";
import * as React from "react";


interface ClientEmailTemplateProps {
  username: string;
}
const ClientEmailTemplate: React.FC<ClientEmailTemplateProps> = ({
  username,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL as string;
  const senderLocation = "Princess Park Apartments, Ngong Road";
  const senderEmail = "info@sokonike.co.ke";

  const isClient = typeof window !== "undefined";

  return (
    <div
      className="bg-white my-auto mx-auto font"
      style={{
        backgroundColor: "white",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
      }}
    >
      <div
        className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]"
        style={{
          border: "1px solid #eaeaea",
          borderRadius: "4px",
          margin: "40px auto",
          padding: "20px",
          maxWidth: "465px",
        }}
      >
        <section className="mt-[32px]" style={{ marginTop: "32px" }}>
          <Image
            src={`${baseUrl}/assets/logo.png`}
            width="180"
            height="70"
            alt="Vercel"
            className="my-0 mx-auto object-contain"
            style={{
              width: "180px",
              height: "70px",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </section>
        <p
          className="text-black text-[14px] leading-[24px] mb-4"
          style={{
            color: "black",
            fontSize: "14px",
            lineHeight: "24px",
            marginBottom: "16px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
          }}
        >
          Hello{" "}
          <span className="font-bold" style={{ fontWeight: 800 }}>
            {" "}
            {username}
          </span>{" "}
          ,
        </p>

        <p
          className="text-black/70 text-[14px] leading-[24px] mb-4"
          style={{
            color: "rgba(0, 0, 0, 0.7)",
            fontSize: "14px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          Thank you for sending us a message. We will get back to you as soon as
          possible.
        </p>

        <p
          className="text-black/70  text-[14px] leading-[24px] mb-4"
          style={{
            color: "rgba(0, 0, 0, 0.7)",
            fontSize: "14px",
            lineHeight: "24px",
            marginBottom: "16px",
          }}
        >
          In the meanwhile, you can continue checking our website for more
          products
        </p>

        <button
          style={{
            padding: "16px",
            margin: "0 auto",
            display: "block",
            width: "100%",
            backgroundColor: "#103fef",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            transition: "all 0.3s ease",
            border: "1px solid transparent",
            color: "white",
            textAlign: "center",
            textTransform: "uppercase", // Adjusted text transform for consistency
          }}
        >
          {isClient ? (
            <a
              href={baseUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Continue Shopping
            </a>
          ) : (
            <span style={{ display: "block", color: "inherit" }}>
              Continue Shopping
            </span>
          )}
        </button>

        <hr
          className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"
          style={{
            border: "1px solid #eaeaea",
            margin: "26px 0",
            width: "100%",
          }}
        />
        <p
          className="text-gray-600 text-[12px] leading-[24px]"
          style={{
            color: "gray",
            fontSize: "12px",
            lineHeight: "24px",
          }}
        >
          This message was intended for{" "}
          <span className="text-black" style={{ color: "black" }}>
            {username}{" "}
          </span>
          .This message was sent from{" "}
          <span className="text-black" style={{ color: "black" }}>
            {senderEmail}
          </span>{" "}
          located in{" "}
          <span className="text-black" style={{ color: "black" }}>
            {senderLocation}
          </span>
          . If you were not expecting this message, you can ignore this email.
          If you are concerned about your account&#39;s safety, please reply to
          this email to get in touch with us.
        </p>
      </div>
    </div>
  );
};

export default ClientEmailTemplate;
