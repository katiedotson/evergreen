import Mailgen from "mailgen";

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Evergreen",
    link: "http://localhost:8080",
    // Optional product logo
    logo: "https://mailgen.js/img/logo.png",
  },
});

export default {
  createUrlNameFromTitle(title: string): string {
    title = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    return title;
  },
  generateVerificationEmail(
    firstName: string,
    lastName: string,
    url: string
  ): string {
    const email = {
      body: {
        name: `${firstName} ${lastName}`,
        intro: "Welcome to Evergreen!",
        action: {
          instructions: "To verfiy your email, please click here:",
          button: {
            color: "#2c3e50", // Optional action button color
            text: "Confirm your account",
            link: url,
          },
        },
        signature: false,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  },
};
