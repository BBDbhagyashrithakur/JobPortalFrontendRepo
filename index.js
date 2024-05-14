function showAllPost() {
    const url = 'http://localhost:8080/api/job/fetch/all'; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            createJobCards(data.jobs); 
            console.log(data);
        })
        .catch(error => {
             console.error('There was a problem with the fetch operation:', error);
        }); 
}
function createJobCards(jobs) {
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.innerHTML = ''; 
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('job-card');

        const title = document.createElement('h3');
        title.textContent = `Post: ${job.title}`;

        const companyName = document.createElement('p');
        companyName.textContent = `Company: ${job.companyName}`;

        const address = document.createElement('p');
        address.textContent = `Location: ${job.address.city}`;

        const description = document.createElement('p');
        description.textContent = `Description: ${job.description}`;

        const jobType = document.createElement('p');
        jobType.textContent = `Job Type: ${job.jobType}`;

        const status = document.createElement('p');
        status.textContent = `Status: ${job.status}`;

        card.appendChild(title);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(jobType);
        card.appendChild(status);
      

       
        if (job.address.street!="") {
            const link = document.createElement('a');
            link.textContent = 'Click Here to Apply!';
            link.href = job.address.street;
            link.target = '_blank';
            card.appendChild(link); 
        }
        mainScreen.appendChild(card);
    });
}

document.getElementById('fetchDataButton').addEventListener('click', showAllPost);

//Fethching All categeories:
function showAllCategeories() {
    const url = 'http://localhost:8080/api/job/category/fetch/all'; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            createCateTable(data.categories); 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function createCateTable(categories) {
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.innerHTML = ''; 

    const table = document.createElement('table');
    table.classList.add('job-table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Category Name';
    const statusHeader = document.createElement('th');
    statusHeader.textContent = 'Status';
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(statusHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    categories.forEach(category => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = category.name;
    row.appendChild(nameCell);

    const statusCell = document.createElement('td');
    statusCell.textContent = category.status;
    row.appendChild(statusCell);
    
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteCategory(category.id));
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell);

    const editButtonCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => updateCategory(category.id));
    editButtonCell.appendChild(editButton);
    row.appendChild(editButtonCell);

    tbody.appendChild(row);
});
table.appendChild(tbody);

mainScreen.appendChild(table);

}

function deleteCategory(categoryId){
    console.log(categoryId);
    fetch(
        `http://localhost:8080/api/job/category/delete?categoryId=${categoryId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    )
    .then((response) => {
        if (response.ok) {
            console.log("Category deleted successfully");
            const row = document.getElementById(`categoryRow_${categoryId}`);
            if (row) {
                row.remove();
            }
        } else {
            throw new Error("Failed to delete category");
        }
    })
    .catch((error) => {
        console.error("Error deleting category:", error);
    });
};
function updateCategory(categoryId, updatedCategory) {
    const url = `http://localhost:8080/api/job/category/update/${categoryId}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCategory)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful update
        console.log('Category updated successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem with the update operation:', error);
    });
}




function createForm() {

    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.style.justifyContent = "center";
    mainScreen.innerHTML = '';

  
    const formContainer = document.createElement('div');
    formContainer.classList.add('postDetailCard');


    const formHeader = document.createElement('div');
    formHeader.classList.add('postHeader');
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Login Here..!!';
    formHeader.appendChild(formTitle);

 
    const formBody = document.createElement('div');
    formBody.classList.add('postDetailForm');

   
    const formElements = [
        { type: 'select', id: 'roles', name: 'roles', labelText: 'Role:', options: ['Admin', 'Employer', 'User'] },
        { type: 'input', inputType: 'text', id: 'email', name: 'Email', labelText: 'Email:' }
    ];

 let i=0;
    formElements.map(element => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        if (element.type === 'select') {
            const selectElement = document.createElement('select');
            selectElement.id = element.id;
            selectElement.name = element.name;
            selectElement.required = true;

            element.options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = i++;
                option.textContent = optionText;
                selectElement.appendChild(option);
            });

            const label = document.createElement('label');
            label.textContent = element.labelText;

            formGroup.appendChild(label);
            formGroup.appendChild(selectElement);
        } else if (element.type === 'input') {
            const inputElement = document.createElement('input');
            inputElement.type = element.inputType;
            inputElement.id = element.id;
            inputElement.name = element.name;
            inputElement.required = true;

            const label = document.createElement('label');
            label.textContent = element.labelText;

            formGroup.appendChild(label);
            formGroup.appendChild(inputElement);

       
            if (element.id === 'pincode') {
                const checkPincodeBtn = document.createElement('button');
                checkPincodeBtn.textContent = 'Check Pincode';
                checkPincodeBtn.id = 'checkPincodeBtn';
                checkPincodeBtn.addEventListener('click', checkPincode);
                formGroup.appendChild(checkPincodeBtn);
            }
        }

        formBody.appendChild(formGroup);
    });


    const savePostBtn = document.createElement('button');
    savePostBtn.textContent = 'Login';
    savePostBtn.id = 'SavePostbtn';
    savePostBtn.addEventListener('click', () => SavePost(formElements))

   
    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    formContainer.appendChild(savePostBtn);


    mainScreen.appendChild(formContainer);
    loader.style.display = 'none';
}


