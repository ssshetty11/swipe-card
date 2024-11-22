import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from "xlsx";

const genAI = new GoogleGenerativeAI("AIzaSyBpHMiyj_sMe9LkVXK1coiFd3V-pVWxWMM");

export const extractDataFromFile = async (file) => {
  try {
    console.log("Starting file extraction:", file.type);

    // Validate file type
    if (
      file.type.includes("sheet") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls")
    ) {
      return await handleExcelFile(file);
    } else if (file.type.includes("pdf") || file.type.includes("image")) {
      return await handleImageOrPdf(file);
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }
  } catch (error) {
    console.error("Extraction error:", error);
    return {
      success: false,
      error: error.message || "Failed to extract data from file",
    };
  }
};

// const handleExcelFile = async (file) => {
//   try {
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: "array" });

//       // Assuming the first sheet is the one we want to process
//       const firstSheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[firstSheetName];

//       // Extract data from the worksheet
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // Transform the extracted data into the required format
//       // const transformedData = jsonData.slice(1).map(row => ({
//       //   serialNumber: row[0],
//       //   invoiceDate: row[1],
//       //   productName: row[2],
//       //   qty: row[3],
//       //   priceWithTax: row[4],
//       //   itemDiscount: row[5],
//       //   unitPrice: row[6],
//       //   unitPriceAfterDiscount: row[7],
//       //   priceWithTaxAfterDiscount: row[8],
//       //   tax: row[9]
//       // }));

//       // Convert transformed data to string
//       const dataString = JSON.stringify(jsonData);

//       // Call the Gemini API with the stringified data
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-pro-latest",
//       });

//       const prompt = `Here is the data from the excel file: ${dataString}
// Analyze the attached file, which may be an Excel file, a PDF document, or an image of an invoice. Extract and organize the relevant data into three structured JSON objects corresponding to the following tabs:

// 1. Invoices Tab:
// - Columns: Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, and Date.
// - Include all rows of transactions or invoice details in this tab.

// 2. Products Tab:
// - Columns: Product Name, Quantity, Unit Price, Tax, Price with Tax.
// - Optionally include a Discount column if applicable.
// - Group or summarize product data as needed.

// 3. Customers Tab:
// - Columns: Customer Name, Phone Number, and Total Purchase Amount.
// - Add additional relevant fields (e.g., Email Address, Address) if available for a more comprehensive dataset.

// Additional Instructions:
// - If the file is an image or PDF, use OCR to extract text and organize it into the required structure.
// - For Excel files, assume relevant data is located in well-structured sheets; if multiple sheets exist, identify and prioritize sheets containing transaction data.
// - Ensure the extracted data is accurate and properly aligned with the given schema.
// - Output the result in valid JSON format with the structure:

// {
//     "Invoices": [
//         {
//             "Serial Number": "<value>",
//             "Customer Name": "<value>",
//             "Product Name": "<value>",
//             "Quantity": <value>,
//             "Tax": <value>,
//             "Total Amount": <value>,
//             "Date": "<value>"
//         }
//     ],
//     "Products": [
//         {
//             "Name": "<value>",
//             "Quantity": <value>,
//             "Unit Price": <value>,
//             "Tax": <value>,
//             "Price with Tax": <value>,
//             "Discount": "<optional value>"
//         }
//     ],
//     "Customers": [
//         {
//             "Customer Name": "<value>",
//             "Phone Number": "<value>",
//             "Total Purchase Amount": <value>,
//             "Email Address": "<optional value>",
//             "Address": "<optional value>"
//         }
//     ]
// }

// - Ensure all numerical values (e.g., quantities, totals, tax) are formatted as numbers, and dates are in ISO 8601 format (YYYY-MM-DD).
// - If any part of the data is missing or unclear in the file, infer missing values where possible and flag uncertain entries in the response. Provide only the JSON as response and do not give any other explanation or any other text, give only the JSON as response.`;



//       const result = await model.generateContent([dataString, prompt]);
//       const response = await result.response;
//       console.log("AI response:", response.text());
//     var res = response.text();
//     // remove first 7 characters
//     res = res.substring(7);
//     // remove last 2 characters
//     res = res.slice(0, -3);
//     console.log("AI response:", res);

//       // Parse the cleaned response
//       const parsedData = JSON.parse(res);

//       return {
//         success: true,
//         data: parsedData,
//       };
//     };




//     reader.onerror = (error) => {
//       throw new Error("Error reading the file: " + error);
//     };

