document.addEventListener("DOMContentLoaded", function() {

  //     // if (localStorage.getItem("email") == "baviskarritu02@gmail.com") {
  //     //   const elementsToShow = [
  //     //     document.getElementById("logout"),
  //     //     document.getElementById("categoriesLink"),
  //     //     document.getElementById("addCategoriesLink"),
  //     //     document.getElementById("addJobsLink"),
  //     //     document.getElementById("jobsLink")
  //     // ];
  
  //     //     if (elementsToShow) {
  //     //       elementsToShow.style.display = "block";
  //     //     } else {
  //     //         console.error("Element not found");
  //     //     }
  //     // }
  
    if (localStorage.getItem("email") == null) {
      const elementsToHide = [
          document.getElementById("logout"),
          document.getElementById("categoriesLink"),
          document.getElementById("addJobsLink"),
          document.getElementById("notes"),
          document.getElementById("showAllPostLink"),
      ];
      elementsToHide.forEach(element => {
          if (element) {
              element.style.display = "none";
          } else {
              console.error("Element not found:", element);
          }
      });
  } else {
      const button =document.getElementById("SignUp");
    
      if (button) {
          button.style.display = "none";
      } else {
          console.error("button element not found");
      }
     }
  });


const token = sessionStorage.getItem("userToken");
const mainScreen = document.getElementById("container");
const popupContainer = document.getElementById("popupContainer");
const addCategoryForm = document.getElementById("addCategoryForm");
const closeBtn = document.getElementById("closeBtn");
const showFormBtn = document.getElementById("showFormBtn");
popupContainer.style.display = "none";

function showAllPost() {
  showLoader();
  const url = "https://jobportal.projects.bbdgrad.com/api/jobs/all";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      createJobCards(data);
      console.log(data);

      // Hide the loader after the fetch request completes successfully
      hideLoader();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);

      // Hide the loader in case of an error
      hideLoader();
    });
}

function createJobCards(jobs) {
  const mainScreen = document.querySelector(".container");
  mainScreen.innerHTML = "";

  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.classList.add("job-card", "card");

    const title = document.createElement("h3");
    title.innerHTML = `<strong>Post:</strong> ${job.title}`;
    title.style.color = "red"; // Change color as needed
    title.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.2)"; // Add shadow

    const companyName = document.createElement("p");
    companyName.innerHTML = `<strong>Company:</strong> ${job.companyName}`;

    const location = document.createElement("p");
    location.innerHTML = ` <strong>Location:</strong>${getLocation()} ${
      job.location
    }`;
    const description = document.createElement("p");
    description.innerHTML = `<strong>Description:</strong> ${job.description}`;

    const jobType = document.createElement("p");
    jobType.innerHTML = `<strong>Work Time:</strong> ${job.jobType}`;

    const experienceLevel = document.createElement("p");
    experienceLevel.innerHTML = `<strong>Experience:</strong> ${job.experienceLevel}`;

    const salaryRange = document.createElement("p");
    salaryRange.innerHTML = `<strong>Salary:</strong> ${getSalarySymbol()} ${
      job.salaryRange
    }`;

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
  });
}

createJobCards(jobs);

function getAddressSymbol() {
  return "💼";
}
function getWatchSymbol() {
  return "⏰";
}

function getLocation() {
  return "🌎"; // Globe Showing Americas
}
function getSalarySymbol() {
  return "💵"; // Banknote with dollar sign
}

document
  .getElementById("fetchDataButton")
  .addEventListener("click", showAllPost);

// ----------------------------------------------------------------------------
// Function to check if a category already exists

function displayAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => {
      alertBox.remove();
  }, 2000);
}

function checkCategoryExists(name) {
  const existingCategories = document.querySelectorAll(".category-card h3");

  for (const category of existingCategories) {
      if (category.textContent.trim().toLowerCase() === name.trim().toLowerCase()) {
          return true;
      }
  }
  return false;
}