function createCategoriesForm() {
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.style.justifyContent = "center";
    mainScreen.innerHTML = '';

    const formContainer = document.createElement('div');
    formContainer.classList.add('AddCategories');

    const formHeader = document.createElement('div');
    formHeader.classList.add('postHeader');
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add Category';
    formHeader.appendChild(formTitle);

    const formBody = document.createElement('div');
    formBody.classList.add('AddCategories');

    const formElements = [
        { type: 'input', inputType: 'text', id: 'name', name: 'CategoryTitle', labelText: ' Category Title:', required: true },
        { type: 'input', inputType: 'text', id: 'description', name: 'CategoryDescription', labelText: 'Category Description:', required: true },
    ];

    formElements.map(element => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const inputElement = document.createElement('input');
        inputElement.type = element.inputType;
        inputElement.id = element.id;
        inputElement.name = element.name;
        inputElement.required = element.required; 

        const label = document.createElement('label');
        label.textContent = element.labelText;

        formGroup.appendChild(label);
        formGroup.appendChild(inputElement);

        formBody.appendChild(formGroup);
    });

    const savePostBtn = document.createElement('button');
    savePostBtn.textContent = 'Add Category';
    savePostBtn.id = 'addCategoryBtn'; 
    savePostBtn.addEventListener('click', () => {
        const allFieldsFilled = formElements.every(element => {
            const inputElement = document.getElementById(element.id);
            return inputElement.value.trim() !== ''; 
        });
        if (!allFieldsFilled) {
            displayAlert('Please Enter All the fields', 'error');
        } else {
    
            SaveCategories(formElements);
        }
    });

    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    formContainer.appendChild(savePostBtn);

    mainScreen.appendChild(formContainer);
    loader.style.display = 'none';
}

function displayAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;

    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 2000); 
}
function SaveCategories(e) {
    let name = "";
    let description = "";

    const formData = { name, description };
    e.forEach(element => {
        formData[element.id] = document.getElementById(element.id).value;
    });

    fetch('http://localhost:8080/api/job/category/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
    })
    .then(response => {
        if (response.ok) {
            console.log('Category saved successfully:');
            clearFormFields(e); 
            displayAlert('Category saved successfully', 'success');
        }
        return response.json();
    })
    .then(data => {
        console.log('Category saved successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem saving the category:', error);
        displayAlert('Failed to save category', 'error');
    });
}
function clearFormFields(elements) {
    elements.forEach(element => {
        document.getElementById(element.id).value = ""; 
    });
}

