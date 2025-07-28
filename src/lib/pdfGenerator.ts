import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePostPDF = async (postElement: HTMLElement, title: string) => {
  try {
    // Convert the post element to canvas
    const canvas = await html2canvas(postElement, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 1200,
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0; // Start position

    // Add the image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const generatePDFFromPostData = async (
  title: string,
  leftContent: string,
  rightContent: string,
  bottomRightContent: string,
  currentPage: number,
  totalPages: number
) => {
  try {
    // Create a temporary div to render the post content with all visual elements
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = '#ffffff';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '14px';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.color = '#000000';
    
    // Create the post content HTML with all visual elements
    tempDiv.innerHTML = `
      <div style="max-width: 720px; margin: 0 auto; position: relative;">
        <!-- Watermark in the center -->
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.1; pointer-events: none; z-index: 0;">
          <img src="/watermark.svg" alt="Watermark" style="width: 288px; height: 288px;" />
        </div>

        <div style="position: relative; z-index: 10;">
          <!-- Header with page number and decorative elements -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 8px; height: 8px; border: 2px solid #000; transform: rotate(45deg);"></div>
              <div style="width: 192px; height: 1px; background-color: #000;"></div>
            </div>
            <span style="font-size: 16px; font-weight: 500; color: #000;">${currentPage}/${totalPages}</span>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 192px; height: 1px; background-color: #000;"></div>
              <div style="width: 8px; height: 8px; border: 2px solid #000; transform: rotate(45deg);"></div>
            </div>
          </div>

          <!-- Logo and main content area -->
          <div style="position: relative;">
            <!-- Small circular logo -->
            <div style="position: absolute; top: 0; left: 0;">
              <img src="/post-logo.svg" alt="Post Logo" style="width: 32px; height: 32px;" />
            </div>

            <!-- Main heading -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div style="flex: 1; padding-top: 48px; margin-left: 0;">
                <h1 style="font-size: 32px; font-weight: bold; line-height: 1.2; color: #000; margin: 0;">${title}</h1>
              </div>
            </div>

            <!-- Two-column text content -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 8px;">
              <div style="font-size: 16px; line-height: 1.6; color: #000;">
                ${leftContent}
              </div>
              <div style="font-size: 16px; line-height: 1.6; color: #000;">
                ${rightContent}
              </div>
            </div>

            <!-- Bottom section with image and text -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
              <div style="display: flex; justify-content: center;">
                <div style="width: 288px; height: 288px; border-radius: 50%; overflow: hidden;">
                  <img src="/post-hero.png" alt="Open book with pen" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              </div>
              <div style="padding-top: 8px; position: relative;">
                <!-- Watermark background -->
                <div style="position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-end; opacity: 0.2; pointer-events: none;">
                  <img src="/watermark.svg" alt="Watermark" style="width: 96px; height: 96px; opacity: 0.3;" />
                </div>
                <!-- Content on top -->
                <div style="position: relative; z-index: 10; font-size: 16px; line-height: 1.6; color: #000;">
                  ${bottomRightContent}
                </div>
              </div>
            </div>
          </div>

          <!-- Footer with contact information -->
          <div style="margin-top: 16px; padding-top: 8px; border-top: 1px solid #000;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; color: #000;">letstalk@thecoordinatedliving.com</span>
              <span style="font-size: 14px; color: #000;">www.thecoordinatedliving.com</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to document temporarily
    document.body.appendChild(tempDiv);

    // Generate PDF
    const success = await generatePostPDF(tempDiv, title);

    // Clean up
    document.body.removeChild(tempDiv);

    return success;
  } catch (error) {
    console.error('Error generating PDF from data:', error);
    return false;
  }
}; 