// Function to handle the click event of the show form button
function showFormBtnClick() {
  popupContainer.style.display = "flex";
  closeBtn.addEventListener("click", function () {
      popupContainer.style.display = "none";
      showAllCategories();
  });

  addCategoryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(addCategoryForm);
      const name = formData.get("CategoryTitle");
      const description = formData.get("CategoryDescription");

      console.log(name);
      console.log(description);
      // Check if category already exists
      if (checkCategoryExists(name)) {
          displayAlert("Category already exists", "error");
          return;
      }

      const data = { name, description };

      fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
              console.log("Category saved successfully:", data);
              displayAlert("Category saved successfully", "success");
              addCategoryForm.reset();
              popupContainer.style.display = "none";
          })
          .catch((error) => {
              console.error("There was a problem saving the category:", error);
              displayAlert("Failed to save category", "error");
          });
  });

  mainScreen.replaceChildren(popupContainer);
}

// Function to fetch and display all categories
function showAllCategories() {
  showLoader(); // Show loader before making the fetch request

  mainScreen.innerHTML = "";
  mainScreen.style.display = "block";
  showFormBtn.style.display = "block";

  mainScreen.appendChild(showFormBtn);

  fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/all", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((data) => {
          createCategoryCards(data);
          console.log(data);
          // appendAddCategoryButton();
          hideLoader(); // Hide the loader after the fetch request completes
      })
      .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          hideLoader(); // Hide the loader in case of an error
      });
}

function showFormBtnClick() {
  popupContainer.style.display = "flex";
  closeBtn.addEventListener("click", function () {
      popupContainer.style.display = "none";
      showAllCategories();
  });

  addCategoryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(addCategoryForm);
      const name = formData.get("CategoryTitle");
      const description = formData.get("CategoryDescription");
      const data = { name, description };

      // Check if category already exists
      if (checkCategoryExists(name)) {
        displayAlert("Category already exists", "error");
          return;
      }

      fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
          })
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then((data) => {
              console.log("Category saved successfully:", data);
              displayAlert("Category saved successfully", "success");
              addCategoryForm.reset();
              popupContainer.style.display = "none";
          })
          .catch((error) => {
              console.error("There was a problem saving the category:", error);
              displayAlert("Failed to save category", "error");
          });
  });

  function displayAlert(message, type) {
      const alertBox = document.createElement("div");
      alertBox.className = `alert ${type}`;
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
      setTimeout(() => {
          alertBox.remove();
      }, 2000);
  }
  mainScreen.replaceChildren(popupContainer);
}

function createCategoryCards(categories) {

  if (!categories || categories.length == 0) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "No categories found.";
      mainScreen.appendChild(errorMessage);
      return;
  }

  const listContainer = document.createElement("div");
  listContainer.classList.add("category-list");

  categories.forEach((category) => {
      const categoryCard = document.createElement("div");
      categoryCard.classList.add("category-card");

      const categoryName = document.createElement("h3");
      categoryName.textContent = category.name;

      const categoryDescription = document.createElement("p");
      categoryDescription.textContent = category.description;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => deleteCategory(category.id));

      categoryCard.appendChild(categoryName);
      categoryCard.appendChild(categoryDescription);
      categoryCard.appendChild(deleteButton);

      listContainer.appendChild(categoryCard);
  });

  mainScreen.appendChild(listContainer);
}

