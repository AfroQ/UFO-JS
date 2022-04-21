// Import from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {
    filters = {}
    // 4a. Save the element that was changed as a variable.
    // let changed_elements = d3.selectAll("input")
    // changed_elements.forEach(element => {
      
    //   console.log(element)
    // });

    let date = d3.select("#datetime");
    let city = d3.select("#city");
    let state = d3.select("#state");
    let country = d3.select("#country");
    let shape = d3.select("#shape");
    // 4b. Save the value that was changed as a variable.
    let dateV = date.property("value");
    let cityV = city.property("value");
    let stateV = state.property("value");
    let countryV = country.property("value");
    let shapeV = shape.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let dateId = date.attr("id");
    let cityId = city.attr("id");
    let stateId = state.attr("id");
    let countryId = country.attr("id");
    let shapeId = shape.attr("id");
    
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (dateV){
      filters[dateId] = dateV
    }
    if (cityV){
      filters[cityId] = cityV
    }
    if (stateV){
      filters[stateId] = stateV
    }
    if (countryV){
      filters[countryId] = countryV
    }
    if (shapeV){
      filters[shapeId] = shapeV
    }
    console.log(filters)
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([k,v])=>{
      console.log(k,v)
      filteredData = filteredData.filter(row => row[k] === v);
    })
    
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("#filter-btn").on("click",updateFilters);
  
  
  // Build the table when the page loads
  buildTable(tableData);
  