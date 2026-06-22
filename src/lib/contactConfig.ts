// Single source of truth for contact links used across the portfolio.
export const contactConfig = {
  email: "msgpl117@gmail.com",
  phone: "+27630935634",
  whatsappNumber: "27630935634", // no '+' for wa.me
  whatsappDefaultMessage:
    "Hello Masego, I found your portfolio website and would like to discuss a Data Analytics opportunity.",
  whatsappMeetingMessage:
    "Hello Masego, I'd like to schedule a meeting to discuss a Data Analytics opportunity. What times work for you this week?",
  linkedin: "https://www.linkedin.com/in/masego-peele-serote-16476a95",
  github: "https://github.com/MassEgo88",
} as const;

export const whatsappUrl = (message: string = contactConfig.whatsappDefaultMessage) =>
  `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
