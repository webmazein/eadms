import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import moment from 'moment';

const fetchImageAsBase64 = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Extract base64 part
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const ExportExcel = ({ defects, fromDate, toDate }) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Defects Report');
    
    try {
      // Fetch images
      const leftLogoUrl = '/Hero-Logo.png'; 
      const rightLogoUrl = '/tnd_logo.png'; 

      const leftLogoBase64 = await fetchImageAsBase64(leftLogoUrl);
      const rightLogoBase64 = await fetchImageAsBase64(rightLogoUrl);

      const leftLogoId = workbook.addImage({
        base64: leftLogoBase64,
        extension: 'png',
      });
      const rightLogoId = workbook.addImage({
        base64: rightLogoBase64,
        extension: 'png',
      });

      worksheet.addImage(leftLogoId, {
        tl: { col: 0, row: 0 },
        ext: { width: 120, height: 80 },
      });

      worksheet.addImage(rightLogoId, {
        tl: { col: 7, row: 0 },
        ext: { width: 80, height: 80 },
      });
    } catch (error) {
      console.error('Error adding images:', error);
    }

    // Title Styling
    worksheet.mergeCells('B1:I1');
    const titleCell = worksheet.getCell('B1');
    titleCell.value = 'Engine Assembly Line Defect Monitoring System Defects Report';
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Date Range Styling
    worksheet.mergeCells('A4:I4');
    const dateRangeCell = worksheet.getCell('A4');
    dateRangeCell.value = `From: ${fromDate ? moment(fromDate).format('DD/MM/YYYY') : '-'} To: ${toDate ? moment(toDate).format('DD/MM/YYYY') : '-'}`;
    dateRangeCell.alignment = { horizontal: 'center' };
    dateRangeCell.font = { italic: true, color: { argb: 'FF555555' } }; // Modern italic style

    // Column Headers starting from Row 5
    const headerRow = worksheet.getRow(5);
    headerRow.values = ['Sno.', 'Engine Sno.', 'Date Time', 'Defect Name', 'Action Taken', 'Operator Name', 'Station ID', 'Screen No.', 'User'];
    headerRow.font = { bold: true }; // Make header bold
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D3D3D3' }, // Light grey color for headers
        };
        cell.font = { bold: true };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

    // Add Data starting from Row 6
    defects.forEach((defect, index) => {
      const row = worksheet.addRow([
        index + 1, // Serial Number
        moment(defect.updated_at).format("HH:mm:ss DD/MM/YYYY"),
        defect.engine_serial_no,        
        defect.defect_name, 
        defect.action_taken, 
        defect.operator_name, 
        defect.station_id, 
        defect.screen_no, 
        defect.user
      ]);
      row.font = { size: 12 };
      row.alignment = { vertical: 'middle', horizontal: 'center' };
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // Adjust column widths
    worksheet.columns = [
      { width: 5 },  // Sno.
      { width: 20 }, // Engine Sno.
      { width: 20 }, // Date Time
      { width: 25 }, // Defect Name
      { width: 25 }, // Action Taken
      { width: 25 }, // Operator Name
      { width: 20 }, // Station ID
      { width: 15 }, // Screen No.
      { width: 20 }, // User
    ];

    // Save the file
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), 'defects_report.xlsx');
    });
  };

  return (
    <button onClick={handleExport} className="btn btn-success">
      Export to Excel
    </button>
  );
};

export default ExportExcel;
