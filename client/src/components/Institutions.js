const InstitutionList = {
  KEC: "Kongu Engineering College",
};

const ClubList = {
  TC: "Tamil mandram",
  CSI: "CSI Club",
  TBI: "TBI Club",
  SDC: "Self Development Club",
  MC: "Music Club",
  CE: "Civil Engineering Association",
  ME: "Mechanical Engineering Association",
  MTS: "Mechatronics Engineering Association",
  EC: "Electronics & Communication Association",
  EEE: "Electrical and Electronics Engineering Association",
  EI: "Electronics and Instrumentation Engineering Association",
  CSE: "Computer Science & Engineering Association",
  AIML: "Artificial Intelligence and Machine Learning Association",
  AIDS: "Artificial Intelligence and Data Science Association",
  IT: "Information Technology Association",
  FT: "Food Technology Association",
  CSIT: "Computer Science and Information Technology Association",
  CHEM: "Chemistry Department Association",
  MBA: "Master of Business Administration Association",
  CTUG: "Computer Technology Association",
  CSD: "Computer Science and Design Association",
  SH: "Science and Humanities Association",
};

const institutions = [
  {
    name: InstitutionList["KEC"],
    departments: [
      ClubList["TC"],
      ClubList["CSI"],
      ClubList["TBI"],
      ClubList["SDC"],
      ClubList["MC"],
      ClubList["CE"],
      ClubList["ME"],
      ClubList["MTS"],
      ClubList["EC"],
      ClubList["EEE"],
      ClubList["EI"],
      ClubList["CSE"],
      ClubList["AIML"],
      ClubList["AIDS"],
      ClubList["IT"],
      ClubList["FT"],
      ClubList["CSIT"],
      ClubList["CHEM"],
      ClubList["MBA"],
      ClubList["CTUG"],
      ClubList["CSD"],
      ClubList["SH"],
    ],
  },
];

export { institutions, InstitutionList, ClubList };