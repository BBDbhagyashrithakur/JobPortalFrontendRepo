import { logout } from "./Logout.js";
import { createShipmentForm } from './shipmentform.js';
import { AllShipments } from './index.js';
import { getFinalShipperDetails } from "./FinalShipper.js";
// import {createCategoriesForm} from "../JS/index.js";

export function AdminNavbar() {
    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    // Create navbar-logo div
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('navbar-logo');
    // logoDiv.onclick = loadAllShipments;

    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = './assets/image/logo.png';
    logoImg.height = '90';
    logoImg.classList.add('logo');
    logoImg.alt = 'Logo';

    // Append logo image to navbar-logo div
    logoDiv.appendChild(logoImg);

    // Create h1 element
    // const h1 = document.createElement('h1');
    // h1.textContent = 'Shipper';
    // h1.style.color = 'aliceblue';

    // Create ul element
    const ul = document.createElement('ul');
    ul.classList.add('navbar-menu');

    // Create list items
    const liAlladmin = document.createElement('li');
    liAlladmin.onclick =createCategoriesForm;
    const aAllShipments = document.createElement('a');
    aAllShipments.textContent = 'Add Job category';
    liAlladmin.appendChild(aAllShipments);
    
    const liViewCate = document.createElement('li');
    liViewCate.onclick = showAllCategeories;
    const aAddJobs = document.createElement('a');
    aAddJobs.textContent = 'View Category';
    liViewCate.appendChild(aAddJobs);

    const liYourAdmin = document.createElement('li');
    liYourAdmin.onclick = createJobs ;
    const aYourAdmin = document.createElement('a');
    aYourAdmin.textContent = 'Add Jobs';
    liYourAdmin.appendChild(aYourAdmin);

   

    const liLogout = document.createElement('li');
    const aLogout = document.createElement('a');
    aLogout.textContent = 'Logout';
    liLogout.appendChild(aLogout);
    aLogout.onclick = logout;

    // Append list items to ul
    ul.appendChild(liAlladmin);
    ul.appendChild(liYourAdmin);
    ul.appendChild(liViewCate);
    ul.appendChild(liLogout);

    // Create navbar-toggle div
    const navbarToggle = document.createElement('div');
    navbarToggle.classList.add('navbar-toggle');

    // Create bars inside navbar-toggle div
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        navbarToggle.appendChild(bar);
    }

    // Append logo, h1, ul, and navbar-toggle to container div
    containerDiv.appendChild(logoDiv);
    // containerDiv.appendChild(h1);
    containerDiv.appendChild(ul);
    containerDiv.appendChild(navbarToggle);

    // Append container div to navbarContainer
    const navbarContainer = document.querySelector('.navbar');
    navbarContainer.appendChild(containerDiv);

    // Add event listener to navbar-toggle
    navbarToggle.addEventListener('click', function () {
        ul.classList.toggle('active');
    });
}

// Call the function to create the shipper navbar
// createShipperNavbar();
