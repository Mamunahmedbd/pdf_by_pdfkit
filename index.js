const { createSurvey } = require("./createSurvey.js");

const survey = {
  name: "Mamun Ahmed",
  email: "mamunahmedusa@gmail.com",
  phone: "1234567890",
  website: "www.ahmed.com",
  address: "1234 Main Street",
  city: "San Francisco",
  state: "CA",
  country: "US",
  postal_code: 94111,
  survey_nr: 1234,
};

createSurvey(survey, "survey.pdf");
