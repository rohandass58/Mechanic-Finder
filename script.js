document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#search-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const locationInput = document.querySelector('#location-input');
    const location = locationInput.value;
    fetch('drivers.json')
      .then(response => response.json())
      .then(data => {
        const driversList = document.querySelector('#drivers-list');
        driversList.innerHTML = '';
        const heading = document.createElement('h2');
        heading.innerText = `Mechanics available in ${location}`;
        driversList.appendChild(heading);
        const row = document.createElement('div');
        row.className = 'row';
        data.forEach(driver => {
          if (driver.city === location) {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            const driverDiv = document.createElement('div');
            driverDiv.className = 'driver';
            const name = document.createElement('h2');
            name.innerText = driver.name;
            const phone = document.createElement('p');
            phone.innerHTML = `<strong>Phone:</strong> <a href="tel:${driver.phone}">${driver.phone}</a>`;
            const whatsappLink = `https://wa.me/${driver.phone}`;
            const linkElement = document.createElement('a');
            linkElement.href = whatsappLink;
            linkElement.className = 'whatsapp-link';
            linkElement.innerText = 'Contact on WhatsApp';
            const email = document.createElement('p');
            email.innerHTML = `<strong>Shop Name:</strong> ${driver.shop}`;
            driverDiv.appendChild(name);
            driverDiv.appendChild(phone);
            driverDiv.appendChild(linkElement);
            driverDiv.appendChild(email);
            col.appendChild(driverDiv);
            row.appendChild(col);
          }
        });
        driversList.appendChild(row);
      })
      .catch(error => {
        alert('There was an error loading the drivers list.');
        console.error(error);
      });
  });
});
