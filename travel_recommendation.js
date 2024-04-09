// Fetch data from JSON file
let data;
fetch("travel_recommendation.json")
	.then((response) => response.json())
	.then((json) => (data = json));

// Search function
function search(keyword) {
	keyword = keyword.toLowerCase();
	let results = [];

	if (keyword === "beach" || keyword === "beaches") {
		results = data.beaches;
	} else if (keyword === "temple" || keyword === "temples") {
		results = data.temples;
	} else {
		data.countries.forEach((country) => {
			if (country.name.toLowerCase().includes(keyword)) {
				results.push(...country.cities);
			}
		});
	}

	return results;
}

function displayResults(results) {
	const sidebarContent = document.getElementById("sidebar-content");
	sidebarContent.innerHTML = "";

	if (results.length === 0) {
		sidebarContent.innerHTML =
			'<p class="text-center text-white-500">Result not found</p>';
	} else {
		results.forEach((result) => {
			const options = {
				timeZone: result.timeZone,
				hour12: true,
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			};
			const currentTime = new Intl.DateTimeFormat("en-US", options).format(
				new Date()
			);

			const resultDiv = document.createElement("div");
			resultDiv.innerHTML = `
                <div class="p-4 mb-4 bg-white rounded shadow flex flex-col items-center">
                    <h2 class="text-xl font-bold mb-2">${result.name}</h2>
                    <img class="object-cover mb-2" src="${result.imageUrl}" alt="${result.name}" style="width: 320px; height: 180px;">
                    <p class="text-gray-700">${result.description}</p>
                    <p class="text-gray-700 mt-2 font-semibold text-blue-600">Current time: ${currentTime}</p>
                </div>
            `;
			sidebarContent.appendChild(resultDiv);
		});
	}

	// Open the sidebar
	document.getElementById("sidebar").style.transform = "translateX(0)";
}

// Clear results function
function clearResults() {
	const sidebarContent = document.getElementById("sidebar-content");
	sidebarContent.innerHTML = "";

	// Close the sidebar
	document.getElementById("sidebar").style.transform = "translateX(100%)";
}

// Event listeners
document.getElementById("search-button").addEventListener("click", () => {
	const keyword = document.getElementById("search-input").value;
	const results = search(keyword);
	displayResults(results);
});

document.getElementById("clear-button").addEventListener("click", function () {
	document.getElementById("sidebar").style.transform = "translateX(100%)";
	clearResults();
});

document
	.getElementById("search-input")
	.addEventListener("keyup", function (event) {
		if (event.key === "Enter") {
			const keyword = document.getElementById("search-input").value;
			const results = search(keyword);
			displayResults(results);
		}
	});
