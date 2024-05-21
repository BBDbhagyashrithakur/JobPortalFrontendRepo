document.addEventListener("DOMContentLoaded", function() {
  const userEmail = localStorage.getItem("email");

  if (userEmail === "baviskarritu02@gmail.com") {
      const elementsToShow = [
          document.getElementById("logout"),
          document.getElementById("categoriesLink"),
          document.getElementById("addCategoriesLink"),
          document.getElementById("addJobsLink"),
          document.getElementById("jobsLink")
      ];
      elementsToShow.forEach(element => {
          if (element) {
              element.style.display = "block";
          } else {
              console.error("Element not found");
          }
      });
      const homeHeading = document.getElementById("Homeheading");
      if (homeHeading) {
          homeHeading.style.display = "none";
      } else {
          console.error("Homeheading element not found");
      }
  } else if (userEmail === "") {
      const elementsToShow = [
          document.getElementById("logout"),
          document.getElementById("categoriesLink"),
          document.getElementById("addCategoriesLink"),
          document.getElementById("addJobsLink"),
          document.getElementById("jobsLink")
      ];
      elementsToShow.forEach(element => {
          if (element) {
              element.style.display = "block";
          } else {
              console.error("Element not found");
          }
      });
      const homeHeading = document.getElementById("Homeheading");
      if (homeHeading) {
          homeHeading.style.display = "none";
      } else {
          console.error("Homeheading element not found");
      }
  } else {
      const elementsToHide = [
          document.getElementById("logout"),
          document.getElementById("categoriesLink"),
          document.getElementById("addCategoriesLink"),
          document.getElementById("addJobsLink"),
          document.getElementById("jobsLink")
      ];
      elementsToHide.forEach(element => {
          if (element) {
              element.style.display = "none";
          } else {
              console.error("Element not found:", element);
          }
      });

      const homeHeading = document.getElementById("Homeheading");
      if (homeHeading) {
          homeHeading.style.display = "block";
      } else {
          console.error("Homeheading element not found");
      }
  }
});

function createJobCards(jobs,itemsPerPage=6) {
  const mainScreen = document.querySelector(".mainScreen");
  mainScreen.innerHTML = "";

  let currentPage = 1;

  function displayPage(pageNumber) {
    mainScreen.innerHTML = '';
    currentPage = pageNumber;

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, jobs.length);

    for (let i = startIndex; i < endIndex; i++) {
      const job = jobs[i];
    const card = document.createElement("div");
    card.classList.add("job-card");

    const title = document.createElement("h3");
    title.innerHTML = `<strong>Post:</strong> ${job.title}`;
    
    const companyName = document.createElement("p");
    companyName.innerHTML = `<strong>Company:</strong> ${job.companyName}`;
    
    const location = document.createElement("p");
    location.innerHTML = `${getLocation()} <strong>Location:</strong> ${job.location}`;
    const description = document.createElement("p");
    description.innerHTML = `<strong>Description:</strong> ${job.description}`;
    
    const jobType = document.createElement("p");
    jobType.innerHTML = `<strong>Work Time:</strong> ${job.jobType}`;

    const experienceLevel = document.createElement("p");
    experienceLevel.innerHTML = `<strong>Experience:</strong> ${job.experienceLevel}`;

    const salaryRange = document.createElement("p");
    salaryRange.innerHTML = `<strong>Salary:</strong> ${getSalarySymbol()} ${job.salaryRange}`;

    const applyButton = document.createElement("button");
    applyButton.textContent = "Apply Now";
    applyButton.classList.add("btn-7"); // Add class name
    
    const span = document.createElement("span");
    applyButton.appendChild(span);
    
    applyButton.addEventListener("click", () => {
      window.open(job.visitLink, "_blank");
    });
    
    document.body.appendChild(applyButton);
    

    card.appendChild(title);
    card.appendChild(companyName);
    card.appendChild(location);
    card.appendChild(description);
    card.appendChild(jobType);
    card.appendChild(experienceLevel);
    card.appendChild(salaryRange);
    card.appendChild(applyButton);

    
    mainScreen.appendChild(card);
  }
  mainScreen.appendChild(createPaginationButtons());
}
function createPaginationButtons() {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination-container');

  const numPages = Math.ceil(jobs.length / itemsPerPage);

  for (let i = 1; i <= numPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => displayPage(i));
      paginationContainer.appendChild(pageButton);
  }

  return paginationContainer;
}
displayPage(currentPage);
}
 
createJobCards(jobs);

function getAddressSymbol() {
  
  return '💼'; 
}
function getWatchSymbol() {
  return '⏰'; 
}

