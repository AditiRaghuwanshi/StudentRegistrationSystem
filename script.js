// INPUTS
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const contact = document.getElementById("contact");
const email = document.getElementById("email");

//  BUTTONS
const submitBtn = document.getElementById("submit");
const clearFormBtn = document.getElementById("clearForm");

const editName = document.getElementById("editName");
const editId = document.getElementById("editId");
const editContact = document.getElementById("editContact");
const editEmail = document.getElementById("editEmail");

const deleteName = document.getElementById("deleteName");
const deleteId = document.getElementById("deleteId");
const deleteContact = document.getElementById("deleteContact");
const deleteEmail = document.getElementById("deleteEmail");

// STORAGE HELPERS FOR LOCAL STORAGE
function getStudents() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function clearForm() {
  studentName.value = "";
  studentId.value = "";
  contact.value = "";
  email.value = "";
}

// VALIDATION HELPERS
function isEmpty(value) {
  return value.trim() === "";
}

function hasNumbers(value) {
  return /\d/.test(value);
}

function hasLetters(value) {
  return /[a-zA-Z]/.test(value);
}

function isValidEmail(emailValue) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailValue);
}

// REAL-TIME VALIDATIONS

// NAME VALIDATION - only letters and spaces allowed
studentName.addEventListener("input", () => {
  if (hasNumbers(studentName.value)) {
    studentName.value = studentName.value.replace(/\d/g, '');
    alert("Student name can only contain letters");
  }
});

// STUDENT ID VALIDATION - only numbers allowed
studentId.addEventListener("input", () => {
  if (hasLetters(studentId.value)) {
    studentId.value = studentId.value.replace(/[a-zA-Z]/g, '');
    alert("Student ID can only contain numbers");
  }
});

// CONTACT VALIDATION - only numbers, max 11 digits
contact.addEventListener("input", () => {
  contact.value = contact.value.replace(/\D/g, '');
  
  if (contact.value.length > 11) {
    contact.value = contact.value.slice(0, 11);
    alert("Contact number cannot exceed 11 digits");
  }
});

// ADD STUDENT WITH ALL VALIDATIONS
submitBtn.addEventListener("click", () => {
  // Check if all fields are filled (no empty rows)
  if (
    isEmpty(studentName.value) ||
    isEmpty(studentId.value) ||
    isEmpty(contact.value) ||
    isEmpty(email.value)
  ) {
    alert("All fields are required! Cannot add empty row.");
    return;
  }

  // Validate student name - only characters
  if (hasNumbers(studentName.value)) {
    alert("Student name can only contain letters");
    return;
  }

  // Validate student ID - only numbers
  if (hasLetters(studentId.value)) {
    alert("Student ID can only contain numbers");
    return;
  }

  // Validate contact - only numbers and at least 10 digits
  if (hasLetters(contact.value)) {
    alert("Contact number can only contain numbers");
    return;
  }

  if (contact.value.length < 10) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  // Validate email format
  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address");
    return;
  }

  let students = getStudents();

  // Check if student ID already exists
  let exists = students.some(
    (student) => student.id === studentId.value
  );

  if (exists) {
    alert("Student ID already exists! Please use a different ID.");
    return;
  }

  let newStudent = {
    name: studentName.value,
    id: studentId.value,
    contact: contact.value,
    email: email.value,
  };

  students.push(newStudent);
  saveStudents(students);
  clearForm();

  alert("Student added successfully!");
});

// EDIT NAME
editName.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to edit");
    return;
  }

  if (isEmpty(studentName.value)) {
    alert("Name cannot be empty");
    return;
  }

  if (hasNumbers(studentName.value)) {
    alert("Student name can only contain letters");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].name = studentName.value;
  saveStudents(students);
  alert("Name updated successfully!");
});

// EDIT CONTACT
editContact.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to edit");
    return;
  }

  if (isEmpty(contact.value)) {
    alert("Contact cannot be empty");
    return;
  }

  if (hasLetters(contact.value)) {
    alert("Contact number can only contain numbers");
    return;
  }

  if (contact.value.length < 10) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].contact = contact.value;
  saveStudents(students);
  alert("Contact updated successfully!");
});

// EDIT EMAIL
editEmail.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to edit");
    return;
  }

  if (isEmpty(email.value)) {
    alert("Email cannot be empty");
    return;
  }

  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].email = email.value;
  saveStudents(students);
  alert("Email updated successfully!");
});

// EDIT ID - Change student ID
editId.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter the current Student ID");
    return;
  }

  let newId = prompt("Enter new Student ID (numbers only):");
  
  if (!newId || isEmpty(newId.trim())) {
    alert("New ID cannot be empty");
    return;
  }

  if (hasLetters(newId)) {
    alert("Student ID can only contain numbers");
    return;
  }

  let students = getStudents();
  
  // Check if new ID already exists
  let idExists = students.some(s => s.id === newId);
  if (idExists) {
    alert("This ID already exists");
    return;
  }

  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].id = newId;
  saveStudents(students);
  studentId.value = newId;
  alert("Student ID updated successfully!");
});

// DELETE NAME
deleteName.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to delete name");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].name = "";
  studentName.value = "";
  saveStudents(students);
  alert("Name deleted successfully!");
});

// DELETE CONTACT
deleteContact.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to delete contact");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].contact = "";
  contact.value = "";
  saveStudents(students);
  alert("Contact deleted successfully!");
});

// DELETE EMAIL
deleteEmail.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to delete email");
    return;
  }

  let students = getStudents();
  let studentIndex = students.findIndex(s => s.id === studentId.value);

  if (studentIndex === -1) {
    alert("Student not found with this ID");
    return;
  }

  students[studentIndex].email = "";
  email.value = "";
  saveStudents(students);
  alert("Email deleted successfully!");
});

// DELETE ENTIRE STUDENT RECORD
deleteId.addEventListener("click", () => {
  if (isEmpty(studentId.value)) {
    alert("Please enter Student ID to delete student");
    return;
  }

  let students = getStudents();
  let initialLength = students.length;
  students = students.filter(s => s.id !== studentId.value);

  if (students.length === initialLength) {
    alert("Student not found with this ID");
    return;
  }

  saveStudents(students);
  clearForm();
  alert("Student record deleted completely!");
});

// CLEAR FORM 
clearFormBtn.addEventListener("click", clearForm);