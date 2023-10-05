namespace ProyectoFormativo.Modelos
{
    public class ArchivoPDF
    {
        public int ID { get; set; }
        public string NombreArchivo { get; set; }
        public byte[] PDFData { get; set; }
    }
}
