using QuestPDF;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using QuestPDF.Elements;
using QuestPDF.Helpers;

namespace ProyectoFormativo.Modelos
{
    public static class DSLStyles
    {
        // Estilo para las celdas con el nombre de las redes
        public static IContainer CellNet(this IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Darken3)
                .Background(Colors.Green.Medium)
                .AlignCenter()
                .Padding(2);
                
        }

        // Estilo para las celdas del total de presupuestos
        public static IContainer CellTotal(this IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Darken3)
                .Padding(2);
                
        }

        // Estilo para las celdas de etiquetas
        public static IContainer CellLabel(this IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Darken3)
                .Background(Colors.Green.Medium)
                .Padding(2);
        }

        // Estilo para las celdas del nombre de los valores
        public static IContainer CellLight(this IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Darken3)
                .Background(Colors.Green.Accent1)
                .PaddingLeft(3);
        }

        // Estilo para las celdas de los valores
        public static IContainer CellValue(this IContainer container)
        {
            return container
                .Border(1)
                .BorderColor(Colors.Grey.Darken3)
                .Background(Colors.White)
                .PaddingLeft(3);
        }

        // displays only text label
        public static void LabelCell(this IContainer container, string text) => container.CellLabel().Text(text).FontColor(Colors.White).FontSize(10);

        public static void NetCell(this IContainer container, string text) => container.CellNet().Text(text).FontColor(Colors.White).FontSize(11).Bold();

        public static void TotalCell(this IContainer container, string text) => container.CellTotal().Text(text).FontSize(10).FontColor(Colors.Grey.Darken3).Bold();

        public static void LightCell(this IContainer container, string text) => container.CellLight().Text(text).FontColor(Colors.Grey.Darken3).FontSize(10);

        public static void ValueCell(this IContainer container, string text) => container.CellValue().Text(text).FontColor(Colors.Grey.Darken3).FontSize(10);

    }
}