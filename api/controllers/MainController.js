/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

require("dotenv").config();

let instructors = [
  {
    firstName: "Ronnie",
    lastName: "Diaz",
    department: "Engineering",
    instructorID: "I002901",
  },
  {
    firstName: "Reman",
    lastName: "Hidalgo",
    department: "Humanities",
    instructorID: "I000345",
  },
  {
    firstName: "Norman",
    lastName: "Musso",
    department: "Humanities",
    instructorID: "I003005",
  },
  {
    firstName: "Jemela",
    lastName: "Coronel",
    department: "Computer Studies",
    instructorID: "I003456",
  },
  {
    firstName: "Gwendolyn",
    lastName: "Banks",
    department: "Architecture",
    instructorID: "I003455",
  },
  {
    firstName: "Jean",
    lastName: "Ramos",
    department: "Psychology",
    instructorID: "I002088",
  },
  {
    firstName: "Stephany Rose",
    lastName: "Mendoza",
    department: "Life Sciences",
    instructorID: "I003019",
  },
];

let courses = [
  {
    courseName: "Intro to Architecture",
    courseCode: "ARK204",
    instructorID: "I003455",
    admissionYear: 2026,
  },
  {
    courseName: "Sociology 2",
    courseCode: "SOC001",
    instructorID: "I000456",
    admissionYear: 2025,
  },
  {
    courseName: "Advanced Chemistry",
    courseCode: "CHM303",
    instructorID: "I000135",
    admissionYear: 2022,
  },
  {
    courseName: "Elective: Fundamentals of Photography",
    courseCode: "ELE055",
    instructorID: "I002025",
    admissionYear: 2026,
  },
  {
    courseName: "Advanced Computer Drafting",
    courseCode: "CAD401",
    instructorID: "I003455",
    admissionYear: 2025,
  },
  {
    courseName: "Microprocessor and Robotics",
    courseCode: "CKT405",
    instructorID: "I002901",
    admissionYear: 2026,
  },
  {
    courseName: "Philosophy of the Human Person",
    courseCode: "PHL000",
    instructorID: "I002222",
    admissionYear: 2024,
  },
  {
    courseName: "Behavioral Psychology",
    courseCode: "PSY234",
    instructorID: "I002088",
    admissionYear: 2025,
  },
];

module.exports = {
  isAlive: function (req, res) {
    res.send(
      `Hello World! The code is in ${process.env.NODE_ENV} @ PORT ${process.env.PORT}`,
    );
  },

  getAllExpiringCourses: (req, res) => {
    //identify the current year
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let expiredCourses = [];

    //traverse the array
    for (course of courses) {
      //to compare if the year per item is equal to the current year
      if (course.admissionYear !== currentYear) {
        //push them into an array
        expiredCourses.push(course);
      }
    }

    //send a response
    res.status(200).json(expiredCourses);
  },

  getCoursesPerInstructor: function (req, res) {
    //define/extract the instructor ID
    let instructorID = req.params.id;
    let matchedCourses = [];
    //traverse through the array
    for (course of courses) {
      //compare the instructor ID of the parameter and the course
      if (instructorID === course.instructorID) {
        //Push into a new array the matching courses
        matchedCourses.push(course);
      }
    }
    //send a response to the client side
    res.status(200).json(matchedCourses);
  },

  mapAllCoursesAndInstructor: function (req, res) {
    let allMappedCourses = [];

    //traverse the instructor
    for (instructor of instructors) {
      //check the courses array if matching with the instructor
      let mappedCoursesPerInstructor = courses.filter((course) => {
        return course.instructorID === instructor.instructorID;
      });

      //consolidate the matching courses into a new array
      if (mappedCoursesPerInstructor.length > 0) {
        allMappedCourses.push(mappedCoursesPerInstructor);
      }
    }

    //send a response
    res.status(200).json(allMappedCourses);
  },
};