function getLocation() {
  
  return '📍'; 
}
function getSalarySymbol() {
  
  return '💰'; 
}

document
  .getElementById("fetchDataButton")
  .addEventListener("click", showAllPost);

//Fethching All categeories:
function showAllCategeories() {
  fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/all",
    {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      }
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      createCateTable(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}function createCateTable(categories) {
  const mainScreen = document.querySelector(".mainScreen");
  mainScreen.innerHTML = "";

  if (!categories || categories.length == 0) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "No categories found.";
      mainScreen.appendChild(errorMessage);
      return; 
  }

  const listContainer = document.createElement("div");
  listContainer.classList.add("category-list");

  categories.forEach((category) => {
      const container = document.createElement("div");
      container.classList.add("category-container");

      const card = document.createElement("div");
      card.classList.add("category-card");

      const categoryName = document.createElement("h3");
      categoryName.textContent = category.name;
      card.appendChild(categoryName);

      const categoryDescription = document.createElement("p");
      categoryDescription.textContent = category.description;
      card.appendChild(categoryDescription);

      container.appendChild(card);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => deleteCategory(category.id));
      container.appendChild(deleteButton);

      listContainer.appendChild(container);
  });

  mainScreen.appendChild(listContainer);
}

function deleteCategory(id) {
  console.log(id);
  fetch(`https://jobportal.projects.bbdgrad.com/api/api/job/category/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`

    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Category deleted successfully");
        const row = document.getElementById(`categoryRow_${id}`);
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
    displayAlert(" Delete sccssesfully..!", "success");
    return;
}

// function updateCategory(categoryId, updatedCategory) {
//   const url = `http://localhost:8080/api/job/category/update/${categoryId}`;

//   fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updatedCategory),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Handle successful update
//       console.log("Category updated successfully:", data);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the update operation:", error);
//     });
// }

// function createForm() {
//   const mainScreen = document.querySelector(".mainScreen");
//   mainScreen.style.justifyContent = "center";
//   mainScreen.innerHTML = "";

//   const formContainer = document.createElement("div");
//   formContainer.classList.add("postDetailCard");

//   const formHeader = document.createElement("div");
//   formHeader.classList.add("postHeader");
//   const formTitle = document.createElement("h2");
//   formTitle.textContent = "Login Here..!!";
//   formHeader.appendChild(formTitle);

//   const formBody = document.createElement("div");
//   formBody.classList.add("postDetailForm");

//   const formElements = [
//     {
//       type: "select",
//       id: "roles",
//       name: "roles",
//       labelText: "Role:",
//       options: ["Admin", "Employer", "User"],
//     },
//     {
//       type: "input",
//       inputType: "text",
//       id: "email",
//       name: "Email",
//       labelText: "Email:",
//     },
//   ];

//   let i = 0;
//   formElements.map((element) => {
//     const formGroup = document.createElement("div");
//     formGroup.classList.add("form-group");

//     if (element.type === "select") {
//       const selectElement = document.createElement("select");
//       selectElement.id = element.id;
//       selectElement.name = element.name;
//       selectElement.required = true;

//       element.options.forEach((optionText) => {
//         const option = document.createElement("option");
//         option.value = i++;
//         option.textContent = optionText;
//         selectElement.appendChild(option);
//       });

//       const label = document.createElement("label");
//       label.textContent = element.labelText;

//       formGroup.appendChild(label);
//       formGroup.appendChild(selectElement);
//     } else if (element.type === "input") {
//       const inputElement = document.createElement("input");
//       inputElement.type = element.inputType;
//       inputElement.id = element.id;
//       inputElement.name = element.name;
//       inputElement.required = true;

//       const label = document.createElement("label");
//       label.textContent = element.labelText;

//       formGroup.appendChild(label);
//       formGroup.appendChild(inputElement);

//       if (element.id === "pincode") {
//         const checkPincodeBtn = document.createElement("button");
//         checkPincodeBtn.textContent = "Check Pincode";
//         checkPincodeBtn.id = "checkPincodeBtn";
//         checkPincodeBtn.addEventListener("click", checkPincode);
//         formGroup.appendChild(checkPincodeBtn);
//       }
//     }

//     formBody.appendChild(formGroup);
//   });

//   const savePostBtn = document.createElement("button");
//   savePostBtn.textContent = "Login";
//   savePostBtn.id = "SavePostbtn";
//   savePostBtn.addEventListener("click", () => SavePost(formElements));

//   formContainer.appendChild(formHeader);
//   formContainer.appendChild(formBody);
//   formContainer.appendChild(savePostBtn);

//   mainScreen.appendChild(formContainer);
//   loader.style.display = "none";
// }

function createCategoriesForm() {
  const mainScreen = document.querySelector(".mainScreen");
  mainScreen.style.justifyContent = "center";
  mainScreen.innerHTML = "";

  const formContainer = document.createElement("div");
  formContainer.classList.add("AddCategories");

  const formHeader = document.createElement("div");
  formHeader.classList.add("postHeader");
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add Category";
  formHeader.appendChild(formTitle);

  const formBody = document.createElement("div");
  formBody.classList.add("AddCategories");

  const formElements = [
    {
      type: "input",
      inputType: "text",
      id: "name",
      name: "CategoryTitle",
      labelText: " Category Title:",
      required: true,
    },
    {
      type: "input",
      inputType: "text",
      id: "description",
      name: "CategoryDescription",
      labelText: "Category Description:",
      required: true,
    },
  ];

  formElements.map((element) => {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");

    const inputElement = document.createElement("input");
    inputElement.type = element.inputType;
    inputElement.id = element.id;
    inputElement.name = element.name;
    inputElement.required = element.required;

    const label = document.createElement("label");
    label.textContent = element.labelText;

    formGroup.appendChild(label);
    formGroup.appendChild(inputElement);

    formBody.appendChild(formGroup);
  });

  const savePostBtn = document.createElement("button");
  savePostBtn.textContent = "Add Category";
  savePostBtn.id = "addCategoryBtn";
  savePostBtn.addEventListener("click", () => {
    const allFieldsFilled = formElements.every((element) => {
      const inputElement = document.getElementById(element.id);
      return inputElement.value.trim() !== "";
    });
    if (!allFieldsFilled) {
      displayAlert("Please Enter All the fields", "error");
    } else {
      SaveCategories(formElements);
    }
  });

  formContainer.appendChild(formHeader);
  formContainer.appendChild(formBody);
  formContainer.appendChild(savePostBtn);

  mainScreen.appendChild(formContainer);
  loader.style.display = "none";
}

function displayAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;

  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 2000);
}