//     reader.readAsArrayBuffer(file);
//   } catch (error) {
//     console.error("Excel file processing error:", error);
//     throw error;
//   }
// };
const handleExcelFile = async (file) => {
  try {
    const reader = new FileReader();

    // Wrap the reader logic in a Promise
    const parsedData = await new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const dataString = JSON.stringify(jsonData);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
          });

          const prompt = `Here is the data from the excel file: ${dataString}
// Analyze the attached file, which may be an Excel file, a PDF document, or an image of an invoice. Extract and organize the relevant data into three structured JSON objects corresponding to the following tabs:

// 1. Invoices Tab:
// - Columns: Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, and Date.
// - Include all rows of transactions or invoice details in this tab.

// 2. Products Tab:
// - Columns: Product Name, Quantity, Unit Price, Tax, Price with Tax.
// - Optionally include a Discount column if applicable.
// - Group or summarize product data as needed.

// 3. Customers Tab:
// - Columns: Customer Name, Phone Number, and Total Purchase Amount.
// - Add additional relevant fields (e.g., Email Address, Address) if available for a more comprehensive dataset.

// Additional Instructions:
// - If the file is an image or PDF, use OCR to extract text and organize it into the required structure.
// - For Excel files, assume relevant data is located in well-structured sheets; if multiple sheets exist, identify and prioritize sheets containing transaction data.
// - Ensure the extracted data is accurate and properly aligned with the given schema.
// - Output the result in valid JSON format with the structure:

// {
//     "Invoices": [
//         {
//             "Serial Number": "<value>",
//             "Customer Name": "<value>",
//             "Product Name": "<value>",
//             "Quantity": <value>,
//             "Tax": <value>,
//             "Total Amount": <value>,
//             "Date": "<value>"
//         }
//     ],
//     "Products": [
//         {
//             "Name": "<value>",
//             "Quantity": <value>,
//             "Unit Price": <value>,
//             "Tax": <value>,
//             "Price with Tax": <value>,
//             "Discount": "<optional value>"
//         }
//     ],
//     "Customers": [
//         {
//             "Customer Name": "<value>",
//             "Phone Number": "<value>",
//             "Total Purchase Amount": <value>,
//             "Email Address": "<optional value>",
//             "Address": "<optional value>"
//         }
//     ]
// }

// - Ensure all numerical values (e.g., quantities, totals, tax) are formatted as numbers, and dates are in ISO 8601 format (YYYY-MM-DD).
// - If any part of the data is missing or unclear in the file, infer missing values where possible and flag uncertain entries in the response. Provide only the JSON as response and do not give any other explanation or any other text, give only the JSON as response.`;


          const result = await model.generateContent([dataString, prompt]);
          const response = await result.response;
          let res = response.text();

          // Remove first 7 characters and last 3 characters to get the JSON response
          res = res.substring(7);
          res = res.slice(0, -3);
          console.log("Gemini response:", res);

          const parsedData = JSON.parse(res);
          console.log("Parsed data:", parsedData);

          resolve(parsedData); // Resolve with the parsed data
        } catch (err) {
          reject(err); // Reject in case of any errors
        }
      };

      reader.onerror = (err) => reject(err); // Reject on file reader error

      reader.readAsArrayBuffer(file); // Start reading the file as an ArrayBuffer
    });

    console.log("This should execute after the Gemini response.");

    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("Excel file processing error:", error);
    throw error;
  }
};


const handleImageOrPdf = async (file) => {
  try {
    console.log("Processing Image/PDF file...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const fileData = await fileToGenerativeArtifact(file);

    const prompt = `Analyze the uploaded file, which may be an Excel file, a PDF document, or an image of an invoice, and extract structured data into JSON objects as outlined below. Ensure accurate processing and proper alignment with the specified schema.

    Data Extraction Requirements:  
    1. Invoices Tab:  
       - Required Fields:  
         - Serial Number  
         - Customer Name  
         - Product Name  
         - Quantity  
         - Tax  
         - Total Amount  
         - Date  
       - Include all rows detailing transactions or invoices.  
    
    2. Products Tab:  
       - Required Fields:  
         - Product Name  
         - Quantity  
         - Unit Price  
         - Tax  
         - Price with Tax  
       - Optional Field:  
         - Discount (if applicable)  
       - Summarize or group product data by name where appropriate.  
    
    3. Customers Tab:  
       - Required Fields:  
         - Customer Name  
         - Phone Number  
         - Total Purchase Amount  
       - Optional Fields (if available):  
         - Email Address  
         - Address  
       - Ensure a comprehensive dataset by incorporating all relevant customer information.
    
    File Handling and Data Extraction Guidelines:  
    - For images or PDF files: Use OCR technology to accurately extract text before processing the data.  
    - For Excel files: Prioritize well-structured sheets containing transaction data. If multiple sheets exist, identify and extract relevant data accordingly.  
    - Validate and clean the data to ensure accuracy. Flag incomplete or uncertain entries.  
    
    Output Requirements:  
    - Deliver the output as a valid JSON object with the structure:  
    {
        "Invoices": [
            {
                "Serial Number": "<value>",
                "Customer Name": "<value>",
                "Product Name": "<value>",
                "Quantity": <value>,
                "Tax": <value>,
                "Total Amount": <value>,
                "Date": "<value>"
            }
        ],
        "Products": [
            {
                "Product Name": "<value>",
                "Quantity": <value>,
                "Unit Price": <value>,
                "Tax": <value>,
                "Price with Tax": <value>,
                "Discount": "<optional value>"
            }
        ],
        "Customers": [
            {
                "Customer Name": "<value>",
                "Phone Number": "<value>",
                "Total Purchase Amount": <value>,
                "Email Address": "<optional value>",
                "Address": "<optional value>"
            }
        ]
    }
    
    Additional Instructions:  
    - All numerical values (e.g., quantities, totals, tax) must be formatted as numbers.  
    - Use ISO 8601 format (YYYY-MM-DD) for dates.  
    - Infer missing or unclear values where feasible and flag any uncertainties.  
    - Respond only with the JSON output. Avoid additional explanations or text.`;

    const result = await model.generateContent([fileData, prompt]);
    const response = await result.response;

    console.log("AI response:", response.text());
    var res = response.text();
    // remove first 7 characters
    res = res.substring(7);
    // remove last 2 characters
    res = res.slice(0, -3);
    console.log("AI response:", res);
    const parsedData = JSON.parse(res);
    return {
      success: true,
      data: parsedData,
    };
  } catch (error) {
    console.error("Image/PDF processing error:", error);
    throw error;
  }
};

const fileToGenerativeArtifact = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

