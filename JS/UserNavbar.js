// import { logout } from './Logout.js';
// import { createShipmentForm } from './shipmentform.js';
// import { addJobs } from './index.js';
// import { YourShipments } from './yourShipments.js';

// export function UserNavbar() {
//     // Select the navbar container
//     const navbarContainer = document.querySelector('.navbar');

//     // Clear the container if it has any existing children
//     while (navbarContainer.firstChild) {
//         navbarContainer.removeChild(navbarContainer.firstChild);
//     }

//     // Create container div
//     const containerDiv = document.createElement('div');
//     containerDiv.classList.add('container');

//     // Create navbar-logo div
//     const logoDiv = document.createElement('div');
//     logoDiv.classList.add('navbar-logo');
//     // logoDiv.onclick = AllShipments;

//     // Create logo image
//     const logoImg = document.createElement('img');
//     logoImg.src = './assets/image/logo.png';
//     logoImg.height = '90';
//     logoImg.classList.add('logo');
//     logoImg.alt = 'Logo';

//     // Append logo image to navbar-logo div
//     logoDiv.appendChild(logoImg);

//     // const h1 = document.createElement('h1');
//     // h1.textContent = 'Customer';
//     // h1.style.color = 'aliceblue';

//     // Create ul element
//     const ul = document.createElement('ul');
//     ul.classList.add('navbar-menu');

//     // Create list items
//     const liLogin = document.createElement('li');
//     // liLogin.onclick = checkAndSetToken;

//     // const liHome = document.createElement('li');
//     // // liHome.onclick = createHomePage;
//     // const aHome = document.createElement('a');
//     // aHome.textContent = 'Home';
//     // liHome.appendChild(aHome);

//     const UserNav = document.createElement('li');
//     UserNav.onclick = showAllPost;
//     const showJobs = document.createElement('a');
//     showJobs.textContent = 'All Jobs';
//     UserNav.appendChild(showJobs);

//     // const liYourJObs = document.createElement('li');
//     // liYourJObs.onclick = YourShipments;
//     // const aYourJObs = document.createElement('a');
//     // aYourJObs.textContent = 'My Shipments';
//     // liYourJObs.appendChild(aYourJObs);

//     // const liAddShipments = document.createElement('li');
//     // liAddShipments.onclick = createShipmentForm;
//     // const aAddShipments = document.createElement('a');
//     // aAddShipments.textContent = 'Add Shipment';
//     // liAddShipments.appendChild(aAddShipments);

//     const aLogin = document.createElement('a');
//     aLogin.textContent = 'Logout';
//     liLogin.appendChild(aLogin);
//     aLogin.onclick = logout;

//     // Append list items to ul
//     // ul.appendChild(liHome);
//     ul.appendChild(UserNav);
//     ul.appendChild(liLogin);

//     // Create navbar-toggle div
//     const navbarToggle = document.createElement('div');
//     navbarToggle.classList.add('navbar-toggle');

//     // Create bars inside navbar-toggle div
//     for (let i = 0; i < 3; i++) {
//         const bar = document.createElement('div');
//         bar.classList.add('bar');
//         navbarToggle.appendChild(bar);
//     }

//     // Append logo, ul, and navbar-toggle to container div
//     containerDiv.appendChild(logoDiv);
//     // containerDiv.appendChild(h1);
//     containerDiv.appendChild(ul);
//     containerDiv.appendChild(navbarToggle);

//     // Append container div to navbarContainer
//     navbarContainer.appendChild(containerDiv);

//     // Add event listener to navbar-toggle
//     navbarToggle.addEventListener('click', function () {
//         ul.classList.toggle('active');
//     });
// }

// // // Call the function to create the navbar if it does not already exist
// // if (!document.querySelector('.navbar .container')) {
// //     createCustomerNavbar();
// // }