// Save categories function
function SaveCategories(e) {
  let name = "";
  let description = "";

  const formData = { name, description };
  e.forEach((element) => {
    let value = document.getElementById(element.id).value;
    if (element.id === "name") {
      value = capitalizeFirstLetter(value);
    }
    formData[element.id] = value;
  });
  fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Category saved successfully:");
        clearFormFields(e);
        displayAlert("Category saved successfully", "success");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Category saved successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem saving the category:", error);
      displayAlert("Failed to save category", "error");
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Clear form fields function
function clearFormFields(elements) {
  elements.forEach((element) => {
    document.getElementById(element.id).value = "";
  });
}
 function createJobs() {
  const mainScreen = document.querySelector(".mainScreen");
  mainScreen.style.justifyContent = "center";
  mainScreen.innerHTML = "";
  const userEmail = localStorage.getItem("email");
  const addJobsLink = document.getElementById("addJobsLink");
  // localStorage.setItem("email","baviskarritu02@gmail.com")
    const formContainer = document.createElement("div");
    formContainer.classList.add("AddCategories");
  
    const formHeader = document.createElement("div");
    formHeader.classList.add("postHeader");
    const formTitle = document.createElement("h2");
    formTitle.textContent = "Add Job";
    formHeader.appendChild(formTitle);
  
  
    const formBody = document.createElement("div");
    formBody.classList.add("AddCategories");
  
    // Fetch job categories from backend
    fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/all",
      {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const jobCategorySelect = document.createElement("select");
        jobCategorySelect.id = "JobCategory";
        jobCategorySelect.name = "JobCategory";
        jobCategorySelect.required = true;
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          jobCategorySelect.appendChild(option);
        });
  
        const jobCategoryFormGroup = document.createElement("div");
        jobCategoryFormGroup.classList.add("form-group");
        const label = document.createElement("label");
        label.textContent = "Job Category:";
        jobCategoryFormGroup.appendChild(label);
        jobCategoryFormGroup.appendChild(jobCategorySelect);
        formBody.appendChild(jobCategoryFormGroup);
      })
      .catch((error) => console.error("Error fetching job categories:", error));
  
    // Function to create a select element
    function createSelectElement(id, labelText, optionsData) {
      const selectElement = document.createElement("select");
      selectElement.id = id;
      selectElement.name = id;
      selectElement.required = true;
  
      const label = document.createElement("label");
      label.textContent = labelText;
  
      optionsData.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
      });
  
      const formGroup = document.createElement("div");
      formGroup.classList.add("form-group");
      formGroup.appendChild(label);
      formGroup.appendChild(selectElement);
  
      return formGroup;
    }
  
    // Fetch job types from backend
    fetch("https://jobportal.projects.bbdgrad.com/api/jobs/types",
      {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const jobTypeSelect = createSelectElement("jobType", "Job Type:", data);
        formBody.appendChild(jobTypeSelect);
      })
      .catch((error) => console.error("Error fetching job types:", error));
  
    // Fetch salary ranges from backend
    fetch("https://jobportal.projects.bbdgrad.com/api/jobs/salaryRanges",
      {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const salaryRangeSelect = createSelectElement(
          "salaryRange",
          "Salary Range:",
          data
        );
        formBody.appendChild(salaryRangeSelect);
      })
      .catch((error) => console.error("Error fetching salary ranges:", error));
  
    // Fetch experience levels from backend
    fetch("https://jobportal.projects.bbdgrad.com/api/jobs/experienceLevels",
      {
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const experienceLevelSelect = createSelectElement(
          "experienceLevel",
          "Experience Level:",
          data
        );
        formBody.appendChild(experienceLevelSelect);
      })
      .catch((error) =>
        console.error("Error fetching experience levels:", error)
      );
  
    const formElements = [
      {
        type: "input",
        inputType: "text",
        id: "title",
        name: "title",
        labelText: "Job Title:",
      },
      {
        type: "input",
        inputType: "text",
        id: "description",
        name: "description",
        labelText: "Job Description:",
      },
      {
        type: "input",
        inputType: "text",
        id: "companyName",
        name: "companyName",
        labelText: "Company Name:",
      },
      {
        type: "input",
        inputType: "text",
        id: "location",
        name: "location",
        labelText: "Location:",
      },
      
      {
        type: "input",
        inputType: "text",
        id: "requiredSkills",
        name: "skillsRequired",
        labelText: "Skills Required:",
      },
      {
        type: "input",
        inputType: "text",
        id: "visitLink",
        name: "visitLink",
        labelText: "Visit Link:",
      },
    ];
  
    formElements.forEach((element) => {
      const formGroup = document.createElement("div");
      formGroup.classList.add("form-group");
  
      const inputElement = document.createElement(element.type);
      inputElement.type = element.inputType || "text";
      inputElement.id = element.id;
      inputElement.name = element.name;
      inputElement.required = true;
  
      const label = document.createElement("label");
      label.textContent = element.labelText;
  
      formGroup.appendChild(label);
      formGroup.appendChild(inputElement);
  
      formBody.appendChild(formGroup);
    });
    addJobsLink.setAttribute("disabled", true);
    addJobsLink.classList.add("disabled-link");
    formContainer.appendChild(formHeader);
    formContainer.appendChild(formBody);
  
    mainScreen.appendChild(formContainer);
  
    // Add submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.addEventListener("click", () => saveJob(formElements));
    submitButton.textContent = "Submit";
    submitButton.classList.add("btn", "btn-primary");
    mainScreen.appendChild(submitButton);

  }
