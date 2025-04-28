        // Check if Faker is properly loaded
        let faker;
        if (window.faker) {
            faker = window.faker;
        } else {
            // Create a basic fallback if faker isn't available
            faker = {
                name: {
                    findName: function() { 
                        const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sarah", "Robert", "Linda", "William", "Patricia"];
                        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
                        return firstNames[Math.floor(Math.random() * firstNames.length)] + " " + 
                               lastNames[Math.floor(Math.random() * lastNames.length)];
                    }
                },
                phone: {
                    phoneNumber: function() {
                        return "+1-" + Math.floor(Math.random() * 900 + 100) + "-" + 
                               Math.floor(Math.random() * 900 + 100) + "-" + 
                               Math.floor(Math.random() * 9000 + 1000);
                    }
                },
                random: {
                    arrayElement: function(array) {
                        return array[Math.floor(Math.random() * array.length)];
                    }
                },
                date: {
                    recent: function(days) {
                        const date = new Date();
                        date.setDate(date.getDate() - Math.floor(Math.random() * days));
                        return date;
                    },
                    future: function(years) {
                        const date = new Date();
                        date.setFullYear(date.getFullYear() + Math.floor(Math.random() * years));
                        return date;
                    }
                },
                company: {
                    companyName: function() {
                        const companies = ["Alpha University", "Beta College", "Gamma Institute", "Delta School", "Epsilon Academy"];
                        return companies[Math.floor(Math.random() * companies.length)];
                    }
                },
                finance: {
                    amount: function(min, max, dec) {
                        return (Math.random() * (max - min) + min).toFixed(dec);
                    }
                }
            };
        }

        // Define locality-specific data
        const localityData = {
            "india": {
                names: {
                    first: ["Aarav", "Aditya", "Arjun", "Arnav", "Aryan", "Dev", "Dhruv", "Eshaan", "Gaurav", "Harsh", "Ishaan", "Jatin", "Krishna", "Lakshay", "Mohan", "Naveen", "Om", "Pranav", "Rahul", "Sachin", "Tanvi", "Uma", "Vikram", "Yash", "Zara"],
                    last: ["Patel", "Shah", "Singh", "Kumar", "Verma", "Sharma", "Gupta", "Mehta", "Desai", "Joshi", "Iyer", "Menon", "Nair", "Pillai", "Reddy", "Rao", "Chauhan", "Malhotra", "Kapoor", "Saxena"]
                },
                phone: {
                    prefix: "+91",
                    formats: ["XXXXXXXXXX", "XXXX-XXXXXX"]
                }
            },
            "usa": {
                names: {
                    first: ["James", "John", "Robert", "Michael", "William", "David", "Joseph", "Thomas", "Charles", "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy"],
                    last: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]
                },
                phone: {
                    prefix: "+1",
                    formats: ["(XXX) XXX-XXXX", "XXX-XXX-XXXX"]
                }
            },
            "uk": {
                names: {
                    first: ["Oliver", "George", "Harry", "Noah", "Jack", "Leo", "Arthur", "Muhammad", "Oscar", "Henry", "Olivia", "Amelia", "Isla", "Ava", "Mia", "Ivy", "Lily", "Isabella", "Rosie", "Sophia"],
                    last: ["Smith", "Jones", "Williams", "Taylor", "Brown", "Davies", "Evans", "Wilson", "Thomas", "Johnson", "Roberts", "Walker", "Wright", "Robinson", "Thompson", "White", "Hughes", "Green", "Hall", "Wood"]
                },
                phone: {
                    prefix: "+44",
                    formats: ["XXXX XXXXXX", "XXXXX XXXXXX"]
                }
            },
            "canada": {
                names: {
                    first: ["Liam", "Noah", "Oliver", "Lucas", "Leo", "Mason", "Ethan", "Aiden", "Henry", "Sebastian", "Olivia", "Emma", "Ava", "Charlotte", "Sophia", "Amelia", "Isabella", "Mia", "Evelyn", "Luna"],
                    last: ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Wilson", "MacDonald", "Taylor", "Campbell", "Anderson", "Lee", "Thompson", "White", "Johnson", "Williams", "Jones", "Miller", "Davis", "Rodriguez", "Martinez"]
                },
                phone: {
                    prefix: "+1",
                    formats: ["(XXX) XXX-XXXX", "XXX-XXX-XXXX"]
                }
            },
            "australia": {
                names: {
                    first: ["Oliver", "Noah", "Leo", "Henry", "Charlie", "Jack", "William", "Harry", "Lucas", "Theodore", "Olivia", "Charlotte", "Amelia", "Ava", "Mia", "Grace", "Sophia", "Emily", "Lily", "Sophie"],
                    last: ["Smith", "Jones", "Williams", "Brown", "Wilson", "Taylor", "Johnson", "White", "Martin", "Anderson", "Thompson", "Nguyen", "Walker", "Harris", "Lee", "Ryan", "Robinson", "Kelly", "King", "Davis"]
                },
                phone: {
                    prefix: "+61",
                    formats: ["X XXX XXX XXX", "XXXX XXX XXX"]
                }
            }
        };

        // Function to generate phone number based on locality
        function generatePhoneNumber(locality) {
            const format = localityData[locality].phone.formats[Math.floor(Math.random() * localityData[locality].phone.formats.length)];
            let number = localityData[locality].phone.prefix + " ";
            
            for (let i = 0; i < format.length; i++) {
                if (format[i] === 'X') {
                    number += Math.floor(Math.random() * 10);
                } else {
                    number += format[i];
                }
            }
            
            return number;
        }

        // Function to generate name based on locality
        function generateName(locality) {
            const firstNames = localityData[locality].names.first;
            const lastNames = localityData[locality].names.last;
            return firstNames[Math.floor(Math.random() * firstNames.length)] + " " + 
                   lastNames[Math.floor(Math.random() * lastNames.length)];
        }

        // Define the schemas based on the Python code
        const schemas = {
            "medical": {
                "fields": ["Patient_ID", "Name", "Age", "Gender", "Contact", "Symptom 1", "Symptom 2", "Diagnosis", "Medications", "Doctor", "Visit_Date", "Follow_Up"],
                "generators": function(locality) {
                    return {
                        "Patient_ID": `P${Math.floor(Math.random() * 9000) + 1000}`,
                        "Name": generateName(locality),
                        "Age": Math.floor(Math.random() * 101),
                        "Gender": faker.random.arrayElement(["Male", "Female", "Other"]),
                        "Contact": generatePhoneNumber(locality),
                        "Symptom 1": faker.random.arrayElement(["Fever", "Cough", "Headache", "Fatigue", "Sore throat"]),
                        "Symptom 2": faker.random.arrayElement(["Fever", "Cough", "Headache", "Fatigue", "Sore throat"]),
                        "Diagnosis": faker.random.arrayElement(["Diabetes", "Hypertension", "COVID-19", "Migraine", "Asthma"]),
                        "Medications": faker.random.arrayElement(["Insulin", "Lisinopril", "Paracetamol", "Aspirin", "Albuterol"]),
                        "Doctor": faker.random.arrayElement(["Dr. Smith", "Dr. Johnson", "Dr. Patel", "Dr. Lee"]),
                        "Visit_Date": faker.date.recent(365).toISOString().split('T')[0],
                        "Follow_Up": faker.random.arrayElement(["Yes", "No"])
                    };
                }
            },
            "finance": {
                "fields": ["Transaction_ID", "Name", "Amount", "Transaction_Type", "Account_Number", "Bank_Name", "Transaction_Date"],
                "generators": function() {
                    return {
                        "Transaction_ID": `T${Math.floor(Math.random() * 900000) + 100000}`,
                        "Name": faker.name.findName(),
                        "Amount": parseFloat(faker.finance.amount(100, 10000, 2)),
                        "Transaction_Type": faker.random.arrayElement(["Credit", "Debit"]),
                        "Account_Number": Math.floor(Math.random() * 9000000000) + 1000000000,
                        "Bank_Name": faker.random.arrayElement(["SBI", "HDFC", "ICICI", "Axis Bank"]),
                        "Transaction_Date": faker.date.recent(365).toISOString().split('T')[0]
                    };
                }
            },
            "retail": {
                "fields": ["Order_ID", "Customer_Name", "Product", "Quantity", "Price", "Payment_Method", "Order_Date"],
                "generators": function() {
                    return {
                        "Order_ID": `O${Math.floor(Math.random() * 900000) + 100000}`,
                        "Customer_Name": faker.name.findName(),
                        "Product": faker.random.arrayElement(["Laptop", "Mobile Phone", "Headphones", "Smartwatch", "Tablet"]),
                        "Quantity": Math.floor(Math.random() * 5) + 1,
                        "Price": parseFloat(faker.finance.amount(500, 50000, 2)),
                        "Payment_Method": faker.random.arrayElement(["Credit Card", "Debit Card", "Cash on Delivery", "UPI"]),
                        "Order_Date": faker.date.recent(365).toISOString().split('T')[0]
                    };
                }
            },
            "education": {
                "fields": ["Student_ID", "Name", "Age", "Gender", "Course", "Year", "Grade", "GPA", "University", "Graduation_Year"],
                "generators": function() {
                    return {
                        "Student_ID": `S${Math.floor(Math.random() * 9000) + 1000}`,
                        "Name": faker.name.findName(),
                        "Age": Math.floor(Math.random() * 13) + 18,
                        "Gender": faker.random.arrayElement(["Male", "Female", "Other"]),
                        "Course": faker.random.arrayElement(["Engineering", "Medicine", "Arts", "Business", "Law"]),
                        "Year": Math.floor(Math.random() * 4) + 1,
                        "Grade": faker.random.arrayElement(["A", "B", "C", "D"]),
                        "GPA": parseFloat((Math.random() * (4.0 - 2.0) + 2.0).toFixed(2)),
                        "University": faker.company.companyName(),
                        "Graduation_Year": Math.floor(Math.random() * 6) + 2025
                    };
                }
            },
            "automotive": {
                "fields": ["Vehicle_ID", "Owner_Name", "Make", "Model", "Year", "License_Plate", "Mileage", "Fuel_Type", "Service_Date", "Next_Service_Due"],
                "generators": function() {
                    return {
                        "Vehicle_ID": `V${Math.floor(Math.random() * 90000) + 10000}`,
                        "Owner_Name": faker.name.findName(),
                        "Make": faker.random.arrayElement(["Toyota", "Honda", "Ford", "BMW", "Tesla"]),
                        "Model": faker.random.arrayElement(["Sedan", "SUV", "Truck", "Coupe"]),
                        "Year": Math.floor(Math.random() * 26) + 2000,
                        "License_Plate": generateLicensePlate(),
                        "Mileage": Math.floor(Math.random() * 199001) + 1000,
                        "Fuel_Type": faker.random.arrayElement(["Petrol", "Diesel", "Electric"]),
                        "Service_Date": faker.date.recent(365).toISOString().split('T')[0],
                        "Next_Service_Due": faker.date.future(3).toISOString().split('T')[0]
                    };
                }
            }
        };
        
        // Custom function to generate license plates (since faker.vehicle.vrm() is not available)
        function generateLicensePlate() {
            const format = Math.random() > 0.5 ? 1 : 2;
            
            if (format === 1) {
                // Format: AB 12 CDE
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let part1 = "";
                for (let i = 0; i < 2; i++) {
                    part1 += letters.charAt(Math.floor(Math.random() * letters.length));
                }
                const part2 = Math.floor(Math.random() * 90) + 10;
                let part3 = "";
                for (let i = 0; i < 3; i++) {
                    part3 += letters.charAt(Math.floor(Math.random() * letters.length));
                }
                return `${part1} ${part2} ${part3}`;
            } else {
                // Format: AB-1234
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let part1 = "";
                for (let i = 0; i < 2; i++) {
                    part1 += letters.charAt(Math.floor(Math.random() * letters.length));
                }
                const part2 = Math.floor(Math.random() * 9000) + 1000;
                return `${part1}-${part2}`;
            }
        }
        
        // DOM Elements
        const schemaSelect = document.getElementById('schemaSelect');
        const localitySelect = document.getElementById('localitySelect');
        const numRecordsInput = document.getElementById('numRecords');
        const missingRatioSlider = document.getElementById('missingRatio');
        const missingRatioValue = document.getElementById('missingRatioValue');
        const varianceRatioSlider = document.getElementById('varianceRatio');
        const varianceRatioValue = document.getElementById('varianceRatioValue');
        const columnSelectContainer = document.getElementById('columnSelect');
        const generateBtn = document.getElementById('generateBtn');
        const loadingDiv = document.getElementById('loading');
        const resultsDiv = document.getElementById('results');
        const tableHeader = document.getElementById('tableHeader');
        const tableBody = document.getElementById('tableBody');
        const downloadCsvBtn = document.getElementById('downloadCsvBtn');
        const downloadJsonBtn = document.getElementById('downloadJsonBtn');
        const downloadExcelBtn = document.getElementById('downloadExcelBtn');
        const errorMessage = document.getElementById('errorMessage');
        const selectAllCheckbox = document.getElementById('selectAll');
        const totalRecordsElement = document.getElementById('totalRecords');
        const missingValuesElement = document.getElementById('missingValues');
        const dataVarianceElement = document.getElementById('dataVariance');
        const columnStatsElement = document.getElementById('columnStats');
        const fileSizeElement = document.getElementById('fileSize');
        
        // Variables to store generated data
        let generatedData = [];
        let selectedColumns = [];
        
        // Event listener for schema selection
        schemaSelect.addEventListener('change', function() {
            const schema = this.value;
            populateColumnSelectors(schema);
        });
        
        // Event listener for select all checkbox
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#columnSelect input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // Function to populate column selectors
        function populateColumnSelectors(schema) {
            columnSelectContainer.innerHTML = '';
            
            if (!schema || !schemas[schema]) return;
            
            const fields = schemas[schema].fields;
            
            fields.forEach(field => {
                const checkboxContainer = document.createElement('label');
                checkboxContainer.className = 'column-checkbox';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = field;
                checkbox.checked = true;
                
                checkboxContainer.appendChild(checkbox);
                checkboxContainer.appendChild(document.createTextNode(field));
                columnSelectContainer.appendChild(checkboxContainer);
            });
            
            // Set select all checkbox to checked
            selectAllCheckbox.checked = true;
        }
        
        // Event listener for generate button
        generateBtn.addEventListener('click', function() {
            const schema = schemaSelect.value;
            const locality = localitySelect.value;
            const numRecords = parseInt(numRecordsInput.value);
            
            // Validate inputs
            if (!schema) {
                showError('Please select a schema');
                return;
            }
            
            if (!locality) {
                showError('Please select a locality');
                return;
            }
            
            if (isNaN(numRecords) || numRecords < 1 || numRecords > 10000) {
                showError('Number of records must be between 1 and 10000');
                return;
            }
            
            // Get selected columns
            const checkboxes = document.querySelectorAll('#columnSelect input[type="checkbox"]:checked');
            if (checkboxes.length === 0) {
                showError('Please select at least one column');
                return;
            }
            
            selectedColumns = Array.from(checkboxes).map(cb => cb.value);
            
            // Hide error message if shown
            errorMessage.style.display = 'none';
            
            // Show loading animation
            loadingDiv.style.display = 'block';
            resultsDiv.style.display = 'none';
            
            // Generate data asynchronously
            setTimeout(() => {
                try {
                    generateData(schema, numRecords, locality);
                    displayData();
                } catch (error) {
                    showError('Error generating data: ' + error.message);
                    loadingDiv.style.display = 'none';
                }
            }, 500);
        });
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Add event listeners for the new sliders
            missingRatioSlider.addEventListener('input', function() {
                missingRatioValue.textContent = this.value + '%';
            });
            
            varianceRatioSlider.addEventListener('input', function() {
                varianceRatioValue.textContent = this.value + '%';
            });
        });
        
        // Function to generate data
        function generateData(schema, numRecords, locality) {
            generatedData = [];
            const missingRatio = parseInt(missingRatioSlider.value) / 100;
            const varianceRatio = parseInt(varianceRatioSlider.value) / 100;
            
            for (let i = 0; i < numRecords; i++) {
                const record = schemas[schema].generators(locality);
                
                // Apply variance to numeric fields
                Object.keys(record).forEach(key => {
                    if (typeof record[key] === 'number') {
                        // Apply variance based on the variance ratio
                        const originalValue = record[key];
                        const variance = originalValue * varianceRatio;
                        const minValue = Math.max(0, originalValue - variance);
                        const maxValue = originalValue + variance;
                        record[key] = parseFloat((Math.random() * (maxValue - minValue) + minValue).toFixed(2));
                    }
                });
                
                // Apply missing values based on the missing ratio
                Object.keys(record).forEach(key => {
                    if (Math.random() < missingRatio) {
                        record[key] = null;
                    }
                });
                
                // Filter record to only include selected columns
                const filteredRecord = {};
                selectedColumns.forEach(column => {
                    filteredRecord[column] = record[column];
                });
                generatedData.push(filteredRecord);
            }
        }
        
        // Function to calculate and display data statistics
        function displayDataStatistics() {
            if (!generatedData || generatedData.length === 0) {
                return;
            }
            
            // Update total records
            totalRecordsElement.textContent = generatedData.length;
            
            // Calculate missing values percentage
            let totalMissing = 0;
            let totalFields = 0;
            
            generatedData.forEach(record => {
                selectedColumns.forEach(column => {
                    totalFields++;
                    if (record[column] === null) {
                        totalMissing++;
                    }
                });
            });
            
            const missingPercentage = ((totalMissing / totalFields) * 100).toFixed(1);
            missingValuesElement.textContent = missingPercentage + '%';
            
            // Calculate data variance for numeric columns
            let totalVariance = 0;
            let numericColumns = 0;
            
            selectedColumns.forEach(column => {
                // Check if column contains numeric values
                const numericValues = generatedData
                    .map(record => record[column])
                    .filter(value => value !== null && typeof value === 'number');
                
                if (numericValues.length > 0) {
                    numericColumns++;
                    
                    // Calculate mean
                    const mean = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
                    
                    // Calculate variance
                    const variance = numericValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numericValues.length;
                    
                    // Calculate coefficient of variation (standard deviation / mean)
                    const coefficientOfVariation = Math.sqrt(variance) / mean;
                    
                    totalVariance += coefficientOfVariation;
                }
            });
            
            // Calculate average variance across all numeric columns
            const averageVariance = numericColumns > 0 ? (totalVariance / numericColumns) * 100 : 0;
            dataVarianceElement.textContent = averageVariance.toFixed(1) + '%';
            
            // Calculate and display file size
            const jsonSize = new Blob([JSON.stringify(generatedData)]).size;
            fileSizeElement.textContent = formatFileSize(jsonSize);
            
            // Display column-specific statistics
            columnStatsElement.innerHTML = '';
            
            selectedColumns.forEach(column => {
                const columnStatItem = document.createElement('div');
                columnStatItem.classList.add('column-stat-item');
                
                const columnName = document.createElement('div');
                columnName.classList.add('column-name');
                columnName.textContent = column;
                
                const columnMetrics = document.createElement('div');
                columnMetrics.classList.add('column-metrics');
                
                // Calculate missing percentage for this column
                const columnMissing = generatedData.filter(record => record[column] === null).length;
                const columnMissingPercentage = ((columnMissing / generatedData.length) * 100).toFixed(1);
                
                // Add missing values metric
                const missingMetric = document.createElement('div');
                missingMetric.classList.add('metric');
                missingMetric.innerHTML = `
                    <span class="metric-value">${columnMissingPercentage}%</span>
                    <span class="metric-label">Missing</span>
                `;
                
                columnMetrics.appendChild(missingMetric);
                
                // Add variance metric for numeric columns
                const numericValues = generatedData
                    .map(record => record[column])
                    .filter(value => value !== null && typeof value === 'number');
                
                if (numericValues.length > 0) {
                    // Calculate mean
                    const mean = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
                    
                    // Calculate variance
                    const variance = numericValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numericValues.length;
                    
                    // Calculate coefficient of variation (standard deviation / mean)
                    const coefficientOfVariation = (Math.sqrt(variance) / mean) * 100;
                    
                    const varianceMetric = document.createElement('div');
                    varianceMetric.classList.add('metric');
                    varianceMetric.innerHTML = `
                        <span class="metric-value">${coefficientOfVariation.toFixed(1)}%</span>
                        <span class="metric-label">Variance</span>
                    `;
                    
                    columnMetrics.appendChild(varianceMetric);
                }
                
                columnStatItem.appendChild(columnName);
                columnStatItem.appendChild(columnMetrics);
                columnStatsElement.appendChild(columnStatItem);
            });
        }
        
        // Function to display generated data
        function displayData() {
            // Hide loading animation
            loadingDiv.style.display = 'none';
            
            // Clear table
            tableHeader.innerHTML = '';
            tableBody.innerHTML = '';
            
            // Add table headers
            selectedColumns.forEach(column => {
                const th = document.createElement('th');
                th.textContent = column;
                tableHeader.appendChild(th);
            });
            
            // Add table rows
            generatedData.forEach(record => {
                const tr = document.createElement('tr');
                
                selectedColumns.forEach(column => {
                    const td = document.createElement('td');
                    
                    if (record[column] === null) {
                        td.textContent = 'NULL';
                        td.classList.add('missing-value');
                    } else if (typeof record[column] === 'number') {
                        // Add variance indicator for numeric values
                        const span = document.createElement('span');
                        span.classList.add('variance-indicator');
                        
                        // Determine variance level based on the value
                        const value = record[column];
                        const avg = generatedData.reduce((sum, r) => sum + (r[column] || 0), 0) / generatedData.length;
                        const stdDev = Math.sqrt(generatedData.reduce((sum, r) => sum + Math.pow((r[column] || 0) - avg, 2), 0) / generatedData.length);
                        
                        if (Math.abs(value - avg) < stdDev) {
                            span.classList.add('variance-low');
                        } else if (Math.abs(value - avg) < 2 * stdDev) {
                            span.classList.add('variance-medium');
                        } else {
                            span.classList.add('variance-high');
                        }
                        
                        td.appendChild(span);
                        td.appendChild(document.createTextNode(value));
                    } else {
                        td.textContent = record[column];
                    }
                    
                    tr.appendChild(td);
                });
                
                tableBody.appendChild(tr);
            });
            
            // Display data statistics
            displayDataStatistics();
            
            // Show results
            resultsDiv.style.display = 'block';
        }
        
        // Function to show error message
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        
        // Function to download CSV
        function downloadCSV() {
            if (!generatedData || generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            // Create CSV content
            let csvContent = '';
            
            // Add headers
            csvContent += selectedColumns.join(',') + '\n';
            
            // Add data rows
            generatedData.forEach(record => {
                const row = selectedColumns.map(column => {
                    const value = record[column];
                    // Handle null values and special characters
                    if (value === null) {
                        return '';
                    } else if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    } else {
                        return value;
                    }
                });
                csvContent += row.join(',') + '\n';
            });
            
            // Download file
            downloadFile(csvContent, 'synthetic_data.csv', 'text/csv');
        }
        
        // Function to download JSON
        function downloadJSON() {
            if (!generatedData || generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            // Convert data to JSON string with proper formatting
            const jsonContent = JSON.stringify(generatedData, null, 2);
            
            // Download file
            downloadFile(jsonContent, 'synthetic_data.json', 'application/json');
        }
        
        // Function to download Excel
        function downloadExcel() {
            if (!generatedData || generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            try {
                // Create a new workbook
                const wb = XLSX.utils.book_new();
                
                // Convert data to worksheet
                const ws = XLSX.utils.json_to_sheet(generatedData, {
                    header: selectedColumns,
                    skipHeader: false
                });
                
                // Add the worksheet to the workbook
                XLSX.utils.book_append_sheet(wb, ws, 'Synthetic Data');
                
                // Generate Excel file
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                
                // Convert to Blob
                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                
                // Create download link
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'synthetic_data.xlsx';
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 0);
            } catch (error) {
                showError('Error generating Excel file: ' + error.message);
            }
        }
        
        // Generic function to download file
        function downloadFile(content, fileName, mimeType) {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Event listeners for download buttons
        downloadCsvBtn.addEventListener('click', downloadCSV);
        downloadJsonBtn.addEventListener('click', downloadJSON);
        downloadExcelBtn.addEventListener('click', downloadExcel);

        // Add this function to calculate file size
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
