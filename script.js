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

// STORAGE HELPERS FOR LOCAL STORAGE TO GET ITEMS FROM LOCAL STORAGE AND CHECK
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

function requireStudentId() {
  if (isEmpty(studentId.value)) {
    alert("Student ID is required");
    return false;
  }
  return true;
}

function requireField(field, fieldName) {
  if (isEmpty(field.value)) {
    alert(`Please enter ${fieldName}`);
    return false;
  }
  return true;
}

// ADD STUDENT 
submitBtn.addEventListener("click", () => {
  if (
    isEmpty(studentName.value) ||
    isEmpty(studentId.value) ||
    isEmpty(contact.value) ||
    isEmpty(email.value)
  ) {
    alert("All fields are required");
    return;
  }

  let students = getStudents();

  let exists = students.some(
    (student) => student.id === studentId.value
  );

  if (exists) {
    alert("Student ID already exists");
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

  alert("Student added successfully");
});

//  EDIT FUNCTIONS 
editName.addEventListener("click", () => {
  if (!requireStudentId()) return;
  if (!requireField(studentName, "name")) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      student.name = studentName.value;
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Name updated");
});

editContact.addEventListener("click", () => {
  if (!requireStudentId()) return;
  if (!requireField(contact, "contact")) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      student.contact = contact.value;
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Contact updated");
});

editEmail.addEventListener("click", () => {
  if (!requireStudentId()) return;
  if (!requireField(email, "email")) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      student.email = email.value;
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Email updated");
});

editId.addEventListener("click", () => {
  alert("Student ID cannot be edited");
});

//  DELETE FUNCTIONS
deleteName.addEventListener("click", () => {
  if (!requireStudentId()) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      if (isEmpty(student.name)) {
        alert("Name already empty");
        return;
      }
      student.name = "";
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Name deleted");
});

deleteContact.addEventListener("click", () => {
  if (!requireStudentId()) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      if (isEmpty(student.contact)) {
        alert("Contact already empty");
        return;
      }
      student.contact = "";
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Contact deleted");
});

deleteEmail.addEventListener("click", () => {
  if (!requireStudentId()) return;

  let students = getStudents();
  let found = false;

  students.forEach((student) => {
    if (student.id === studentId.value) {
      if (isEmpty(student.email)) {
        alert("Email already empty");
        return;
      }
      student.email = "";
      found = true;
    }
  });

  if (!found) {
    alert("Student not found");
    return;
  }

  saveStudents(students);
  alert("Email deleted");
});

deleteId.addEventListener("click", () => {
  if (!requireStudentId()) return;

  let students = getStudents();
  let filtered = students.filter(
    (student) => student.id !== studentId.value
  );

  if (filtered.length === students.length) {
    alert("Student not found");
    return;
  }

  saveStudents(filtered);
  clearForm();
  alert("Student deleted completely");
});

// CLEAR FORM 
clearFormBtn.addEventListener("click", clearForm);