// Save job function
function saveJob(formElements) {

  const allFieldsFilled = formElements.every(element => {
      const inputElement = document.getElementById(element.id);
      return inputElement.value.trim() !== ''; 
  });


//   let title = "";
//   const formData1 = { title };
//   formElements.forEach((element) => {
//     let value = document.getElementById(element.id).value;
//     if (element.id === "title") {
//       value = capitalizeFirstLetter(value);
//     }
//     formData1[element.id] = value;
//     console.log(capitalizeFirstLetter(value)); // Output should be "Job title"
// });


 
  if (!allFieldsFilled) {
      displayAlert('Please Enter All the fields', 'error');
      return; 
  }

  let formData = {};
  formElements.forEach(element => {
      formData[element.id] = document.getElementById(element.id).value;
  });

  // Check if the visit link is valid
  if (!isValidUrl(formData.visitLink)) {
      displayAlert('Please enter a valid URL for the visit link', 'error');
      return; 
  }

  // Update formData with selected values from select elements
  formData.jobCategory = document.getElementById('JobCategory').value;
  formData.experienceLevel = document.getElementById('experienceLevel').value;
  formData.salaryRange = document.getElementById('salaryRange').value;
  formData.jobType = document.getElementById('jobType').value;

  // Make a fetch request to save the job data
  fetch('https://jobportal.projects.bbdgrad.com/api/jobs/add', {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
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

}
// function capitalizeFirstLetter(string)
//   {
//     return  string.charAt(0).toUpperCase();
//   }

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)/i; // Match "http://" or "https://"
  return pattern.test(url);
  
}


