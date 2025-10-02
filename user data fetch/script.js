const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");

// Indian names dataset (to override API data)
const indianUsers = [
  { name: "Aarav Sharma", email: "aarav.sharma@example.com", address: "Connaught Place, New Delhi" },
  { name: "Isha Patel", email: "isha.patel@example.com", address: "Navrangpura, Ahmedabad" },
  { name: "Rohan Iyer", email: "rohan.iyer@example.com", address: "Andheri West, Mumbai" },
  { name: "Sneha Reddy", email: "sneha.reddy@example.com", address: "Banjara Hills, Hyderabad" },
  { name: "Karan Mehta", email: "karan.mehta@example.com", address: "Koramangala, Bengaluru" },
  { name: "Ananya Nair", email: "ananya.nair@example.com", address: "Vyttila, Kochi" },
  { name: "Vikram Singh", email: "vikram.singh@example.com", address: "Civil Lines, Jaipur" },
  { name: "Priya Das", email: "priya.das@example.com", address: "Salt Lake, Kolkata" }
];

// Fetch API + replace with Indian user data
async function fetchUsers() {
  userContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let users = await response.json();

    // Replace fetched data with Indian dataset (map 1-to-1)
    users = users.slice(0, indianUsers.length).map((user, index) => ({
      name: indianUsers[index].name,
      email: indianUsers[index].email,
      address: { street: indianUsers[index].address }
    }));

    userContainer.innerHTML = "";

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}</p>
      `;
      userContainer.appendChild(userCard);
    });

  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">⚠️ Error: ${error.message}. Please check your connection.</p>`;
  }
}

// Reload button functionality
reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on page load
fetchUsers();
