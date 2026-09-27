 
const form = document.getElementById('registrationForm');
const studentList = document.getElementById('studentList');
// Retrieve existing data or initialize empty array
let students = JSON.parse(localStorage.getItem('studentData')) || [];
// Function to render students to the DOM
function renderStudents() {
    // Clear current list to prevent duplicates
    studentList.innerHTML = '';
    // If no students, show a message
    if (students.length === 0) {
        studentList.innerHTML = '<li style="text-align:center; color:#888; padding:10px;">No students registered yet.</li>';
        return;
    }
    students.forEach((student, index) => {
        // Create list item
        const li = document.createElement('li');
        li.className = 'student-item';

        // Create text content for student details
        const infoDiv = document.createElement('div');
        infoDiv.className = 'student-info';
        infoDiv.innerHTML = `
            <strong>Full_Name: ${student.name}</strong><br>
            Age: ${student.age}<br>
            Email: ${student.email}<br>
            Course: ${student.course}
        `;

        // Create Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
                
        // Allow the user to remove a displayed registration
        removeBtn.addEventListener('click', () => {
        removeStudent(index);
        });

        // Append elements to list item
        li.appendChild(infoDiv);
        li.appendChild(removeBtn);
                
        // Append list item to UL
        studentList.appendChild(li);
    });
}

    // Function to add a new student
form.addEventListener('submit',function(e) {
    e.preventDefault(); // Prevent page refresh
    // Get values from inputs
    const newStudent = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        course: document.getElementById('course').value
    };

    // Add to array
    students.push(newStudent);
        
    // Save to localStorage
    localStorage.setItem('studentData', JSON.stringify(students));
        
    // Clear form inputs
    form.reset();

    // Update display
    renderStudents();
});

// Function to remove a student
function removeStudent(index) {
    // Remove item from array
    students.splice(index, 1);

    // Update localStorage
    localStorage.setItem('studentData', JSON.stringify(students));

    // Update display
    renderStudents();
 }

// Initial render on page load
 renderStudents();