function createJobs() {
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.style.justifyContent = "center";
    mainScreen.innerHTML = '';

    const formContainer = document.createElement('div');
    formContainer.classList.add('AddCategories');

    const formHeader = document.createElement('div');
    formHeader.classList.add('postHeader');
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Add Job';
    formHeader.appendChild(formTitle);

    const formBody = document.createElement('div');
    formBody.classList.add('AddCategories');

    // Fetch job categories from backend 
    fetch('http://localhost:8080/api/job/category/fetch/all')
        .then(response => response.json())
        .then(data => {
            const jobCategorySelect = document.createElement('select');
            jobCategorySelect.id = 'jobCategory';
            jobCategorySelect.name = 'jobCategory';
            jobCategorySelect.required = true;
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                jobCategorySelect.appendChild(option);
            });

            const jobCategoryFormGroup = document.createElement('div');
            jobCategoryFormGroup.classList.add('form-group');
            const label = document.createElement('label');
            label.textContent = 'Job Category:';
            jobCategoryFormGroup.appendChild(label);
            jobCategoryFormGroup.appendChild(jobCategorySelect);
            formBody.appendChild(jobCategoryFormGroup);

            // Create and append the submit button here
            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.addEventListener('click', () => saveJob(formElements))
 
            submitButton.textContent = 'Submit';
            submitButton.classList.add('btn', 'btn-primary');
            formBody.appendChild(submitButton);
        })
        .catch(error => console.error('Error fetching job categories:', error));

        // Fetch salary ranges from backend 
    fetch('http://localhost:8080/api/helper/job/salary/range/fetch/all')
        .then(response => response.json())
        .then(data => {
            const salaryRangeSelect = document.createElement('select');
            salaryRangeSelect.id = 'salaryRange';
            salaryRangeSelect.name = 'salaryRange';
            salaryRangeSelect.required = true;
            data.forEach(range => {
                const option = document.createElement('option');
                option.value = range;
                option.textContent = range;
                salaryRangeSelect.appendChild(option);
            });

            const salaryRangeFormGroup = document.createElement('div');
            salaryRangeFormGroup.classList.add('form-group');
            const label = document.createElement('label');
            label.textContent = 'Salary Range:';
            salaryRangeFormGroup.appendChild(label);
            salaryRangeFormGroup.appendChild(salaryRangeSelect);
            formBody.appendChild(salaryRangeFormGroup);
        })
        .catch(error => console.error('Error fetching salary ranges:', error));

      // Fetch experience level from backend 
      fetch('http://localhost:8080/api/helper/job/expereince/fetch/all')
      .then(response => response.json())
      .then(data => {
          const experienceSelect = document.createElement('select');
          experienceSelect.id = 'experienceLevel';
          experienceSelect.name = 'experienceLevel';
          experienceSelect.required = true;
          data.forEach(level => {
              const option = document.createElement('option');
              option.value = level;
              option.textContent = level;
              experienceSelect.appendChild(option);
          });

          const experienceFormGroup = document.createElement('div');
          experienceFormGroup.classList.add('form-group');
          const label = document.createElement('label');
          label.textContent = 'Experience Level:';
          experienceFormGroup.appendChild(label);
          experienceFormGroup.appendChild(experienceSelect);
          formBody.appendChild(experienceFormGroup);
      })
      .catch(error => console.error('Error fetching experience levels:', error));
    
      fetch('http://localhost:8080/api/helper/job/type/fetch/all')
      .then(response => response.json())
      .then(data => {
          const experienceSelect = document.createElement('select');
          experienceSelect.id = 'jobType';
          experienceSelect.name = 'jobType';
          experienceSelect.required = true;
          data.forEach(level => {
              const option = document.createElement('option');
              option.value = level;
              option.textContent = level;
              experienceSelect.appendChild(option);
          });

          const experienceFormGroup = document.createElement('div');
          experienceFormGroup.classList.add('form-group');
          const label = document.createElement('label');
          label.textContent = 'Experience Level:';
          experienceFormGroup.appendChild(label);
          experienceFormGroup.appendChild(experienceSelect);
          formBody.appendChild(experienceFormGroup);
      })
      .catch(error => console.error('Error fetching experience levels:', error));
    
    const formElements = [
        { type: 'input', inputType: 'text', id: 'jobTitle', name: 'jobTitle', labelText: 'Job Title:' },
        { type: 'input', inputType: 'text', id: 'companyName', name: 'companyName', labelText: 'Company Name:' },
        { type: 'input', inputType: 'text', id: 'jobDescription', name: 'jobDescription', labelText: 'Job Description:' },
        { type: 'input', inputType: 'text', id: 'skillsRequired', name: 'skillsRequired', labelText: 'Skills Required:' },
        { type: 'input', inputType: 'text', id: 'street', name: 'street', labelText: 'Visit Link:' },
        { type: 'input', inputType: 'text', id: 'city', name: 'city', labelText: 'city:' },
        { type: 'input', inputType: 'text', id: 'pinCode', name: 'pinCode', labelText: 'Pin Code:' },
        { type: 'input', inputType: 'text', id: 'state', name: 'state', labelText: 'State:' },
        { type: 'input', inputType: 'text', id: 'country', name: 'country', labelText: 'Country:' },
    ];

    formElements.forEach(element => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const inputElement = document.createElement(element.type);
        inputElement.type = element.inputType || 'text';
        inputElement.id = element.id;
        inputElement.name = element.name;
        inputElement.required = true;

        const label = document.createElement('label');
        label.textContent = element.labelText;

        formGroup.appendChild(label);
        formGroup.appendChild(inputElement);

        formBody.appendChild(formGroup);
    });

    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);

    mainScreen.appendChild(formContainer);
   
}

