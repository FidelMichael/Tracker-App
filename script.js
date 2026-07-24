/*==========================================================
    STUDENT MANAGEMENT SYSTEM ERP
    Version 1.0
    Developed by Fidel Michael
==========================================================*/


//==========================================================
// GLOBAL VARIABLES
//==========================================================

let students = JSON.parse(localStorage.getItem("students")) || [];

let editingIndex = -1;


//==========================================================
// HTML ELEMENTS
//==========================================================

const admission = document.getElementById("admission");

const firstName = document.getElementById("firstName");

const lastName = document.getElementById("lastName");

const gender = document.getElementById("gender");

const studentClass = document.getElementById("studentClass");

const studentStatus = document.getElementById("studentStatus");

const registerBtn = document.getElementById("registerBtn");

const updateBtn = document.getElementById("updateBtn");

const clearBtn = document.getElementById("clearBtn");

const studentTableBody = document.getElementById("studentTableBody");

const searchStudent = document.getElementById("searchStudent");

const totalStudents = document.getElementById("totalStudents");

const currentDate = document.getElementById("currentDate");


//==========================================================
// SAVE STUDENTS
//==========================================================

function saveStudents(){

    localStorage.setItem(

        "students",

        JSON.stringify(students)

    );

}


//==========================================================
// LOAD STUDENTS
//==========================================================

function loadStudents(){

    students = JSON.parse(

        localStorage.getItem("students")

    ) || [];

}


//==========================================================
// AUTOMATIC ADMISSION NUMBER
//==========================================================

function generateAdmissionNumber(){

    let nextNumber = students.length + 1;

    return "ADM2026" + String(nextNumber).padStart(3,"0");

}


function loadAdmissionNumber(){

    if(admission){

        admission.value = generateAdmissionNumber();

    }

}



//==========================================================
// LIVE DATE & TIME
//==========================================================

function updateDateTime(){

    if(currentDate){

        const today = new Date();

        currentDate.textContent =

        today.toLocaleString();

    }

}

setInterval(updateDateTime,1000);


//==========================================================
// UPDATE DASHBOARD
//==========================================================

function updateDashboard(){

    if(totalStudents){

        totalStudents.textContent = students.length;

    }

}


//==========================================================
// CLEAR FORM
//==========================================================

function clearForm(){

    if(!firstName) return;

    firstName.value = "";

    lastName.value = "";

    gender.value = "";

    studentClass.selectedIndex = 0;

    studentStatus.selectedIndex = 0;

    loadAdmissionNumber();

}


//==========================================================
// FORM VALIDATION
//==========================================================

function validateForm(){

    if(firstName.value.trim()===""){

        alert("Enter First Name");

        firstName.focus();

        return false;

    }

    if(lastName.value.trim()===""){

        alert("Enter Last Name");

        lastName.focus();

        return false;

    }

    if(gender.value===""){

        alert("Select Gender");

        gender.focus();

        return false;

    }

    return true;

}


//==========================================================
// REGISTER STUDENT
//==========================================================

function registerStudent(){

    if(!validateForm()){

        return;

    }

    const student={

        admission:admission.value,

        firstName:firstName.value.trim(),

        lastName:lastName.value.trim(),

        gender:gender.value,

        studentClass:studentClass.value,

        status:studentStatus.value

    };

    students.push(student);

    saveStudents();

    updateDashboard();

    clearForm();

    alert("Student Registered Successfully!");

}


//==========================================================
// BUTTON EVENTS
//==========================================================

if(registerBtn){

    registerBtn.addEventListener(

        "click",

        registerStudent

    );

}


if(clearBtn){

    clearBtn.addEventListener(

        "click",

        clearForm

    );

}


//==========================================================
// INITIALIZE APPLICATION
//==========================================================

loadStudents();

loadAdmissionNumber();

updateDashboard();

updateDateTime();


//==========================================================
// DISPLAY STUDENTS
//==========================================================

function displayStudents(studentList = students){

    if(!studentTableBody) return;

    studentTableBody.innerHTML="";

    if(studentList.length===0){

        studentTableBody.innerHTML=`

        <tr>

            <td colspan="6">

            No Students Registered

            </td>

        </tr>

        `;

        return;

    }

    studentList.forEach((student,index)=>{

        studentTableBody.innerHTML+=`

        <tr>

        <td>${student.admission}</td>

        <td>${student.firstName} ${student.lastName}</td>

        <td>${student.gender}</td>

        <td>${student.studentClass}</td>

        <td>${student.status}</td>

        <td>

        <button onclick="editStudent(${index})">

        Edit

        </button>

        <button onclick="deleteStudent(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

//==========================================================
// SEARCH STUDENT
//==========================================================

if(searchStudent){

searchStudent.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

const filtered=students.filter(student=>{

return(

student.firstName.toLowerCase().includes(keyword)

||

student.lastName.toLowerCase().includes(keyword)

||

student.admission.toLowerCase().includes(keyword)

||

student.studentClass.toLowerCase().includes(keyword)

);

});

displayStudents(filtered);

});

}
//==========================================================
// EDIT STUDENT
//==========================================================

function editStudent(index){

editingIndex=index;

const student=students[index];

admission.value=student.admission;

firstName.value=student.firstName;

lastName.value=student.lastName;

gender.value=student.gender;

studentClass.value=student.studentClass;

studentStatus.value=student.status;

}

//==========================================================
// UPDATE STUDENT
//==========================================================

if(updateBtn){

updateBtn.addEventListener("click",function(){

if(editingIndex===-1){

alert("Select a student first.");

return;

}

students[editingIndex]={

admission:admission.value,

firstName:firstName.value,

lastName:lastName.value,

gender:gender.value,

studentClass:studentClass.value,

status:studentStatus.value

};

saveStudents();

displayStudents();

updateDashboard();

clearForm();

editingIndex=-1;

alert("Student Updated Successfully.");

});

}

//==========================================================
// DELETE STUDENT
//==========================================================

function deleteStudent(index){

const answer=confirm(

"Are you sure you want to delete this student?"

);

if(!answer){

return;

}

students.splice(index,1);

saveStudents();

displayStudents();

updateDashboard();

loadAdmissionNumber();

}

students.push(student);
saveStudents();

displayStudents();

updateDashboard();

clearForm();

//==========================================================
// INITIALIZE APPLICATION
//==========================================================

loadStudents();

displayStudents();

loadAdmissionNumber();

updateDashboard();

updateDateTime();