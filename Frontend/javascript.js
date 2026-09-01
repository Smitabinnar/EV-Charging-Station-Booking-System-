const API_URL = "http://localhost:5000";


// Load Vehicles
async function loadVehicles() {

    try {

        const response =
            await fetch(`${API_URL}/vehicles`);

        const vehicles =
            await response.json();

        const container =
            document.getElementById("vehicleContainer");

        const select =
            document.getElementById("vehicleSelect");


        container.innerHTML = "";
        select.innerHTML =
            '<option value="">Select Vehicle</option>';


        if (vehicles.length === 0) {

            container.innerHTML =
                "<p>No vehicles found.</p>";

            return;
        }


        vehicles.forEach(vehicle => {

            // Vehicle Card

            const card =
                document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h3>🚗 ${vehicle.vehicle_name}</h3>

                <p>
                    <strong>Vehicle Number:</strong>
                    ${vehicle.vehicle_number}
                </p>

                <p>
                    <strong>Brand:</strong>
                    ${vehicle.brand}
                </p>

                <p>
                    <strong>Battery:</strong>
                    ${vehicle.battery_capacity}
                </p>

                <p>
                    <strong>Type:</strong>
                    ${vehicle.vehicle_type}
                </p>

            `;

            container.appendChild(card);


            // Add vehicle to booking dropdown

            const option =
                document.createElement("option");

            option.value = vehicle.vehicle_id;

            option.textContent =
                `${vehicle.vehicle_name} - ${vehicle.vehicle_number}`;

            select.appendChild(option);

        });


    } catch (error) {

        console.error(error);

        document.getElementById(
            "vehicleContainer"
        ).innerHTML =

            "<p>❌ Unable to connect to backend.</p>";
    }
}


// Booking Form

document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const vehicle =
            document.getElementById("vehicleSelect").value;

        const date =
            document.getElementById("bookingDate").value;

        const time =
            document.getElementById("bookingTime").value;


        if (!vehicle) {

            alert("Please select a vehicle.");

            return;
        }


        document.getElementById(
            "bookingMessage"
        ).textContent =

            `Booking selected for ${date} at ${time}.`;

    });