const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const submitBtn = document.getElementById("submitBtn");
let editIndex = null;

// Load saved students from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];
displayStudents();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentID").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validations
  const nameRegex = /^[A-Za-z ]+$/;
  if (!nameRegex.test(name)) {
    alert("Student Name must contain only alphabets and spaces!");
    return;
  }

  const contactRegex = /^[0-9]{10}$/;
  if (!contactRegex.test(contact)) {
    alert("Contact Number must contain exactly 10 digits!");
    return;
  }

  // Update existing record
  if (editIndex !== null) {
    students[editIndex] = { name, id, email, contact };
    editIndex = null;
    submitBtn.textContent = "Register";
    alert("Record Updated Successfully!");
  } else {
    // Add new record
    students.push({ name, id, email, contact });
    alert("Student Registered Successfully!");
  }

  // Save to local storage
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
  form.reset();
});

function displayStudents() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Student Name">${student.name}</td>
      <td data-label="Student ID">${student.id}</td>
      <td data-label="Email ID">${student.email}</td>
      <td data-label="Contact No.">${student.contact}</td>
      <td data-label="Action">
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentID").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  submitBtn.textContent = "Update";
  editIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
