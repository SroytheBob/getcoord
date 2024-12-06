function calculateResults() {
    // Clear previous results
    const tableBody = document.querySelector("#results-table tbody");
    tableBody.innerHTML = "";

    // Parse starting coordinates
    const startCoords = document.getElementById("start-coordinates").value.split(",").map(Number);
    if (startCoords.length !== 2 || isNaN(startCoords[0]) || isNaN(startCoords[1])) {
        alert("Invalid starting coordinates. Please enter in format: X, Y");
        return;
    }
    let [x1, y1] = startCoords;

    // Parse input list
    const inputList = document.getElementById("input-list").value.split("\n").map(line => line.trim()).filter(line => line);

    inputList.forEach(item => {
        const [pointName, rest] = item.split(" : ");
        const parts = rest.split(" ");
        const distance = parseFloat(parts[0]);
        const bearingDeg = parseFloat(parts[1]);

        if (isNaN(distance) || isNaN(bearingDeg)) {
            alert(`Invalid input format for: ${item}`);
            return;
        }

        // Calculate endpoint coordinates
        const bearingRad = (Math.PI / 180) * bearingDeg;
        const dx = distance * Math.sin(bearingRad);
        const dy = distance * Math.cos(bearingRad);
        const x2 = x1 + dx;
        const y2 = y1 + dy;

        // Add result to the table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pointName}</td>
            <td>${distance}m²</td>
            <td>${bearingDeg}°</td>
            <td>${x2.toFixed(0)}</td>
            <td>${y2.toFixed(0)}</td>
        `;
        tableBody.appendChild(row);

        // Update starting coordinates
        x1 = x2;
        y1 = y2;
    });
}