// function createRegistrationForm() {
//   const mainScreen = document.querySelector(".mainScreen");
//   mainScreen.style.justifyContent = "center";
//   mainScreen.innerHTML = "";

//   const formContainer = document.createElement("div");
//   formContainer.classList.add("postDetailCard");

//   const formHeader = document.createElement("div");
//   formHeader.classList.add("postHeader");
//   const formTitle = document.createElement("h2");
//   formTitle.textContent = "Registration";
//   formHeader.appendChild(formTitle);

//   const formBody = document.createElement("div");
//   formBody.classList.add("postDetailForm");

//   const formElements = [
   
//     {
//       type: "input",
//       inputType: "text",
//       id: "FirstName",
//       name: "FirstName",
//       labelText: "First Name:",
//     },
//     {
//       type: "input",
//       inputType: "text",
//       id: "LastName",
//       name: "LastName",
//       labelText: "Last Name:",
//     },
//     {
//       type: "input",
//       inputType: "text",
//       id: "email",
//       name: "Email",
//       labelText: "Email:",
//     },
   
//     {
//       type: "input",
//       inputType: "text",
//       id: "ContactNo",
//       name: "ContactNo",
//       labelText: "Contact No:",
//     }
   

//   ];

//   let i = 0;
//   formElements.map((element) => {
//     const formGroup = document.createElement("div");
//     formGroup.classList.add("form-group");

//     if (element.type === "select") {
//       const selectElement = document.createElement("select");
//       selectElement.id = element.id;
//       selectElement.name = element.name;
//       selectElement.required = true;

//       element.options.forEach((optionText) => {
//         const option = document.createElement("option");
//         option.value = i++;
//         option.textContent = optionText;
//         selectElement.appendChild(option);
//       });

//       const label = document.createElement("label");
//       label.textContent = element.labelText;

//       formGroup.appendChild(label);
//       formGroup.appendChild(selectElement);
//     } else if (element.type === "input") {
//       const inputElement = document.createElement("input");
//       inputElement.type = element.inputType;
//       inputElement.id = element.id;
//       inputElement.name = element.name;
//       inputElement.required = true;

//       const label = document.createElement("label");
//       label.textContent = element.labelText;

//       formGroup.appendChild(label);
//       formGroup.appendChild(inputElement);
//     }

//     formBody.appendChild(formGroup);
//   });

//   const savePostBtn = document.createElement("button");
//   savePostBtn.textContent = "Register";
//   savePostBtn.id = "SavePostbtn";
//   savePostBtn.addEventListener("click", () => SavePost(formElements));

//   formContainer.appendChild(formHeader);
//   formContainer.appendChild(formBody);
//   formContainer.appendChild(savePostBtn);

//   mainScreen.appendChild(formContainer);
//   loader.style.display = "none";
// }
// Define a function to handle form submission
// function SavePost() {
//   // Get form inputs
//   const role = document.getElementById("Role").value;
//   const firstName = document.getElementById("FirstName").value;
//   const lastName = document.getElementById("LastName").value;
//   const emailId = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const phoneNo = document.getElementById("ContactNo").value;
//   const street = document.getElementById("street").value;
//   const city = document.getElementById("city").value;
//   const state = document.getElementById("State").value;
//   const pincode = document.getElementById("pincode").value;
//   const country = document.getElementById("country").value;

//   // Construct user object
//   const user = {
//     role,
//     firstName,
//     lastName,
//     emailId,
//     password,
//     phoneNo,
//     street,
//     city,
//     state,
//     pincode,
//     country,
//   };

//   // Send user data to server
//   fetch("https://jobportal.projects.bbdgrad.com/api/api/user/register", {
//     method: "POST",
//     headers:{
//       "Content-Type": "application/json",
//       Authorization:`Bearer ${token}`
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log("ok");
//       } else {
//         console.log("not ok");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       toast.error("Failed to register user. Server error.", {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     });
// }

// // Add event listener to form submission
// document
//   .getElementById("userRegisterForm")
//   .addEventListener("submit", SavePost);

//About us page:

function showAboutContent() {
  const aboutPage = document.getElementById("about");
  aboutPage.innerHTML = "";

  const heading = document.createElement("p");
  heading.textContent = `
    Job portal  in which we can easily apply for the internship or jobs.
    You can easily see the job with Job category, Job type company name etc..
    Admin can easy add the category and Employee can easy create job and user can see that job or internship
    and apply for that.`;

  aboutPage.appendChild(heading);
}

