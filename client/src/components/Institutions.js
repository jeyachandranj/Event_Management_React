const InstitutionList = {
  KEC: "Kongu Engineering College",
};

const DepartmentList = {
  CE: "Civil Engineering",
  ME: "Mechanical Engineering",
  MTS: "Mechatronics Engineering",
  EC: "Electronics & Communication",
  EEE: "Electrical and Electronics Engineering",
  EI: "Electronics and Instrumentation Engineering",
  CSE: "Computer Science & Engineering",
  AIML: "Artificial Intelligence and Machine Learning",
  AIDS: "Artificial Intelligence and Data Science",
  IT: "Information Technology",
  FT: "Food Technology",
  CSIT: "Computer Science and Information Technology",
  CHEM: "Chemistry Department",
  MBA: "Master of Business Administration",
  CTUG: "Computer Technology",
  CSD: "Computer Science and Design",
  SH: "Science and Humanities",
};

const institutions = [
  {
    name: InstitutionList["KEC"],
    departments: [
      DepartmentList["CE"],
      DepartmentList["ME"],
      DepartmentList["MTS"],
      DepartmentList["EC"],
      DepartmentList["EEE"],
      DepartmentList["EI"],
      DepartmentList["CSE"],
      DepartmentList["AIML"],
      DepartmentList["AIDS"],
      DepartmentList["IT"],
      DepartmentList["FT"],
      DepartmentList["CSIT"],
      DepartmentList["CHEM"],
      DepartmentList["MBA"],
      DepartmentList["CTUG"],
      DepartmentList["CSD"],
      DepartmentList["SH"],
    ],
  },
];

export { institutions, InstitutionList, DepartmentList };