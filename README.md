# Automated Data Extraction and Invoice Management

This project is a React application that automates the extraction, processing, and management of invoice data from various file formats. The app organizes the extracted data into three main sections: Invoices, Products, and Customers. Changes are synchronized in real-time using Redux for consistent updates across tabs.

## Features

1. **File Uploads**  
   - Supports uploading different file types, including:
     - **Excel files**: Contain transaction details such as serial number, net/total amount, and customer information.
     - **PDF/Images**: Contain invoices with customer and item details, including totals, tax, and more.
   
2. **AI-Powered Data Extraction**  
   - Implemented an AI-based solution to extract relevant data from all file types and organize it into the following tabs:
     - **Invoices**: Serial Number, Customer Name, Product Name, Quantity, Tax, Total Amount, Date.
     - **Products**: Product Name, Quantity, Unit Price, Tax, Price with Tax (optional Discount field).
     - **Customers**: Customer Name, Phone Number, Total Purchase Amount (additional customer data optional).

3. **Real-time Synchronization with Redux**  
   - Uses Redux for centralized state management.
   - Changes made in the Products or Customers tabs are reflected in real-time across all tabs, e.g., if the Product Name is updated in the Products tab, the corresponding entry in the Invoices tab will update automatically.

4. **Validation and Error Handling**  
   - Ensures data completeness and accuracy.
   - Provides user-friendly feedback on unsupported file formats and extraction errors.
   - Highlights missing fields and prompts the user to complete them.

5. **Bonus Features**  
   - Additional fields in any of the tabs are supported for added details.

## Project Structure

The app is organized into three main sections:

- **Invoices Tab**  
   Displays a table with the following columns:
   - Serial Number
   - Customer Name
   - Product Name
   - Quantity
   - Tax
   - Total Amount
   - Date

- **Products Tab**  
   Displays a table with the following columns:
   - Product Name
   - Quantity
   - Unit Price
   - Tax
   - Price with Tax
   - Discount (optional)

- **Customers Tab**  
   Displays a table with the following columns:
   - Customer Name
   - Phone Number
   - Total Purchase Amount

## AI Test Cases

The application is tested on the following cases:

1. **Invoice PDFs**
2. **Invoice PDFs + Images**
3. **Excel Files**
4. **Excel Files (Multiple)**
5. **All Types of Files (Mix of PDF, Image, Excel)**

The AI-powered extraction is designed to handle these cases and highlight missing information if it can't be extracted from the files.

## Tech Stack

- **Frontend**: React, Redux
- **AI Integration**: Google Gemini API for document and vision processing
- **File Uploads**: React Dropzone
- **Backend (Optional)**: Any serverless solution like Firebase, AWS Lambda (if processing is done on the server-side)
- **Deployment**: Vercel/Netlify for deployment

## Web Site: 
https://simple-payment.netlify.app/