function deleteCategory(id) {
  showLoader();
  console.log(id);
  fetch(
          `https://jobportal.projects.bbdgrad.com/api/api/job/category/delete/${id}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }
      )
      .then((response) => {
          if (response.ok) {
              console.log("Category deleted successfully");
              showAllCategories();
          } else {
              throw new Error("Failed to delete category");
          }
      })
      .catch((error) => {
          console.error("Error deleting category:", error);
      });
  hideLoader();
}


function renderCards() {
  const cardData = [
    {
      heading:
        "Object Oriented Probject-oriented-programming-cheatsheet for interview",
      link: "https://whimsical.com/object-oriented-programming-cheatsheet-by-love-babbar-YbSgLatbWQ4R5paV7EgqFw",
    },
    {
      heading:
        "Learn  Javacript (JavaScript is the world's most popular programming language.) ",
      link: "https://www.codehelp.in/tutorial/javascript/java-script-a-beginner-s-guide-to-programming-magic-1",
    },
    {
      heading: "Learn Java (Java is a popular programming language.)",
      link: "https://www.w3schools.com/java/",
    },
    {
      heading: "Java Interview Questions and Answers",
      link: "https://www.geeksforgeeks.org/java-interview-questions/",
    },
    {
      heading: "JavaScript Interview Questions and Answers to tackel interview",
      link: "https://www.geeksforgeeks.org/javascript-interview-questions-and-answers/",
    },
    {
      heading: "10 Common Job Interview Questions and How to Answer Them",
      link: "https://hbr.org/2021/11/10-common-job-interview-questions-and-how-to-answer-them",
    },
  ];
  const cardContainer = document.querySelector(".main-content");
  cardContainer.innerHTML = "";

  cardData.forEach(({ heading, link }) => {
    const card = createCard(heading, link);
    cardContainer.appendChild(card);
  });
  hideLoader();
}


function createJobs() {
  // showLoader();
  const mainScreen = document.querySelector(".container");
  mainScreen.style.justifyContent = "center";
  mainScreen.innerHTML = "";

  const addJobsLink = document.getElementById("addJobsLink");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const formHeader = document.createElement("div");
  formHeader.classList.add("postHeader");
  const formTitle = document.createElement("h2");
  formTitle.textContent = "Add Job";
  formHeader.appendChild(formTitle);

  const formBody = document.createElement("div");
  formBody.classList.add("AddCategories");

  fetch("https://jobportal.projects.bbdgrad.com/api/api/job/category/all", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
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

  fetch("https://jobportal.projects.bbdgrad.com/api/jobs/types", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
      .then((response) => response.json())
      .then((data) => {
          const jobTypeSelect = createSelectElement("jobType", "Job Type:", data);
          formBody.appendChild(jobTypeSelect);
      })
      .catch((error) => console.error("Error fetching job types:", error));

  fetch("https://jobportal.projects.bbdgrad.com/api/jobs/salaryRanges", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
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

  fetch("https://jobportal.projects.bbdgrad.com/api/jobs/experienceLevels", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
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

  const formElements = [{
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

  formContainer.appendChild(formHeader);
  formContainer.appendChild(formBody);
  cardContainer.appendChild(formContainer);
  mainScreen.appendChild(cardContainer);

  // Add submit button
  hideLoader();
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.addEventListener("click", () => saveJob(formElements));
  submitButton.textContent = "Submit";
  submitButton.classList.add("btn", "btn-primary");
  cardContainer.appendChild(submitButton);
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

// Save job function
function saveJob(formElements) {
  const allFieldsFilled = formElements.every((element) => {
      const inputElement = document.getElementById(element.id);
      return inputElement.value.trim() !== "";
  });

  if (!allFieldsFilled) {
      displayAlert("Please Enter All the fields", "error");
      return;
  }

  let formData = {};
  formElements.forEach((element) => {
      formData[element.id] = document.getElementById(element.id).value;
  });

  if (!isValidUrl(formData.visitLink)) {
      displayAlert("Please enter a valid URL for the visit link", "error");
      return;
  }

  formData.jobCategory = document.getElementById("JobCategory").value;
  formData.experienceLevel = document.getElementById("experienceLevel").value;
  formData.salaryRange = document.getElementById("salaryRange").value;
  formData.jobType = document.getElementById("jobType").value;

  fetch("https://jobportal.projects.bbdgrad.com/api/jobs/add", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error(
                  "Failed to save job. Server responded with status " + response.status
              );
          }
          return response.json();
      })
      .then((data) => {
          console.log("Job saved successfully:", data);
          clearFormFields(formElements);
          displayAlert("Job saved successfully", "success");
      })
      .catch((error) => {
          console.error("Error saving job:", error);
          displayAlert(
              "Failed to save job. Please check the form data and try again.",
              "error"
          );
      });
}

function isValidUrl(url) {
  const pattern = /^(https?:\/\/)/i;
  return pattern.test(url);
}

// Clear form fields
function clearFormFields(formElements) {
  formElements.forEach((element) => {
      document.getElementById(element.id).value = "";
  });
}

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

function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

// Hide the loader
function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
