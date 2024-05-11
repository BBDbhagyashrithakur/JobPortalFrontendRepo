function showAllPost() {
    const url = 'http://localhost:8080/api/job/fetch/all'; // Replace 'url' with the actual API URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            createJobCards(data.jobs); // Call function to create job cards
        })
        .catch(error => {
             console.error('There was a problem with the fetch operation:', error);
        }); 
}


function createJobCards(jobs) {
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.innerHTML = ''; // Clear existing content
    jobs.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('job-card');
    
    
        const title = document.createElement('h2');
        title.textContent = job.jobTitle;
    
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
    
        // Append content to the card
        card.appendChild(title);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(jobType);
        card.appendChild(status);
    
        // Append card to the main screen
        mainScreen.appendChild(card);
    });
    
}

document.getElementById('fetchDataButton').addEventListener('click', showAllPost);

//Fethching All categeories:
function showAllCategeories() {
    const url = 'http://localhost:8080/api/job/category/fetch/all'; // Replace 'url' with the actual API URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            createCateCards(data.categories); // Call function to create job cards
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function createCateCards(categories) {         //create categeories cards:
    const mainScreen = document.querySelector('.mainScreen');
    mainScreen.innerHTML = ''; // Clear existing content
    categories.forEach(categories => {
        const card = document.createElement('div');
        card.classList.add('job-card');

        const name = document.createElement('h4');
        name.textContent = categories.name;
    
        const status = document.createElement('p');
        status.textContent = `Status: ${categories.status}`;
    
        // Append content to the card
        card.appendChild(name);
        card.appendChild(status);
    
        // Append card to the main screen
        mainScreen.appendChild(card);
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
                // option.value = optionText.toLowerCase();
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
                // option.value = optionText.toLowerCase();
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


//  add categories form

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
        { type: 'input', inputType: 'text', id: 'name', name: 'CategoryTitle', labelText: ' Category Title:' },
        { type: 'input', inputType: 'text', id: 'description', name: 'CategoryDescription', labelText: 'Category Description:' },

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
                // option.value = optionText.toLowerCase();
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
    savePostBtn.textContent = 'Add Category';
    savePostBtn.id = 'SavePostbtn';
    savePostBtn.addEventListener('click', () => SaveCategories(formElements))
 
   
    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    formContainer.appendChild(savePostBtn);
 
 
    mainScreen.appendChild(formContainer);
    loader.style.display = 'none';
    
}

//post categeories:
function SaveCategories(e) {  
    let name = "";
    let description = "";
    const admin_jwtTocken=sessionStorage.getItem('admin_jwtTocken');

        const formData = {name,description};
        e.forEach(element => {
            formData[element.id] = document.getElementById(element.id).value;
        });
        console.log(formData);
    
        fetch('http://localhost:8080/api/job/category/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: "Bearer" + admin_jwtTocken,
            },
            body: JSON.stringify(e),
        })
        .then(response => {
            if (response.ok) {
                console.log('Post saved successfully:');
            }
            return response.json();
        })
        .then(data => {
            console.log('Category saved successfully:', e);
        })
        .catch(error => {
            console.error('There was a problem saving the post:', error);
        });
    }
    
    
// Function to create jobs form
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

    // Fetch job categories from backend and populate the select options
    fetch('http://localhost:8080/api/job/category/fetch/all')
        .then(response => response.json())
        .then(data => {
            const jobCategorySelect = document.createElement('select');
            jobCategorySelect.id = 'jobCategory';
            jobCategorySelect.name = 'jobCategory';
            jobCategorySelect.required = true;

            // Loop through the categories and create options for the select field
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Assuming category has an 'id' property
                option.textContent = category.name; // Assuming category has a 'name' property
                jobCategorySelect.appendChild(option);
            });

            // Append the select field to the form body
            const jobCategoryFormGroup = document.createElement('div');
            jobCategoryFormGroup.classList.add('form-group');
            const label = document.createElement('label');
            label.textContent = 'Job Category:';
            jobCategoryFormGroup.appendChild(label);
            jobCategoryFormGroup.appendChild(jobCategorySelect);
            formBody.appendChild(jobCategoryFormGroup);
        })
        .catch(error => console.error('Error fetching job categories:', error));


         // Fetch job categories from backend and populate the select options

    

    // Fetch job types from the backend and populate the select options

    fetch('http://localhost:8080/api/helper/job/type/fetch/all')
    .then(response => response.json())
    .then(data => {
        const jobTypeSelect = document.createElement('select');
        jobTypeSelect.id = 'jobType';
        jobTypeSelect.name = 'jobType';
        jobTypeSelect.required = true;

        data.forEach(jobType => {
            const option = document.createElement('option');
            option.value = jobType; // Value is the same as the text content
            option.textContent = jobType; // Text content is the job type string
            jobTypeSelect.appendChild(option);
        });

        const jobTypeFormGroup = document.createElement('div');
        jobTypeFormGroup.classList.add('form-group');
        const label = document.createElement('label');
        label.textContent = 'Job Type:';
        jobTypeFormGroup.appendChild(label);
        jobTypeFormGroup.appendChild(jobTypeSelect);
        formBody.appendChild(jobTypeFormGroup);
    })
    .catch(error => console.error('Error fetching job types:', error));

    // fetch the salary range

    fetch('http://localhost:8080/api/helper/job/salary/range/fetch/all')
    .then(response => response.json())
    .then(data => {
        const jobTypeSelect = document.createElement('select');
        jobTypeSelect.id = 'salary';
        jobTypeSelect.name = 'salary';
        jobTypeSelect.required = true;

        data.forEach(jobType => {
            const option = document.createElement('option');
            option.value = jobType; // Value is the same as the text content
            option.textContent = jobType; // Text content is the job type string
            jobTypeSelect.appendChild(option);
        });

        const jobTypeFormGroup = document.createElement('div');
        jobTypeFormGroup.classList.add('form-group');
        const label = document.createElement('label');
        label.textContent = 'Salary Range:';
        jobTypeFormGroup.appendChild(label);
        jobTypeFormGroup.appendChild(jobTypeSelect);
        formBody.appendChild(jobTypeFormGroup);
    })
    .catch(error => console.error('Error fetching job types:', error));

    // experience

    fetch('http://localhost:8080/api/helper/job/expereince/fetch/all')
    .then(response => response.json())
    .then(data => {
        const jobTypeSelect = document.createElement('select');
        jobTypeSelect.id = 'salary';
        jobTypeSelect.name = 'salary';
        jobTypeSelect.required = true;

        data.forEach(jobType => {
            const option = document.createElement('option');
            option.value = jobType; // Value is the same as the text content
            option.textContent = jobType; // Text content is the job type string
            jobTypeSelect.appendChild(option);
        });

        const jobTypeFormGroup = document.createElement('div');
        jobTypeFormGroup.classList.add('form-group');
        const label = document.createElement('label');
        label.textContent = 'Experience:';
        jobTypeFormGroup.appendChild(label);
        jobTypeFormGroup.appendChild(jobTypeSelect);
        formBody.appendChild(jobTypeFormGroup);
    })
    .catch(error => console.error('Error fetching job types:', error));


    // Other form elements
    
    
    const formElements = [
        { type: 'input', inputType: 'text', id: 'jobTitle', name: 'jobTitle', labelText: 'Job Title:' },
        { type: 'input', inputType: 'text', id: 'companyName', name: 'companyName', labelText: 'Company Name:' },
        { type: 'input', inputType: 'text', id: 'jobDescription', name: 'jobDescription', labelText: 'Job Description:' },
        { type: 'input', inputType: 'text', id: 'name', name: 'CategoryTitle', labelText: 'Skills Required:' },
        { type: 'input', inputType: 'text', id: 'Street', name: 'Street', labelText: 'Street:' },
        { type: 'input', inputType: 'text', id: 'City', name: 'City', labelText: 'City:' },
        { type: 'input', inputType: 'text', id: 'description', name: 'CategoryDescription', labelText: 'Pin Code:' },
        { type: 'input', inputType: 'text', id: 'State', name: 'State', labelText: 'State:' },
        { type: 'input', inputType: 'text', id: 'Country', name: 'Country', labelText: 'Country:' },
        { type: 'input', inputType: 'text', id: 'SelectCompanyLogo', name: 'CompanyLogo', labelText: 'Company Logo:' },
        // Add other form elements as needed
    ];

    // Iterate over form elements and create corresponding input elements
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

    const saveJobBtn = document.createElement('button');
    saveJobBtn.textContent = 'Add Job';
    saveJobBtn.id = 'saveJobBtn';

    // Add event listener to handle saving the job
    saveJobBtn.addEventListener('click', saveJob);

    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
    formContainer.appendChild(saveJobBtn);
    mainScreen.appendChild(formContainer);
}


// Function to save the job
function saveJob() {
    // Implement saving logic here
}


//post categeories:
/*function SaveCategories(e) {  
    let name = "";
    let description = "";
    const admin_jwtTocken=sessionStorage.getItem('admin_jwtTocken');

        const formData = {name,description};
        e.forEach(element => {
            formData[element.id] = document.getElementById(element.id).value;
        });
        console.log(formData);
    
        fetch('http://localhost:8080/api/job/category/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: "Bearer" + admin_jwtTocken,
            },
            body: JSON.stringify(e),
        })
        .then(response => {
            if (response.ok) {
                console.log('Post saved successfully:');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post saved successfully:', e);
        })
        .catch(error => {
            console.error('There was a problem saving the post:', error);
        });
    }

    */
    



//About us page:
function showAboutContent() {
    const aboutPage = document.getElementById('about');
    aboutPage.innerHTML = '';

    const heading = document.createElement('p');
    heading.textContent = `
    Internship for All is portal in which we can easily apply for the internship or jobs.
    You can easily see the job with Job category, Job type company name etc..
    Admin can easy add the category and Employee can easy create job and user can see that job or internship
    and apply for that.`;
 
    aboutPage.appendChild(heading);
   
}
