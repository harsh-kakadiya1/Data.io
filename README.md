# Synthetic Data Generator (preview: [https://synxdata.netlify.app/](https://synxdata.netlify.app/))
![image](https://github.com/user-attachments/assets/94a96024-c1aa-4a60-93d9-88a0c9d13311)
## Overview
The **Synthetic Data Generator** is a powerful tool for generating artificial datasets that mimic real-world data. It is useful for machine learning, testing, and data privacy applications where real data cannot be used.

## Features
- Customizable data schema
- Supports multiple data types (numerical, categorical, text, etc.)
- Configurable output formats (CSV, JSON, etc.)
- Randomized yet realistic data generation
- Integration-ready for ML and data analysis projects

## Installation
```sh
# Clone the repository
git clone https://github.com/harshjajaknavagscrr/synthetic-data-generator.git
cd synthetic-data-generator

# Install dependencies
pip install -r requirements.txt
```

## Usage
Run the generator with default settings:
```sh
python generate.py
```

### Custom Configuration
Modify the `config.json` file to define your dataset structure:
```json
{
  "num_records": 1000,
  "fields": [
    { "name": "id", "type": "integer", "start": 1, "end": 10000 },
    { "name": "name", "type": "string", "source": "names.txt" },
    { "name": "age", "type": "integer", "start": 18, "end": 70 }
  ]
}
```
Then run:
```sh
python generate.py --config config.json
```

## Output Formats
You can specify the output format using command-line arguments:
```sh
python generate.py --format csv  # Outputs a CSV file
python generate.py --format json # Outputs a JSON file
```

## Dependencies
- Python 3.5 +
- Pandas
- Faker
- NumPy

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For issues or suggestions, please open an issue on GitHub or reach out at [contactxsynthetic@gmail.com](mailto:contactxsynthetic@gmail.com).

