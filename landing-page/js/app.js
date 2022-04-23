/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.getElementById('navbar__list');
const sectionsArray = Array.from(document.querySelectorAll('section'));

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavigationBar() {
    for (section of sectionsArray) {
        // get Name an Id of each section 
        section_Name = section.dataset.nav;
        section_Id = section.id;
        // create each menu item and linking it by its Id then appending it to our navBar  
        listItem = document.createElement('li');
        listItem.innerHTML = `<a class='menu__link' href ='#${section_Id}' data-nav ='${section_Id}'>${section_Name}</a>`;
        navBar.appendChild(listItem);
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// Add class 'active' to section when near top of viewport
const inViewPort = (section) => {
    let sectionPostion = section.getBoundingClientRect().top;
    const inView = sectionPostion < 150 && sectionPostion >= -150;
    return (inView);
}
//remove the active class
const removeActive = (section) => {
    section.classList.remove('your-active-class');
}
//adding the active class
const addActive = (section) => {
    section.classList.add('your-active-class');
}
// Activating the in view section 
function sectionActivation () {
    for (section of sectionsArray) {
        if (inViewPort(section)) {
            addActive(section);
        } else {
            removeActive(section);
        }
    }
}
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createNavigationBar();


// Set sections as active
document.addEventListener('scroll', sectionActivation);
// Scroll to section on link click smoothly
navBar.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.dataset.nav) {
        document
            .getElementById(`${event.target.dataset.nav}`)
            .scrollIntoView({behavior : 'smooth'});
        setTimeout(() => { 
            location.hash = `${event.target.dataset.nav}`; 
        }, 150);
    }
});
