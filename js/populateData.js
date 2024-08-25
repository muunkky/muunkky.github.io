// populateData.js
console.log("Script loaded: populateData.js");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    // Fetch the JSON file
    fetch('data.json')
        .then(response => {
            console.log("Fetch response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("JSON data successfully fetched:", data);

            // Populate the greeting
            const greetingElement1 = document.querySelector(".greeting p:nth-of-type(1)");
            const greetingElement3 = document.querySelector(".greeting p:nth-of-type(3)");
            console.log("greetingElement1", greetingElement1);
            console.log("greetingElement3", greetingElement3);
            if (greetingElement1) {
                greetingElement1.innerText = `¡Hola! ${data.Store_owner},`;
            } else {
                console.error("Greeting element 1 not found.");
            }
            if (greetingElement3) {
                greetingElement3.innerHTML = `Ganaste <b>$${data.Total_net_commission}</b> cuando esta persona compró el/los siguiente(s) artículo(s):`;
            } else {
                console.error("Greeting element 3 not found.");
            }

            // Populate the summary
            const summaryItem1 = document.querySelector(".summary-item:nth-of-type(1) .summary-value");
            const summaryItem2 = document.querySelector(".summary-item:nth-of-type(2) .summary-value");
            console.log("summaryItem1", summaryItem1);
            console.log("summaryItem2", summaryItem2);
            if (summaryItem1) {
                summaryItem1.innerText = `$${data.Total_net_commission}`;
            } else {
                console.error("Summary item 1 not found.");
            }
            if (summaryItem2) {
                summaryItem2.innerText = `$${data.Total_referral_commission}`;
            } else {
                console.error("Summary item 2 not found.");
            }

            // Populate commission notices
            const commissionTable = document.querySelector(".commission-table");
            console.log("commissionTable", commissionTable);
            if (commissionTable) {
                data.Commission_Notices.forEach(commission => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${commission.order_created_at}</td>
                        <td>${commission.variant_title}</td>
                        <td>$${commission.net_commission}</td>
                        <td>${commission.type}</td>
                        <td>${commission.customer_first_name} ${commission.customer_last_name} (${commission.customer_email})</td>
                        <td>${commission.shipping_province}, ${commission.shipping_city}</td>
                    `;
                    commissionTable.appendChild(row);
                });
            } else {
                console.error("Commission table not found.");
            }

            // Populate footer
            const footerEmailLink = document.querySelector(".footer p:nth-of-type(1) a");
            const unsubscribeLink = document.querySelector(".footer p:nth-of-type(2) a:nth-of-type(1)");
            const unsubscribePreferencesLink = document.querySelector(".footer p:nth-of-type(2) a:nth-of-type(2)");
            const footerText = document.querySelector(".footer p:nth-of-type(3)");
            
            console.log("footerEmailLink", footerEmailLink);
            console.log("unsubscribeLink", unsubscribeLink);
            console.log("unsubscribePreferencesLink", unsubscribePreferencesLink);
            console.log("footerText", footerText);

            if (footerEmailLink) {
                footerEmailLink.innerText = data.Store_owner_email;
                footerEmailLink.href = `mailto:${data.Store_owner_email}`;
            } else {
                console.error("Footer email link not found.");
            }

            if (unsubscribeLink) {
                unsubscribeLink.href = data.unsubscribe;
            } else {
                console.error("Unsubscribe link not found.");
            }

            if (unsubscribePreferencesLink) {
                unsubscribePreferencesLink.href = data.unsubscribe_preferences;
            } else {
                console.error("Unsubscribe preferences link not found.");
            }

            if (footerText) {
                footerText.innerText = `© 2024 ${data.Sender_Name}. All rights reserved.`;
            } else {
                console.error("Footer text not found.");
            }

        })
        .catch(error => {
            console.error('Error during fetch or processing:', error);
        });
});

// Temporary test outside of DOMContentLoaded to see if that affects behavior
console.log("Running test fetch outside DOMContentLoaded");

fetch('data.json')
    .then(response => {
        console.log("Test fetch response status:", response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Test JSON data fetched outside DOMContentLoaded:", data);
    })
    .catch(error => {
        console.error('Error during test fetch or processing:', error);
    });
