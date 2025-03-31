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
        
        // Function to generate data
        function generateData(schema, numRecords, locality) {
            generatedData = [];
            
            for (let i = 0; i < numRecords; i++) {
                const record = schemas[schema].generators(locality);
                // Filter record to only include selected columns
                const filteredRecord = {};
                selectedColumns.forEach(column => {
                    filteredRecord[column] = record[column];
                });
                generatedData.push(filteredRecord);
            }
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
                    td.textContent = record[column];
                    tr.appendChild(td);
                });
                
                tableBody.appendChild(tr);
            });
            
            // Show results
            resultsDiv.style.display = 'block';
        }
        
        // Function to show error message
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        
        // Function to download data as CSV
        function downloadCSV() {
            if (generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            try {
                let csvContent = "";
                
                // Add header row
                csvContent += selectedColumns.join(",") + "\r\n";
                
                // Add data rows
                generatedData.forEach(record => {
                    const row = selectedColumns.map(column => {
                        let value = record[column];
                        // Escape commas and quotes
                        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                            value = `"${value.replace(/"/g, '""')}"`;
                        }
                        return value;
                    });
                    csvContent += row.join(",") + "\r\n";
                });
                
                // Create and download file
                downloadFile(csvContent, 'synthetic_data.csv', 'text/csv;charset=utf-8;');
            } catch (error) {
                showError('Error downloading CSV: ' + error.message);
            }
        }
        
        // Function to download data as JSON
        function downloadJSON() {
            if (generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            try {
                const jsonContent = JSON.stringify(generatedData, null, 2);
                downloadFile(jsonContent, 'synthetic_data.json', 'application/json');
            } catch (error) {
                showError('Error downloading JSON: ' + error.message);
            }
        }
        
        // Function to download data as Excel
        function downloadExcel() {
            if (generatedData.length === 0) {
                showError('No data to download');
                return;
            }
            
            try {
                // Ensure XLSX is loaded
                if (typeof XLSX === 'undefined') {
                    throw new Error('XLSX library not loaded');
                }
                
                // Convert to worksheet
                const worksheet = XLSX.utils.json_to_sheet(generatedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Synthetic Data");
                
                // Generate and download Excel file
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                
                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'synthetic_data.xlsx';
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                showError('Error downloading Excel: ' + error.message);
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
