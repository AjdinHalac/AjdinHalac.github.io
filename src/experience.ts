import { IExperience } from "./domain/landing/interfaces";

const experience: IExperience[] = [
  {
    value: "MoP",
    position: "Senior Software Developer",
    company: "Ministry of Programming",
    duration: "APR 2020 - Current",
    image: "mop.png",
    products: [
      "Multibank",
      "Hybird",
      "Soundscape",
      "NaKlik",
      "Detoxy",
      "BioCertica",
      "Buddy Company"
    ]
  },
  {
    value: "NSoft",
    position: "Software Developer",
    company: "NSoft",
    duration: "JAN 2018 - APR 2020",
    image: "nsoft.png",
    products: [
      "Sports Betting Platform",
      "Live Casino Solution",
      "Payment Gateway Integration"
    ]
  },
  {
    value: "UpWork",
    position: "Software Developer",
    company: "Freelance - UpWork",
    duration: "OCT 2017 - JAN 2018",
    image: "upwork.png",
    products: [
      "E-commerce Web Applications",
      "REST API Development",
      "Database Design & Optimization",
    ]
  },
  {
    value: "Bookvar",
    position: "Software Developer Intern",
    company: "Bookvar",
    duration: "AUG 2017 - OCT 2017",
    image: "bookvar.png",
    products: [
      "Inventory Tracker",
      "User Authentication Module"
    ]
  },
];

export default experience;