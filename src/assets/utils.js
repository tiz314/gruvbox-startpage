function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const greetingElement = document.getElementById('greeting');
    const now = new Date();

    if (now.getHours() >= 0 && now.getHours() < 12) {
        greetingElement.innerHTML = 'Good morning!';
    }
    else if (now.getHours() >= 12 && now.getHours() < 18) {
        greetingElement.innerHTML = 'Good afternoon!';
    }
    else {
        greetingElement.innerHTML = 'Good evening!';
    }

    dateElement.innerHTML = `${now.getDate()} ${now.toLocaleDateString('en-US', { month: 'long' })} ${now.getFullYear()}`;
    timeElement.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

setInterval(updateDateTime, 1000); // Update every second

// Initial call to display the time immediately on load
updateDateTime();

document.addEventListener('DOMContentLoaded', () => {
    const consoleInput = document.getElementById('console-input');

    consoleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = consoleInput.value.trim();
            if (query) {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(searchUrl, '_blank');
                consoleInput.value = '';
            }
        }
    });
});


fetch("favourites.json")
    .then(response => response.json())
    .then(data => {
        const favourites = data.favourites;

        const favouritesWrapper = document.getElementById('favouritesWrapper');
        const favouriteTemplate = document.getElementsByClassName('favourite')[0].cloneNode(true);
        document.getElementsByClassName('favourite')[0].remove();
       
        favourites.forEach(fav => {
            const favouriteElement = favouriteTemplate.cloneNode(true);
            favouriteElement.getElementsByClassName('favouriteName')[0].innerHTML = `<i class="fab ${fav.icon}"></i> ${fav.name}`;
            favouriteElement.getElementsByClassName('favouriteName')[0].href = fav.link;
            favouritesWrapper.appendChild(favouriteElement);
        });

        const services = data.services;

        const servicesWrapper = document.getElementById('servicesWrapper');
        const serviceTemplate = document.getElementsByClassName('service')[0].cloneNode(true);
        document.getElementsByClassName('service')[0].remove();
       
        services.forEach(ser => {
            const serviceElement = serviceTemplate.cloneNode(true);
            serviceElement.getElementsByClassName('serviceName')[0].innerHTML = `<i class="fab ${ser.icon}"></i> ${ser.name}`;
            serviceElement.getElementsByClassName('serviceName')[0].href = ser.link;
            servicesWrapper.appendChild(serviceElement);
        });
    })
    .catch(error => console.error(error));