// Save job function
function saveJob(formElements) {
    let formData = {
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        skillsRequired: "",
        street: "",
        pinCode: "",
        state: "",
        jobCategory:"",
        country: "",
        experienceLevel:"",
        salaryRange:"",
        jobType:"",
    };
    formElements.forEach(element => {
        formData[element.id] = document.getElementById(element.id).value;
    });

    // Make a fetch request to save the job data
    fetch('http://localhost:8080/api/job/add', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save job. Server responded with status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Job saved successfully:', data);
        clearFormFields(formElements);
        displayAlert('Job saved successfully', 'success');
    })
    .catch(error => {
        console.error('Error saving job:', error);
        displayAlert('Failed to save job. Please check the form data and try again.', 'error');
    });
     
        const allFieldsFilled = formElements.every(element => {
        const inputElement = document.getElementById(element.id);
        return inputElement.value.trim() !== ''; 
    });

    
    if (!allFieldsFilled) {
        displayAlert('Please Enter All the fields', 'error');
    } else {
       
        saveJob(formElements);
    }
}





function createRegistrationForm() {

    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.style.justifyContent = "center";
    mainScreen.innerHTML = '';
 
 
    const formContainer = document.createElement('div');
    formContainer.classList.add('postDetailCard');
 
 
    const formHeader = document.createElement('div');
    formHeader.classList.add('postHeader');
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Registration';
    formHeader.appendChild(formTitle);
 
 
    const formBody = document.createElement('div');
    formBody.classList.add('postDetailForm');
 
   
    const formElements = [
        { type: 'input', inputType: 'text', id: 'FirstName', name: 'FirstName', labelText: 'First Name:' },
        { type: 'input', inputType: 'text', id: 'LastName', name: 'LastName', labelText: 'Last Name:' },
        { type: 'input', inputType: 'text', id: 'email', name: 'Email', labelText: 'Email:' },
        { type: 'input', inputType: 'text', id: 'ContactNo', name: 'ContactNo', labelText: 'Contact No:' },
        { type: 'input', inputType: 'text', id: 'street', name: 'street', labelText: 'Street:' },
        { type: 'input', inputType: 'text', id: 'city', name: 'city', labelText: 'City:' },
        { type: 'input', inputType: 'text', id: 'State', name: 'state', labelText: 'State:' },
        { type: 'input', inputType: 'text', id: 'pincode', name: 'pincode', labelText: 'Pincode:' },
        { type: 'input', inputType: 'text', id: 'country', name: 'country', labelText: 'Country:' }
    ];
 
 let i=0;
    formElements.map(element => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');
 
        if (element.type === 'select') {
            const selectElement = document.createElement('select');
            selectElement.id = element.id;
            selectElement.name = element.name;
            selectElement.required = true;
 
            element.options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = i++;
                option.textContent = optionText;
                selectElement.appendChild(option);
            });
 
            const label = document.createElement('label');
            label.textContent = element.labelText;
 
            formGroup.appendChild(label);
            formGroup.appendChild(selectElement);
        } else if (element.type === 'input') {
            const inputElement = document.createElement('input');
            inputElement.type = element.inputType;
            inputElement.id = element.id;
            inputElement.name = element.name;
            inputElement.required = true;
 
            const label = document.createElement('label');
            label.textContent = element.labelText;
 
            formGroup.appendChild(label);
            formGroup.appendChild(inputElement);
 
       
        }
 
        formBody.appendChild(formGroup);
    });
 
 
    const savePostBtn = document.createElement('button');
    savePostBtn.textContent = 'Register';
    savePostBtn.id = 'SavePostbtn';
    savePostBtn.addEventListener('click', () => SavePost(formElements))
 
   
    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    formContainer.appendChild(savePostBtn);
 
 
    mainScreen.appendChild(formContainer);
    loader.style.display = 'none';
    
}
function saveRegform()
{

}

//About us page:
function showAboutContent() {
    const aboutPage = document.getElementById('about');
    aboutPage.innerHTML = '';

    const heading = document.createElement('p');
    heading.textContent = `
    Job portal  in which we can easily apply for the internship or jobs.
    You can easily see the job with Job category, Job type company name etc..
    Admin can easy add the category and Employee can easy create job and user can see that job or internship
    and apply for that.`;
 
    aboutPage.appendChild(heading);
    
   
}
