using System;
using System.Globalization;
using System.Linq;
using NetworkSimulator1;
using ProyectoFormativo.Controllers;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using QuestPDF.Helpers;
using QuestPDF.Elements;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace PDFGenerator
{
    public class PDFGenerator : IPDFGenerator
    {
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public PDFGenerator(ProyectoPruebaContext proyectoFormativoContext)
        {
            _proyectoFormativoContext = proyectoFormativoContext;
        }

        public byte[] GeneratePDF(List<NetworkReport> networks1, List<NetworkReport> networks2)
        {
            var imagePath = "wwwroot/images/logo.png";
            var networkList = _proyectoFormativoContext.Networks.ToList();
            CultureInfo cultureInfo = new CultureInfo("es-ES");

            var data = Document.Create(document =>
            {

                document.Page(page =>
                {
                    page.Size(PageSizes.A4.Portrait());
                    page.Margin(30);

                    page.Header().ShowOnce().Row(row =>
                    {

                        row.ConstantItem(70).Image(imagePath);
                        row.RelativeItem();
                        row.RelativeItem().Padding(15).Column(col =>
                        {
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).Background(Colors.Green.Medium).AlignCenter().Text("Servicio Nacional de Aprendizaje").Bold().FontSize(12).FontColor(Colors.White);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).AlignCenter().Text("Centro de Comercios y Servicios").FontSize(9);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).Background(Colors.Green.Medium).AlignCenter().Text("Ibagué - Tolima").FontSize(9).FontColor(Colors.White);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).AlignCenter().Text("Carrera 4°, Estadio Calle 44 Avenida Ferrocarril").FontSize(9);

                        });

                    });

                    page.Content().Column(col1 =>
                    {
                        col1.Item().Column(col2 =>
                        {
                            col2.Item().Text("Reporte Tecnólogos - Presencial").Bold();

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                        });

                        col1.Item().LineHorizontal(0.5f);

                        for (int i = 0; i < networks1.Count; i++)
                        {
                            var net = networks1[i];

                            col1.Item().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                });

                                table.Cell().Column(1).Row(1).ColumnSpan(6).NetCell(networkList[i].NetworkName);

                                table.Cell().Column(1).Row(2).LightCell("Meta");
                                table.Cell().Column(2).Row(2).ValueCell(net.totalGoal.ToString());

                                table.Cell().Column(1).Row(3).LightCell("Cupos Antiguos");
                                table.Cell().Column(2).Row(3).ValueCell(net.oldStudents.ToString());

                                table.Cell().Column(3).Row(2).LightCell("Fichas Antiguas");
                                table.Cell().Column(4).Row(2).ValueCell(net.oldCourses.ToString());

                                table.Cell().Column(3).Row(3).LightCell("Fichas Nuevas");
                                table.Cell().Column(4).Row(3).ValueCell(net.newCourses.ToString());

                                table.Cell().Column(5).Row(2).RowSpan(2)
                                .Border(1)
                                .BorderColor(Colors.Grey.Darken3)
                                .Background(Colors.Green.Accent1)
                                .AlignMiddle()
                                .PaddingLeft(3)
                                .Text("Fichas Totales")
                                .FontColor(Colors.Grey.Darken3);

                                table.Cell().Column(6).Row(2).RowSpan(2)
                                .Border(1)
                                .BorderColor(Colors.Grey.Darken3)
                                .AlignMiddle().AlignCenter()
                                .Text(net.totalCourses.ToString());

                                table.Cell().Column(1).Row(4).LabelCell("Trimestre");
                                table.Cell().Column(2).Row(4).LabelCell("Fichas");
                                table.Cell().Column(3).Row(4).LabelCell("Planta");
                                table.Cell().Column(4).Row(4).LabelCell("Contrato");
                                table.Cell().Column(5).ColumnSpan(2).Row(4).LabelCell("Presupuesto");

                                table.Cell().Column(1).Row(5).LightCell("Primero");
                                table.Cell().Column(2).Row(5).ValueCell(net.courses[0].ToString());
                                table.Cell().Column(3).Row(5).ValueCell(net.fullTime[0].ToString());
                                table.Cell().Column(4).Row(5).ValueCell(net.contractT[0].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(5).ValueCell($"$ {net.budget1T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(6).LightCell("Segundo");
                                table.Cell().Column(2).Row(6).ValueCell(net.courses[1].ToString());
                                table.Cell().Column(3).Row(6).ValueCell(net.fullTime[1].ToString());
                                table.Cell().Column(4).Row(6).ValueCell(net.contractT[1].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(6).ValueCell($"$ {net.budget2T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(7).LightCell("Tercero");
                                table.Cell().Column(2).Row(7).ValueCell(net.courses[2].ToString());
                                table.Cell().Column(3).Row(7).ValueCell(net.fullTime[2].ToString());
                                table.Cell().Column(4).Row(7).ValueCell(net.contractT[2].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(7).ValueCell($"$ {net.budget3T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(8).LightCell("Cuarto");
                                table.Cell().Column(2).Row(8).ValueCell(net.courses[3].ToString());
                                table.Cell().Column(3).Row(8).ValueCell(net.fullTime[3].ToString());
                                table.Cell().Column(4).Row(8).ValueCell(net.contractT[3].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(8).ValueCell($"$ {net.budget4T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(4).Row(9).Background(Colors.Yellow.Accent1).TotalCell("Total");

                                table.Cell().Column(5).ColumnSpan(2).Row(9).Background(Colors.Yellow.Accent1).TotalCell($"$ {net.annualBudget.ToString("N0", cultureInfo)}");

                            });

                            col1.Spacing(10);
                        }

                        col1.Item().PageBreak();

                        col1.Item().Column(col3 =>
                        {
                            col3.Item().Text("Reporte Técnicos - Presencial").Bold();

                            col3.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                        });

                        col1.Item().LineHorizontal(0.5f);

                        for (int i = 0; i < networks2.Count; i++)
                        {
                            if (i == 4)
                            {
                                col1.Item().PageBreak();
                            }

                            var net = networks2[i];

                            col1.Item().Table(table =>
                            {
                                table.ColumnsDefinition(columns =>
                                {
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                    columns.RelativeColumn();
                                });

                                table.Cell().Column(1).Row(1).ColumnSpan(6).NetCell(networkList[i].NetworkName);

                                table.Cell().Column(1).Row(2).LightCell("Meta");
                                table.Cell().Column(2).Row(2).ValueCell(net.totalGoal.ToString());

                                table.Cell().Column(1).Row(3).LightCell("Cupos Antiguos");
                                table.Cell().Column(2).Row(3).ValueCell(net.oldStudents.ToString());

                                table.Cell().Column(3).Row(2).LightCell("Fichas Antiguas");
                                table.Cell().Column(4).Row(2).ValueCell(net.oldCourses.ToString());

                                table.Cell().Column(3).Row(3).LightCell("Fichas Nuevas");
                                table.Cell().Column(4).Row(3).ValueCell(net.newCourses.ToString());

                                table.Cell().Column(5).Row(2).RowSpan(2)
                                .Border(1)
                                .BorderColor(Colors.Grey.Darken3)
                                .Background(Colors.Green.Accent1)
                                .AlignMiddle()
                                .PaddingLeft(3)
                                .Text("Fichas Totales")
                                .FontColor(Colors.Grey.Darken3);

                                table.Cell().Column(6).Row(2).RowSpan(2)
                                .Border(1)
                                .BorderColor(Colors.Grey.Darken3)
                                .AlignMiddle().AlignCenter()
                                .Text(net.totalCourses.ToString());

                                table.Cell().Column(1).Row(4).LabelCell("Trimestre");
                                table.Cell().Column(2).Row(4).LabelCell("Fichas");
                                table.Cell().Column(3).Row(4).LabelCell("Planta");
                                table.Cell().Column(4).Row(4).LabelCell("Contrato");
                                table.Cell().Column(5).ColumnSpan(2).Row(4).LabelCell("Presupuesto");

                                table.Cell().Column(1).Row(5).LightCell("Primero");
                                table.Cell().Column(2).Row(5).ValueCell(net.courses[0].ToString());
                                table.Cell().Column(3).Row(5).ValueCell(net.fullTime[0].ToString());
                                table.Cell().Column(4).Row(5).ValueCell(net.contractT[0].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(5).ValueCell($"$ {net.budget1T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(6).LightCell("Segundo");
                                table.Cell().Column(2).Row(6).ValueCell(net.courses[1].ToString());
                                table.Cell().Column(3).Row(6).ValueCell(net.fullTime[1].ToString());
                                table.Cell().Column(4).Row(6).ValueCell(net.contractT[1].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(6).ValueCell($"$ {net.budget2T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(7).LightCell("Tercero");
                                table.Cell().Column(2).Row(7).ValueCell(net.courses[2].ToString());
                                table.Cell().Column(3).Row(7).ValueCell(net.fullTime[2].ToString());
                                table.Cell().Column(4).Row(7).ValueCell(net.contractT[2].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(7).ValueCell($"$ {net.budget3T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(1).Row(8).LightCell("Cuarto");
                                table.Cell().Column(2).Row(8).ValueCell(net.courses[3].ToString());
                                table.Cell().Column(3).Row(8).ValueCell(net.fullTime[3].ToString());
                                table.Cell().Column(4).Row(8).ValueCell(net.contractT[3].ToString());
                                table.Cell().Column(5).ColumnSpan(2).Row(8).ValueCell($"$ {net.budget4T.ToString("N0", cultureInfo)}");

                                table.Cell().Column(4).Row(9).Background(Colors.Yellow.Accent1).TotalCell("Total");

                                table.Cell().Column(5).ColumnSpan(2).Row(9).Background(Colors.Yellow.Accent1).TotalCell($"$ {net.annualBudget.ToString("N0", cultureInfo)}");

                            });
                        }

                    });

                    page.Footer().AlignRight().Text(txt =>
                    {
                        txt.Span("Página ").FontSize(10);
                        txt.CurrentPageNumber().FontSize(10);
                        txt.Span(" de ").FontSize(10);
                        txt.TotalPages().FontSize(10);
                    });

                });
            }).GeneratePdf();

            return data;
        }
    }
}