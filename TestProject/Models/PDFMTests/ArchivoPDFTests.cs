using Xunit;
using ProyectoFormativo.Modelos.PDFM;

namespace TestProject.Models.PDFMTests
{
    public class ArchivoPDFTests
    {
        [Fact]
        public void ConstructorSetsPropertiesCorrectly()
        {
            // Arrange
            int id = 1;
            string nombreArchivo = "sample.pdf";
            byte[] pdfData = new byte[] { 0x25, 0x50, 0x44, 0x46, 0x2D }; // Example PDF data

            // Act
            var archivoPDF = new ArchivoPDF
            {
                ID = id,
                NombreArchivo = nombreArchivo,
                PDFData = pdfData
            };

            // Assert
            Assert.Equal(id, archivoPDF.ID);
            Assert.Equal(nombreArchivo, archivoPDF.NombreArchivo);
            Assert.Equal(pdfData, archivoPDF.PDFData);
        }

        [Fact]
        public void DefaultConstructorSetsPropertiesToDefaultValues()
        {
            // Arrange & Act
            var archivoPDF = new ArchivoPDF();

            // Assert
            Assert.Equal(0, archivoPDF.ID);
            Assert.Null(archivoPDF.NombreArchivo);
            Assert.Null(archivoPDF.PDFData);
        }
    }
}
